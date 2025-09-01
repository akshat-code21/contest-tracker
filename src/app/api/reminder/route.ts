import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "node:fs";
import { getTimeUntil } from "@/lib/parser";
import clientPromise from "@/lib/mongodb";
export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("contestTracker");
  const collection = db.collection("reminders");
  const body = await req.json();
  const {
    name,
    email,
    contestName,
    startTime,
    duration,
    platformName,
    contestLink,
  } = body;

  console.log("Received body:", body);

  if (
    !name ||
    !email ||
    !contestName ||
    !startTime ||
    !duration ||
    !platformName ||
    !contestLink
  ) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST,
      port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS,
      },
    } as any);

    let emailTemplate = fs.readFileSync(
      process.cwd() + "/public/email.html",
      "utf-8",
    );

    const startDateTime = new Date(startTime);
    const formattedDate = startDateTime.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = startDateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const timeUntil = getTimeUntil(startDateTime);

    emailTemplate = emailTemplate
      .replace(/\{\{CONTEST_NAME\}\}/g, contestName)
      .replace(/\{\{START_DATE\}\}/g, formattedDate)
      .replace(/\{\{START_TIME\}\}/g, formattedTime)
      .replace(/\{\{DURATION\}\}/g, duration)
      .replace(/\{\{PLATFORM_NAME\}\}/g, platformName)
      .replace(/\{\{CONTEST_URL\}\}/g, contestLink)
      .replace(/\{\{PLATFORM_CLASS\}\}/g, platformName.toLowerCase())
      .replace(/\{\{TIME_UNTIL\}\}/g, timeUntil)
      .replace(/\{\{PLATFORM_URL\}\}/g, contestLink);

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_FROM_EMAIL,
      to: email,
      subject: `Reminder Setup for Contest: ${contestName}`,
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    const startTimeDate = new Date(startTime);

    await collection.insertOne({
      email: email,
      name: name,
      startTime,
      contestName,
      duration,
      contestLink,
      platformName,
      formattedStartTime : startTimeDate
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 },
    );
  }
}
