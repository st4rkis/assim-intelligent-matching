import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

// ─── Users ───────────────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  externalId: varchar("external_id", { length: 255 }).unique(),
  email: varchar("email", { length: 500 }).notNull().unique(),
  name: varchar("name", { length: 500 }),
  plan: varchar("plan", { length: 20 }).default("free").notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 100 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 100 }),
  matchesUsedThisMonth: integer("matches_used_this_month").default(0),
  matchesResetAt: timestamp("matches_reset_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ─── Companies ───────────────────────────────────────────────────
export const companies = pgTable(
  "companies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    externalUserId: varchar("external_user_id", { length: 255 }),
    name: varchar("name", { length: 500 }).notNull(),
    websiteUrl: varchar("website_url", { length: 1000 }),
    logoUrl: varchar("logo_url", { length: 1000 }),
    description: text("description"),

    // Classification
    primarySector: varchar("primary_sector", { length: 200 }),
    secondarySectors: jsonb("secondary_sectors").default([]),
    isicCodes: jsonb("isic_codes").default([]),
    naceCodes: jsonb("nace_codes").default([]),

    // Geography
    country: varchar("country", { length: 2 }),
    city: varchar("city", { length: 200 }),
    operatingCountries: jsonb("operating_countries").default([]),
    targetMarkets: jsonb("target_markets").default([]),

    // Size & Structure
    sizeCategory: varchar("size_category", { length: 20 }),
    employeeRange: varchar("employee_range", { length: 20 }),
    estimatedRevenueRange: varchar("estimated_revenue_range", { length: 50 }),
    yearsInOperation: integer("years_in_operation"),
    ownershipType: varchar("ownership_type", { length: 50 }),
    ownershipNationality: varchar("ownership_nationality", { length: 2 }),
    isFemaleOwned: boolean("is_female_owned"),

    // Capabilities
    capabilities: jsonb("capabilities").default([]),
    productsServices: jsonb("products_services").default([]),
    certifications: jsonb("certifications").default([]),
    technologyStack: jsonb("technology_stack").default([]),
    notableClients: jsonb("notable_clients").default([]),
    notableProjects: jsonb("notable_projects").default([]),

    // AI Metadata
    aiSummary: text("ai_summary"),
    aiProfileVersion: integer("ai_profile_version").default(1),
    lastProfiledAt: timestamp("last_profiled_at", { withTimezone: true }),
    confidenceScores: jsonb("confidence_scores").default({}),

    // User Overrides
    userVerifiedFields: jsonb("user_verified_fields").default([]),
    userCorrections: jsonb("user_corrections").default({}),

    // Preferences
    opportunityTypesInterest: jsonb("opportunity_types_interest").default([]),
    minOpportunityValue: numeric("min_opportunity_value"),
    maxOpportunityValue: numeric("max_opportunity_value"),
    notificationFrequency: varchar("notification_frequency", { length: 20 }).default("weekly"),

    // Metadata
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_companies_country").on(table.country),
    index("idx_companies_sector").on(table.primarySector),
    index("idx_companies_user").on(table.userId),
  ]
);

// ─── Opportunities ───────────────────────────────────────────────
export const opportunities = pgTable(
  "opportunities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fingerprint: varchar("fingerprint", { length: 64 }).unique(),
    title: varchar("title", { length: 1000 }).notNull(),
    type: varchar("type", { length: 20 }).notNull(), // grant, tender, financing, private_rfp
    sourceName: varchar("source_name", { length: 500 }),
    sourceUrl: varchar("source_url", { length: 1000 }),
    sourceCountry: varchar("source_country", { length: 2 }),
    sourceRegion: varchar("source_region", { length: 20 }),
    sectors: jsonb("sectors").default([]),
    keywords: jsonb("keywords").default([]),
    valueMin: numeric("value_min"),
    valueMax: numeric("value_max"),
    valueCurrency: varchar("value_currency", { length: 3 }),
    fundingType: varchar("funding_type", { length: 20 }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    deadline: timestamp("deadline", { withTimezone: true }),
    status: varchar("status", { length: 20 }).default("open"),
    description: text("description"),
    descriptionSummary: text("description_summary"),
    originalUrl: varchar("original_url", { length: 1000 }),
    originalLanguage: varchar("original_language", { length: 10 }),
    eligibility: jsonb("eligibility").default({}).notNull(),
    ingestionSource: varchar("ingestion_source", { length: 100 }),
    confidenceScore: numeric("confidence_score"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_opportunities_status").on(table.status),
    index("idx_opportunities_country").on(table.sourceCountry),
    index("idx_opportunities_deadline").on(table.deadline),
  ]
);

// ─── Matches ─────────────────────────────────────────────────────
export const matches = pgTable(
  "matches",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
    opportunityId: uuid("opportunity_id")
      .notNull()
      .references(() => opportunities.id, { onDelete: "cascade" }),
    eligibilityScore: integer("eligibility_score").notNull(),
    relevanceScore: integer("relevance_score").notNull(),
    competitivenessScore: integer("competitiveness_score").notNull(),
    combinedScore: integer("combined_score").notNull(),
    recommendation: varchar("recommendation", { length: 20 }),
    eligibilityDetail: jsonb("eligibility_detail"),
    relevanceDetail: jsonb("relevance_detail"),
    competitivenessDetail: jsonb("competitiveness_detail"),
    summary: text("summary"),
    nextSteps: jsonb("next_steps").default([]),
    scoredAt: timestamp("scored_at", { withTimezone: true }).defaultNow(),
    modelVersion: varchar("model_version", { length: 50 }),
  },
  (table) => [
    uniqueIndex("idx_matches_unique").on(table.companyId, table.opportunityId),
    index("idx_matches_company").on(table.companyId),
    index("idx_matches_opportunity").on(table.opportunityId),
    index("idx_matches_score").on(table.combinedScore),
  ]
);

// ─── Scoring Queue ───────────────────────────────────────────────
export const scoringQueue = pgTable(
  "scoring_queue",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
    opportunityId: uuid("opportunity_id")
      .notNull()
      .references(() => opportunities.id, { onDelete: "cascade" }),
    attempts: integer("attempts").default(0),
    lastError: text("last_error"),
    nextRetryAt: timestamp("next_retry_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    uniqueIndex("idx_scoring_queue_unique").on(table.companyId, table.opportunityId),
  ]
);

// ─── Notifications ───────────────────────────────────────────────
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  matchId: uuid("match_id").references(() => matches.id),
  channel: varchar("channel", { length: 20 }).default("email"),
  status: varchar("status", { length: 20 }).default("pending"),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Ingestion Runs ──────────────────────────────────────────────
export const ingestionRuns = pgTable("ingestion_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  sourceName: varchar("source_name", { length: 100 }).notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  opportunitiesFound: integer("opportunities_found").default(0),
  opportunitiesNew: integer("opportunities_new").default(0),
  opportunitiesUpdated: integer("opportunities_updated").default(0),
  errors: jsonb("errors").default([]),
  status: varchar("status", { length: 20 }).default("running"),
});
