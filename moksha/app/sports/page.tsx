"use client";

import * as React from "react";
import Image from "next/image";

import {
  BookOpen,
  CalendarDays,
  Check,
  Dumbbell,
  MapPin,
  MessageCircle,
  Share2,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import {
  dummyUser,
  type MokshaUser,
} from "@/data/dummy-user";
import {
  learningLevels,
  sportPrograms,
} from "@/data/sports";
import type {
  LearningLevel,
} from "@/lib/types/sports";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SportsPage() {
  const [user, setUser] =
    React.useState<MokshaUser | null>(null);

  const [selectedSport, setSelectedSport] =
    React.useState("Basketball");

  const [selectedLevel, setSelectedLevel] =
    React.useState<LearningLevel>("Beginner");

  const [joinedGames, setJoinedGames] =
    React.useState<string[]>([]);

  React.useEffect(() => {
    const storedUser =
      window.localStorage.getItem("moksha-user");

    if (storedUser) {
      try {
        setUser({
          ...dummyUser,
          ...JSON.parse(storedUser),
        });
      } catch {
        setUser(dummyUser);
      }
    } else {
      setUser(dummyUser);
    }

    const storedGames =
      window.localStorage.getItem(
        "moksha-sports-games"
      );

    if (storedGames) {
      try {
        setJoinedGames(JSON.parse(storedGames));
      } catch {
        setJoinedGames([]);
      }
    }
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <Skeleton className="h-20 rounded-3xl" />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-[650px] rounded-[2rem]" />
            <Skeleton className="h-[650px] rounded-[2rem]" />
            <Skeleton className="h-[650px] rounded-[2rem]" />
          </div>
        </div>
      </main>
    );
  }

  const program = sportPrograms[selectedSport];
  const levelProgram =
    program.levels[selectedLevel];

  function toggleGame(gameId: string) {
    setJoinedGames((current) => {
      const joined = current.includes(gameId);

      const next = joined
        ? current.filter((id) => id !== gameId)
        : [...current, gameId];

      window.localStorage.setItem(
        "moksha-sports-games",
        JSON.stringify(next)
      );

      toast.success(
        joined
          ? "You left the game."
          : "You joined the game."
      );

      return next;
    });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppNavbar user={user} />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Badge
              variant="secondary"
              className="rounded-full"
            >
              Learn and play
            </Badge>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Understand the sport.
              <br />
              Then enter the game.
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Learn rules, follow a routine, meet
              coaches and find people ready to play.
            </p>
          </div>

          <Card className="rounded-[2rem] border-border bg-card shadow-sm">
            <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  Sport
                </span>

                <select
                  value={selectedSport}
                  onChange={(event) =>
                    setSelectedSport(event.target.value)
                  }
                  className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none"
                >
                  {Object.keys(sportPrograms).map(
                    (sport) => (
                      <option
                        key={sport}
                        value={sport}
                      >
                        {sport}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  Learning level
                </span>

                <select
                  value={selectedLevel}
                  onChange={(event) =>
                    setSelectedLevel(
                      event.target.value as LearningLevel
                    )
                  }
                  className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none"
                >
                  {learningLevels.map((level) => (
                    <option
                      key={level}
                      value={level}
                    >
                      {level}
                    </option>
                  ))}
                </select>
              </label>
            </CardContent>
          </Card>
        </header>

        <Card className="relative mt-7 overflow-hidden rounded-[2rem] border-border bg-card shadow-sm">
          <div className="absolute inset-0">
            <Image
              src={program.image}
              alt={program.sport}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-20"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/55" />
          </div>

          <CardContent className="relative p-7 sm:p-9">
            <Badge variant="outline">
              {selectedLevel}
            </Badge>

            <h2 className="mt-4 text-3xl font-black">
              {program.sport}
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              {levelProgram.summary}
            </p>
          </CardContent>
        </Card>

        <section className="mt-6 grid items-start gap-6 xl:grid-cols-[1.05fr_0.82fr_1fr]">
          {/* Left */}
          <div className="grid gap-6">
            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-7 pb-4 pt-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl font-black">
                      <Dumbbell className="size-5" />
                      Improvement routine
                    </CardTitle>

                    <CardDescription className="mt-2">
                      Adapted to your selected level.
                    </CardDescription>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() =>
                      toast(
                        "Routine copied to your profile."
                      )
                    }
                  >
                    <Share2 className="size-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="px-7 pb-7">
                <ScrollArea className="h-[430px] pr-4">
                  <div className="grid gap-3">
                    {levelProgram.routine.map(
                      (step, index) => (
                        <div
                          key={step.id}
                          className="flex gap-4 rounded-2xl bg-background p-5"
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary font-black text-secondary-foreground">
                            {index + 1}
                          </span>

                          <div>
                            <h3 className="font-bold">
                              {step.title}
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                              {step.details}
                            </p>

                            <Badge
                              variant="outline"
                              className="mt-3"
                            >
                              {step.duration}
                            </Badge>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* People looking to play */}
            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-7 pb-4 pt-7">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <Users className="size-5" />
                  People looking to play
                </CardTitle>

                <CardDescription>
                  Open games and groups near you.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-3 px-7 pb-7">
                {program.openGames.map((game) => {
                  const joined =
                    joinedGames.includes(game.id);

                  return (
                    <div
                      key={game.id}
                      className="rounded-2xl bg-background p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold">
                            {game.title}
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Hosted by {game.host}
                          </p>
                        </div>

                        <Badge variant="secondary">
                          {game.level}
                        </Badge>
                      </div>

                      <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <CalendarDays className="size-4" />
                          {game.schedule}
                        </span>

                        <span className="flex items-center gap-2">
                          <MapPin className="size-4" />
                          {game.location}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {game.players.map((player) => (
                          <span
                            key={player}
                            className="rounded-full bg-card px-2.5 py-1 text-xs"
                          >
                            {player}
                          </span>
                        ))}
                      </div>

                      <Button
                        type="button"
                        variant={
                          joined ? "outline" : "default"
                        }
                        className="mt-5 w-full rounded-full"
                        onClick={() =>
                          toggleGame(game.id)
                        }
                      >
                        {joined
                          ? "Leave game"
                          : `Join · ${game.spots} spots`}
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Center */}
          <div className="grid gap-6">
            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <BookOpen className="size-5" />
                  Rules of the game
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-3 px-6 pb-6">
                {program.rules.map((rule) => (
                  <div
                    key={rule.title}
                    className="rounded-2xl bg-background p-4"
                  >
                    <h3 className="font-bold">
                      {rule.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {rule.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <Trophy className="size-5" />
                  Your team
                </CardTitle>

                <CardDescription>
                  {program.team.name}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <p className="text-sm leading-6 text-muted-foreground">
                  {program.team.description}
                </p>

                <Separator className="my-5" />

                <div className="grid gap-3">
                  {program.team.members.map(
                    (member) => (
                      <div
                        key={member.handle}
                        className="flex items-center gap-3 rounded-2xl bg-background p-3"
                      >
                        <Avatar>
                          <AvatarImage
                            src={member.avatar}
                            alt={member.name}
                          />

                          <AvatarFallback>
                            {member.name[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-semibold">
                            {member.name}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {member.handle} ·{" "}
                            {member.role}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Weekly challenge */}
            <Card className="relative overflow-hidden rounded-[2rem] border-none bg-primary text-primary-foreground shadow-sm">
              <div className="absolute -bottom-12 -right-12 size-40 rounded-full border-[24px] border-white/10" />

              <CardContent className="relative p-7">
                <Sparkles className="size-6" />

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
                  Weekly challenge
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  {program.challenge.title}
                </h2>

                <p className="mt-3 leading-7 opacity-75">
                  {program.challenge.description}
                </p>

                <Badge className="mt-5 bg-white/15 text-white">
                  {program.challenge.reward}
                </Badge>

                <Button
                  type="button"
                  variant="secondary"
                  className="mt-6 w-full rounded-full"
                  onClick={() =>
                    toast.success(
                      "Challenge added to your week."
                    )
                  }
                >
                  Accept challenge
                  <Check className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right */}
          <div className="grid gap-6">
            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <MapPin className="size-5" />
                  Nearby places
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-3 px-6 pb-6">
                {program.courts.map((court) => (
                  <button
                    key={court.id}
                    type="button"
                    className="overflow-hidden rounded-2xl bg-background text-left"
                    onClick={() =>
                      toast(`Opening ${court.name}`)
                    }
                  >
                    <div className="relative h-28">
                      <Image
                        src={court.image}
                        alt={court.name}
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold">
                        {court.name}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {court.address} ·{" "}
                        {court.distance}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {court.schedule}
                      </p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <MessageCircle className="size-5" />
                  Coaches and volunteers
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-3 px-6 pb-6">
                {program.coaches.map((coach) => (
                  <div
                    key={coach.id}
                    className="rounded-2xl bg-background p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={coach.avatar}
                          alt={coach.name}
                        />

                        <AvatarFallback>
                          {coach.name[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-bold">
                          {coach.name}
                        </p>

                        <Badge
                          variant="secondary"
                          className="mt-1"
                        >
                          {coach.kind}
                        </Badge>
                      </div>
                    </div>

                    <p className="mt-4 text-sm font-semibold">
                      {coach.specialty}
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {coach.schedule}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {coach.location}
                    </p>

                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4 w-full rounded-full"
                      onClick={() =>
                        toast(
                          `Contact: ${coach.contact}`
                        )
                      }
                    >
                      Contact
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <Dumbbell className="size-5" />
                  Guided training
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-3 px-6 pb-6">
                {program.trainings.map((training) => (
                  <div
                    key={training.id}
                    className="rounded-2xl bg-background p-4"
                  >
                    <h3 className="font-bold">
                      {training.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {training.instructor}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {training.schedule}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {training.location}
                    </p>

                    <Button
                      type="button"
                      className="mt-4 w-full rounded-full"
                      onClick={() =>
                        toast.success(
                          `Joined ${training.title}.`
                        )
                      }
                    >
                      Join · {training.spots} spots
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}