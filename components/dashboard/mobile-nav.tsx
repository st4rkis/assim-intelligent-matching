"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/matches", label: "Matches" },
  { href: "/dashboard/opportunities", label: "Opportunities" },
  { href: "/dashboard/profile", label: "Company Profile" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden inline-flex shrink-0 items-center justify-center rounded-md size-7 hover:bg-muted transition-colors">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4h12M2 8h12M2 12h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="sr-only">Menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="px-4 py-3 border-b border-border/40">
          <SheetTitle className="flex items-center gap-2 text-sm">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px] font-mono">
                AI
              </span>
            </div>
            AssIM Matching
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground px-4 py-2.5 hover:bg-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Separator className="my-2" />
          <div className="px-4 py-2">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              Free Plan
            </span>
          </div>
          <div className="px-4 py-1">
            <Button variant="outline" size="sm" className="w-full">
              Upgrade
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
