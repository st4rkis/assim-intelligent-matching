import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const typeColors: Record<string, string> = {
  grant: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  tender: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  financing: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  private_rfp: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

// Demo data — will be replaced with DB queries
const demoOpportunities = [
  {
    id: "1",
    title: "Enterprise Support Program",
    type: "grant",
    sourceName: "Tamkeen",
    sourceCountry: "BH",
    description: "Grants covering up to 50% of eligible costs including software, services, hardware, marketing, and branding within an approved cap.",
    sectors: ["All Sectors"],
    deadline: "Rolling",
    valueMax: "50,000 BHD",
    status: "open",
  },
  {
    id: "2",
    title: "SME Fund",
    type: "financing",
    sourceName: "BDB",
    sourceCountry: "BH",
    description: "Sharia-compliant financing with flexible repayment up to 5 years. Covers fixed assets and working capital. Tamkeen subsidizes profit rates by up to 50%.",
    sectors: ["Tourism", "Manufacturing", "Logistics", "IT", "Finance", "Health", "Education"],
    deadline: "Open",
    valueMax: "Varies",
    status: "open",
  },
  {
    id: "3",
    title: "National Employment Program 3.0",
    type: "grant",
    sourceName: "Tamkeen",
    sourceCountry: "BH",
    description: "Wage subsidies for Bahraini job seekers and fresh graduates. Support runs for up to 36 months.",
    sectors: ["All Sectors"],
    deadline: "Rolling",
    valueMax: "Per employee",
    status: "open",
  },
  {
    id: "4",
    title: "Export Development Program",
    type: "grant",
    sourceName: "Export Bahrain",
    sourceCountry: "BH",
    description: "Financial assistance for businesses looking to expand into international markets. Export financing up to BD 1 million with profit rate subsidies up to 70%.",
    sectors: ["All Sectors"],
    deadline: "Rolling",
    valueMax: "1,000,000 BHD",
    status: "open",
  },
  {
    id: "5",
    title: "Women Business Finance Scheme (Riyadat)",
    type: "financing",
    sourceName: "BDB",
    sourceCountry: "BH",
    description: "Dedicated financing for female entrepreneurs in Bahrain.",
    sectors: ["All Sectors"],
    deadline: "Open",
    valueMax: "Varies",
    status: "open",
  },
];

export default function OpportunitiesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Opportunities</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Browse grants, tenders, financing, and RFPs across the MENA region
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Grants", "Tenders", "Financing", "RFPs"].map((filter) => (
            <Button
              key={filter}
              variant={filter === "All" ? "default" : "outline"}
              size="sm"
              className="text-xs"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {demoOpportunities.map((opp) => (
          <Card key={opp.id} className="border-border/50 hover:border-border/80 transition-colors">
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
                    <span className="text-xs font-mono text-muted-foreground">
                      {opp.sourceCountry}
                    </span>
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
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 w-full sm:w-auto">
                  Check Eligibility
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
