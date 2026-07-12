import type {
  CommunityEvent,
} from "@/lib/services/community-event-service";

import type {
  SportVenue,
  VenueEvent,
} from "@/lib/types/discovery";

type VenuesApiResponse = {
  ok: boolean;
  venues?: SportVenue[];
  message?: string;
};

type EventsApiResponse = {
  ok: boolean;
  events?: CommunityEvent[];
  message?: string;
};

function convertCommunityEvent(
  event: CommunityEvent
): VenueEvent {
  const participants =
    event.participantIds?.length ?? 0;

  return {
    id: event._id,
    title: event.title,
    date: event.date,
    time: event.time,
    level: event.level,
    availableSpots: Math.max(
      0,
      event.maxPlayers - participants
    ),
    activityType:
      event.activityType === "tournament"
        ? "tournament"
        : "event",
    coverImage:
      event.coverImage || "/gallery/running.jpg",
  };
}

export async function getDiscoveryVenues(): Promise<
  SportVenue[]
> {
  const [venuesResponse, eventsResponse] =
    await Promise.all([
      fetch("/api/venues", {
        cache: "no-store",
      }),
      fetch("/api/events", {
        cache: "no-store",
      }),
    ]);

  const venuesData =
    (await venuesResponse.json()) as VenuesApiResponse;

  const eventsData =
    (await eventsResponse.json()) as EventsApiResponse;

  if (
    !venuesResponse.ok ||
    !venuesData.ok ||
    !venuesData.venues
  ) {
    throw new Error(
      venuesData.message ??
        "Could not load discovery venues."
    );
  }

  const communityEvents =
    eventsResponse.ok &&
    eventsData.ok &&
    eventsData.events
      ? eventsData.events
      : [];

  return venuesData.venues.map((venue) => {
    const originalEvents =
      Array.isArray(venue.events)
        ? venue.events
        : [];

    const mongoEvents = communityEvents
      .filter(
        (event) =>
          event.venueId === venue.id &&
          event.status !== "cancelled"
      )
      .map(convertCommunityEvent);

    const newMongoEvents = mongoEvents.filter(
      (mongoEvent) =>
        !originalEvents.some(
          (originalEvent) =>
            originalEvent.id === mongoEvent.id
        )
    );

    return {
      ...venue,
      events: [
        ...originalEvents,
        ...newMongoEvents,
      ],
    };
  });
}