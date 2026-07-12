"use client";

import * as React from "react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  Check,
  Circle,
  Clock3,
  Dumbbell,
  Flame,
  Minus,
  Moon,
  Pencil,
  Plus,
  Share2,
  Target,
} from "lucide-react";
import { toast } from "sonner";

import {
  dummyUser,
  type MokshaUser,
} from "@/data/dummy-user";
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
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type Exercise = {
  id: string;
  title: string;
  details: string;
};

type Routine = {
  name: string;
  focus: string;
  duration: string;
  exercises: Exercise[];
};

type StatisticsMetric =
  | "activity"
  | "calories"
  | "sleep";

const routinesByWeekday: Record<number, Routine> = {
  1: {
    name: "Lower Body Foundation",
    focus: "Strength and stability",
    duration: "45 minutes",
    exercises: [
      {
        id: "monday-1",
        title: "Mobility warm-up",
        details: "8 minutes · hips and ankles",
      },
      {
        id: "monday-2",
        title: "Goblet squats",
        details: "4 sets · 10 repetitions",
      },
      {
        id: "monday-3",
        title: "Romanian deadlifts",
        details: "3 sets · 12 repetitions",
      },
      {
        id: "monday-4",
        title: "Reverse lunges",
        details: "3 sets · 10 each side",
      },
      {
        id: "monday-5",
        title: "Calf raises",
        details: "3 sets · 15 repetitions",
      },
      {
        id: "monday-6",
        title: "Lower-body stretch",
        details: "6 minutes",
      },
    ],
  },

  2: {
    name: "Cardio Base",
    focus: "Endurance and cardiovascular health",
    duration: "35 minutes",
    exercises: [
      {
        id: "tuesday-1",
        title: "Dynamic warm-up",
        details: "5 minutes",
      },
      {
        id: "tuesday-2",
        title: "Easy run",
        details: "20 minutes · conversational pace",
      },
      {
        id: "tuesday-3",
        title: "Short accelerations",
        details: "5 rounds · 20 seconds",
      },
      {
        id: "tuesday-4",
        title: "Walking recovery",
        details: "5 minutes",
      },
    ],
  },

  3: {
    name: "Upper Body + Core",
    focus: "Strength and posture",
    duration: "50 minutes",
    exercises: [
      {
        id: "wednesday-1",
        title: "Shoulder mobility",
        details: "7 minutes",
      },
      {
        id: "wednesday-2",
        title: "Push-ups",
        details: "4 sets · 8 to 12 repetitions",
      },
      {
        id: "wednesday-3",
        title: "Single-arm rows",
        details: "4 sets · 10 each side",
      },
      {
        id: "wednesday-4",
        title: "Shoulder press",
        details: "3 sets · 10 repetitions",
      },
      {
        id: "wednesday-5",
        title: "Plank variations",
        details: "3 rounds · 40 seconds",
      },
    ],
  },

  4: {
    name: "Mobility Reset",
    focus: "Recovery and flexibility",
    duration: "30 minutes",
    exercises: [
      {
        id: "thursday-1",
        title: "Breathing reset",
        details: "4 minutes",
      },
      {
        id: "thursday-2",
        title: "Hip mobility flow",
        details: "8 minutes",
      },
      {
        id: "thursday-3",
        title: "Thoracic rotation",
        details: "3 sets · 8 each side",
      },
      {
        id: "thursday-4",
        title: "Full-body stretch",
        details: "12 minutes",
      },
    ],
  },

  5: {
    name: "Full Body Circuit",
    focus: "Strength and conditioning",
    duration: "45 minutes",
    exercises: [
      {
        id: "friday-1",
        title: "Dynamic warm-up",
        details: "7 minutes",
      },
      {
        id: "friday-2",
        title: "Squat to press",
        details: "4 rounds · 10 repetitions",
      },
      {
        id: "friday-3",
        title: "Mountain climbers",
        details: "4 rounds · 30 seconds",
      },
      {
        id: "friday-4",
        title: "Walking lunges",
        details: "3 rounds · 12 each side",
      },
      {
        id: "friday-5",
        title: "Core finisher",
        details: "6 minutes",
      },
    ],
  },

  6: {
    name: "Outdoor Training",
    focus: "Movement and recreation",
    duration: "60 minutes",
    exercises: [
      {
        id: "saturday-1",
        title: "Warm-up walk",
        details: "10 minutes",
      },
      {
        id: "saturday-2",
        title: "Outdoor sport or run",
        details: "35 minutes",
      },
      {
        id: "saturday-3",
        title: "Light technique practice",
        details: "10 minutes",
      },
      {
        id: "saturday-4",
        title: "Recovery stretch",
        details: "5 minutes",
      },
    ],
  },
};

const planTemplates: Record<number, number[]> = {
  1: [3],
  2: [2, 5],
  3: [1, 3, 5],
  4: [1, 3, 5, 6],
  5: [1, 2, 4, 5, 6],
  6: [1, 2, 3, 4, 5, 6],
};

const weeklyStatistics = [
  {
    day: "Mon",
    activity: 82,
    calories: 470,
    sleep: 7.5,
  },
  {
    day: "Tue",
    activity: 38,
    calories: 220,
    sleep: 6.5,
  },
  {
    day: "Wed",
    activity: 94,
    calories: 540,
    sleep: 8,
  },
  {
    day: "Thu",
    activity: 48,
    calories: 260,
    sleep: 7,
  },
  {
    day: "Fri",
    activity: 88,
    calories: 510,
    sleep: 7.8,
  },
  {
    day: "Sat",
    activity: 72,
    calories: 430,
    sleep: 8.4,
  },
  {
    day: "Sun",
    activity: 24,
    calories: 150,
    sleep: 8,
  },
];

export default function TrainingPage() {
  const [user, setUser] =
    React.useState<MokshaUser | null>(null);

  const [hydrated, setHydrated] =
    React.useState(false);

  const [selectedDate, setSelectedDate] =
    React.useState<Date | undefined>(new Date());

  const [daysPerWeek, setDaysPerWeek] =
    React.useState<number | null>(null);

  const [completedExercises, setCompletedExercises] =
    React.useState<string[]>([]);

  const [statisticsMetric, setStatisticsMetric] =
    React.useState<StatisticsMetric>("activity");

  const [caloriesConsumed, setCaloriesConsumed] =
    React.useState(1850);

  const [sleepHours, setSleepHours] =
    React.useState(7.5);

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

    const storedDays =
      window.localStorage.getItem(
        "moksha-training-days"
      );

    if (storedDays) {
      const parsedDays = Number(storedDays);

      if (
        Number.isInteger(parsedDays) &&
        parsedDays >= 1 &&
        parsedDays <= 6
      ) {
        setDaysPerWeek(parsedDays);
      }
    }

    setHydrated(true);
  }, []);

  function createWeeklyPlan(days: number) {
    setDaysPerWeek(days);

    window.localStorage.setItem(
      "moksha-training-days",
      String(days)
    );

    toast.success(
      `${days}-day weekly plan created.`
    );
  }

  function resetWeeklyPlan() {
    window.localStorage.removeItem(
      "moksha-training-days"
    );

    setDaysPerWeek(null);
    setCompletedExercises([]);
  }

  function toggleExercise(exerciseId: string) {
    setCompletedExercises((current) => {
      if (current.includes(exerciseId)) {
        return current.filter(
          (id) => id !== exerciseId
        );
      }

      return [...current, exerciseId];
    });
  }

  async function shareRoutine(routine: Routine) {
    const routineText = [
      `${routine.name} · ${routine.duration}`,
      "",
      ...routine.exercises.map(
        (exercise) =>
          `• ${exercise.title}: ${exercise.details}`
      ),
      "",
      "Shared from Moksha.",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(
        routineText
      );

      toast.success(
        "Routine copied to your clipboard."
      );
    } catch {
      toast(
        "Routine sharing is unavailable in this browser."
      );
    }
  }

  if (!hydrated || !user) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <Skeleton className="h-20 rounded-3xl" />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-[620px] rounded-[2rem]" />
            <Skeleton className="h-[620px] rounded-[2rem]" />
            <Skeleton className="h-[620px] rounded-[2rem]" />
          </div>
        </div>
      </main>
    );
  }

  if (daysPerWeek === null) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <AppNavbar user={user} />

        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl items-center px-5 py-10 sm:px-8">
          <Card className="relative w-full overflow-hidden rounded-[2.5rem] border-border bg-card shadow-lg">
            <div className="absolute -right-20 -top-20 size-72 rounded-full border-[44px] border-secondary/15" />

            <CardContent className="relative p-8 sm:p-12">
              <Badge
                variant="secondary"
                className="rounded-full"
              >
                Create your training rhythm
              </Badge>

              <h1 className="mt-6 max-w-2xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">
                How many days can you realistically
                train each week?
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                Choose a rhythm you can repeat.
                Moksha will mark your weekly goal when
                you complete the selected number of
                training days.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(
                  (days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() =>
                        createWeeklyPlan(days)
                      }
                      className="rounded-2xl border border-border bg-background p-5 text-left transition hover:-translate-y-1 hover:border-secondary"
                    >
                      <span className="text-3xl font-black">
                        {days}
                      </span>

                      <span className="mt-1 block text-sm text-muted-foreground">
                        {days === 1
                          ? "day per week"
                          : "days per week"}
                      </span>
                    </button>
                  )
                )}
              </div>

              <p className="mt-7 text-sm text-muted-foreground">
                You can change this later from the
                Training page.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const plannedWeekdays =
    planTemplates[daysPerWeek];

  const selectedWeekday =
    selectedDate?.getDay() ?? new Date().getDay();

  const isTrainingDay =
    plannedWeekdays.includes(selectedWeekday);

  const selectedRoutine = isTrainingDay
    ? routinesByWeekday[selectedWeekday]
    : null;

  const completedRoutineExercises =
    selectedRoutine
      ? selectedRoutine.exercises.filter(
          (exercise) =>
            completedExercises.includes(
              exercise.id
            )
        ).length
      : 0;

  const routineProgress = selectedRoutine
    ? Math.round(
        (completedRoutineExercises /
          selectedRoutine.exercises.length) *
          100
      )
    : 0;

  const completedWeeklyDays = Math.min(
    3,
    daysPerWeek
  );

  const weeklyGoalProgress = Math.round(
    (completedWeeklyDays / daysPerWeek) * 100
  );

  const caloriesTarget = 2200;

  const caloriesProgress = Math.min(
    100,
    Math.round(
      (caloriesConsumed / caloriesTarget) * 100
    )
  );

  const estimatedBurnedCalories =
    selectedRoutine
      ? 180 +
        completedRoutineExercises * 65
      : 110;

  const trainingLoad = Math.min(
    100,
    Math.max(
      20,
      Math.round(
        52 +
          completedRoutineExercises * 7 -
          Math.max(0, 7 - sleepHours) * 8
      )
    )
  );

  function getMetricHeight(
    item: (typeof weeklyStatistics)[number]
  ) {
    if (statisticsMetric === "activity") {
      return item.activity;
    }

    if (statisticsMetric === "calories") {
      return Math.round(
        (item.calories / 600) * 100
      );
    }

    return Math.round(
      (item.sleep / 9) * 100
    );
  }

  function getMetricLabel(
    item: (typeof weeklyStatistics)[number]
  ) {
    if (statisticsMetric === "activity") {
      return `${item.activity}%`;
    }

    if (statisticsMetric === "calories") {
      return `${item.calories}`;
    }

    return `${item.sleep}h`;
  }

  const selectedDateLabel =
    selectedDate?.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }) ?? "Today";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppNavbar user={user} />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div>
            <Badge
              variant="secondary"
              className="rounded-full"
            >
              Training room
            </Badge>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Build a rhythm you can keep.
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Plan routines, register recovery and
              watch your consistency grow.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={resetWeeklyPlan}
          >
            Change weekly days
          </Button>
        </header>

        <section className="grid items-start gap-6 xl:grid-cols-[0.9fr_1.35fr_0.9fr]">
          {/* Left column */}
          <div className="grid gap-6">
            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-2 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <CalendarDays className="size-5" />
                  Training calendar
                </CardTitle>

                <CardDescription>
                  Highlighted weekdays belong to your
                  current plan.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-4 pb-5">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={{
                    planned: (date) =>
                      plannedWeekdays.includes(
                        date.getDay()
                      ),
                  }}
                  modifiersClassNames={{
                    planned:
                      "border border-secondary/60 bg-secondary/10 font-bold",
                  }}
                  className="mx-auto w-full"
                />
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <Target className="size-5" />
                  Weekly goal
                </CardTitle>

                <CardDescription>
                  Complete your planned training days.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-black">
                      {completedWeeklyDays}/
                      {daysPerWeek}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      training days completed
                    </p>
                  </div>

                  <Badge
                    variant={
                      weeklyGoalProgress >= 100
                        ? "default"
                        : "secondary"
                    }
                  >
                    {weeklyGoalProgress}%
                  </Badge>
                </div>

                <Progress
                  value={weeklyGoalProgress}
                  className="mt-5"
                />

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {weeklyGoalProgress >= 100
                    ? "Weekly goal completed. Your rhythm survived the week."
                    : `${daysPerWeek - completedWeeklyDays} more training day${
                        daysPerWeek -
                          completedWeeklyDays ===
                        1
                          ? ""
                          : "s"
                      } to complete your goal.`}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <BarChart3 className="size-5" />
                  Weekly statistics
                </CardTitle>

                <CardDescription>
                  Compare activity, calories and sleep.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="mb-6 flex flex-wrap gap-2">
                  {(
                    [
                      "activity",
                      "calories",
                      "sleep",
                    ] as StatisticsMetric[]
                  ).map((metric) => (
                    <button
                      key={metric}
                      type="button"
                      onClick={() =>
                        setStatisticsMetric(metric)
                      }
                      className={`rounded-full border px-3 py-1.5 text-sm capitalize transition ${
                        statisticsMetric === metric
                          ? "border-secondary bg-secondary text-secondary-foreground"
                          : "border-border hover:bg-background"
                      }`}
                    >
                      {metric}
                    </button>
                  ))}
                </div>

                <div className="flex h-48 items-end gap-2">
                  {weeklyStatistics.map((item) => (
                    <div
                      key={item.day}
                      className="flex min-w-0 flex-1 flex-col items-center"
                    >
                      <span className="mb-2 text-[11px] text-muted-foreground">
                        {getMetricLabel(item)}
                      </span>

                      <div className="flex h-32 w-full items-end overflow-hidden rounded-xl bg-background">
                        <div
                          className="w-full rounded-xl bg-secondary transition-all duration-500"
                          style={{
                            height: `${Math.max(
                              8,
                              getMetricHeight(item)
                            )}%`,
                          }}
                        />
                      </div>

                      <span className="mt-2 text-xs font-semibold">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center routine */}
          <Card className="min-h-[860px] rounded-[2rem] border-border bg-card shadow-sm">
            <CardHeader className="px-7 pb-4 pt-7 sm:px-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Badge
                    variant="outline"
                    className="rounded-full"
                  >
                    {selectedDateLabel}
                  </Badge>

                  <CardTitle className="mt-4 text-3xl font-black tracking-[-0.035em]">
                    {selectedRoutine
                      ? selectedRoutine.name
                      : "Recovery day"}
                  </CardTitle>

                  <CardDescription className="mt-2">
                    {selectedRoutine
                      ? selectedRoutine.focus
                      : "No formal training is scheduled for this day."}
                  </CardDescription>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() =>
                      toast(
                        "Routine editor will open here."
                      )
                    }
                  >
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() =>
                      toast(
                        "A new routine can be created here."
                      )
                    }
                  >
                    <Plus className="mr-2 size-4" />
                    New
                  </Button>

                  {selectedRoutine && (
                    <Button
                      type="button"
                      size="sm"
                      className="rounded-full"
                      onClick={() =>
                        shareRoutine(
                          selectedRoutine
                        )
                      }
                    >
                      <Share2 className="mr-2 size-4" />
                      Share
                    </Button>
                  )}
                </div>
              </div>

              {selectedRoutine && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-background p-4">
                    <Clock3 className="size-5 text-secondary" />

                    <p className="mt-3 text-sm text-muted-foreground">
                      Duration
                    </p>

                    <p className="font-semibold">
                      {selectedRoutine.duration}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-background p-4">
                    <Dumbbell className="size-5 text-secondary" />

                    <p className="mt-3 text-sm text-muted-foreground">
                      Exercises
                    </p>

                    <p className="font-semibold">
                      {
                        selectedRoutine.exercises
                          .length
                      }{" "}
                      movements
                    </p>
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent className="px-7 pb-8 sm:px-8">
              {selectedRoutine ? (
                <>
                  <div className="mb-6">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-semibold">
                        Routine progress
                      </p>

                      <span className="text-sm text-muted-foreground">
                        {completedRoutineExercises}/
                        {
                          selectedRoutine.exercises
                            .length
                        }
                      </span>
                    </div>

                    <Progress value={routineProgress} />
                  </div>

                  <Separator className="mb-6" />

                  <ScrollArea className="h-[570px] pr-4">
                    <div className="grid gap-3">
                      {selectedRoutine.exercises.map(
                        (exercise, index) => {
                          const completed =
                            completedExercises.includes(
                              exercise.id
                            );

                          return (
                            <button
                              key={exercise.id}
                              type="button"
                              onClick={() =>
                                toggleExercise(
                                  exercise.id
                                )
                              }
                              className="flex w-full items-start gap-4 rounded-2xl bg-background p-5 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
                            >
                              <span
                                className={`flex size-9 shrink-0 items-center justify-center rounded-full border ${
                                  completed
                                    ? "border-secondary bg-secondary text-secondary-foreground"
                                    : "border-border"
                                }`}
                              >
                                {completed ? (
                                  <Check className="size-4" />
                                ) : (
                                  <span className="text-sm font-bold">
                                    {index + 1}
                                  </span>
                                )}
                              </span>

                              <span className="min-w-0 flex-1">
                                <span
                                  className={`block font-semibold ${
                                    completed
                                      ? "line-through opacity-55"
                                      : ""
                                  }`}
                                >
                                  {exercise.title}
                                </span>

                                <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                                  {exercise.details}
                                </span>
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </ScrollArea>
                </>
              ) : (
                <div className="flex min-h-[560px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-border bg-background/50 p-8 text-center">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                    <Moon className="size-7" />
                  </div>

                  <h2 className="mt-6 text-2xl font-black">
                    Let your body absorb the work.
                  </h2>

                  <p className="mt-3 max-w-md leading-7 text-muted-foreground">
                    Recovery days can include walking,
                    mobility or complete rest.
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-6 rounded-full"
                    onClick={() =>
                      toast(
                        "Create a routine for this day."
                      )
                    }
                  >
                    <Plus className="mr-2 size-4" />
                    Add optional routine
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right metrics */}
          <div className="grid gap-6">
            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <Target className="size-5" />
                  Calories consumed
                </CardTitle>

                <CardDescription>
                  Daily nutritional register.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-4xl font-black">
                      {caloriesConsumed}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      of {caloriesTarget} kcal
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() =>
                        setCaloriesConsumed(
                          (current) =>
                            Math.max(
                              0,
                              current - 100
                            )
                        )
                      }
                    >
                      <Minus className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      size="icon"
                      className="rounded-full"
                      onClick={() =>
                        setCaloriesConsumed(
                          (current) =>
                            current + 100
                        )
                      }
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>

                <Progress
                  value={caloriesProgress}
                  className="mt-5"
                />
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <Moon className="size-5" />
                  Sleep register
                </CardTitle>

                <CardDescription>
                  Recovery from last night.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-4xl font-black">
                      {sleepHours.toFixed(1)}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      hours slept
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() =>
                        setSleepHours((current) =>
                          Math.max(
                            0,
                            current - 0.5
                          )
                        )
                      }
                    >
                      <Minus className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      size="icon"
                      className="rounded-full"
                      onClick={() =>
                        setSleepHours((current) =>
                          Math.min(
                            14,
                            current + 0.5
                          )
                        )
                      }
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>

                <Progress
                  value={Math.min(
                    100,
                    (sleepHours / 8) * 100
                  )}
                  className="mt-5"
                />

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {sleepHours >= 7
                    ? "Your recorded sleep supports normal training."
                    : "Consider lowering intensity and prioritizing recovery."}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <Flame className="size-5" />
                  Estimated burn
                </CardTitle>

                <CardDescription>
                  Based on today’s completed routine.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <p className="text-4xl font-black">
                  {estimatedBurnedCalories}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  estimated kcal
                </p>

                <div className="mt-5 rounded-2xl bg-background p-4">
                  <p className="text-sm font-semibold">
                    {selectedRoutine
                      ? selectedRoutine.name
                      : "Recovery movement"}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {completedRoutineExercises} completed
                    exercises
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl font-black">
                  <Activity className="size-5" />
                  Training load
                </CardTitle>

                <CardDescription>
                  Exercise pressure relative to recovery.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-black">
                      {trainingLoad}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      of 100
                    </p>
                  </div>

                  <Badge variant="secondary">
                    {trainingLoad < 45
                      ? "Light"
                      : trainingLoad < 75
                        ? "Moderate"
                        : "High"}
                  </Badge>
                </div>

                <Progress
                  value={trainingLoad}
                  className="mt-5"
                />

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {trainingLoad >= 75
                    ? "High load detected. Protect your next recovery window."
                    : "Your current workload remains manageable."}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}