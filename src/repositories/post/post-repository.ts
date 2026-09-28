// aqui é criado a interface que vai definir os métodos que o repositório de posts deve ter
import { PostModel } from "@/models/post/post-model";

export interface PostRepository {
  findBySlugPublic(slug: string): unknown;
  findAllPublic(): Promise<PostModel[]>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  findBySlug(slug: string): Promise<PostModel>;
  delete(id: string): Promise<PostModel>;
  create(post: PostModel): Promise<PostModel>;
  update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">,
  ): Promise<PostModel>;
}
