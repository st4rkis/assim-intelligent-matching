import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MobileNav } from "@/components/dashboard/mobile-nav";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/matches", label: "Matches" },
  { href: "/dashboard/opportunities", label: "Opportunities" },
  { href: "/dashboard/profile", label: "Company Profile" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6">
            {/* Mobile hamburger */}
            <MobileNav />

            <Link href="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs font-mono">
                  AI
                </span>
              </div>
              <span className="font-semibold text-sm tracking-tight">
                AssIM
              </span>
            </Link>

            {/* Desktop nav — hidden on mobile */}
            <Separator orientation="vertical" className="h-5 hidden md:block" />
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md hover:bg-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded hidden sm:inline-block">
              Free Plan
            </span>
            <Button variant="outline" size="sm">
              Upgrade
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">{children}</main>
    </div>
  );
}
