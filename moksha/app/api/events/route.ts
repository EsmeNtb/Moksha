import {
  NextRequest,
  NextResponse,
} from "next/server";

import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

type CreateEventBody = {
  title: string;
  venueId: string;
  sport: string;
  date: string;
  activityType: "event" | "tournament";
  coverImage: string;
  time: string;
  level:
    | "All levels"
    | "Beginner"
    | "Intermediate"
    | "Advanced";
  equipment: string;
  availableSpots: number;
  hostName: string;
  hostHandle: string;
  hostAvatar: string;
};

export async function GET() {
  try {
    const db = await getDatabase();

    const events = await db
      .collection("events")
      .find({
        status: {
          $ne: "cancelled",
        },
      })
      .sort({
        date: 1,
        time: 1,
      })
      .toArray();

    return NextResponse.json({
      ok: true,
      events: events.map((event) => ({
        ...event,
        _id: event._id.toString(),
      })),
    });
  } catch (error) {
    console.error(
      "GET events error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        message: "Could not load events.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      (await request.json()) as CreateEventBody;

    if (
      !body.title?.trim() ||
      !body.venueId ||
      !body.date ||
      !body.time ||
      !body.hostHandle?.trim()
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Title, venue, date, time and host are required.",
        },
        {
          status: 400,
        }
      );
    }

    const db = await getDatabase();

    const venue = await db
      .collection("venues")
      .findOne({
        id: body.venueId,
      });

    if (!venue) {
      return NextResponse.json(
        {
          ok: false,
          message: "Venue not found.",
        },
        {
          status: 404,
        }
      );
    }

    const normalizedHandle =
      body.hostHandle
        .trim()
        .replace(/^@+/, "")
        .toLowerCase();

    const eventDocument = {
      title: body.title.trim(),
      venueId: body.venueId,
      sport:
        body.sport || String(venue.sport),

      activityType:
        body.activityType === "tournament"
          ? "tournament"
          : "event",

      coverImage:
        body.coverImage?.trim() ||
        "/sports/volleyball.jpg",

      date: body.date,
      time: body.time,
      level:
        body.level ?? "All levels",

      equipment: body.equipment
        ? body.equipment
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],

      maxPlayers: Math.max(
        1,
        Number(body.availableSpots) || 1
      ),

      participantIds: [] as string[],

      organizerId: normalizedHandle,
      hostName: body.hostName.trim(),
      hostHandle: `@${normalizedHandle}`,
      hostAvatar: body.hostAvatar,

      description: "",
      status: "open",

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("events")
      .insertOne(eventDocument);

    return NextResponse.json(
      {
        ok: true,
        event: {
          _id: result.insertedId.toString(),
          ...eventDocument,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST event error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "Could not create event.",
      },
      {
        status: 500,
      }
    );
  }
}