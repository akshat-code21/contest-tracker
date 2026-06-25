import * as fs from "node:fs";
import * as path from "node:path";

const API_ENDPOINT = "https://api.cron-job.org";
const JOB_TITLE = "Contest Tracker - Send Reminders";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    process.env[key] = value;
  }
}

async function main() {
  loadEnv();

  const apiKey = process.env.CRON_JOB_API_KEY;
  if (!apiKey) {
    console.error("CRON_JOB_API_KEY not found in .env");
    process.exit(1);
  }

  const baseUrl = process.argv[2];
  if (!baseUrl) {
    console.error("Usage: npx tsx scripts/setup-cron-job.ts <DEPLOYED_URL>");
    console.error("Example: npx tsx scripts/setup-cron-job.ts https://contesttracker.vercel.app");
    process.exit(1);
  }

  const url = `${baseUrl.replace(/\/$/, "")}/api/send-contest-reminders`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const jobPayload = {
    job: {
      enabled: true,
      title: JOB_TITLE,
      saveResponses: false,
      url,
      schedule: {
        timezone: "UTC",
        expiresAt: 0,
        hours: [-1],
        mdays: [-1],
        minutes: [0, 10, 20, 30, 40, 50],
        months: [-1],
        wdays: [-1],
      },
    },
  };

  console.log(`Checking existing jobs at ${API_ENDPOINT}/jobs ...`);
  const listRes = await fetch(`${API_ENDPOINT}/jobs`, { headers });

  if (!listRes.ok) {
    console.error("Failed to list jobs:", await listRes.text());
    process.exit(1);
  }

  const listData: any = await listRes.json();
  const existing = (listData.jobs ?? []).find(
    (j: any) => j.title === JOB_TITLE,
  );

  if (existing) {
    const jobId = existing.jobId;
    console.log(`Job already exists (ID: ${jobId}). Updating...`);
    const updateRes = await fetch(`${API_ENDPOINT}/jobs/${jobId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(jobPayload),
    });

    if (!updateRes.ok) {
      console.error("Failed to update job:", await updateRes.text());
      process.exit(1);
    }

    console.log("Cron job updated successfully!");
  } else {
    console.log("Creating new cron job...");
    const createRes = await fetch(`${API_ENDPOINT}/jobs`, {
      method: "PUT",
      headers,
      body: JSON.stringify(jobPayload),
    });

    if (!createRes.ok) {
      console.error("Failed to create job:", await createRes.text());
      process.exit(1);
    }

    const createData: any = await createRes.json();
    console.log(`Cron job created successfully! (ID: ${createData.jobId})`);
  }

  console.log(`\nSummary:`);
  console.log(`  URL:      ${url}`);
  console.log(`  Schedule: every 10 minutes`);
  console.log(`  Title:    ${JOB_TITLE}`);
}

main().catch(console.error);
