import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";
import fs from "node:fs";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("contestTracker");
    const collection = db.collection("reminders");

    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    const contests = await collection
      .find({
        $and: [
          { formattedStartTime: { $gt: now } },
          { formattedStartTime: { $lte: oneHourFromNow } },
        ],
      })
      .toArray();

    const details = contests.map((contest) => ({
      email: contest.email,
      contestName: contest.contestName,
      platform: contest.platformName,
      startTime: contest.startTime,
      duration: contest.duration,
      contestUrl: contest.contestLink,
    }));

    if (details.length === 0) {
      return NextResponse.json({
        message: "No contests to send reminders for",
        contests: [],
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST,
      port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS,
      },
    });

    const templatePath = process.cwd() + "/public/one-hour-reminder-email.html";
    const baseTemplate = fs.readFileSync(templatePath, "utf-8");

    const emailResults = await Promise.allSettled(
      details.map(async (detail) => {
        const emailTemplate = baseTemplate
          .replace(/\{\{CONTEST_NAME\}\}/g, detail.contestName)
          .replace(/\{\{PLATFORM_NAME\}\}/g, detail.platform)
          .replace(/\{\{CONTEST_URL\}\}/g, detail.contestUrl)
          .replace(/\{\{START_TIME\}\}/g, detail.startTime)
          .replace(/\{\{DURATION\}\}/g, detail.duration);

        const mailOptions = {
          from: process.env.NEXT_PUBLIC_FROM_EMAIL,
          to: detail.email,
          subject: `Your contest starts in 1hr: ${detail.contestName}`,
          html: emailTemplate,
        };

        const emailResult = await transporter.sendMail(mailOptions);

        return emailResult;
      }),
    );

    return NextResponse.json({
      message: `Reminders processed`,
      totalProcessed: details.length,
      contests: details,
    });
  } catch (error) {
    console.error("Error sending reminders:", error);
    return NextResponse.json(
      {
        message: "Failed to send reminders",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
