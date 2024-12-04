import { Name } from "drizzle-orm";
import { varchar, serial, integer, numeric, text } from "drizzle-orm/pg-core";  
import { pgTable } from "drizzle-orm/pg-core";

export const Budgets = pgTable('Budgets', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  amount: varchar('amount').notNull(),
  icon: varchar('icon'),
  createdBy: varchar('createdBy').notNull(),
});

export const Expenses = pgTable('expense', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  amount: numeric('amount'),
  budgetId: integer('budgetId').references(() => Budgets.id),
  createdAt: varchar('createdAt').notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),  // Primary key for the users table
  Name: text('user_name'),
  email: text('email').notNull().unique(),  // Make email unique
});

export const Notes = pgTable("Goals", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(), 
  created_at: varchar("created_at").notNull(),
  updated_at: varchar("updated_at")
  
});
