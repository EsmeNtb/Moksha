"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sports = [
  {
    name: "Basketball",
    description: "Courts and open games",
    image: "/sports/basketball_1.jpg",
  },
  {
    name: "Basketball_hang_out",
    description: "Friendly community sessions",
    image: "/sports/basketball_2.jpg",
  },
  {
    name: "Beach Volleyball",
    description: "Sand courts and weekend games",
    image: "/sports/beach_volleyball.jpg",
  },
  {
    name: "Cricket",
    description: "Matches and training sessions",
    image: "/sports/cricket.jpg",
  },
  {
    name: "Paddle",
    description: "Training sessions",
    image: "/sports/paddle.jpg",
  },
  {
    name: "Sepak Takraw",
    description: "Open games and training sessions",
    image: "/sports/sepak_takraw.jpg",
  },
  {
    name: "Soccer",
    description: "Hang out and play",
    image: "/sports/soccer.jpg",
  },
  {
    name: "Tennis",
    description: "Open courts and training sessions",
    image: "/sports/tennis.jpg",
  },
  {
    name: "Volleyball",
    description: "Hang out and friendly matches",
    image: "/sports/volleyball.jpg",
  }
];


export function SportsPhotoCarousel() {
  return (
    <section className="mt-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-2 rounded-full">
            Explore sports
          </Badge>

          <h2 className="text-2xl font-black tracking-[-0.03em]">
            Find your next way to move.
          </h2>
        </div>

        <p className="hidden max-w-xs text-right text-sm leading-6 text-muted-foreground sm:block">
          Discover nearby games, training sessions and sports communities.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {sports.map((sport) => (
            <CarouselItem
              key={sport.name}
              className="basis-[82%] pl-3 sm:basis-1/2 xl:basis-1/3"
            >
              <button
                type="button"
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] text-left shadow-sm"
                aria-label={`Explore ${sport.name}`}
              >
                <Image
                  src={sport.image}
                  alt={`${sport.name} activity`}
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1280px) 40vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                  <div>
                    <h3 className="text-xl font-bold">
                      {sport.name}
                    </h3>

                    <p className="mt-1 text-sm text-white/75">
                      {sport.description}
                    </p>
                  </div>

                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 top-1/2 border-white/20 bg-black/35 text-white hover:bg-black/60 hover:text-white" />
        <CarouselNext className="right-3 top-1/2 border-white/20 bg-black/35 text-white hover:bg-black/60 hover:text-white" />
      </Carousel>
    </section>
  );
}