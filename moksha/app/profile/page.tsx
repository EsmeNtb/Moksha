"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Dumbbell,
  LogOut,
  MapPin,
  Medal,
  Pencil,
  Trophy,
  Users,
} from "lucide-react";

import {
  dummyUser,
  type MokshaUser,
} from "@/data/dummy-user";
import { getAvatarSrc } from "@/data/avatars";

import { ThemeToggle } from "@/components/theme-toggle";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

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

const upcomingActivities = [
  {
    id: "activity-1",
    title: "Beginner Basketball Meetup",
    sport: "Basketball",
    location: "Parque México",
    date: "Saturday · 10:00 AM",
  },
  {
    id: "activity-2",
    title: "Morning Running Group",
    sport: "Running",
    location: "Bosque de Chapultepec",
    date: "Sunday · 7:30 AM",
  },
];

const tournaments = [
  {
    id: "tournament-1",
    title: "Moksha 3x3 Cup",
    sport: "Basketball",
    date: "July 26",
    status: "Registered",
  },
  {
    id: "tournament-2",
    title: "Community Tennis Weekend",
    sport: "Tennis",
    date: "August 9",
    status: "Interested",
  },
];

const hostedEvents = [
  {
    id: "hosted-1",
    title: "Sunday Social Run",
    participants: 14,
    status: "Open",
  },
  {
    id: "hosted-2",
    title: "Beginner Tennis Practice",
    participants: 6,
    status: "Full",
  },
];

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] =
    React.useState<MokshaUser | null>(null);

  React.useEffect(() => {
    const storedUser =
      window.localStorage.getItem("moksha-user");

    if (!storedUser) {
      setUser(dummyUser);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      setUser({
        ...dummyUser,
        ...parsedUser,
      });
    } catch {
      setUser(dummyUser);
    }
  }, []);

  function handleLogout() {
    window.localStorage.removeItem("moksha-session");
    router.push("/auth?mode=login");
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex justify-between">
            <Skeleton className="h-12 w-44 rounded-2xl" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <Skeleton className="min-h-[640px] rounded-[2.25rem]" />
            <Skeleton className="min-h-[640px] rounded-[2.25rem]" />
          </div>
        </div>
      </main>
    );
  }

  const avatarSrc = getAvatarSrc(user.avatar);

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
      <div className="mx-auto min-h-screen max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Dumbbell className="size-5" />
            </div>

            <div>
              <p className="font-black tracking-[0.16em]">
                MOKSHA
              </p>

              <p className="text-xs text-muted-foreground">
                Move together.
              </p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </header>

        <section className="grid items-start gap-6 py-10 lg:grid-cols-[0.72fr_1.28fr]">
          <Card className="overflow-hidden rounded-[2.25rem] border-border bg-card shadow-sm lg:sticky lg:top-8">
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
                  {confidenceLabels[user.confidence] ??
                    "Building confidence"}
                </Badge>

                <h1 className="mt-4 text-3xl font-black tracking-[-0.035em]">
                  {user.username}
                </h1>

                <p className="mt-1 text-muted-foreground">
                  @{user.nickname.toLowerCase()}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {user.age} years old
                </p>

                <p className="mt-5 leading-7 text-muted-foreground">
                  Here to{" "}
                  <span className="font-semibold text-foreground">
                    {(
                      purposeLabels[user.purpose] ??
                      "move together"
                    ).toLowerCase()}
                  </span>
                  , discover activities and build a stronger
                  routine.
                </p>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-background p-3">
                  <p className="text-2xl font-black">8</p>
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
                onClick={() => router.push("/onboarding")}
              >
                <Pencil className="mr-2 size-4" />
                Edit profile
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="rounded-[2.25rem] border-border bg-card shadow-sm">
              <CardHeader className="p-7 pb-4 sm:p-8 sm:pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-black tracking-[-0.03em]">
                      Your movement profile
                    </CardTitle>

                    <CardDescription className="mt-2">
                      Your goals, interests and current rhythm.
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
                      Weekly consistency
                    </p>

                    <span className="text-sm text-muted-foreground">
                      3 of 4 activities
                    </span>
                  </div>

                  <Progress value={75} />
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
                          {purposeLabels[user.purpose] ??
                            "Meet people"}
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
                          {confidenceLabels[user.confidence] ??
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
                  Your next reasons to leave the couch.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-3 p-7 pt-3 sm:p-8 sm:pt-4">
                {upcomingActivities.map((activity) => (
                  <button
                    key={activity.id}
                    type="button"
                    className="flex w-full items-start gap-4 rounded-2xl bg-background p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                      <CalendarDays className="size-5" />
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
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card className="rounded-[2.25rem] border-border bg-card shadow-sm">
                <CardHeader className="p-7 pb-4">
                  <CardTitle className="text-xl font-black">
                    Tournaments
                  </CardTitle>

                  <CardDescription>
                    Competitions you joined or saved.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-3 px-7 pb-7">
                  {tournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="rounded-2xl bg-background p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">
                            {tournament.title}
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {tournament.sport} · {tournament.date}
                          </p>
                        </div>

                        <Badge variant="secondary">
                          {tournament.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-[2.25rem] border-border bg-card shadow-sm">
                <CardHeader className="p-7 pb-4">
                  <CardTitle className="text-xl font-black">
                    Events you host
                  </CardTitle>

                  <CardDescription>
                    Activities created by you.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-3 px-7 pb-7">
                  {hostedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-2xl bg-background p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">
                            {event.title}
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {event.participants} participants
                          </p>
                        </div>

                        <Badge variant="outline">
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}