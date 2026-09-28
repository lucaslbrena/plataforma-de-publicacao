// aqui fica os métodos que vão lidar com os posts

import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { resolve } from "path";
import { readFile } from "fs/promises";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(ROOT_DIR, "src/db/seed/posts.json");

//  nao esta mais sendo usado. drizzle-post-repository esta em uso
export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  }
  async findBySlugPublic(slug: string): Promise<PostModel> {
    throw new Error("Method not implemented.");
  }
  async findAllPublic(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();
    return posts.filter((post) => post.published);
  }

  async findAll(): Promise<PostModel[]> {
    // await this.simulateWait();
    const posts = await this.readFromDisk();
    return posts;
  }
  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find((post) => post.id === id);

    if (!post) throw new Error("Post nao encontrado");

    return post;
  }
  async findBySlug(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find((post) => post.slug === slug);

    if (!post) throw new Error("Post nao encontrado para slug " + slug);

    return post;
  }
  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">,
  ): Promise<PostModel> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<PostModel> {
    throw new Error("Method not implemented.");
  }
  async create(post: PostModel): Promise<PostModel> {
    throw new Error("Method not implemented.");
  }
}

export const postRepository = new JsonPostRepository();
