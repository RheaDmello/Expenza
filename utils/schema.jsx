import { varchar, serial, integer, numeric } from "drizzle-orm/pg-core";  
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
