import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm font-mono">
                AI
              </span>
            </div>
            <span className="font-semibold tracking-tight">
              AssIM Matching
            </span>
          </div>
          <div className="flex items-center gap-4">
            <LinkButton
              href="/dashboard"
              variant="ghost"
              size="sm"
            >
              Dashboard
            </LinkButton>
            <LinkButton href="/dashboard" size="sm">
              Get Started
            </LinkButton>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            AI-Powered Matching Engine
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Find grants, tenders &amp; funding
            <br />
            <span className="text-muted-foreground">
              matched to your business
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            AssIM analyzes your company profile and matches you with government
            grants, tenders, development bank financing, and private sector
            opportunities across the MENA region.
          </p>
          <div className="flex gap-3">
            <LinkButton href="/dashboard" size="lg">
              Start Matching
            </LinkButton>
            <LinkButton href="#how-it-works" size="lg" variant="outline">
              How It Works
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { value: "10+", label: "MENA Data Sources" },
            { value: "4", label: "Opportunity Types" },
            { value: "3-Score", label: "AI Matching" },
            { value: "<5min", label: "Time to First Match" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-bold tracking-tight mb-12">
          How It Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Company Profile",
              description:
                "Provide your website URL. Our AI analyzes your business — sector, capabilities, size, markets — and builds a structured profile in seconds.",
            },
            {
              step: "02",
              title: "Opportunity Matching",
              description:
                "We scan grants, tenders, financing programs, and RFPs across the MENA region. AI scores each opportunity against your profile on eligibility, relevance, and competitiveness.",
            },
            {
              step: "03",
              title: "Actionable Results",
              description:
                "Get ranked matches with detailed compatibility reports, AI-generated reasoning, and specific next steps for each opportunity.",
            },
          ].map((item) => (
            <Card key={item.step} className="bg-card/50 border-border/50">
              <CardContent className="pt-6">
                <span className="text-xs font-mono text-muted-foreground">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Opportunity Types */}
      <section className="border-t border-border/40 bg-card/20">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-bold tracking-tight mb-12">
            What We Match
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                type: "Grants",
                icon: "G",
                description:
                  "Government subsidies, enterprise support, training programs, export incentives",
                examples: "Tamkeen, EDB, UNIDO",
              },
              {
                type: "Tenders",
                icon: "T",
                description:
                  "Government procurement, construction contracts, service contracts",
                examples: "Tender Board, Monaqasat, CAPT",
              },
              {
                type: "Financing",
                icon: "F",
                description:
                  "SME loans, subsidized financing, investment funds, credit facilities",
                examples: "BDB, Al Waha Fund, Riyadat",
              },
              {
                type: "Private RFPs",
                icon: "R",
                description:
                  "Corporate procurement, partnership opportunities, JVs, franchise deals",
                examples: "Industry-specific",
              },
            ].map((item) => (
              <Card key={item.type} className="bg-card/50 border-border/50">
                <CardContent className="pt-6">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                    <span className="font-mono font-bold text-sm">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{item.type}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <span className="text-xs font-mono text-muted-foreground/60">
                    {item.examples}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-bold tracking-tight mb-12">Pricing</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              name: "Free",
              price: "$0",
              period: "forever",
              features: [
                "1 company profile",
                "10 matches/month",
                "Bahrain sources",
                "Summary reports",
              ],
              cta: "Get Started",
              highlight: false,
            },
            {
              name: "Pro",
              price: "$29",
              period: "/month",
              features: [
                "5 company profiles",
                "100 matches/month",
                "Full MENA sources",
                "Detailed reports + email alerts",
                "Read-only API",
              ],
              cta: "Upgrade to Pro",
              highlight: true,
            },
            {
              name: "Enterprise",
              price: "$99",
              period: "/month",
              features: [
                "Unlimited profiles",
                "Unlimited matches",
                "MENA + EU + Global",
                "Full API access + webhooks",
                "Priority support + onboarding",
              ],
              cta: "Contact Sales",
              highlight: false,
            },
          ].map((plan) => (
            <Card
              key={plan.name}
              className={`border-border/50 ${
                plan.highlight
                  ? "bg-card border-primary/30 ring-1 ring-primary/20"
                  : "bg-card/50"
              }`}
            >
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold font-mono">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary mt-0.5">+</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <LinkButton
                  href="/dashboard"
                  variant={plan.highlight ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                >
                  {plan.cta}
                </LinkButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            AssIM Intelligent Matching — by AssoImpreseMena
          </span>
          <span className="text-xs font-mono text-muted-foreground/50">
            Powered by AI SDK + Vercel
          </span>
        </div>
      </footer>
    </div>
  );
}
