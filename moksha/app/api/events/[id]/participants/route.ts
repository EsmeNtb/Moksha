import {
  NextRequest,
  NextResponse,
} from "next/server";
import { ObjectId } from "mongodb";

import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

type ParticipationBody = {
  action: "join" | "leave";
  userId: string;
};

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type EventDocument = {
  title: string;
  venueId: string;
  sport: string;
  date: string;
  time: string;
  level: string;
  equipment: string[];
  maxPlayers: number;
  participantIds: string[];
  organizerId: string;
  hostName: string;
  hostHandle: string;
  hostAvatar: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body =
      (await request.json()) as ParticipationBody;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid event ID.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !body.userId?.trim() ||
      !["join", "leave"].includes(body.action)
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "A valid userId and action are required.",
        },
        {
          status: 400,
        }
      );
    }

    const db = await getDatabase();

    const events =
      db.collection<EventDocument>("events");

    const eventId = new ObjectId(id);
    const userId = body.userId.trim();

    const result =
      body.action === "join"
        ? await events.updateOne(
            {
              _id: eventId,
              status: {
                $nin: [
                  "cancelled",
                  "completed",
                ],
              },
            },
            {
              $addToSet: {
                participantIds: userId,
              },
              $set: {
                updatedAt: new Date(),
              },
            }
          )
        : await events.updateOne(
            {
              _id: eventId,
            },
            {
              $pull: {
                participantIds: userId,
              },
              $set: {
                updatedAt: new Date(),
              },
            }
          );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Event not found or unavailable.",
        },
        {
          status: 404,
        }
      );
    }

    const updatedEvent =
      await events.findOne({
        _id: eventId,
      });

    if (!updatedEvent) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Could not load the updated event.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      ok: true,
      event: {
        ...updatedEvent,
        _id: updatedEvent._id.toString(),
      },
    });
  } catch (error) {
    console.error(
      "PATCH event participation error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "Could not update event participation.",
      },
      {
        status: 500,
      }
    );
  }
}