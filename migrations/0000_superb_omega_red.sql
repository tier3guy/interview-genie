CREATE TABLE IF NOT EXISTS "tests" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"jobDescription" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"questions" jsonb DEFAULT '[]'::jsonb,
	"summary" jsonb DEFAULT '[]'::jsonb,
	"clerkId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkId" text NOT NULL,
	"firstName" text,
	"lastName" text,
	"email" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"isSubscribed" boolean DEFAULT false NOT NULL,
	"subscribedAt" timestamp,
	"subscriptionKey" text,
	"unsubscribedAt" timestamp,
	"tests" jsonb DEFAULT '[]'::jsonb,
	CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tests" ADD CONSTRAINT "tests_clerkId_users_clerkId_fk" FOREIGN KEY ("clerkId") REFERENCES "public"."users"("clerkId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
