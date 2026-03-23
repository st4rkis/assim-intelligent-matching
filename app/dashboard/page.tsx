import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your opportunity matching overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Company Profiles", value: "0", change: "Add your first" },
          { label: "Active Opportunities", value: "0", change: "Syncing..." },
          { label: "Total Matches", value: "0", change: "Profile required" },
          { label: "Avg Match Score", value: "--", change: "No data yet" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border/50">
            <CardContent className="pt-5 pb-4">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-2xl font-bold font-mono mt-1 text-primary">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground/60 mt-1">
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Profile Card */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Create Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your company website URL and our AI will analyze your
              business to create a structured profile — sector, capabilities,
              size, and markets.
            </p>
            <ProfileForm />
          </CardContent>
        </Card>

        {/* Recent Matches */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Top Matches</CardTitle>
            <LinkButton href="/dashboard/matches" variant="ghost" size="sm">
              View All
            </LinkButton>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <span className="font-mono text-sm text-muted-foreground">
                  ?
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Create a company profile to see your matches
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Opportunities */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Latest Opportunities</CardTitle>
          <LinkButton href="/dashboard/opportunities" variant="ghost" size="sm">
            Browse All
          </LinkButton>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Placeholder opportunities */}
            {[
              {
                title: "Tamkeen Enterprise Support Program",
                type: "grant",
                country: "BH",
                deadline: "Rolling",
              },
              {
                title: "BDB SME Fund",
                type: "financing",
                country: "BH",
                deadline: "Open",
              },
              {
                title: "National Employment Program 3.0",
                type: "grant",
                country: "BH",
                deadline: "Rolling",
              },
            ].map((opp) => (
              <div
                key={opp.title}
                className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="text-xs font-mono capitalize"
                  >
                    {opp.type}
                  </Badge>
                  <span className="text-sm">{opp.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">
                    {opp.country}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {opp.deadline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileForm() {
  return (
    <form className="flex gap-2">
      <input
        type="url"
        name="website_url"
        placeholder="https://your-company.com"
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      <Button type="submit" size="sm">
        Analyze
      </Button>
    </form>
  );
}
