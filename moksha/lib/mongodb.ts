import {
  MongoClient,
  type Db,
} from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName =
  process.env.MONGODB_DB ?? "moksha";

if (!uri) {
  throw new Error(
    "MONGODB_URI is missing. Add it to .env.local."
  );
}

const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

const client = new MongoClient(uri);

const clientPromise =
  globalForMongo.mongoClientPromise ??
  client.connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClientPromise =
    clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const connectedClient =
    await clientPromise;

  return connectedClient.db(databaseName);
}

export default clientPromise;