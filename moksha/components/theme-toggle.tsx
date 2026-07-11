"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-24 animate-pulse rounded-full bg-muted"
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 shadow-sm">
      <Sun
        className={`size-4 transition-opacity ${
          isDark ? "opacity-40" : "opacity-100"
        }`}
      />

      <Switch
        checked={isDark}
        onCheckedChange={(checked) =>
          setTheme(checked ? "dark" : "light")
        }
        aria-label="Toggle dark mode"
      />

      <Moon
        className={`size-4 transition-opacity ${
          isDark ? "opacity-100" : "opacity-40"
        }`}
      />
    </div>
  );
}