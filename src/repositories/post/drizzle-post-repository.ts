import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { drizzleDb } from "@/db/drizzle";
import { postsTable } from "@/db/drizzle/schemas";
import { desc, eq, and } from "drizzle-orm";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    const query = await drizzleDb
      .select()
      .from(postsTable)
      .where(eq(postsTable.published, true))
      .orderBy(desc(postsTable.createdAt));
    return query;
  }
  async findBySlugPublic(slug: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: and(eq(postsTable.slug, slug), eq(postsTable.published, true)),

      orderBy: desc(postsTable.createdAt),
    });
    if (!post) throw new Error("slug" + slug + "Post nao encontrado");

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: desc(postsTable.createdAt),
    });

    return posts;
  }
  async findById(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.id, id),
    });
    if (!post) throw new Error("Id" + id + "Post nao encontrado");
    return post;
  }
  async findBySlug(slug: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.slug, slug),
    });
    if (!post) throw new Error("slug" + slug + "Post nao encontrado");

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: {
        id: true,
        slug: true,
      },
    });
    if (!!postExists) {
    }

    await drizzleDb.insert(postsTable).values(post).returning();
    return post;
  }
  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.id, id),
    });
    if (!post) {
      throw new Error("Post nao existe");
    }
    await drizzleDb.delete(postsTable).where(eq(postsTable.id, post.id));

    return post;
  }
  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error("Post não existe");
    }

    const updatedAt = new Date().toISOString();
    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };
    const post = await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }
}

(async () => {
  // const repo = new DrizzlePostRepository();
  // const data = {
  //   id: "8b2d4b61-c0a4-4b7c-91b5-ef8c4d72a9f3",
  //   title: "Introdução ao Docker: por que todo desenvolvedor deveria aprender",
  //   slug: "introducao-ao-docker-por-que-todo-desenvolvedor-deveria-aprender",
  //   excerpt:
  //     "Entenda como o Docker facilita a criação de ambientes consistentes e elimina o famoso 'na minha máquina funciona'.",
  //   content:
  //     "O Docker revolucionou a forma como aplicações são desenvolvidas e implantadas. Ao empacotar uma aplicação com todas as suas dependências em um contêiner, ele garante que o software funcione da mesma maneira em qualquer ambiente. Isso reduz problemas de configuração, simplifica o processo de deploy e melhora a colaboração entre equipes. Aprender Docker é um passo importante para quem deseja atuar com desenvolvimento moderno, DevOps ou computação em nuvem.",
  //   coverImageUrl: "/images/teste.png",
  //   published: true,
  //   createdAt: "2025-03-18T14:20:00",
  //   updatedAt: "2025-03-18T14:20:00",
  //   author: "Rafael Costa",
  // };
  // const posts = await repo.findAllPublic();
  //   // const posts = await repo.findAll();
  // await repo.updatePost(data);
  // const porra = await repo.findById("bc9a540f-66a9-4ab0-8d50-6216ab1cac53");
  // await repo.deletePostById("bc9a540f-66a9-4ab0-8d50-6216ab1cac53");
  //   const post = await repo.findBySlug("os-desafios-do-trabalho-remoto-moderno");
  //   const posts = await repo.findBySlugPublic("rotina-matinal-de-pessoas-altamente-eficazes");
  // await repo.createPost(data);
  // console.log("porra", posts);
})();
