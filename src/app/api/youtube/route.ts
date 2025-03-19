import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const links = await client.db("contestTracker")
      .collection("youtubeLinks")
      .find({})
      .toArray();
    
    const linksObject = links.reduce((acc, { contestId, youtubeUrl }) => {
      acc[contestId] = youtubeUrl;
      return acc;
    }, {} as Record<string, string>);
    
    return NextResponse.json(linksObject);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch YouTube links' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { contestId, youtubeUrl } = await request.json();
    const client = await clientPromise;
    
    await client.db("contestTracker")
      .collection("youtubeLinks")
      .updateOne(
        { contestId },
        { $set: { youtubeUrl } },
        { upsert: true }
      );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save YouTube link' }, { status: 500 });
  }
}