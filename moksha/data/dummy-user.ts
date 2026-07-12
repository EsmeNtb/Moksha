export type MokshaPurpose =
  | "active"
  | "community"
  | "learn"
  | "improve"
  | "compete";

export type MokshaConfidence =
  | "starting"
  | "building"
  | "comfortable"
  | "competitive";

export type MokshaUser = {
  username: string;
  nickname: string;
  age: number;
  purpose: MokshaPurpose;
  sports: string[];
  confidence: MokshaConfidence;
  avatar: string;
  onboardingComplete: boolean;
  pronouns?: string;
  createdAt?: string;
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
  pronouns: "she/her",
};

export default dummyUser;