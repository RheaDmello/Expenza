import { varchar, serial, integer, numeric,text } from "drizzle-orm/pg-core";  
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


export const User = pgTable("user", {
  user_id: serial("id").primaryKey(),
  user_name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(), 
  created_date: varchar("created_date").notNull(),
  updated_date: varchar("updated_date")
});


export const Notes = pgTable("Goals", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(), 
  created_at: varchar("created_at").notNull(),
  updated_at: varchar("updated_at")
});