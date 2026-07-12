export type Exercise = {
  id: string;
  title: string;
  details: string;
  completed?: boolean;
};

export type Routine = {
  id: string;
  name: string;
  focus: string;
  duration: string;
  weekday: number;
  exercises: Exercise[];
};

export type WeeklyStatistic = {
  day: string;
  activity: number;
  calories: number;
  sleep: number;
};

export type TrainingPlan = {
  id: string;
  userId: string;
  daysPerWeek: number;
  plannedWeekdays: number[];
  routines: Routine[];
};