import { boolean, int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 20 }).default("admin").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  businessName: varchar("business_name", { length: 120 }).notNull().default("RX Castillo Digital"),
  legalName: varchar("legal_name", { length: 150 }).default("RX Castillo Digital"),
  primarySlogan: text("primary_slogan").notNull(),
  secondarySlogan: text("secondary_slogan").notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 40 }).default(""),
  phoneNumber: varchar("phone_number", { length: 40 }).default(""),
  email: varchar("email", { length: 120 }).default("contacto@rxcastillodigital.com"),
  officeAddress: text("office_address").notNull(),
  availabilityText: varchar("availability_text", { length: 60 }).notNull().default("24/7"),
  nightShiftNotice: text("night_shift_notice").notNull(),
  pacsSoftware: varchar("pacs_software", { length: 60 }).default("Eden PACS"),
  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  logoUrl: text("logo_url"),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  title: varchar("title", { length: 120 }).notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  imageUrl: text("image_url").notNull(),
  iconName: varchar("icon_name", { length: 40 }).notNull().default("Activity"),
  featuresJson: text("features_json").notNull(), // JSON array
  studyTypesJson: text("study_types_json"), // JSON array
  order: int("display_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const coverageAreas = mysqlTable("coverage_areas", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 80 }).notNull().unique(),
  state: varchar("state", { length: 40 }).default("Nayarit").notNull(),
  description: text("description").notNull(),
  badgeText: varchar("badge_text", { length: 50 }).default("Atención a domicilio"),
  order: int("display_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
});

export const statistics = mysqlTable("statistics", {
  id: int("id").autoincrement().primaryKey(),
  value: varchar("value", { length: 40 }).notNull(),
  suffix: varchar("suffix", { length: 20 }).default(""),
  label: varchar("label", { length: 80 }).notNull(),
  description: text("description").notNull(),
  order: int("display_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
});

export const faqs = mysqlTable("faqs", {
  id: int("id").autoincrement().primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: int("display_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
});

export const contactInquiries = mysqlTable("contact_inquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  locality: varchar("locality", { length: 80 }).notNull(),
  serviceRequired: varchar("service_required", { length: 80 }).notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type ServiceItem = typeof services.$inferSelect;
export type CoverageArea = typeof coverageAreas.$inferSelect;
export type StatisticItem = typeof statistics.$inferSelect;
export type FaqItem = typeof faqs.$inferSelect;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
