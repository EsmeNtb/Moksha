import {
  planTemplates,
  routines,
  weeklyStatistics,
} from "@/data/training";

import type {
  Routine,
  TrainingPlan,
  WeeklyStatistic,
} from "@/lib/types/training";

export async function getTrainingPlan(
  userId: string
): Promise<TrainingPlan | null> {
  const storedDays =
    window.localStorage.getItem(
      "moksha-training-days"
    );

  if (!storedDays) {
    return null;
  }

  const daysPerWeek = Number(storedDays);

  return {
    id: "demo-plan",
    userId,
    daysPerWeek,
    plannedWeekdays:
      planTemplates[daysPerWeek] ?? [],
    routines,
  };
}

export async function createTrainingPlan(
  userId: string,
  daysPerWeek: number
): Promise<TrainingPlan> {
  window.localStorage.setItem(
    "moksha-training-days",
    String(daysPerWeek)
  );

  return {
    id: "demo-plan",
    userId,
    daysPerWeek,
    plannedWeekdays:
      planTemplates[daysPerWeek] ?? [],
    routines,
  };
}

export async function getWeeklyStatistics(): Promise<
  WeeklyStatistic[]
> {
  return weeklyStatistics;
}

export async function getRoutineByWeekday(
  weekday: number
): Promise<Routine | null> {
  return (
    routines.find(
      (routine) => routine.weekday === weekday
    ) ?? null
  );
}