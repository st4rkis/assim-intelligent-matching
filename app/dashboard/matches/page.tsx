"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getMatchesForCompany } from "@/lib/demo-data";

const recommendationColors: Record<string, string> = {
  strong_match: "bg-green-500/10 text-green-700 border-green-500/20",
  good_match: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  possible_match: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  unlikely_match: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  not_eligible: "bg-red-500/10 text-red-700 border-red-500/20",
};

export default function MatchesPage() {
  const [selectedCompany, setSelectedCompany] = useState<string>("almoayyed");
  const matches = getMatchesForCompany(selectedCompany);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">Matches</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Opportunities matched to your company profile
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

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-border/50">
          <CardContent className="pt-4 pb-3 text-center">
            <div className="text-2xl font-bold font-mono text-primary">{matches.length}</div>
            <div className="text-xs text-muted-foreground">Total Matches</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-4 pb-3 text-center">
            <div className="text-2xl font-bold font-mono text-green-600">
              {matches.filter((m) => m.recommendation === "strong_match").length}
            </div>
            <div className="text-xs text-muted-foreground">Strong</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-4 pb-3 text-center">
            <div className="text-2xl font-bold font-mono text-blue-600">
              {matches.filter((m) => m.recommendation === "good_match").length}
            </div>
            <div className="text-xs text-muted-foreground">Good</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-4 pb-3 text-center">
            <div className="text-2xl font-bold font-mono">
              {matches.length > 0 ? Math.round(matches.reduce((sum, m) => sum + m.combinedScore, 0) / matches.length) : 0}
            </div>
            <div className="text-xs text-muted-foreground">Avg Score</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {matches
          .sort((a, b) => b.combinedScore - a.combinedScore)
          .map((match) => (
            <Card key={match.id} className="border-border/50">
              <CardContent className="pt-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <Badge
                        variant="outline"
                        className="text-xs font-mono capitalize"
                      >
                        {match.opportunityType}
                      </Badge>
                      <Badge variant="secondary" className="text-xs font-mono">
                        {match.sourceCountry}
                      </Badge>
                      <h3 className="font-semibold text-sm sm:text-base">
                        {match.opportunityTitle}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {match.summary}
                    </p>
                    {/* Key Factors */}
                    {match.keyFactors && match.keyFactors.length > 0 && (
                      <ul className="space-y-1 pt-1">
                        {match.keyFactors.map((f) => (
                          <li key={f} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <span className="text-primary mt-0.5 shrink-0">•</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 sm:ml-6">
                    <div className="text-left sm:text-right">
                      <div className="text-xl sm:text-2xl font-bold font-mono text-primary">
                        {match.combinedScore}
                      </div>
                      <div className="text-xs text-muted-foreground">/ 100</div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${recommendationColors[match.recommendation] ?? ""}`}
                    >
                      {match.recommendation.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 pt-4 border-t border-border/30">
                  {[
                    { label: "Eligibility", score: match.eligibilityScore },
                    { label: "Relevance", score: match.relevanceScore },
                    { label: "Competitiveness", score: match.competitivenessScore },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <span className="text-xs font-mono">{item.score}</span>
                      </div>
                      <Progress value={item.score} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
