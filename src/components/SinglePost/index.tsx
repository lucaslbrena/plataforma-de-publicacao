import { findPublicPostBySlugCached } from "@/lib/post/queries/public";
import Image from "next/image";
import { PostHeading } from "../PostHeading";
import PostDate from "../PostDate";
import { SafeMarkdown } from "../SafeMarkdown";

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlugCached(slug);
  return (
    <article>
      <header className="group flex flex-col gap-4 mb-4">
        <Image
          className="rounded-xl"
          src={post.coverImageUrl}
          alt={post.title}
          width={1200}
          height={720}
          loading="eager"
        />

        <PostHeading as="h2" url={`/post/${post.slug}`}>
          {post.title}
        </PostHeading>
        <p>
          {post.author} | <PostDate dateTime={post.createdAt}></PostDate>
        </p>
      </header>

      <p>{post.excerpt}</p>

      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
