import {
    pgTable,
    serial,
    text,
    timestamp,
    jsonb,
    boolean,
    integer,
} from "drizzle-orm/pg-core";

// Users Table
export const userTable = pgTable("users", {
    id: serial("id").primaryKey(),
    clerkId: text("clerkId").notNull().unique(),
    firstName: text("firstName"),
    lastName: text("lastName"),
    email: text("email").unique().notNull(),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    country: text("country"),
    postalCode: integer("postalCode"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    isSubscribed: boolean("isSubscribed").notNull().default(false),
    subscribedAt: timestamp("subscribedAt"),
    subscriptionKey: text("subscriptionKey"),
    unsubscribedAt: timestamp("unsubscribedAt"),
    tests: jsonb("tests").default([]),
    testsLimit: integer("testsLimit").default(3),
});

// Tests Table
export const testTable = pgTable("tests", {
    id: serial("id").primaryKey(),
    testId: text("testId").notNull().unique(),
    title: text("title").notNull(),
    jobDescription: text("jobDescription"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    questions: jsonb("questions").default([]),
    summary: jsonb("summary").default([]),
    clerkId: text("clerkId")
        .references(() => userTable.clerkId)
        .notNull(), // Foreign key to users table
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertTest = typeof testTable.$inferInsert;
export type SelectTest = typeof testTable.$inferSelect;
