"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Dumbbell,
  LogOut,
  MapPin,
  Medal,
  Pencil,
  Plus,
  Trophy,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import {
  dummyUser,
  type MokshaPurpose,
  type MokshaUser,
} from "@/data/dummy-user";
import { getAvatarSrc } from "@/data/avatars";
import { discoveryVenues } from "@/data/discovery";

import {
  createCommunityEvent,
  getCommunityEvents,
} from "@/lib/services/community-event-service";

import { AppNavbar } from "@/components/app-navbar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

type ProfileUser = MokshaUser & {
  pronouns?: string;
};

type ActivityType =
  | "event"
  | "tournament";

type HostedEvent = {
  id: string;
  title: string;
  participants: number;
  status: string;
  hostHandle?: string;
  hostAvatar?: string;
  venueName?: string;
  date?: string;
  time?: string;
  activityType: ActivityType;
  coverImage: string;
};

type EventFormState = {
  title: string;
  venueId: string;
  sport: string;
  date: string;
  time: string;
  level: string;
  availableSpots: string;
  equipment: string;
  activityType: ActivityType;
  coverImage: string;
};

type EditProfileFormState = {
  username: string;
  nickname: string;
  pronouns: string;
  purpose: MokshaPurpose;
  sports: string[];
};

const purposeLabels: Record<string, string> = {
  active: "Stay active",
  community: "Meet people",
  learn: "Learn a sport",
  improve: "Improve consistently",
  compete: "Join tournaments",
};

const confidenceLabels: Record<string, string> = {
  starting: "Just starting",
  building: "Building confidence",
  comfortable: "Comfortable",
  competitive: "Competitive",
};

const purposeOptions: Array<{
  id: MokshaPurpose;
  label: string;
  description: string;
}> = [
  {
    id: "active",
    label: "Stay active",
    description: "Build movement into your routine.",
  },
  {
    id: "community",
    label: "Meet people",
    description: "Connect through sports and activities.",
  },
  {
    id: "learn",
    label: "Learn a sport",
    description: "Start from the basics and improve.",
  },
  {
    id: "improve",
    label: "Improve consistently",
    description: "Train and follow your progress.",
  },
  {
    id: "compete",
    label: "Join tournaments",
    description: "Find teams, leagues and competitions.",
  },
];

const sportOptions = [
  "Basketball",
  "Football",
  "Running",
  "Tennis",
  "Volleyball",
  "Baseball",
  "Cycling",
  "Swimming",
  "Fitness",
];

type UpcomingActivity = {
  id: string;
  title: string;
  sport: string;
  location: string;
  date: string;
  activityType: ActivityType;
  coverImage: string;
};

type Tournament = {
  id: string;
  title: string;
  sport: string;
  date: string;
  status: string;
  location: string;
  coverImage: string;
};

const coverImageOptions = [
  {
    label: "Basketball",
    value: "/gallery/playing_1.jpg",
  },
  {
    label: "Running",
    value: "/gallery/running.jpg",
  },
  {
    label: "Tennis",
    value: "/sports/tennis.jpg",
  },
  {
    label: "Volleyball",
    value: "/sports/volleyball.jpg",
  },
  {
    label: "Football",
    value: "/sports/soccer.jpg",
  },
  {
    label: "Fitness",
    value: "/gallery/fitness.jpg",
  },
];

const defaultHostedEvents: HostedEvent[] = [];

const initialEventForm: EventFormState = {
  title: "",
  venueId: discoveryVenues[0]?.id ?? "",
  sport: discoveryVenues[0]?.sport ?? "Basketball",
  date: "",
  time: "",
  level: "All levels",
  availableSpots: "8",
  equipment: "",
  activityType: "event",
  coverImage: "/gallery/running.jpg",
};

const initialEditProfileForm: EditProfileFormState = {
  username: "",
  nickname: "",
  pronouns: "",
  purpose: "active",
  sports: [],
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] =
    React.useState<ProfileUser | null>(null);

  const [createEventOpen, setCreateEventOpen] =
    React.useState(false);

  const [editProfileOpen, setEditProfileOpen] =
    React.useState(false);

  const [hostedEvents, setHostedEvents] =
    React.useState<HostedEvent[]>(
      defaultHostedEvents
    );

  const [
    upcomingActivities,
    setUpcomingActivities,
  ] = React.useState<UpcomingActivity[]>([]);

  const [tournaments, setTournaments] =
    React.useState<Tournament[]>([]);

  const [eventForm, setEventForm] =
    React.useState<EventFormState>(
      initialEventForm
    );

  const [editProfileForm, setEditProfileForm] =
    React.useState<EditProfileFormState>(
      initialEditProfileForm
    );

  React.useEffect(() => {
    async function loadProfile() {
      const storedUser =
        window.localStorage.getItem("moksha-user");

      let loadedUser: ProfileUser = {
        ...dummyUser,
      };

      if (storedUser) {
        try {
          loadedUser = {
            ...dummyUser,
            ...JSON.parse(storedUser),
          };
        } catch {
          loadedUser = {
            ...dummyUser,
          };
        }
      }

      setUser(loadedUser);

      let joinedIds: string[] = [];

      const storedJoined =
        window.localStorage.getItem(
          "moksha-joined-events"
        );

      if (storedJoined) {
        try {
          joinedIds = JSON.parse(storedJoined);
        } catch {
          joinedIds = [];
        }
      }

      const localUpcoming: UpcomingActivity[] =
        discoveryVenues.flatMap((venue) =>
          venue.events
            .filter((event) =>
              joinedIds.includes(event.id)
            )
            .map((event) => ({
              id: event.id,
              title: event.title,
              sport: venue.sport,
              location: venue.name,
              date: `${event.date} · ${event.time}`,
              activityType: "event" as const,
              coverImage: venue.image,
            }))
        );

      try {
        const communityEvents =
          await getCommunityEvents();

        const currentHandle =
          `@${loadedUser.nickname.toLowerCase()}`;

        const savedHostedEvents: HostedEvent[] =
          communityEvents
            .filter(
              (event) =>
                (
                  event.hostHandle ?? ""
                ).toLowerCase() === currentHandle
            )
            .map((event) => {
              const venue = discoveryVenues.find(
                (item) =>
                  item.id === event.venueId
              );

              return {
                id: event._id,
                title: event.title,
                participants:
                  event.participantIds?.length ?? 0,
                status:
                  event.status === "open"
                    ? "Open"
                    : event.status === "full"
                      ? "Full"
                      : event.status,
                hostHandle: event.hostHandle,
                hostAvatar: event.hostAvatar,
                venueName: venue?.name,
                date: event.date,
                time: event.time,
                activityType:
                  event.activityType === "tournament"
                    ? "tournament"
                    : "event",
                coverImage:
                  event.coverImage ||
                  venue?.image ||
                  "/gallery/running.jpg",
              };
            });

        const joinedMongoEvents =
          communityEvents.filter((event) =>
            event.participantIds?.includes(
              "demo-user"
            )
          );

        const mongoUpcoming: UpcomingActivity[] =
          joinedMongoEvents
            .filter(
              (event) =>
                event.activityType !== "tournament"
            )
            .map((event) => {
              const venue = discoveryVenues.find(
                (item) =>
                  item.id === event.venueId
              );

              return {
                id: event._id,
                title: event.title,
                sport: event.sport,
                location:
                  venue?.name ?? "Community venue",
                date: `${event.date} · ${event.time}`,
                activityType: "event",
                coverImage:
                  event.coverImage ||
                  venue?.image ||
                  "/gallery/running.jpg",
              };
            });

        const joinedTournaments: Tournament[] =
          joinedMongoEvents
            .filter(
              (event) =>
                event.activityType === "tournament"
            )
            .map((event) => {
              const venue = discoveryVenues.find(
                (item) =>
                  item.id === event.venueId
              );

              return {
                id: event._id,
                title: event.title,
                sport: event.sport,
                date: `${event.date} · ${event.time}`,
                status: "Registered",
                location:
                  venue?.name ?? "Community venue",
                coverImage:
                  event.coverImage ||
                  venue?.image ||
                  "/gallery/running.jpg",
              };
            });

        setHostedEvents(savedHostedEvents);
        setUpcomingActivities([
          ...localUpcoming,
          ...mongoUpcoming,
        ]);
        setTournaments(joinedTournaments);
      } catch (error) {
        console.error(
          "Could not load community events:",
          error
        );

        setHostedEvents(defaultHostedEvents);
        setUpcomingActivities(localUpcoming);
        setTournaments([]);
      }
    }

    void loadProfile();
  }, []);

  function handleLogout() {
    window.localStorage.removeItem(
      "moksha-session"
    );

    router.push("/auth?mode=login");
  }

  function openEditProfile() {
    if (!user) {
      return;
    }

    setEditProfileForm({
      username: user.username,
      nickname: user.nickname,
      pronouns: user.pronouns ?? "",
      purpose: user.purpose,
      sports: [...user.sports],
    });

    setEditProfileOpen(true);
  }

  function toggleEditSport(sport: string) {
    setEditProfileForm((current) => {
      const alreadySelected =
        current.sports.includes(sport);

      return {
        ...current,
        sports: alreadySelected
          ? current.sports.filter(
              (item) => item !== sport
            )
          : [...current.sports, sport],
      };
    });
  }

  function handleSaveProfile(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) {
      return;
    }

    const cleanName =
      editProfileForm.username.trim();

    const cleanNickname =
      editProfileForm.nickname
        .trim()
        .replace(/^@+/, "")
        .replace(/\s+/g, "");

    if (cleanName.length < 2) {
      toast.error("Enter your name.");
      return;
    }

    if (cleanNickname.length < 2) {
      toast.error(
        "Enter a valid username."
      );
      return;
    }

    if (
      editProfileForm.sports.length === 0
    ) {
      toast.error(
        "Choose at least one sport."
      );
      return;
    }

    const updatedUser: ProfileUser = {
      ...user,
      username: cleanName,
      nickname: cleanNickname,
      pronouns:
        editProfileForm.pronouns.trim() ||
        undefined,
      purpose: editProfileForm.purpose,
      sports: editProfileForm.sports,
    };

    window.localStorage.setItem(
      "moksha-user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setEditProfileOpen(false);

    toast.success("Profile updated.");
  }

  async function handleCreateEvent(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) {
      return;
    }

    if (
      !eventForm.title.trim() ||
      !eventForm.venueId ||
      !eventForm.date ||
      !eventForm.time
    ) {
      toast.error(
        "Complete the event name, place, date and time."
      );
      return;
    }

    const selectedVenue =
      discoveryVenues.find(
        (venue) =>
          venue.id === eventForm.venueId
      );

    if (!selectedVenue) {
      toast.error("Select a valid place.");
      return;
    }

    try {
      const createdEvent =
        await createCommunityEvent({
          title: eventForm.title.trim(),
          venueId: selectedVenue.id,
          sport: selectedVenue.sport,
          date: eventForm.date,
          time: eventForm.time,
          level: eventForm.level,
          availableSpots:
            Number(
              eventForm.availableSpots
            ) || 1,
          equipment:
            eventForm.equipment.trim(),
          hostName: user.username,
          hostHandle: `@${user.nickname.toLowerCase()}`,
          hostAvatar: getAvatarSrc(
            user.avatar
          ),
          activityType:
            eventForm.activityType,
          coverImage:
            eventForm.coverImage,
        });

      setHostedEvents((current) => [
        ...current,
        {
          id: createdEvent._id,
          title: createdEvent.title,
          participants:
            createdEvent.participantIds?.length ??
            0,
          status:
            createdEvent.status === "open"
              ? "Open"
              : createdEvent.status,
          hostHandle:
            createdEvent.hostHandle,
          hostAvatar:
            createdEvent.hostAvatar,
          venueName: selectedVenue.name,
          date: createdEvent.date,
          time: createdEvent.time,
          activityType:
            createdEvent.activityType ===
            "tournament"
              ? "tournament"
              : "event",
          coverImage:
            createdEvent.coverImage ||
            eventForm.coverImage,
        },
      ]);

      setEventForm({
        ...initialEventForm,
      });

      setCreateEventOpen(false);

      toast.success(
        eventForm.activityType === "tournament"
          ? "Your tournament was created."
          : "Your event was created."
      );
    } catch (error) {
      console.error(
        "Could not create event:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not create the event."
      );
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <Skeleton className="h-20 rounded-3xl" />

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <Skeleton className="min-h-[640px] rounded-[2.25rem]" />
            <Skeleton className="min-h-[640px] rounded-[2.25rem]" />
          </div>
        </div>
      </main>
    );
  }

  const avatarSrc =
    getAvatarSrc(user.avatar);

  const initials = (
    user.nickname ||
    user.username ||
    "M"
  )
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppNavbar user={user} />

      <div className="mx-auto min-h-screen max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <section className="grid items-start gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          {/* Left profile card */}
          <Card className="overflow-hidden rounded-[2.25rem] border-border bg-card shadow-sm lg:sticky lg:top-28">
            <div className="relative min-h-44 bg-gradient-to-br from-[#FBA311] via-[#13213C] to-black dark:from-[#FDBE4A] dark:via-[#F67F00] dark:to-[#002F49]">
              <div className="absolute -right-12 -top-12 size-44 rounded-full border-[28px] border-white/10" />

              <div className="absolute -bottom-20 -left-16 size-60 rounded-full border-[38px] border-white/10" />
            </div>

            <CardContent className="relative px-7 pb-8">
              <Avatar className="-mt-16 size-32 border-[6px] border-card bg-background shadow-xl">
                <AvatarImage
                  src={avatarSrc}
                  alt={`${user.nickname} avatar`}
                  className="object-cover"
                />

                <AvatarFallback className="text-3xl font-black">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="mt-5">
                <Badge
                  variant="secondary"
                  className="rounded-full"
                >
                  {confidenceLabels[
                    user.confidence
                  ] ?? "Building confidence"}
                </Badge>

                <h1 className="mt-4 text-3xl font-black tracking-[-0.035em]">
                  {user.username}
                </h1>

                <p className="mt-1 text-muted-foreground">
                  @{user.nickname.toLowerCase()}
                </p>

                {user.pronouns && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {user.pronouns}
                  </p>
                )}

                <p className="mt-2 text-sm text-muted-foreground">
                  {user.age} years old
                </p>

                <p className="mt-5 leading-7 text-muted-foreground">
                  Here to{" "}
                  <span className="font-semibold text-foreground">
                    {(
                      purposeLabels[
                        user.purpose
                      ] ?? "move together"
                    ).toLowerCase()}
                  </span>
                  , discover activities and
                  build a stronger routine.
                </p>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-background p-3">
                  <p className="text-2xl font-black">
                    {upcomingActivities.length}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Activities
                  </p>
                </div>

                <div className="rounded-2xl bg-background p-3">
                  <p className="text-2xl font-black">
                    {tournaments.length}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Tournaments
                  </p>
                </div>

                <div className="rounded-2xl bg-background p-3">
                  <p className="text-2xl font-black">
                    {hostedEvents.length}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Hosted
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="mt-6 w-full rounded-full"
                onClick={openEditProfile}
              >
                <Pencil className="mr-2 size-4" />
                Edit profile
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="mt-2 w-full rounded-full text-muted-foreground"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 size-4" />
                Log out
              </Button>
            </CardContent>
          </Card>

          {/* Right content */}
          <div className="grid gap-6">
            <Card className="rounded-[2.25rem] border-border bg-card shadow-sm">
              <CardHeader className="p-7 pb-4 sm:p-8 sm:pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-black tracking-[-0.03em]">
                      Your movement profile
                    </CardTitle>

                    <CardDescription className="mt-2">
                      Your goals, interests and
                      current rhythm.
                    </CardDescription>
                  </div>

                  <div className="hidden size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground sm:flex">
                    <Medal className="size-5" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid gap-6 p-7 pt-3 sm:p-8 sm:pt-4">
                <div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <p className="font-semibold">
                      Upcoming plan
                    </p>

                    <span className="text-sm text-muted-foreground">
                      {upcomingActivities.length +
                        tournaments.length}{" "}
                      joined
                    </span>
                  </div>

                  <Progress
                    value={Math.min(
                      100,
                      (upcomingActivities.length +
                        tournaments.length) * 25
                    )}
                  />
                </div>

                <Separator />

                <div>
                  <p className="mb-3 font-semibold">
                    Sports interests
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {user.sports.map((sport) => (
                      <Badge
                        key={sport}
                        variant="secondary"
                        className="rounded-full px-4 py-2"
                      >
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-background p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                        <Users className="size-5" />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Main purpose
                        </p>

                        <p className="font-semibold">
                          {purposeLabels[
                            user.purpose
                          ] ?? "Meet people"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-background p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                        <Trophy className="size-5" />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Confidence
                        </p>

                        <p className="font-semibold">
                          {confidenceLabels[
                            user.confidence
                          ] ??
                            "Building confidence"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2.25rem] border-border bg-card shadow-sm">
              <CardHeader className="p-7 pb-4 sm:p-8 sm:pb-4">
                <CardTitle className="text-2xl font-black tracking-[-0.03em]">
                  Upcoming activities
                </CardTitle>

                <CardDescription>
                  Your next reasons to leave the
                  couch.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-3 p-7 pt-3 sm:p-8 sm:pt-4">
                {upcomingActivities.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
                    No joined activities yet.
                  </div>
                ) : (
                  upcomingActivities.map(
                    (activity) => (
                      <button
                        key={activity.id}
                        type="button"
                        className="flex w-full items-start gap-4 rounded-2xl bg-background p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
                      >
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={activity.coverImage}
                            alt={activity.title}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-semibold">
                              {activity.title}
                            </p>

                            <Badge
                              variant="outline"
                              className="rounded-full"
                            >
                              {activity.sport}
                            </Badge>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="size-3.5" />
                              {activity.location}
                            </span>

                            <span className="flex items-center gap-1">
                              <CalendarDays className="size-3.5" />
                              {activity.date}
                            </span>
                          </div>
                        </div>
                      </button>
                    )
                  )
                )}
              </CardContent>
            </Card>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card className="rounded-[2.25rem] border-border bg-card shadow-sm">
                <CardHeader className="p-7 pb-4">
                  <CardTitle className="text-xl font-black">
                    Tournaments
                  </CardTitle>

                  <CardDescription>
                    Competitions you joined or
                    saved.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-3 px-7 pb-7">
                  {tournaments.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
                      No tournaments joined yet.
                    </div>
                  ) : (
                    tournaments.map(
                      (tournament) => (
                        <div
                          key={tournament.id}
                          className="overflow-hidden rounded-2xl bg-background"
                        >
                          <div className="relative h-28">
                            <Image
                              src={tournament.coverImage}
                              alt={tournament.title}
                              fill
                              sizes="(max-width: 1280px) 100vw, 50vw"
                              className="object-cover"
                            />
                          </div>

                          <div className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-semibold">
                                  {tournament.title}
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                  {tournament.sport} ·{" "}
                                  {tournament.date}
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                  {tournament.location}
                                </p>
                              </div>

                              <Badge variant="secondary">
                                {tournament.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-[2.25rem] border-border bg-card shadow-sm">
                <CardHeader className="p-7 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-black">
                        Events you host
                      </CardTitle>

                      <CardDescription>
                        Activities created by you.
                      </CardDescription>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      className="shrink-0 rounded-full"
                      onClick={() =>
                        setCreateEventOpen(true)
                      }
                    >
                      <Plus className="mr-2 size-4" />
                      Create
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="grid gap-3 px-7 pb-7">
                  {hostedEvents.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
                      No hosted activities yet.
                    </div>
                  ) : (
                    hostedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="overflow-hidden rounded-2xl bg-background"
                    >
                      <div className="relative h-28">
                        <Image
                          src={event.coverImage}
                          alt={event.title}
                          fill
                          sizes="(max-width: 1280px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex items-start gap-3 p-4">
                        <Avatar className="size-10 shrink-0 border border-border">
                          <AvatarImage
                            src={
                              event.hostAvatar ??
                              avatarSrc
                            }
                            alt="Host avatar"
                          />

                          <AvatarFallback>
                            {initials.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-semibold">
                                {event.title}
                              </p>

                              <p className="mt-1 text-sm text-muted-foreground">
                                Hosted by{" "}
                                {event.hostHandle ??
                                  `@${user.nickname.toLowerCase()}`}
                              </p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <Badge variant="secondary">
                                {event.activityType ===
                                "tournament"
                                  ? "Tournament"
                                  : "Community event"}
                              </Badge>

                              <Badge variant="outline">
                                {event.status}
                              </Badge>
                            </div>
                          </div>

                          {(event.venueName ||
                            event.date) && (
                            <div className="mt-3 grid gap-1 text-sm text-muted-foreground">
                              {event.venueName && (
                                <span className="flex items-center gap-2">
                                  <MapPin className="size-3.5" />
                                  {event.venueName}
                                </span>
                              )}

                              {event.date && (
                                <span className="flex items-center gap-2">
                                  <CalendarDays className="size-3.5" />
                                  {event.date}
                                  {event.time
                                    ? ` · ${event.time}`
                                    : ""}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="size-4" />
                            {event.participants}{" "}
                            participants
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Edit profile sheet */}
      <Sheet
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
      >
        <SheetContent className="flex w-full flex-col overflow-hidden border-l border-border bg-card p-0 sm:max-w-xl [&>button]:right-5 [&>button]:top-5 [&>button]:size-10 [&>button]:rounded-full [&>button]:bg-secondary [&>button]:text-secondary-foreground [&>button]:opacity-100">
          <SheetHeader className="border-b border-border bg-gradient-to-br from-secondary/15 via-card to-primary/10 px-6 py-8 text-left sm:px-8">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
              <Pencil className="size-5" />
            </div>

            <SheetTitle className="mt-4 text-3xl font-black tracking-[-0.035em]">
              Edit your profile
            </SheetTitle>

            <SheetDescription className="mt-2 leading-6">
              Update how people know you and
              what you want to explore.
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSaveProfile}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-8">
              <div className="grid gap-7">
                <section className="grid gap-4">
                  <div>
                    <h3 className="font-bold">
                      Identity
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Your public name, username
                      and optional pronouns.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">
                      Name
                    </Label>

                    <Input
                      id="edit-name"
                      value={
                        editProfileForm.username
                      }
                      onChange={(event) =>
                        setEditProfileForm(
                          (current) => ({
                            ...current,
                            username:
                              event.target.value,
                          })
                        )
                      }
                      placeholder="Esme"
                      className="h-12 rounded-xl bg-background"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-username">
                      Username
                    </Label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        @
                      </span>

                      <Input
                        id="edit-username"
                        value={
                          editProfileForm.nickname
                        }
                        onChange={(event) =>
                          setEditProfileForm(
                            (current) => ({
                              ...current,
                              nickname:
                                event.target.value,
                            })
                          )
                        }
                        placeholder="ez"
                        className="h-12 rounded-xl bg-background pl-9"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-pronouns">
                      Pronouns{" "}
                      <span className="font-normal text-muted-foreground">
                        optional
                      </span>
                    </Label>

                    <Input
                      id="edit-pronouns"
                      value={
                        editProfileForm.pronouns
                      }
                      onChange={(event) =>
                        setEditProfileForm(
                          (current) => ({
                            ...current,
                            pronouns:
                              event.target.value,
                          })
                        )
                      }
                      placeholder="she/her, he/him, they/them"
                      className="h-12 rounded-xl bg-background"
                    />
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="font-bold">
                    Main purpose
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose the goal that best
                    represents you now.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {purposeOptions.map(
                      (option) => {
                        const selected =
                          editProfileForm.purpose ===
                          option.id;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                              setEditProfileForm(
                                (current) => ({
                                  ...current,
                                  purpose:
                                    option.id,
                                })
                              )
                            }
                            className={`rounded-2xl border p-4 text-left transition ${
                              selected
                                ? "border-secondary bg-secondary text-secondary-foreground"
                                : "border-border bg-background hover:border-secondary/60"
                            }`}
                          >
                            <span className="font-semibold">
                              {option.label}
                            </span>

                            <span
                              className={`mt-1 block text-xs leading-5 ${
                                selected
                                  ? "text-secondary-foreground/75"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {
                                option.description
                              }
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="font-bold">
                    Sports interests
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Select all the sports you
                    want to explore.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {sportOptions.map((sport) => {
                      const selected =
                        editProfileForm.sports.includes(
                          sport
                        );

                      return (
                        <button
                          key={sport}
                          type="button"
                          onClick={() =>
                            toggleEditSport(sport)
                          }
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            selected
                              ? "border-secondary bg-secondary text-secondary-foreground"
                              : "border-border bg-background hover:border-secondary/60"
                          }`}
                        >
                          {sport}
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>

            <div className="border-t border-border bg-card/95 px-6 py-5 backdrop-blur sm:px-8">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 flex-1 rounded-full"
                  onClick={() =>
                    setEditProfileOpen(false)
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="h-12 flex-[1.4] rounded-full"
                >
                  Save changes
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Create event sheet */}
      <Sheet
        open={createEventOpen}
        onOpenChange={setCreateEventOpen}
      >
        <SheetContent className="flex w-full flex-col overflow-hidden border-l border-border bg-card p-0 sm:max-w-xl [&>button]:right-5 [&>button]:top-5 [&>button]:size-10 [&>button]:rounded-full [&>button]:bg-secondary [&>button]:text-secondary-foreground [&>button]:opacity-100">
          <SheetHeader className="border-b border-border bg-gradient-to-br from-secondary/15 via-card to-primary/10 px-6 py-8 text-left sm:px-8">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
              <CalendarDays className="size-5" />
            </div>

            <SheetTitle className="mt-4 text-3xl font-black tracking-[-0.035em]">
              Create an event
            </SheetTitle>

            <SheetDescription className="mt-2 leading-6">
              Organize a local activity and
              invite the Moksha community.
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleCreateEvent}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-8">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="event-title">
                    Event name
                  </Label>

                  <Input
                    id="event-title"
                    value={eventForm.title}
                    onChange={(event) =>
                      setEventForm(
                        (current) => ({
                          ...current,
                          title:
                            event.target.value,
                        })
                      )
                    }
                    placeholder="Saturday social match"
                    className="h-12 rounded-xl bg-background"
                  />
                </div>

                <section>
                  <h3 className="font-bold">
                    Activity type
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose whether this is a community event or a tournament.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {(
                      [
                        {
                          value: "event",
                          label: "Community event",
                          description:
                            "A casual activity open to the community.",
                        },
                        {
                          value: "tournament",
                          label: "Tournament",
                          description:
                            "A competitive event with registration.",
                        },
                      ] as const
                    ).map((option) => {
                      const selected =
                        eventForm.activityType ===
                        option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setEventForm(
                              (current) => ({
                                ...current,
                                activityType:
                                  option.value,
                              })
                            )
                          }
                          className={`rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-secondary bg-secondary text-secondary-foreground"
                              : "border-border bg-background hover:border-secondary/60"
                          }`}
                        >
                          <span className="font-semibold">
                            {option.label}
                          </span>

                          <span
                            className={`mt-1 block text-xs leading-5 ${
                              selected
                                ? "text-secondary-foreground/75"
                                : "text-muted-foreground"
                            }`}
                          >
                            {option.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <h3 className="font-bold">
                    Cover image
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose a photo for Discover and your profile.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {coverImageOptions.map((option) => {
                      const selected =
                        eventForm.coverImage ===
                        option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setEventForm(
                              (current) => ({
                                ...current,
                                coverImage:
                                  option.value,
                              })
                            )
                          }
                          className={`overflow-hidden rounded-2xl border text-left transition ${
                            selected
                              ? "border-secondary ring-2 ring-secondary/40"
                              : "border-border hover:border-secondary/60"
                          }`}
                        >
                          <div className="relative h-24">
                            <Image
                              src={option.value}
                              alt={option.label}
                              fill
                              sizes="(max-width: 640px) 50vw, 180px"
                              className="object-cover"
                            />
                          </div>

                          <span className="block bg-background px-3 py-2 text-sm font-semibold">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-2xl bg-background/65 p-5">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                      <MapPin className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Place
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        The event will appear in
                        Discover under this place.
                      </p>
                    </div>
                  </div>

                  <select
                    value={eventForm.venueId}
                    onChange={(event) => {
                      const venue =
                        discoveryVenues.find(
                          (item) =>
                            item.id ===
                            event.target.value
                        );

                      setEventForm(
                        (current) => ({
                          ...current,
                          venueId:
                            event.target.value,
                          sport:
                            venue?.sport ??
                            current.sport,
                        })
                      );
                    }}
                    className="h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none"
                  >
                    {discoveryVenues.map(
                      (venue) => (
                        <option
                          key={venue.id}
                          value={venue.id}
                        >
                          {venue.name} ·{" "}
                          {venue.city}
                        </option>
                      )
                    )}
                  </select>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {discoveryVenues
                      .filter(
                        (venue) =>
                          venue.id ===
                          eventForm.venueId
                      )
                      .map((venue) => (
                        <React.Fragment
                          key={venue.id}
                        >
                          <Badge variant="secondary">
                            {venue.sport}
                          </Badge>

                          <Badge variant="outline">
                            {venue.region}
                          </Badge>
                        </React.Fragment>
                      ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-bold">
                    Schedule
                  </h3>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="event-date">
                        Date
                      </Label>

                      <Input
                        id="event-date"
                        type="date"
                        value={eventForm.date}
                        onChange={(event) =>
                          setEventForm(
                            (current) => ({
                              ...current,
                              date:
                                event.target
                                  .value,
                            })
                          )
                        }
                        className="h-12 rounded-xl bg-background dark:[color-scheme:dark]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="event-time">
                        Time
                      </Label>

                      <Input
                        id="event-time"
                        type="time"
                        value={eventForm.time}
                        onChange={(event) =>
                          setEventForm(
                            (current) => ({
                              ...current,
                              time:
                                event.target
                                  .value,
                            })
                          )
                        }
                        className="h-12 rounded-xl bg-background dark:[color-scheme:dark]"
                      />
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl bg-background/65 p-5">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                      <Users className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Participation
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Define the level and capacity.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="event-level">
                        Level
                      </Label>

                      <select
                        id="event-level"
                        value={eventForm.level}
                        onChange={(event) =>
                          setEventForm(
                            (current) => ({
                              ...current,
                              level:
                                event.target
                                  .value,
                            })
                          )
                        }
                        className="h-12 rounded-xl border border-input bg-card px-4 text-sm outline-none"
                      >
                        <option value="All levels">
                          All levels
                        </option>
                        <option value="Beginner">
                          Beginner
                        </option>
                        <option value="Intermediate">
                          Intermediate
                        </option>
                        <option value="Advanced">
                          Advanced
                        </option>
                      </select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="event-spots">
                        Available spots
                      </Label>

                      <Input
                        id="event-spots"
                        type="number"
                        min="1"
                        max="100"
                        value={
                          eventForm.availableSpots
                        }
                        onChange={(event) =>
                          setEventForm(
                            (current) => ({
                              ...current,
                              availableSpots:
                                event.target
                                  .value,
                            })
                          )
                        }
                        className="h-12 rounded-xl bg-card"
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                      <Dumbbell className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Equipment
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Tell participants what
                        they need to bring.
                      </p>
                    </div>
                  </div>

                  <Input
                    value={eventForm.equipment}
                    onChange={(event) =>
                      setEventForm(
                        (current) => ({
                          ...current,
                          equipment:
                            event.target.value,
                        })
                      )
                    }
                    placeholder="Bring a ball, water and sports shoes"
                    className="h-12 rounded-xl bg-background"
                  />
                </section>
              </div>
            </div>

            <div className="border-t border-border bg-card/95 px-6 py-5 backdrop-blur sm:px-8">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 flex-1 rounded-full"
                  onClick={() =>
                    setCreateEventOpen(false)
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="h-12 flex-[1.5] rounded-full"
                >
                  <Plus className="mr-2 size-4" />
                  Create event
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </main>
  );
}