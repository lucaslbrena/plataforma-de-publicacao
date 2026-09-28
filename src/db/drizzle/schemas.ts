import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
  id: text("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("coverImageUrl").notNull(),
  published: boolean("published").notNull(),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt").notNull(),
});

export type PostTableSelectMode = InferSelectModel<typeof postsTable>;

export type PostTableInsertMode = InferInsertModel<typeof postsTable>;

// import { InferInsertModel, InferSelectModel } from "drizzle-orm";
// import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// export const postsTable = sqliteTable("posts", {
//   id: text("id").primaryKey(),
//   slug: text("slug").unique().notNull(),
//   title: text("title").notNull(),
//   author: text("author").notNull(),
//   excerpt: text("excerpt").notNull(),
//   content: text("content").notNull(),
//   coverImageUrl: text("coverImageUrl").notNull(),
//   published: integer("published", { mode: "boolean" }).notNull(),
//   createdAt: text("createdAt").notNull(),
//   updatedAt: text("updatedAt").notNull(),
// });

// export type PostTableSelectMode = InferSelectModel<typeof postsTable>;

// export type PostTableInsertMode = InferInsertModel<typeof postsTable>;
