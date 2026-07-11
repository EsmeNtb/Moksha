"use client";
import Link from "next/link";
import {
  ArrowRight,
  Dumbbell,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";
import { toast } from "sonner";
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SportsPhotoCarousel } from "@/components/sports-photo-carousel";

const slides = [
  {
    eyebrow: "Discover",
    title: "Find somewhere to play.",
    description:
      "Explore nearby courts, parks, training sessions and open games.",
    icon: MapPin,
    background:
      "bg-gradient-to-br from-[#FBA311] via-[#13213C] to-black dark:from-[#FDBE4A] dark:via-[#F67F00] dark:to-[#002F49]",
  },
  {
    eyebrow: "Connect",
    title: "Meet people who move like you.",
    description:
      "Join local teams, beginner sessions and friendly community matches.",
    icon: Users,
    background:
      "bg-gradient-to-br from-[#E5E5E5] via-[#13213C] to-black dark:from-[#D62829] dark:via-[#F67F00] dark:to-[#002F49]",
  },
  {
    eyebrow: "Improve",
    title: "Turn intention into routine.",
    description:
      "Track participation, build consistency and discover new sports.",
    icon: Trophy,
    background:
      "bg-gradient-to-br from-[#FBA311] via-[#13213C] to-[#000000] dark:from-[#FDBE4A] dark:via-[#D62829] dark:to-[#002F49]",
  },
];

const benefits = [
  {
    title: "Find places",
    description: "Courts, parks and sports spaces near you.",
    icon: MapPin,
  },
  {
    title: "Join activities",
    description: "See the level, schedule and equipment needed.",
    icon: Users,
  },
  {
    title: "Keep improving",
    description: "Build a routine through real participation.",
    icon: Dumbbell,
  },
];

export default function HomePage() {
  const showPrototypeMessage = (action: string) => {
    toast(`${action} will be connected in the next step.`);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Dumbbell className="size-5" />
            </div>

            <div>
              <p className="text-lg font-black tracking-tight">
                MOSKHA
              </p>
              <p className="text-xs text-muted-foreground">
                Move together.
              </p>
            </div>
          </div>

          <ThemeToggle />
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <div className="min-w-0">
            <Carousel
              opts={{
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {slides.map((slide) => {
                  const Icon = slide.icon;

                  return (
                    <CarouselItem key={slide.title}>
                      <div
                        className={`relative flex min-h-[480px] overflow-hidden rounded-[2.5rem] p-8 text-white shadow-xl sm:min-h-[560px] sm:p-12 ${slide.background}`}
                      >
                        <div className="absolute -right-16 -top-16 size-64 rounded-full border-[38px] border-white/10" />
                        <div className="absolute -bottom-20 -left-16 size-72 rounded-full border-[44px] border-white/10" />

                        <div className="relative z-10 flex w-full flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <Badge className="border-white/20 bg-white/15 text-white backdrop-blur-md">
                              {slide.eyebrow}
                            </Badge>

                            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                              <Icon className="size-6" />
                            </div>
                          </div>

                          <div className="max-w-xl">
                            <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl">
                              {slide.title}
                            </h1>

                            <p className="mt-5 max-w-md text-base leading-7 text-white/80 sm:text-lg">
                              {slide.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious className="left-4 border-white/20 bg-black/20 text-white hover:bg-black/40 hover:text-white" />
              <CarouselNext className="right-4 border-white/20 bg-black/20 text-white hover:bg-black/40 hover:text-white" />
            </Carousel>
            <SportsPhotoCarousel />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="rounded-full px-6"
                asChild
              >
                <Link href="/auth?mode=login">
                  Log in
                </Link>
              </Button>

              <Button
                className="rounded-full px-6"
                asChild
              >
                <Link href="/auth?mode=signup">
                  Sign up
                </Link>
              </Button>
            </div>

            <Card className="rounded-[2rem] border-border bg-card shadow-sm">
              <CardHeader className="p-7 sm:p-8">
                <Badge
                  variant="secondary"
                  className="mb-3 w-fit rounded-full"
                >
                  Your local sports network
                </Badge>

                <CardTitle className="text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                  Sport becomes easier when you know where to begin.
                </CardTitle>

                <CardDescription className="max-w-xl text-base leading-7">
                  Find nearby activities, see what you need to bring and
                  join people playing at your level.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-7 pb-7 sm:px-8 sm:pb-8">
                <Button
                  size="lg"
                  className="h-12 w-full rounded-full sm:w-auto"
                  onClick={() => showPrototypeMessage("Explore activities")}
                >
                  Explore activities
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>

            <Card
              id="benefits"
              className="rounded-[2rem] border-border bg-card shadow-sm"
            >
              <CardHeader className="p-7 pb-3 sm:p-8 sm:pb-4">
                <CardTitle className="text-xl font-bold">
                  Why Moksha?
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-3 px-7 pb-7 sm:px-8 sm:pb-8">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div
                      key={benefit.title}
                      className="flex items-start gap-4 rounded-2xl bg-background/70 p-4 transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                        <Icon className="size-5" />
                      </div>

                      <div>
                        <h2 className="font-semibold">
                          {benefit.title}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}