"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { companies, opportunities, getMatchesForCompany } from "@/lib/demo-data";

export default function DashboardOverview() {
  const [selectedCompany, setSelectedCompany] = useState<string>("almoayyed");
  const profile = companies[selectedCompany];
  const matches = getMatchesForCompany(selectedCompany);
  const strongMatches = matches.filter((m) => m.recommendation === "strong_match");
  const avgScore = matches.length > 0
    ? Math.round(matches.reduce((s, m) => s + m.combinedScore, 0) / matches.length)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Your opportunity matching overview
          </p>
        </div>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="almoayyed">almoayyedcg.com</option>
          <option value="nordic">nordicbh.com</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Company Profiles", value: String(Object.keys(companies).length), change: `Active: ${profile?.name ?? "—"}` },
          { label: "Active Opportunities", value: String(opportunities.length), change: `Across ${new Set(opportunities.map((o) => o.sourceCountry)).size} countries` },
          { label: "Total Matches", value: String(matches.length), change: `${strongMatches.length} strong matches` },
          { label: "Avg Match Score", value: String(avgScore), change: avgScore >= 80 ? "Excellent fit" : avgScore >= 70 ? "Good fit" : "Moderate fit" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50">
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

        {/* Top Matches */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Top Matches — {profile?.name}</CardTitle>
            <LinkButton href="/dashboard/matches" variant="ghost" size="sm">
              View All
            </LinkButton>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {matches
                .sort((a, b) => b.combinedScore - a.combinedScore)
                .slice(0, 5)
                .map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Badge variant="outline" className="text-xs font-mono capitalize shrink-0">
                        {match.opportunityType}
                      </Badge>
                      <span className="text-sm truncate">{match.opportunityTitle}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {match.sourceCountry}
                      </span>
                      <span className="text-sm font-bold font-mono text-primary">
                        {match.combinedScore}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Opportunities */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Latest Opportunities</CardTitle>
          <LinkButton href="/dashboard/opportunities" variant="ghost" size="sm">
            Browse All
          </LinkButton>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {opportunities.slice(0, 6).map((opp) => (
              <div
                key={opp.id}
                className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Badge variant="outline" className="text-xs font-mono capitalize shrink-0">
                    {opp.type}
                  </Badge>
                  <span className="text-sm truncate">{opp.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    {opp.sourceCountry}
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
