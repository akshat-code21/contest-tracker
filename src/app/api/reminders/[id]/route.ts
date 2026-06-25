import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid reminder ID" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("contestTracker");
    const collection = db.collection("reminders");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Reminder not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Reminder cancelled successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting reminder:", error);
    return NextResponse.json(
      { message: "Failed to cancel reminder" },
      { status: 500 },
    );
  }
}
