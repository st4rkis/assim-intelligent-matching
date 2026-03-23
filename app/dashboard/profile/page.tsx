import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Demo profile — Nordic BH from our test case
const demoProfile = {
  name: "Nordic Group",
  websiteUrl: "nordicbh.com",
  aiSummary:
    "Nordic Group is an independent mid-scale luxury hospitality operator in Bahrain managing three properties totaling ~176 accommodation units. They specialize in family-friendly resort experiences targeting GCC leisure travelers, with secondary strength in wellness/spa and business meeting facilities.",
  primarySector: "Hospitality & Tourism",
  secondarySectors: ["Wellness/Spa", "Food & Beverage"],
  country: "BH",
  city: "Manama",
  sizeCategory: "sme",
  employeeRange: "51-200",
  yearsInOperation: 10,
  ownershipType: "independent",
  capabilities: [
    "Luxury villa accommodation management",
    "Spa and wellness services",
    "Event and meeting facility management",
    "Family tourism packages",
    "F&B operations (restaurant, cafe)",
    "Multi-property hospitality operations",
  ],
  productsServices: [
    "Nordic Resort (44 family villas)",
    "Nordic Palace & Spa (84 rooms/suites)",
    "Nordic Gardens (48 bungalow villas)",
  ],
  certifications: [],
  confidenceScores: {
    sector: 0.95,
    size: 0.7,
    capabilities: 0.85,
    years: 0.6,
    geography: 0.9,
  },
};

function ConfidenceBadge({ score }: { score: number }) {
  const color =
    score >= 0.8
      ? "text-green-400"
      : score >= 0.6
        ? "text-yellow-400"
        : "text-red-400";
  return (
    <span className={`text-xs font-mono ${color}`}>
      {Math.round(score * 100)}%
    </span>
  );
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Company Profile
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            AI-generated profile from website analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Re-Profile
          </Button>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <span className="font-bold text-xl font-mono text-muted-foreground">
                {demoProfile.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">{demoProfile.name}</h2>
                <Badge variant="outline" className="text-xs font-mono uppercase">
                  {demoProfile.sizeCategory}
                </Badge>
                <Badge variant="secondary" className="text-xs font-mono">
                  {demoProfile.country}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                {demoProfile.aiSummary}
              </p>
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs text-muted-foreground">
                  <span className="font-mono">{demoProfile.websiteUrl}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {demoProfile.city},{" "}
                  {demoProfile.country === "BH" ? "Bahrain" : demoProfile.country}
                </span>
                <span className="text-xs text-muted-foreground">
                  ~{demoProfile.yearsInOperation} years in operation
                </span>
                <span className="text-xs text-muted-foreground">
                  {demoProfile.employeeRange} employees
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Classification */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Classification
              <ConfidenceBadge score={demoProfile.confidenceScores.sector} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-xs text-muted-foreground">Primary Sector</span>
              <p className="text-sm font-medium">{demoProfile.primarySector}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Secondary Sectors</span>
              <div className="flex gap-2 mt-1">
                {demoProfile.secondarySectors.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Ownership</span>
              <p className="text-sm font-medium capitalize">
                {demoProfile.ownershipType}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Confidence Scores */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">AI Confidence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(demoProfile.confidenceScores).map(
              ([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm capitalize">{key}</span>
                    <ConfidenceBadge score={value} />
                  </div>
                  <Progress value={value * 100} className="h-1.5" />
                </div>
              )
            )}
            <p className="text-xs text-muted-foreground pt-2">
              Fields below 70% confidence should be manually verified.
            </p>
          </CardContent>
        </Card>

        {/* Capabilities */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Capabilities
              <ConfidenceBadge
                score={demoProfile.confidenceScores.capabilities}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {demoProfile.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-primary mt-0.5 shrink-0">+</span>
                  {cap}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Products & Services */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Products & Services</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {demoProfile.productsServices.map((ps) => (
                <li
                  key={ps}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-primary mt-0.5 shrink-0">+</span>
                  {ps}
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div>
              <span className="text-xs text-muted-foreground">
                Certifications
              </span>
              <p className="text-sm text-muted-foreground/60 mt-1">
                No certifications detected — consider adding ISO or industry
                certifications to improve match scores.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
