import { postRepository } from "@/repositories/post";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findAllPublicPostsCached = cache(
  unstable_cache(
    cache(async () => {
      return await postRepository.findAllPublic();
    }),
    ["posts"],
    {
      tags: ["posts"],
    },
  ),
);

export const findPublicPostBySlugCached = (slug: string) =>
  unstable_cache(
    async () => {
      const post = await postRepository.findBySlug(slug).catch(() => undefined);

      if (!post) notFound();
      return post;
    },
    [`post-${slug}-v2`], // Chave única por post (com sufixo de versão para invalidar o cache antigo imediatamente)
    {
      tags: [`post-${slug}`, "posts"],
      revalidate: 60, // Revalida a cada 60s em produção
    },
  )();
