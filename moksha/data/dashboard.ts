export type TrainingTask = {
  id: string;
  title: string;
  category: string;
  duration: string;
  completed: boolean;
};

export const initialTrainingTasks: TrainingTask[] = [
  {
    id: "training-1",
    title: "Mobility warm-up",
    category: "Recovery",
    duration: "10 min",
    completed: true,
  },
  {
    id: "training-2",
    title: "Lower-body strength circuit",
    category: "Strength",
    duration: "30 min",
    completed: false,
  },
  {
    id: "training-3",
    title: "Easy running session",
    category: "Cardio",
    duration: "25 min",
    completed: false,
  },
  {
    id: "training-4",
    title: "Post-training stretch",
    category: "Recovery",
    duration: "12 min",
    completed: false,
  },
  {
    id: "training-5",
    title: "Hydration and recovery check",
    category: "Wellness",
    duration: "5 min",
    completed: false,
  },
];

export const dashboardEvents = [
  {
    id: "event-1",
    title: "Beginner Basketball Meetup",
    place: "Parque México",
    date: "Saturday · 10:00 AM",
  },
  {
    id: "event-2",
    title: "Community Morning Run",
    place: "Chapultepec",
    date: "Sunday · 7:30 AM",
  },
  {
    id: "event-3",
    title: "Open Tennis Practice",
    place: "Deportivo Oceanía",
    date: "Wednesday · 6:00 PM",
  },
];

export const tipsByPurpose: Record<
  string,
  {
    title: string;
    text: string;
  }
> = {
  active: {
    title: "Protect your rhythm",
    text: "A moderate session you repeat is more valuable than an exhausting session you abandon.",
  },
  community: {
    title: "Make consistency social",
    text: "Schedule one weekly activity with other people. Shared commitments are harder to quietly negotiate away.",
  },
  learn: {
    title: "Practice one skill at a time",
    text: "Choose a single movement to improve during each session instead of trying to master the entire sport at once.",
  },
  improve: {
    title: "Increase gradually",
    text: "Change only one variable each week: duration, repetitions, distance or resistance.",
  },
  compete: {
    title: "Recovery is part of training",
    text: "Competitive progress depends on sleep, rest and controlled intensity, not constant maximum effort.",
  },
};

export const motivationalQuote = {
  text: "You do not need to be extraordinary today. You only need to return.",
  author: "Moksha",
};
