"use client";

import * as React from "react";
import Image from "next/image";

import {
  CalendarDays,
  Check,
  Clock3,
  Dumbbell,
  Heart,
  MapPin,
  RotateCcw,
  Star,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import {
  dummyUser,
  type MokshaUser,
} from "@/data/dummy-user";

import { getDiscoveryVenues } from "@/lib/services/discovery-service";
import {
  updateEventParticipation,
} from "@/lib/services/community-event-service";

import type {
  SportVenue,
  VenueEvent,
} from "@/lib/types/discovery";

import { AppNavbar } from "@/components/app-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 6;

function uniqueValues(values: string[]) {
  return [...new Set(values)].sort();
}

export default function DiscoverPage() {
  const [user, setUser] =
    React.useState<MokshaUser | null>(null);

  const [venues, setVenues] =
    React.useState<SportVenue[]>([]);

  const [loading, setLoading] =
    React.useState(true);

  const [selectedVenue, setSelectedVenue] =
    React.useState<SportVenue | null>(null);

  const [country, setCountry] =
    React.useState("all");

  const [region, setRegion] =
    React.useState("all");

  const [city, setCity] =
    React.useState("all");

  const [sport, setSport] =
    React.useState("all");

  const [page, setPage] =
    React.useState(1);

  const [favorites, setFavorites] =
    React.useState<string[]>([]);

  const [joinedEvents, setJoinedEvents] =
    React.useState<string[]>([]);

  const [updatingEventId, setUpdatingEventId] =
    React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadDiscovery() {
      const storedUser =
        window.localStorage.getItem("moksha-user");

      if (storedUser) {
        try {
          setUser({
            ...dummyUser,
            ...JSON.parse(storedUser),
          });
        } catch {
          setUser(dummyUser);
        }
      } else {
        setUser(dummyUser);
      }

      const savedFavorites =
        window.localStorage.getItem(
          "moksha-favorite-venues"
        );

      const savedEvents =
        window.localStorage.getItem(
          "moksha-joined-events"
        );

      if (savedFavorites) {
        try {
          setFavorites(
            JSON.parse(savedFavorites)
          );
        } catch {
          setFavorites([]);
        }
      }

      if (savedEvents) {
        try {
          setJoinedEvents(
            JSON.parse(savedEvents)
          );
        } catch {
          setJoinedEvents([]);
        }
      }

      try {
        const loadedVenues =
          await getDiscoveryVenues();

        setVenues(loadedVenues);
      } catch (error) {
        console.error(
          "Could not load Discover:",
          error
        );

        setVenues([]);

        toast.error(
          "Could not load places and events."
        );
      } finally {
        setLoading(false);
      }
    }

    void loadDiscovery();
  }, []);

  const countries = React.useMemo(
    () =>
      uniqueValues(
        venues.map(
          (venue) => venue.country
        )
      ),
    [venues]
  );

  const regions = React.useMemo(
    () =>
      uniqueValues(
        venues
          .filter(
            (venue) =>
              country === "all" ||
              venue.country === country
          )
          .map(
            (venue) => venue.region
          )
      ),
    [venues, country]
  );

  const cities = React.useMemo(
    () =>
      uniqueValues(
        venues
          .filter(
            (venue) =>
              (country === "all" ||
                venue.country ===
                  country) &&
              (region === "all" ||
                venue.region === region)
          )
          .map(
            (venue) => venue.city
          )
      ),
    [venues, country, region]
  );

  const sports = React.useMemo(
    () =>
      uniqueValues(
        venues.map(
          (venue) => venue.sport
        )
      ),
    [venues]
  );

  const filteredVenues =
    React.useMemo(
      () =>
        venues.filter(
          (venue) =>
            (country === "all" ||
              venue.country ===
                country) &&
            (region === "all" ||
              venue.region ===
                region) &&
            (city === "all" ||
              venue.city === city) &&
            (sport === "all" ||
              venue.sport === sport)
        ),
      [
        venues,
        country,
        region,
        city,
        sport,
      ]
    );

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredVenues.length /
        PAGE_SIZE
    )
  );

  const visibleVenues =
    filteredVenues.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  function changeCountry(
    value: string
  ) {
    setCountry(value);
    setRegion("all");
    setCity("all");
    setPage(1);
  }

  function changeRegion(
    value: string
  ) {
    setRegion(value);
    setCity("all");
    setPage(1);
  }

  function clearFilters() {
    setCountry("all");
    setRegion("all");
    setCity("all");
    setSport("all");
    setPage(1);
  }

  function toggleFavorite(
    venueId: string
  ) {
    setFavorites((current) => {
      const next =
        current.includes(venueId)
          ? current.filter(
              (id) => id !== venueId
            )
          : [...current, venueId];

      window.localStorage.setItem(
        "moksha-favorite-venues",
        JSON.stringify(next)
      );

      return next;
    });
  }

  async function toggleEvent(
    event: VenueEvent
  ) {
    const alreadyJoined =
      joinedEvents.includes(event.id);

    const action:
      | "join"
      | "leave" = alreadyJoined
      ? "leave"
      : "join";

    const isMongoEvent =
      /^[a-f0-9]{24}$/i.test(
        event.id
      );

    if (!isMongoEvent) {
      setJoinedEvents(
        (current) => {
          const next =
            alreadyJoined
              ? current.filter(
                  (id) =>
                    id !== event.id
                )
              : [
                  ...current,
                  event.id,
                ];

          window.localStorage.setItem(
            "moksha-joined-events",
            JSON.stringify(next)
          );

          toast.success(
            alreadyJoined
              ? `You left ${event.title}.`
              : `You joined ${event.title}.`
          );

          return next;
        }
      );

      return;
    }

    if (
      updatingEventId === event.id
    ) {
      return;
    }

    setUpdatingEventId(event.id);

    try {
      const updatedEvent =
        await updateEventParticipation(
          event.id,
          action,
          "demo-user"
        );

      const participants =
        updatedEvent.participantIds
          ?.length ?? 0;

      const availableSpots =
        Math.max(
          0,
          updatedEvent.maxPlayers -
            participants
        );

      setVenues((current) =>
        current.map((venue) => ({
          ...venue,
          events:
            venue.events.map(
              (venueEvent) =>
                venueEvent.id ===
                event.id
                  ? {
                      ...venueEvent,
                      availableSpots,
                    }
                  : venueEvent
            ),
        }))
      );

      setSelectedVenue(
        (current) => {
          if (!current) {
            return null;
          }

          return {
            ...current,
            events:
              current.events.map(
                (venueEvent) =>
                  venueEvent.id ===
                  event.id
                    ? {
                        ...venueEvent,
                        availableSpots,
                      }
                    : venueEvent
              ),
          };
        }
      );

      setJoinedEvents(
        (current) => {
          const next =
            alreadyJoined
              ? current.filter(
                  (id) =>
                    id !== event.id
                )
              : [
                  ...current,
                  event.id,
                ];

          window.localStorage.setItem(
            "moksha-joined-events",
            JSON.stringify(next)
          );

          return next;
        }
      );

      toast.success(
        alreadyJoined
          ? `You left ${event.title}.`
          : `You joined ${event.title}.`
      );
    } catch (error) {
      console.error(
        "Could not update participation:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update participation."
      );
    } finally {
      setUpdatingEventId(null);
    }
  }

  if (!user || loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <Skeleton className="h-20 rounded-3xl" />

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({
              length: 6,
            }).map(
              (_, index) => (
                <Skeleton
                  key={index}
                  className="h-[390px] rounded-[2rem]"
                />
              )
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppNavbar user={user} />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header>
          <Badge
            variant="secondary"
            className="rounded-full"
          >
            Discover movement nearby
          </Badge>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Find somewhere to move.
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Explore courts, parks,
            studios and community
            sessions that match your
            location and interests.
          </p>
        </header>

        <Card className="mt-7 rounded-[2rem] border-border bg-card shadow-sm">
          <CardContent className="grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-5">
            <FilterSelect
              label="Country"
              value={country}
              options={countries}
              onChange={
                changeCountry
              }
            />

            <FilterSelect
              label="State / region"
              value={region}
              options={regions}
              onChange={
                changeRegion
              }
            />

            <FilterSelect
              label="City"
              value={city}
              options={cities}
              onChange={(value) => {
                setCity(value);
                setPage(1);
              }}
            />

            <FilterSelect
              label="Sport"
              value={sport}
              options={sports}
              onChange={(value) => {
                setSport(value);
                setPage(1);
              }}
            />

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full rounded-xl"
                onClick={
                  clearFilters
                }
              >
                <RotateCcw className="mr-2 size-4" />
                Clear filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {
              filteredVenues.length
            }{" "}
            places found
          </p>

          <Badge variant="outline">
            Page {page} of{" "}
            {totalPages}
          </Badge>
        </div>

        {visibleVenues.length >
        0 ? (
          <section className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleVenues.map(
              (venue) => {
                const favorite =
                  favorites.includes(
                    venue.id
                  );

                return (
                  <Card
                    key={venue.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setSelectedVenue(
                        venue
                      );
                    }}
                    onKeyDown={(
                      event
                    ) => {
                      if (
                        event.key ===
                          "Enter" ||
                        event.key ===
                          " "
                      ) {
                        setSelectedVenue(
                          venue
                        );
                      }
                    }}
                    className="group cursor-pointer overflow-hidden rounded-[2rem] border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={
                          venue.image
                        }
                        alt={
                          venue.name
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />

                      <Badge className="absolute left-4 top-4 rounded-full">
                        {
                          venue.sport
                        }
                      </Badge>

                      <button
                        type="button"
                        onClick={(
                          event
                        ) => {
                          event.stopPropagation();

                          toggleFavorite(
                            venue.id
                          );
                        }}
                        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:scale-105"
                        aria-label={
                          favorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <Heart
                          className={`size-5 ${
                            favorite
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </button>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <span className="rounded-full bg-black/35 px-3 py-1 text-sm backdrop-blur">
                          {
                            venue.priceLabel
                          }
                        </span>

                        <span className="flex items-center gap-1 rounded-full bg-black/35 px-3 py-1 text-sm backdrop-blur">
                          <Star className="size-3.5 fill-current" />
                          {
                            venue.rating
                          }
                        </span>
                      </div>
                    </div>

                    <CardHeader className="px-6 pb-3 pt-5">
                      <CardTitle className="text-xl font-black">
                        {
                          venue.name
                        }
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-6 pb-6">
                      <p className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                        <MapPin className="mt-1 size-4 shrink-0" />

                        {
                          venue.address
                        }
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          {
                            venue.level
                          }
                        </Badge>

                        <Badge variant="outline">
                          {
                            venue.distance
                          }
                        </Badge>
                      </div>

                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {
                          venue.description
                        }
                      </p>

                      <Button
                        type="button"
                        variant="ghost"
                        className="mt-4 w-full rounded-full"
                      >
                        View schedules
                        and events
                      </Button>
                    </CardContent>
                  </Card>
                );
              }
            )}
          </section>
        ) : (
          <Card className="mt-6 rounded-[2rem] border-dashed bg-card">
            <CardContent className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
              <MapPin className="size-10 text-muted-foreground" />

              <h2 className="mt-5 text-2xl font-black">
                No places found
              </h2>

              <p className="mt-2 text-muted-foreground">
                Try removing one or
                more filters.
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-5 rounded-full"
                onClick={
                  clearFilters
                }
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-9">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(
                    event
                  ) => {
                    event.preventDefault();

                    setPage(
                      (current) =>
                        Math.max(
                          1,
                          current - 1
                        )
                    );
                  }}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-40"
                      : ""
                  }
                />
              </PaginationItem>

              {Array.from({
                length:
                  totalPages,
              }).map(
                (_, index) => {
                  const pageNumber =
                    index + 1;

                  return (
                    <PaginationItem
                      key={
                        pageNumber
                      }
                    >
                      <PaginationLink
                        href="#"
                        isActive={
                          page ===
                          pageNumber
                        }
                        onClick={(
                          event
                        ) => {
                          event.preventDefault();

                          setPage(
                            pageNumber
                          );

                          window.scrollTo(
                            {
                              top: 250,
                              behavior:
                                "smooth",
                            }
                          );
                        }}
                      >
                        {
                          pageNumber
                        }
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(
                    event
                  ) => {
                    event.preventDefault();

                    setPage(
                      (current) =>
                        Math.min(
                          totalPages,
                          current + 1
                        )
                    );
                  }}
                  className={
                    page ===
                    totalPages
                      ? "pointer-events-none opacity-40"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <Sheet
        open={Boolean(
          selectedVenue
        )}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedVenue(null);
          }
        }}
      >
        <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-xl">
          {selectedVenue && (
            <>
              <div className="relative h-64">
                <Image
                  src={
                    selectedVenue.image
                  }
                  alt={
                    selectedVenue.name
                  }
                  fill
                  sizes="(max-width: 640px) 100vw, 576px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <button
                  type="button"
                  onClick={() =>
                    toggleFavorite(
                      selectedVenue.id
                    )
                  }
                  className="absolute bottom-5 right-5 flex size-11 items-center justify-center rounded-full bg-white text-black shadow-lg"
                >
                  <Heart
                    className={`size-5 ${
                      favorites.includes(
                        selectedVenue.id
                      )
                        ? "fill-current"
                        : ""
                    }`}
                  />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <SheetHeader className="text-left">
                  <div className="flex flex-wrap gap-2">
                    <Badge>
                      {
                        selectedVenue.sport
                      }
                    </Badge>

                    <Badge variant="secondary">
                      {
                        selectedVenue.level
                      }
                    </Badge>

                    <Badge variant="outline">
                      {
                        selectedVenue.priceLabel
                      }
                    </Badge>
                  </div>

                  <SheetTitle className="mt-4 text-3xl font-black">
                    {
                      selectedVenue.name
                    }
                  </SheetTitle>

                  <SheetDescription className="flex items-start gap-2 leading-6">
                    <MapPin className="mt-1 size-4 shrink-0" />

                    {
                      selectedVenue.address
                    }
                    ,{" "}
                    {
                      selectedVenue.city
                    }
                  </SheetDescription>
                </SheetHeader>

                <p className="mt-6 leading-7 text-muted-foreground">
                  {
                    selectedVenue.description
                  }
                </p>

                <DetailSection
                  icon={Clock3}
                  title="Opening hours"
                  items={
                    selectedVenue.schedules
                  }
                />

                <DetailSection
                  icon={Dumbbell}
                  title="What to bring"
                  items={
                    selectedVenue.equipment
                  }
                />

                <DetailSection
                  icon={Check}
                  title="Amenities"
                  items={
                    selectedVenue.amenities
                  }
                />

                <section className="mt-8">
                  <h3 className="flex items-center gap-2 text-xl font-black">
                    <CalendarDays className="size-5" />
                    Upcoming activities
                  </h3>

                  <div className="mt-4 grid gap-3">
                    {selectedVenue.events.map(
                      (event) => {
                        const joined =
                          joinedEvents.includes(
                            event.id
                          );

                        const updating =
                          updatingEventId ===
                          event.id;

                        return (
                          <div
                            key={
                              event.id
                            }
                            className="rounded-2xl bg-background p-5"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="font-bold">
                                  {
                                    event.title
                                  }
                                </h4>

                                <p className="mt-2 text-sm text-muted-foreground">
                                  {
                                    event.date
                                  }{" "}
                                  ·{" "}
                                  {
                                    event.time
                                  }
                                </p>
                              </div>

                              <Badge variant="secondary">
                                {
                                  event.level
                                }
                              </Badge>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="size-4" />

                                {
                                  event.availableSpots
                                }{" "}
                                spots
                                available
                              </span>

                              <Button
                                type="button"
                                variant={
                                  joined
                                    ? "outline"
                                    : "default"
                                }
                                size="sm"
                                className="rounded-full"
                                disabled={
                                  updating
                                }
                                onClick={() => {
                                  void toggleEvent(
                                    event
                                  );
                                }}
                              >
                                {updating
                                  ? "Updating..."
                                  : joined
                                    ? "Leave event"
                                    : "Join event"}
                              </Button>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </section>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (
    value: string
  ) => void;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
      >
        <option value="all">
          All
        </option>

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}
      </select>
    </label>
  );
}

type DetailSectionProps = {
  icon: React.ElementType;
  title: string;
  items: string[];
};

function DetailSection({
  icon: Icon,
  title,
  items,
}: DetailSectionProps) {
  return (
    <section className="mt-8">
      <h3 className="flex items-center gap-2 text-lg font-black">
        <Icon className="size-5" />
        {title}
      </h3>

      <div className="mt-3 grid gap-2">
        {items.map(
          (item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl bg-background p-3 text-sm"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-secondary" />

              <span>
                {item}
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
}