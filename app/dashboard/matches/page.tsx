import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recommendationColors: Record<string, string> = {
  strong_match: "bg-green-500/10 text-green-500 border-green-500/20",
  good_match: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  possible_match: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  unlikely_match: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  not_eligible: "bg-red-500/10 text-red-500 border-red-500/20",
};

// Demo data — will be replaced with API calls
const demoMatches = [
  {
    id: "1",
    opportunityTitle: "BDB SME Fund",
    opportunityType: "financing",
    companyName: "Nordic Group",
    combinedScore: 86,
    eligibilityScore: 90,
    relevanceScore: 85,
    competitivenessScore: 80,
    recommendation: "strong_match",
    summary:
      "Tourism is one of BDB's 7 priority sectors. Fixed asset financing could fund property improvements or expansion.",
  },
  {
    id: "2",
    opportunityTitle: "Tamkeen Enterprise Support Program",
    opportunityType: "grant",
    companyName: "Nordic Group",
    combinedScore: 79,
    eligibilityScore: 85,
    relevanceScore: 78,
    competitivenessScore: 72,
    recommendation: "good_match",
    summary:
      "Covers marketing, branding, software costs up to 50%. Directly applicable to hotel marketing and property management systems.",
  },
  {
    id: "3",
    opportunityTitle: "National Employment Program 3.0",
    opportunityType: "grant",
    companyName: "Nordic Group",
    combinedScore: 78,
    eligibilityScore: 92,
    relevanceScore: 70,
    competitivenessScore: 75,
    recommendation: "good_match",
    summary:
      "Wage subsidies for Bahraini employees. Hospitality is a major employer of Bahrainis — multi-property operator can absorb new hires.",
  },
];

export default function MatchesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Matches</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Opportunities matched to your company profile
        </p>
      </div>

      <div className="space-y-4">
        {demoMatches.map((match) => (
          <Card key={match.id} className="border-border/50">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="text-xs font-mono capitalize"
                    >
                      {match.opportunityType}
                    </Badge>
                    <h3 className="font-semibold">
                      {match.opportunityTitle}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    {match.summary}
                  </p>
                </div>

                <div className="flex items-center gap-4 ml-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold font-mono">
                      {match.combinedScore}
                    </div>
                    <div className="text-xs text-muted-foreground">/ 100</div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${recommendationColors[match.recommendation] ?? ""}`}
                  >
                    {match.recommendation.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/30">
                {[
                  {
                    label: "Eligibility",
                    score: match.eligibilityScore,
                    desc: "Can you apply?",
                  },
                  {
                    label: "Relevance",
                    score: match.relevanceScore,
                    desc: "Does it fit?",
                  },
                  {
                    label: "Competitiveness",
                    score: match.competitivenessScore,
                    desc: "Can you win?",
                  },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs text-muted-foreground">
                        {s.label}
                      </span>
                      <span className="text-sm font-mono font-semibold">
                        {s.score}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${s.score}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground/50">
                      {s.desc}
                    </span>
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
