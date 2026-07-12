import { NextResponse } from "next/server";

import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDatabase();

    const venueDocuments = await db
      .collection("venues")
      .find({})
      .sort({ name: 1 })
      .toArray();

    const venues = venueDocuments.map(
      ({ _id, ...venue }) => ({
        ...venue,
        _id: _id.toString(),
      })
    );

    return NextResponse.json({
      ok: true,
      venues,
    });
  } catch (error) {
    console.error(
      "GET venues error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "Could not load venues.",
      },
      {
        status: 500,
      }
    );
  }
}