// aqui é criado o modelo de dados que representa um post, com os campos que ele deve ter, para que possamos usar esse modelo em diferentes partes do sistema, como por exemplo no repositório de posts, ou no serviço de posts.
export type PostModel = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: string;
};
