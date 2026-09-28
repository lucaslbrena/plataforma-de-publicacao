import { log } from "console";
import ErrorMessage from "../ErrorMessage";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries/public";

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
  log("posts", posts.length);

  if (posts.length <= 1)
    return (
      <ErrorMessage
        contentTitle="Ops!"
        content="Ainda não temos postagens"
        imageUrl="/images/teste.png"
      />
    );
  const post = posts[0];

  const postLink = `/post/${post.slug}`;
  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: post.coverImageUrl,
          alt: post.title,
          priority: true,
        }}
      />

      <PostSummary
        postLink={postLink}
        postHeading="h1"
        createdAt={post.createdAt}
        excerpt={post.excerpt}
        title={post.title}
      />
    </section>
  );
}
