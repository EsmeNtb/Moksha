"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Dumbbell,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { avatars } from "@/data/avatars";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const sportsOptions = [
  "Basketball",
  "Football",
  "Running",
  "Tennis",
  "Volleyball",
  "Baseball",
  "Cycling",
  "Swimming",
];

const purposeOptions = [
  {
    id: "active",
    title: "Stay active",
    description: "Build movement into my weekly routine.",
  },
  {
    id: "community",
    title: "Meet people",
    description: "Find others who enjoy the same sports.",
  },
  {
    id: "learn",
    title: "Learn a sport",
    description: "Start from the basics without feeling lost.",
  },
  {
    id: "improve",
    title: "Improve consistently",
    description: "Train, practice and follow my progress.",
  },
  {
    id: "compete",
    title: "Join tournaments",
    description: "Find teams, leagues and local competitions.",
  },
];

const confidenceOptions = [
  {
    id: "starting",
    title: "Just starting",
    description: "I am curious and want a friendly beginning.",
  },
  {
    id: "building",
    title: "Building confidence",
    description: "I know some basics and want more practice.",
  },
  {
    id: "comfortable",
    title: "Comfortable",
    description: "I play regularly and understand the sport.",
  },
  {
    id: "competitive",
    title: "Competitive",
    description: "I enjoy structured games and tournaments.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = React.useState(1);
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [age, setAge] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [sports, setSports] = React.useState<string[]>([]);
  const [confidence, setConfidence] = React.useState("");
  const [avatar, setAvatar] = React.useState("sunset");

  React.useEffect(() => {
    const storedUser = window.localStorage.getItem("moksha-user");

    if (!storedUser) {
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      if (typeof user.username === "string") {
        setName(user.username);
      }

      if (typeof user.nickname === "string") {
        setNickname(user.nickname);
      }

      if (typeof user.age === "number") {
        setAge(String(user.age));
      }
    } catch {
      toast.error("We could not load your saved profile.");
    }
  }, []);

  const progress = (step / 3) * 100;

  const initials = React.useMemo(() => {
    const source = nickname.trim() || name.trim() || "M";

    return source
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [name, nickname]);

  function toggleSport(sport: string) {
    setSports((currentSports) => {
      if (currentSports.includes(sport)) {
        return currentSports.filter((item) => item !== sport);
      }

      return [...currentSports, sport];
    });
  }

  function validateCurrentStep() {
    if (step === 1) {
      const numericAge = Number(age);

      if (name.trim().length < 2) {
        toast.error("Please enter your name.");
        return false;
      }

      if (nickname.trim().length < 2) {
        toast.error("Please enter a nickname.");
        return false;
      }

      if (
        !Number.isFinite(numericAge) ||
        numericAge < 13 ||
        numericAge > 100
      ) {
        toast.error("Please enter a valid age.");
        return false;
      }
    }

    if (step === 2) {
      if (!purpose) {
        toast.error("Choose your main purpose.");
        return false;
      }

      if (sports.length === 0) {
        toast.error("Choose at least one sport.");
        return false;
      }
    }

    if (step === 3 && !confidence) {
      toast.error("Choose your confidence level.");
      return false;
    }

    return true;
  }

  function goNext() {
    if (!validateCurrentStep()) {
      return;
    }

    setStep((currentStep) =>
      Math.min(currentStep + 1, 3)
    );
  }

  function goBack() {
    setStep((currentStep) =>
      Math.max(currentStep - 1, 1)
    );
  }

  function finishOnboarding() {
    if (!validateCurrentStep()) {
      return;
    }

    const storedUser = window.localStorage.getItem("moksha-user");

    let existingUser = {};

    if (storedUser) {
      try {
        existingUser = JSON.parse(storedUser);
      } catch {
        existingUser = {};
      }
    }

    const completedUser = {
      ...existingUser,
      username: name.trim(),
      nickname: nickname.trim(),
      age: Number(age),
      purpose,
      sports,
      confidence,
      avatar,
      onboardingComplete: true,
      createdAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      "moksha-user",
      JSON.stringify(completedUser)
    );

    window.localStorage.setItem(
      "moksha-session",
      "active"
    );

    toast.success("Your Moksha profile is ready.");

    router.push("/profile");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Dumbbell className="size-5" />
            </div>

            <div>
              <p className="font-black tracking-[0.16em]">
                MOKSHA
              </p>
              <p className="text-xs text-muted-foreground">
                Move together.
              </p>
            </div>
          </button>

          <ThemeToggle />
        </header>

            <section className="grid flex-1 items-start gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr]">
                <aside className="relative hidden min-h-[620px] overflow-hidden rounded-[2.5rem] bg-[#13213c] p-10 text-white lg:sticky lg:top-8 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-20 -top-20 size-72 rounded-full border-[46px] border-white/10" />
            <div className="absolute -bottom-24 -left-20 size-80 rounded-full border-[48px] border-[#fba311]/20" />

            <div className="relative z-10">
              <Badge className="border-white/15 bg-white/10 text-white">
                Your sports identity
              </Badge>

              <h1 className="mt-7 max-w-sm text-5xl font-black leading-[0.98] tracking-[-0.045em]">
                Make Moksha feel like your place.
              </h1>

              <p className="mt-6 max-w-sm leading-7 text-white/70">
                Tell us what moves you, where you want to improve
                and how you want to participate.
              </p>
            </div>

            <div className="relative z-10 grid gap-4">
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                <UserRound className="size-5" />
                <p className="text-sm">
                  A profile built around your interests.
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                <Trophy className="size-5" />
                <p className="text-sm">
                  Events, tournaments and communities for your level.
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                <Sparkles className="size-5" />
                <p className="text-sm">
                  A starting point that grows with you.
                </p>
              </div>
            </div>
          </aside>

          <Card className="rounded-[2.25rem] border-border bg-card shadow-lg">
            <CardHeader className="p-7 pb-4 sm:p-9 sm:pb-5">
              <div className="mb-5 flex items-center justify-between">
                <Badge variant="secondary">
                  Step {step} of 3
                </Badge>

                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>

              <Progress value={progress} className="mb-7" />

              <CardTitle className="text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                {step === 1 && "Let’s begin with you."}
                {step === 2 && "What brings you here?"}
                {step === 3 && "Choose your Moksha identity."}
              </CardTitle>

              <CardDescription className="max-w-xl text-base leading-7">
                {step === 1 &&
                  "Add the details people will see when you join activities."}

                {step === 2 &&
                  "Select your main goal and the sports you want to explore."}

                {step === 3 &&
                  "Pick your confidence level and a temporary avatar."}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-7 pt-3 sm:p-9 sm:pt-4">
              {step === 1 && (
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full name
                    </Label>

                    <Input
                      id="name"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Your name"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nickname">
                      Nickname
                    </Label>

                    <Input
                      id="nickname"
                      value={nickname}
                      onChange={(event) =>
                        setNickname(event.target.value)
                      }
                      placeholder="How should the community call you?"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">
                      Age
                    </Label>

                    <Input
                      id="age"
                      type="number"
                      min="13"
                      max="100"
                      value={age}
                      onChange={(event) =>
                        setAge(event.target.value)
                      }
                      placeholder="Your age"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-8">
                    <div>
                    <Label className="mb-3 block">
                        Main purpose
                    </Label>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {purposeOptions.map((option) => {
                        const selected = purpose === option.id;

                        return (
                            <button
                            key={option.id}
                            type="button"
                            onClick={() => setPurpose(option.id)}
                            className={`rounded-2xl border p-4 text-left transition ${
                                option.id === "compete" ? "sm:col-span-2" : ""
                            } ${
                                selected
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background hover:border-primary/50"
                            }`}
                            >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                <p className="font-semibold">
                                    {option.title}
                                </p>

                                <p
                                    className={`mt-1 text-sm leading-6 ${
                                    selected
                                        ? "text-primary-foreground/75"
                                        : "text-muted-foreground"
                                    }`}
                                >
                                    {option.description}
                                </p>
                                </div>

                                {selected && (
                                <Check className="mt-1 size-4 shrink-0" />
                                )}
                            </div>
                            </button>
                        );
                        })}
                    </div>
                    </div>

                    <div>
                    <Label className="mb-3 block">
                        Sports interests
                    </Label>

                    <div className="flex flex-wrap gap-2">
                        {sportsOptions.map((sport) => {
                        const selected = sports.includes(sport);

                        return (
                            <Button
                            key={sport}
                            type="button"
                            variant={selected ? "default" : "outline"}
                            onClick={() => toggleSport(sport)}
                            className="rounded-full"
                            >
                            {selected && (
                                <Check className="mr-2 size-4" />
                            )}

                            {sport}
                            </Button>
                        );
                        })}
                    </div>
                    </div>
                </div>
                )}

              {step === 3 && (
                <div className="grid gap-8">
                  <div>
                    <Label className="mb-3 block">
                      Confidence level
                    </Label>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {confidenceOptions.map((option) => {
                        const selected =
                          confidence === option.id;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                              setConfidence(option.id)
                            }
                            className={`rounded-2xl border p-4 text-left transition ${
                              selected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background hover:border-primary/50"
                            }`}
                          >
                            <p className="font-semibold">
                              {option.title}
                            </p>

                            <p
                              className={`mt-1 text-sm leading-6 ${
                                selected
                                  ? "text-primary-foreground/75"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {option.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-4 block">
                      Choose an avatar
                    </Label>

                    <div className="flex flex-wrap gap-4">
                      {avatars.map((option) => {
                        const selected =
                          avatar === option.id;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setAvatar(option.id)}
                            className={`relative rounded-full transition hover:scale-105 ${
                                selected
                                ? "ring-4 ring-primary ring-offset-4 ring-offset-background"
                                : ""
                            }`}
                            aria-label={`Choose ${option.name} avatar`}
                            >
                            <Avatar className="size-20 border-2 border-border bg-background shadow-md">
                                <AvatarImage
                                src={option.src}
                                alt={`${option.name} avatar`}
                                className="object-cover"
                                />

                                <AvatarFallback className="font-bold">
                                {initials}
                                </AvatarFallback>
                            </Avatar>

                            {selected && (
                                <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                                <Check className="size-4" />
                                </span>
                            )}
                            </button>
                        );
                      })}
                    </div>

                    <p className="mt-4 text-sm text-muted-foreground">
                      You can replace this avatar with a profile
                      photo later.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-9 flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  disabled={step === 1}
                  className="rounded-full"
                >
                  <ArrowLeft className="mr-2 size-4" />
                  Back
                </Button>

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={goNext}
                    className="rounded-full"
                  >
                    Continue
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={finishOnboarding}
                    className="rounded-full"
                  >
                    Finish profile
                    <Check className="ml-2 size-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}