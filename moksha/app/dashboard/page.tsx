"use client";

import * as React from "react";
import Image from "next/image";

import {
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  Circle,
  Flame,
  MapPin,
  Moon,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

import {
  dummyUser,
  type MokshaUser,
} from "@/data/dummy-user";

import {
  dashboardEvents,
  initialTrainingTasks,
  motivationalQuote,
  tipsByPurpose,
  type TrainingTask,
} from "@/data/dashboard";

import { communityMoments } from "@/data/gallery";
import { AppNavbar } from "@/components/app-navbar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type SleepQuality =
  | "great"
  | "good"
  | "fair"
  | "low";

const sleepOptions: Record<
  SleepQuality,
  {
    label: string;
    score: number;
    message: string;
  }
> = {
  great: {
    label: "Great",
    score: 94,
    message:
      "Your recovery supports a more demanding session today.",
  },
  good: {
    label: "Good",
    score: 82,
    message:
      "You are well recovered. Keep today’s intensity controlled.",
  },
  fair: {
    label: "Fair",
    score: 67,
    message:
      "Consider reducing intensity and prioritizing mobility.",
  },
  low: {
    label: "Low",
    score: 45,
    message:
      "Recovery should be today’s main training objective.",
  },
};

export default function DashboardPage() {
  const [user, setUser] =
    React.useState<MokshaUser | null>(null);

  const [selectedDate, setSelectedDate] =
    React.useState<Date | undefined>(new Date());

  const [tasks, setTasks] =
    React.useState<TrainingTask[]>(
      initialTrainingTasks
    );

  const [sleepQuality, setSleepQuality] =
    React.useState<SleepQuality>("good");

  React.useEffect(() => {
    const storedUser =
      window.localStorage.getItem("moksha-user");

    if (!storedUser) {
      setUser(dummyUser);
      return;
    }

    try {
      setUser({
        ...dummyUser,
        ...JSON.parse(storedUser),
      });
    } catch {
      setUser(dummyUser);
    }
  }, []);

  function toggleTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <Skeleton className="h-20 rounded-3xl" />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-[600px] rounded-[2rem]" />
            <Skeleton className="h-[600px] rounded-[2rem]" />
            <Skeleton className="h-[600px] rounded-[2rem]" />
          </div>
        </div>
      </main>
    );
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const dailyProgress = Math.round(
    (completedTasks / tasks.length) * 100
  );

  const goalProgress = 75;
  const weeklyMomentum = 71;
  const sleep = sleepOptions[sleepQuality];

  const tip =
    tipsByPurpose[user.purpose] ??
    tipsByPurpose.active;

  const competitiveMode =
    user.purpose === "compete" ||
    user.confidence === "competitive";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppNavbar user={user} />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {/* Dashboard header */}
        <Card className="relative overflow-hidden rounded-[2.25rem] border-border bg-card shadow-sm">
          <div className="absolute -right-16 -top-20 size-72 rounded-full border-[42px] border-secondary/15" />

          <CardContent className="relative grid gap-7 p-7 sm:p-9 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="rounded-full"
                >
                  Weekly momentum
                </Badge>

                <Badge
                  variant="outline"
                  className="rounded-full"
                >
                  12-day streak
                </Badge>
              </div>

              <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Welcome back,{" "}
                {user.nickname || user.username}.
              </h1>

              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                Progress is built from small promises
                kept repeatedly.
              </p>
            </div>

            <div className="rounded-2xl bg-background/80 p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="font-semibold">
                  Weekly momentum
                </p>

                <span className="text-sm text-muted-foreground">
                  5 of 7 sessions
                </span>
              </div>

              <Progress value={weeklyMomentum} />

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Complete two more sessions to close
                your weekly plan.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main layout */}
        <section className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,0.9fr)]">
          {/* Left area: columns 1 and 2 */}
          <div className="grid min-w-0 gap-6">
            {/* Community carousel spanning both columns */}
            <Card className="overflow-hidden rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-7 pb-4 pt-7 sm:px-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl font-black">
                      <Camera className="size-5" />
                      Community moments
                    </CardTitle>

                    <CardDescription className="mt-2">
                      Shared moments from activities,
                      teams and friendships.
                    </CardDescription>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() =>
                      toast(
                        "Photo sharing will be available soon."
                      )
                    }
                  >
                    Add moment
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="px-7 pb-7 sm:px-8">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-3">
                    {communityMoments.map((moment) => (
                      <CarouselItem
                        key={moment.id}
                        className="basis-[88%] pl-3 sm:basis-1/2"
                      >
                        <button
                          type="button"
                          className="group relative block h-56 w-full overflow-hidden rounded-2xl text-left sm:h-64"
                          onClick={() =>
                            toast(
                              `Opening ${moment.event}`
                            )
                          }
                        >
                          <Image
                            src={moment.image}
                            alt={moment.title}
                            fill
                            sizes="(max-width: 640px) 88vw, (max-width: 1280px) 45vw, 32vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />

                          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                            <p className="text-lg font-bold">
                              {moment.title}
                            </p>

                            <p className="mt-1 text-sm text-white/70">
                              {moment.event}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {moment.taggedUsers
                                .slice(0, 3)
                                .map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-white/15 px-2.5 py-1 text-xs backdrop-blur-md"
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="left-3 border-white/20 bg-black/40 text-white hover:bg-black/60 hover:text-white" />

                  <CarouselNext className="right-3 border-white/20 bg-black/40 text-white hover:bg-black/60 hover:text-white" />
                </Carousel>
              </CardContent>
            </Card>

            {/* Columns 1 and 2 underneath */}
            <div className="grid items-start gap-6 lg:grid-cols-[0.88fr_1.15fr]">
              {/* Column 1 */}
              <div className="grid gap-6">
                <Card className="rounded-[2rem] border-border bg-card shadow-sm">
                  <CardHeader className="px-6 pb-2 pt-6">
                    <CardTitle className="flex items-center gap-2 text-xl font-black">
                      <CalendarDays className="size-5" />
                      Calendar
                    </CardTitle>

                    <CardDescription>
                      Choose a day to review your plan.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-4 pb-5">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="mx-auto w-full"
                    />
                  </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-border bg-card shadow-sm">
                  <CardHeader className="px-6 pb-3 pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl font-black">
                          My training
                        </CardTitle>

                        <CardDescription className="mt-1">
                          Exercises remaining today.
                        </CardDescription>
                      </div>

                      <Badge variant="secondary">
                        {completedTasks}/{tasks.length}
                      </Badge>
                    </div>

                    <Progress
                      value={dailyProgress}
                      className="mt-4"
                    />
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    <ScrollArea className="h-[330px] pr-4">
                      <div className="grid gap-3">
                        {tasks.map((task) => (
                          <button
                            key={task.id}
                            type="button"
                            onClick={() =>
                              toggleTask(task.id)
                            }
                            className="flex w-full items-start gap-3 rounded-2xl bg-background p-4 text-left transition hover:-translate-y-0.5"
                          >
                            <span
                              className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border ${
                                task.completed
                                  ? "border-secondary bg-secondary text-secondary-foreground"
                                  : "border-border"
                              }`}
                            >
                              {task.completed ? (
                                <Check className="size-4" />
                              ) : (
                                <Circle className="size-3" />
                              )}
                            </span>

                            <span className="min-w-0 flex-1">
                              <span
                                className={`block font-semibold ${
                                  task.completed
                                    ? "line-through opacity-55"
                                    : ""
                                }`}
                              >
                                {task.title}
                              </span>

                              <span className="mt-1 block text-sm text-muted-foreground">
                                {task.category} ·{" "}
                                {task.duration}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Column 2 */}
              <div className="grid gap-6">
                <Card className="overflow-hidden rounded-[2rem] border-border bg-card shadow-sm">
                  <CardHeader className="px-7 pb-3 pt-7">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-black">
                          Your goal
                        </CardTitle>

                        <CardDescription className="mt-1">
                          Improve weekly consistency.
                        </CardDescription>
                      </div>

                      <Target className="size-6 text-secondary" />
                    </div>
                  </CardHeader>

                  <CardContent className="grid gap-7 px-7 pb-7 sm:grid-cols-[auto_1fr] sm:items-center">
                    <div
                      className="flex size-40 items-center justify-center rounded-full p-4"
                      style={{
                        background: `conic-gradient(var(--secondary) ${
                          goalProgress * 3.6
                        }deg, var(--muted) 0deg)`,
                      }}
                    >
                      <div className="flex size-full flex-col items-center justify-center rounded-full bg-card">
                        <span className="text-4xl font-black">
                          {goalProgress}%
                        </span>

                        <span className="text-xs text-muted-foreground">
                          completed
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-3xl font-black">
                        9 of 12
                      </p>

                      <p className="mt-1 text-muted-foreground">
                        weekly sessions completed
                      </p>

                      <Separator className="my-5" />

                      <p className="text-sm leading-6 text-muted-foreground">
                        Complete three more sessions
                        to reach this month’s
                        consistency goal.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-border bg-card shadow-sm">
                  <CardHeader className="px-7 pb-3 pt-7">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                        <Sparkles className="size-5" />
                      </div>

                      <div>
                        <CardTitle className="text-xl font-black">
                          Professional tip
                        </CardTitle>

                        <CardDescription>
                          Adapted to your main objective.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-7 pb-7">
                    <h2 className="text-lg font-bold">
                      {tip.title}
                    </h2>

                    <p className="mt-2 leading-7 text-muted-foreground">
                      {tip.text}
                    </p>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden rounded-[2rem] border-none bg-primary text-primary-foreground shadow-sm">
                  <div className="absolute -bottom-12 -right-12 size-44 rounded-full border-[26px] border-white/10" />

                  <CardContent className="relative p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-70">
                      Keep returning
                    </p>

                    <blockquote className="mt-5 text-2xl font-black leading-tight">
                      “{motivationalQuote.text}”
                    </blockquote>

                    <p className="mt-5 text-sm opacity-70">
                      {motivationalQuote.author}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Right area: column 3 */}
          <div className="grid gap-6">
            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-xl font-black">
                      Special training
                    </CardTitle>

                    <CardDescription className="mt-1">
                      Competitive preparation.
                    </CardDescription>
                  </div>

                  <Trophy className="size-5 text-secondary" />
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                {competitiveMode ? (
                  <div className="rounded-2xl bg-background p-5">
                    <Badge variant="secondary">
                      Active plan
                    </Badge>

                    <h2 className="mt-4 text-lg font-bold">
                      Local League Preparation
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Four weeks of strength,
                      technique and controlled match
                      preparation.
                    </p>

                    <Button
                      type="button"
                      className="mt-5 w-full rounded-full"
                    >
                      Open special plan
                      <ChevronRight className="ml-2 size-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border bg-background/50 p-5">
                    <Badge variant="outline">
                      Optional
                    </Badge>

                    <h2 className="mt-4 font-bold">
                      No competitive plan activated
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Join a league or tournament
                      to unlock event-specific preparation.
                    </p>

                    <Button
                      type="button"
                      variant="outline"
                      className="mt-5 w-full rounded-full"
                      onClick={() =>
                        toast(
                          "League discovery is coming next."
                        )
                      }
                    >
                      Explore leagues
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                    <Flame className="size-5" />
                  </div>

                  <div>
                    <CardTitle className="text-xl font-black">
                      12-day streak
                    </CardTitle>

                    <CardDescription>
                      Training and recovery rhythm.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="mb-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Moon className="size-4" />

                    <p className="font-semibold">
                      Sleep quality
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(
                      Object.keys(
                        sleepOptions
                      ) as SleepQuality[]
                    ).map((quality) => (
                      <button
                        key={quality}
                        type="button"
                        onClick={() =>
                          setSleepQuality(quality)
                        }
                        className={`rounded-full border px-3 py-1.5 text-sm transition ${
                          sleepQuality === quality
                            ? "border-secondary bg-secondary text-secondary-foreground"
                            : "border-border hover:bg-background"
                        }`}
                      >
                        {
                          sleepOptions[quality]
                            .label
                        }
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-background p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Recovery score
                      </p>

                      <p className="mt-1 text-3xl font-black">
                        {sleep.score}%
                      </p>
                    </div>

                    <Moon className="size-8 text-secondary" />
                  </div>

                  <Progress
                    value={sleep.score}
                    className="mt-4"
                  />

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {sleep.message}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="text-xl font-black">
                  Nearby events
                </CardTitle>

                <CardDescription>
                  Ways to move with other people.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-3 px-6 pb-6">
                {dashboardEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    className="rounded-2xl bg-background p-4 text-left transition hover:-translate-y-0.5"
                  >
                    <p className="font-semibold">
                      {event.title}
                    </p>

                    <div className="mt-2 grid gap-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="size-3.5" />
                        {event.place}
                      </span>

                      <span className="flex items-center gap-2">
                        <CalendarDays className="size-3.5" />
                        {event.date}
                      </span>
                    </div>
                  </button>
                ))}

                <Button
                  type="button"
                  variant="ghost"
                  className="mt-1 rounded-full"
                  onClick={() =>
                    toast(
                      "Discover page is coming next."
                    )
                  }
                >
                  View all events
                  <ChevronRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}