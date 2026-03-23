"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { companies, type CompanyProfile } from "@/lib/demo-data";

function ConfidenceBadge({ score }: { score: number }) {
  const color =
    score >= 0.8
      ? "text-green-600"
      : score >= 0.6
        ? "text-yellow-600"
        : "text-red-500";
  return (
    <span className={`text-xs font-mono ${color}`}>
      {Math.round(score * 100)}%
    </span>
  );
}

export default function ProfilePage() {
  const [selectedCompany, setSelectedCompany] = useState<string>("almoayyed");
  const profile = companies[selectedCompany];

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Company Profile
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            AI-generated profile from website analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="almoayyed">almoayyedcg.com</option>
            <option value="nordic">nordicbh.com</option>
          </select>
          <Button variant="outline" size="sm">
            Re-Profile
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="font-bold text-lg sm:text-xl font-mono text-primary">
                {profile.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h2 className="text-lg sm:text-xl font-bold">{profile.name}</h2>
                <Badge variant="outline" className="text-xs font-mono uppercase">
                  {profile.sizeCategory}
                </Badge>
                <Badge variant="secondary" className="text-xs font-mono">
                  {profile.country}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {profile.aiSummary}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                <span className="text-xs text-muted-foreground">
                  <span className="font-mono">{profile.websiteUrl}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {profile.city},{" "}
                  {profile.country === "BH" ? "Bahrain" : profile.country}
                </span>
                <span className="text-xs text-muted-foreground">
                  ~{profile.yearsInOperation} years in operation
                </span>
                <span className="text-xs text-muted-foreground">
                  {profile.employeeRange} employees
                </span>
              </div>
              {/* Leadership */}
              {profile.leadership && profile.leadership.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                  {profile.leadership.map((l) => (
                    <span key={l.name} className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/70">{l.name}</span>{" "}
                      — {l.role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information — NEW SECTION */}
      {profile.financialInfo && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base text-primary flex items-center gap-2">
              Financial Information
              <Badge variant="secondary" className="text-[10px] font-mono">
                Est. / Third-Party Data
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {profile.financialInfo.estimatedRevenue && (
                <div>
                  <span className="text-xs text-muted-foreground">Est. Revenue</span>
                  <p className="text-sm font-bold font-mono text-primary">
                    {profile.financialInfo.estimatedRevenue}
                  </p>
                  <span className="text-[10px] text-muted-foreground/60">
                    {profile.financialInfo.revenueSource}
                  </span>
                </div>
              )}
              {profile.financialInfo.contractorGrade && (
                <div>
                  <span className="text-xs text-muted-foreground">Contractor Grade</span>
                  <p className="text-sm font-bold font-mono text-primary">
                    {profile.financialInfo.contractorGrade}
                  </p>
                </div>
              )}
              {profile.financialInfo.marketShare && (
                <div>
                  <span className="text-xs text-muted-foreground">Market Share</span>
                  <p className="text-sm font-bold font-mono">
                    {profile.financialInfo.marketShare}
                  </p>
                </div>
              )}
              {profile.financialInfo.totalGroupEmployees && (
                <div>
                  <span className="text-xs text-muted-foreground">Group Employees</span>
                  <p className="text-sm font-bold font-mono">
                    {profile.financialInfo.totalGroupEmployees}
                  </p>
                </div>
              )}
            </div>

            {/* Major Contracts */}
            {profile.financialInfo.majorContracts && profile.financialInfo.majorContracts.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold mb-3">Major Contracts (Publicly Disclosed)</h4>
                  <div className="space-y-2">
                    {profile.financialInfo.majorContracts.map((c) => (
                      <div key={c.project} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-border/30 last:border-0 gap-1">
                        <div className="flex-1">
                          <span className="text-sm">{c.project}</span>
                          <span className="text-xs text-muted-foreground ml-2">— {c.client}</span>
                        </div>
                        <span className="text-sm font-mono font-medium text-primary shrink-0">
                          {c.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Industry Benchmarks */}
            {profile.financialInfo.industryBenchmarks && profile.financialInfo.industryBenchmarks.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold mb-3">Industry Benchmarks — Bahrain Construction Sector</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {profile.financialInfo.industryBenchmarks.map((b) => (
                      <div key={b.metric} className="flex items-center justify-between py-1.5">
                        <span className="text-xs text-muted-foreground">{b.metric}</span>
                        <span className="text-xs font-mono font-medium">{b.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Banking Relationships */}
            {profile.financialInfo.bankingRelationships && profile.financialInfo.bankingRelationships.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold mb-3">Banking & Board Relationships</h4>
                  <ul className="space-y-1.5">
                    {profile.financialInfo.bankingRelationships.map((r) => (
                      <li key={r} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5 shrink-0">+</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Forbes & Awards */}
            {profile.financialInfo.awards && profile.financialInfo.awards.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold mb-3">Awards & Recognition</h4>
                  <ul className="space-y-1.5">
                    {profile.financialInfo.awards.map((a) => (
                      <li key={a} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5 shrink-0">★</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Subsidiaries */}
            {profile.financialInfo.subsidiaries && profile.financialInfo.subsidiaries.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold mb-3">
                    Group Subsidiaries
                    {profile.financialInfo.parentCompany && (
                      <span className="font-normal text-xs text-muted-foreground ml-2">
                        Parent: {profile.financialInfo.parentCompany}
                      </span>
                    )}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.financialInfo.subsidiaries.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Market Position */}
            {profile.financialInfo.marketPosition && (
              <>
                <Separator />
                <div className="bg-muted/40 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1">Market Position</h4>
                  <p className="text-sm">{profile.financialInfo.marketPosition}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Classification */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Classification
              <ConfidenceBadge score={profile.confidenceScores.sector ?? 0} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-xs text-muted-foreground">Primary Sector</span>
              <p className="text-sm font-medium">{profile.primarySector}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Secondary Sectors</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.secondarySectors.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Ownership</span>
              <p className="text-sm font-medium capitalize">
                {profile.ownershipType}
              </p>
            </div>
            {profile.geographicPresence && (
              <div>
                <span className="text-xs text-muted-foreground">Geographic Presence</span>
                <p className="text-sm font-medium">
                  {profile.geographicPresence.join(", ")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confidence Scores */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">AI Confidence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(profile.confidenceScores).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm capitalize">{key}</span>
                  <ConfidenceBadge score={value} />
                </div>
                <Progress value={value * 100} className="h-1.5" />
              </div>
            ))}
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
              <ConfidenceBadge score={profile.confidenceScores.capabilities ?? 0} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.capabilities.map((cap) => (
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
              {profile.productsServices.map((ps) => (
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
              <span className="text-xs text-muted-foreground">Certifications</span>
              {profile.certifications.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground/60 mt-1">
                  No certifications detected — consider adding ISO or industry
                  certifications to improve match scores.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Projects */}
      {profile.keyProjects && profile.keyProjects.length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Key Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {profile.keyProjects.map((p) => (
                <div key={p} className="text-sm text-muted-foreground flex items-start gap-2 py-1">
                  <span className="text-primary mt-0.5 shrink-0">▸</span>
                  {p}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
