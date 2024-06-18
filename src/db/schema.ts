import { doublePrecision, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const productTable = pgTable("products", {
  id: text("id").primaryKey().default("uuid_generator_v4"),
  name: text("name").notNull(),
  imageId: text("imageId").notNull(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Product = typeof productTable.$inferSelect;
