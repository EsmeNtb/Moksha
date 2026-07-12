import type {
  Routine,
  WeeklyStatistic,
} from "@/lib/types/training";

export const routines: Routine[] = [
  {
    id: "routine-monday",
    name: "Lower Body Foundation",
    focus: "Strength and stability",
    duration: "45 minutes",
    weekday: 1,
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
    ],
  },
];

export const weeklyStatistics: WeeklyStatistic[] = [
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
];

export const planTemplates: Record<number, number[]> = {
  1: [3],
  2: [2, 5],
  3: [1, 3, 5],
  4: [1, 3, 5, 6],
  5: [1, 2, 4, 5, 6],
  6: [1, 2, 3, 4, 5, 6],
};