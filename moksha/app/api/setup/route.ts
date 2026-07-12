import { NextResponse } from "next/server";

import { discoveryVenues } from "@/data/discovery";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST() {
  try {
    const db = await getDatabase();

    const users = db.collection("users");
    const venues = db.collection("venues");
    const events = db.collection("events");
    const trainingPlans =
      db.collection("trainingPlans");

    // Indexes
    await users.createIndex(
      { username: 1 },
      { unique: true }
    );

    await venues.createIndex({
      country: 1,
      region: 1,
      city: 1,
      sport: 1,
    });

    await venues.createIndex(
      { id: 1 },
      { unique: true }
    );

    await events.createIndex({
      venueId: 1,
      date: 1,
    });

    await events.createIndex({
      organizerId: 1,
    });

    await trainingPlans.createIndex(
      { userId: 1 },
      { unique: true }
    );

    // Insert or update dummy venues
    if (discoveryVenues.length > 0) {
      await venues.bulkWrite(
        discoveryVenues.map((venue) => ({
          updateOne: {
            filter: {
              id: venue.id,
            },
            update: {
              $set: {
                ...venue,
                updatedAt: new Date(),
              },
              $setOnInsert: {
                createdAt: new Date(),
              },
            },
            upsert: true,
          },
        }))
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        "MongoDB collections and indexes initialized.",
      collections: [
        "users",
        "venues",
        "events",
        "trainingPlans",
      ],
      venuesSeeded: discoveryVenues.length,
    });
  } catch (error) {
    console.error("MongoDB setup error:", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "MongoDB initialization failed.",
      },
      {
        status: 500,
      }
    );
  }
}