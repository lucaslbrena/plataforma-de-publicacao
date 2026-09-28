import PostListAdmin from "@/components/admin/PostListAdmin";
import SpinLoader from "@/components/SpinLoader";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Post",
};
export default async function AdminPostPage() {
  return (
    <>
      <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
        <PostListAdmin />
      </Suspense>
    </>
  );
}
