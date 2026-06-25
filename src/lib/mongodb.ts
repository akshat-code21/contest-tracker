import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

async function ensureIndexes() {
  try {
    const c = await clientPromise;
    const db = c.db("contestTracker");
    const reminders = db.collection("reminders");

    await Promise.all([
      reminders.createIndex(
        { email: 1, contestId: 1 },
        { unique: true, background: true },
      ),
      reminders.createIndex(
        { formattedStartTime: 1 },
        { expireAfterSeconds: 86400, background: true },
      ),
    ]);
  } catch (e) {
    console.error("Failed to create indexes:", e);
  }
}

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().then((c) => {
      ensureIndexes();
      return c;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then((c) => {
    ensureIndexes();
    return c;
  });
}

export default clientPromise;
