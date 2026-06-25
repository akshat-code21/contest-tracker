import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        { message: "Email query parameter is required" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("contestTracker");
    const collection = db.collection("reminders");

    const reminders = await collection
      .find({ email })
      .sort({ formattedStartTime: 1 })
      .toArray();

    const result = reminders.map((r) => ({
      id: r._id.toString(),
      contestId: r.contestId,
      contestName: r.contestName,
      platformName: r.platformName,
      startTime: r.startTime,
      startTimeISO: r.startTimeISO,
      duration: r.duration,
      contestLink: r.contestLink,
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return NextResponse.json(
      { message: "Failed to fetch reminders" },
      { status: 500 },
    );
  }
}
