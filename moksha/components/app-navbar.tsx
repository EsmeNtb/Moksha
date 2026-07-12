"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Dumbbell,
  LayoutDashboard,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { getAvatarSrc } from "@/data/avatars";
import type { MokshaUser } from "@/data/dummy-user";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

type AppNavbarProps = {
  user: MokshaUser;
};

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    ready: true,
  },
  {
    label: "Training",
    href: "/training",
    icon: Dumbbell,
    ready: false,
  },
  {
    label: "Discover",
    href: "/discover",
    icon: MapPin,
    ready: false,
  },
  {
    label: "Sports",
    href: "/sports",
    icon: BookOpen,
    ready: false,
  },
];

export function AppNavbar({
  user,
}: AppNavbarProps) {
  const pathname = usePathname();

  const initials = (
    user.nickname ||
    user.username ||
    "M"
  )
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/dashboard"
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Dumbbell className="size-5" />
          </div>

          <div className="hidden sm:block">
            <p className="font-black tracking-[0.16em]">
              MOKSHA
            </p>

            <p className="text-xs text-muted-foreground">
              Move together.
            </p>
          </div>
        </Link>

        <nav className="mx-auto flex min-w-0 items-center gap-1 overflow-x-auto rounded-full border border-border bg-card p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href;

            if (!item.ready) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    toast(
                      `${item.label} is coming next.`
                    )
                  }
                  className="flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-background hover:text-foreground sm:px-4"
                >
                  <Icon className="size-4" />

                  <span className="hidden md:inline">
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm transition sm:px-4",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                )}
              >
                <Icon className="size-4" />

                <span className="hidden md:inline">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <ThemeToggle />

          <Link
            href="/profile"
            className="rounded-full transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open profile"
          >
            <Avatar className="size-11 border-2 border-border bg-card shadow-sm">
              <AvatarImage
                src={getAvatarSrc(user.avatar)}
                alt={`${user.nickname} avatar`}
              />

              <AvatarFallback>
                {initials}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}