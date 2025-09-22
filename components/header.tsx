"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                HadithStudy
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/browse"
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-all"
              >
                Browse
              </Link>
              <Link
                href="/collections"
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-all"
              >
                Collections
              </Link>
              <Link
                href="/sources"
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-all"
              >
                Sources
              </Link>
              <Link
                href="/study"
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-all"
              >
                Study Tools
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hadith..."
                  className="pl-10 w-64 bg-muted/50 border-border/50 focus:bg-background focus:border-ring transition-all"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-accent"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
            <nav className="flex flex-col py-4 space-y-1">
              <Link
                href="/browse"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-all"
              >
                Browse
              </Link>
              <Link
                href="/collections"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-all"
              >
                Collections
              </Link>
              <Link
                href="/sources"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-all"
              >
                Sources
              </Link>
              <Link
                href="/study"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-all"
              >
                Study Tools
              </Link>
              <div className="px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search hadith..."
                    className="pl-10 w-full bg-muted/50 border-border/50"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
