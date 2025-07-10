import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const dentists = pgTable("dentists", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  practiceName: text("practice_name").notNull(),
  licenseNumber: text("license_number").unique(),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  practiceName: text("practice_name"),
  practiceSize: text("practice_size"), // "1-5", "6-15", "16-50", "50+"
  currentSoftware: text("current_software"),
  primaryChallenge: text("primary_challenge"),
  preferredContactTime: text("preferred_contact_time"),
  message: text("message"),
  status: text("status").default("pending"), // "pending", "contacted", "scheduled", "completed"
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  firstName: text("first_name"),
  isActive: boolean("is_active").default(true),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  dentist: one(dentists, {
    fields: [users.id],
    references: [dentists.userId],
  }),
}));

export const dentistsRelations = relations(dentists, ({ one }) => ({
  user: one(users, {
    fields: [dentists.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const upsertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
});

export const insertDentistSchema = createInsertSchema(dentists).omit({
  id: true,
  createdAt: true,
});

export const insertDemoRequestSchema = createInsertSchema(demoRequests).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  isActive: true,
  subscribedAt: true,
});

// Types
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDentist = z.infer<typeof insertDentistSchema>;
export type Dentist = typeof dentists.$inferSelect;
export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type DemoRequest = typeof demoRequests.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;
