export type LearningLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type RoutineStep = {
  id: string;
  title: string;
  details: string;
  duration: string;
};

export type SportRule = {
  title: string;
  description: string;
};

export type TeamMember = {
  name: string;
  handle: string;
  role: string;
  avatar: string;
};

export type SportTeam = {
  name: string;
  description: string;
  members: TeamMember[];
};

export type NearbyCourt = {
  id: string;
  name: string;
  address: string;
  distance: string;
  schedule: string;
  image: string;
};

export type Coach = {
  id: string;
  name: string;
  kind: "Coach" | "Volunteer";
  specialty: string;
  schedule: string;
  location: string;
  contact: string;
  avatar: string;
};

export type TrainingSession = {
  id: string;
  title: string;
  instructor: string;
  schedule: string;
  location: string;
  spots: number;
};

export type OpenGame = {
  id: string;
  title: string;
  host: string;
  level: string;
  schedule: string;
  location: string;
  players: string[];
  spots: number;
};

export type LevelProgram = {
  summary: string;
  routine: RoutineStep[];
};

export type SportProgram = {
  sport: string;
  description: string;
  image: string;
  levels: Record<LearningLevel, LevelProgram>;
  rules: SportRule[];
  team: SportTeam;
  courts: NearbyCourt[];
  coaches: Coach[];
  trainings: TrainingSession[];
  openGames: OpenGame[];
  challenge: {
    title: string;
    description: string;
    reward: string;
  };
};