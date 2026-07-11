"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dumbbell,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = React.useState<AuthMode>("signup");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("mode");

    if (requestedMode === "login" || requestedMode === "signup") {
      setMode(requestedMode);
    }
  }, []);

  function changeMode(nextMode: string) {
    const safeMode: AuthMode =
      nextMode === "login" ? "login" : "signup";

    setMode(safeMode);

    window.history.replaceState(
      null,
      "",
      `/auth?mode=${safeMode}`
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const cleanName = name.trim();

    if (cleanName.length < 2) {
      toast.error("Please enter a valid name.");
      return;
    }

    if (password.length < 4) {
      toast.error("Your password needs at least four characters.");
      return;
    }

    setIsSubmitting(true);

    /*
     * Prototype authentication:
     * We intentionally do not save the password.
     * Real authentication will be connected later.
     */

    const existingUserRaw =
      window.localStorage.getItem("openplay-user");

    if (mode === "signup") {
      const newUser = {
        username: cleanName,
        onboardingComplete: false,
        avatar: "sunset",
      };

      window.localStorage.setItem(
        "openplay-user",
        JSON.stringify(newUser)
      );

      window.localStorage.setItem(
        "openplay-session",
        "active"
      );

      toast.success("Welcome to OpenPlay.");

      router.push("/onboarding");
      return;
    }

    if (!existingUserRaw) {
      window.localStorage.setItem(
        "openplay-user",
        JSON.stringify({
          username: cleanName,
          onboardingComplete: false,
          avatar: "sunset",
        })
      );

      window.localStorage.setItem(
        "openplay-session",
        "active"
      );

      toast.success("Welcome back.");

      router.push("/onboarding");
      return;
    }

    const existingUser = JSON.parse(existingUserRaw);

    window.localStorage.setItem(
      "openplay-session",
      "active"
    );

    toast.success(`Welcome back, ${cleanName}.`);

    router.push(
      existingUser.onboardingComplete
        ? "/profile"
        : "/onboarding"
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#13213c]">
      {/* Video background */}
      <video
        className="auth-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/openplay-auth-poster.jpg"
        aria-hidden="true"
      >
        <source
          src="/videos/openplay-auth.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-black/55 dark:bg-[#002f49]/70" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Decorative frames */}
      <div className="pointer-events-none absolute inset-5 rounded-[2.5rem] border border-white/15 sm:inset-10" />

      <div className="pointer-events-none absolute inset-9 rounded-[2rem] border border-[#fdbe4a]/25 sm:inset-16" />

      {/* Theme control */}
      <div className="absolute right-6 top-6 z-20">
        <ThemeToggle />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-20">
        <Card className="w-full max-w-md rounded-[2rem] border-white/20 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#083b55]/90">
          <CardHeader className="items-center px-7 pb-4 pt-8 text-center sm:px-9">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#13213c] text-white shadow-lg dark:bg-[#fdbe4a] dark:text-[#002f49]">
              <Dumbbell className="size-6" />
            </div>

            <p className="text-sm font-black tracking-[0.18em]">
              OPENPLAY
            </p>

            <CardTitle className="mt-4 text-3xl font-black tracking-[-0.035em]">
              {mode === "signup"
                ? "Start moving together."
                : "Welcome back."}
            </CardTitle>

            <CardDescription className="max-w-sm leading-6">
              {mode === "signup"
                ? "Create your profile and discover people, places and sports near you."
                : "Return to your activities, teams and sports community."}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-7 pb-8 sm:px-9">
            <Tabs
              value={mode}
              onValueChange={changeMode}
              className="w-full"
            >
              <TabsList className="mb-6 grid w-full grid-cols-2 rounded-full">
                <TabsTrigger
                  value="signup"
                  className="rounded-full"
                >
                  Sign up
                </TabsTrigger>

                <TabsTrigger
                  value="login"
                  className="rounded-full"
                >
                  Log in
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="name">
                  {mode === "signup"
                    ? "Your name"
                    : "Name"}
                </Label>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder={
                      mode === "signup"
                        ? "How should we call you?"
                        : "Enter your name"
                    }
                    autoComplete="username"
                    className="h-12 rounded-xl pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password
                </Label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete={
                      mode === "signup"
                        ? "new-password"
                        : "current-password"
                    }
                    className="h-12 rounded-xl px-10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-12 w-full rounded-full"
              >
                {isSubmitting
                  ? "Opening OpenPlay..."
                  : mode === "signup"
                    ? "Create my profile"
                    : "Log in"}
              </Button>

              <p className="text-center text-xs leading-5 text-muted-foreground">
                Prototype mode: your password is not saved.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}