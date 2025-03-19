import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("contestTracker");
    const youtubeCollection = db.collection("youtube_links");

    console.log("Fetching YouTube links from database...");
    const links = await youtubeCollection.find({}).toArray();

    const linkMap: Record<string, string> = {};

    for (const link of links) {
      if (link.platform === "codeforces") {
        linkMap[link.contestId] = link.youtubeUrl;
        console.log(
          `Added Codeforces mapping: ${link.contestId} -> ${link.youtubeUrl}`
        );
      } else {
        if (link.contestId) {
          linkMap[link.contestId] = link.youtubeUrl;
          console.log(`Added mapping: ${link.contestId} -> ${link.youtubeUrl}`);
        }
      }
    }

    console.log("Final mapped links:", linkMap);
    return NextResponse.json(linkMap);
  } catch (error) {
    console.error("Error fetching YouTube links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { contestId, youtubeUrl } = await request.json();
    const client = await clientPromise;

    await client
      .db("contestTracker")
      .collection("youtubeLinks")
      .updateOne({ contestId }, { $set: { youtubeUrl } }, { upsert: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save YouTube link" },
      { status: 500 }
    );
  }
}
