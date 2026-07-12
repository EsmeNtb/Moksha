export type MokshaUser = {
  username: string;
  nickname: string;
  age: number;
  purpose: string;
  sports: string[];
  confidence: string;
  avatar: string;
  onboardingComplete: boolean;
};

export const dummyUser: MokshaUser = {
  username: "Esme",
  nickname: "Ez",
  age: 23,
  purpose: "community",
  sports: [
    "Basketball",
    "Running",
    "Tennis",
  ],
  confidence: "building",
  avatar: "sunset",
  onboardingComplete: true,
};