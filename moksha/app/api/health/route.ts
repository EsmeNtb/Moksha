import { NextResponse } from "next/server";

import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDatabase();

    await db.command({
      ping: 1,
    });

    return NextResponse.json({
      ok: true,
      database: db.databaseName,
      message:
        "MongoDB connected successfully.",
    });
  } catch (error) {
    console.error(
      "MongoDB connection error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "MongoDB connection failed.",
      },
      {
        status: 500,
      }
    );
  }
}