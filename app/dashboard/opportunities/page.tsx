"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { opportunities } from "@/lib/demo-data";

const typeColors: Record<string, string> = {
  grant: "bg-green-500/10 text-green-700 border-green-500/20",
  financing: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  tender: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  rfp: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  training: "bg-cyan-500/10 text-cyan-700 border-cyan-500/20",
  incentive: "bg-amber-500/10 text-amber-700 border-amber-500/20",
};

const countryNames: Record<string, string> = {
  BH: "Bahrain",
  SA: "Saudi Arabia",
  AE: "UAE",
  KW: "Kuwait",
  QA: "Qatar",
  OM: "Oman",
  JO: "Jordan",
  EG: "Egypt",
  International: "International",
};

export default function OpportunitiesPage() {
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [countryFilter, setCountryFilter] = useState<string>("All");

  const filteredOpps = opportunities.filter((opp) => {
    if (typeFilter !== "All" && opp.type !== typeFilter.toLowerCase()) return false;
    if (countryFilter !== "All" && opp.sourceCountry !== countryFilter) return false;
    return true;
  });

  const types = ["All", "Grant", "Financing", "Tender", "Training", "Incentive"];
  const countries = ["All", ...Array.from(new Set(opportunities.map((o) => o.sourceCountry)))];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">Opportunities</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {opportunities.length} opportunities across {Object.keys(countryNames).length - 1} Middle East countries
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map((filter) => (
            <Button
              key={filter}
              variant={typeFilter === filter ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setTypeFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <Button
              key={c}
              variant={countryFilter === c ? "secondary" : "ghost"}
              size="sm"
              className="text-xs"
              onClick={() => setCountryFilter(c)}
            >
              {c === "All" ? "All Countries" : countryNames[c] ?? c}
            </Button>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground font-mono">
        Showing {filteredOpps.length} of {opportunities.length} opportunities
      </div>

      <div className="space-y-3">
        {filteredOpps.map((opp) => (
          <Card key={opp.id} className="border-border/50">
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs font-mono capitalize ${typeColors[opp.type] ?? ""}`}
                    >
                      {opp.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-mono">
                      {countryNames[opp.sourceCountry] ?? opp.sourceCountry}
                    </Badge>
                    <h3 className="font-semibold text-sm">{opp.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {opp.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-xs text-muted-foreground">
                      Source: <span className="font-medium text-foreground/70">{opp.sourceName}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Value: <span className="font-mono">{opp.valueMax}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Deadline: <span className="font-mono">{opp.deadline}</span>
                    </span>
                    {opp.sectors.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        Sectors: {opp.sectors.join(", ")}
                      </span>
                    )}
                  </div>
                </div>
                {opp.sourceUrl && (
                  <a
                    href={opp.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      Visit Source ↗
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
