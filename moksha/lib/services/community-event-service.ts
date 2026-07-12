export type CommunityEvent = {
  _id: string;
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
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCommunityEventInput = {
  title: string;
  venueId: string;
  sport: string;
  date: string;
  time: string;
  level: string;
  availableSpots: number;
  equipment: string;
  hostName: string;
  hostHandle: string;
  hostAvatar: string;
};

export async function getCommunityEvents(): Promise<
  CommunityEvent[]
> {
  const response = await fetch("/api/events", {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(
      data.message ?? "Could not load events."
    );
  }

  return data.events;
}

export async function createCommunityEvent(
  input: CreateCommunityEventInput
): Promise<CommunityEvent> {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(
      data.message ?? "Could not create event."
    );
  }

  return data.event;
}

export async function updateEventParticipation(
  eventId: string,
  action: "join" | "leave",
  userId: string
): Promise<CommunityEvent> {
  const response = await fetch(
    `/api/events/${eventId}/participants`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        userId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(
      data.message ??
        "Could not update participation."
    );
  }

  return data.event;
}