"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type ErrorMessageProps = {
  pageTitle?: string;
  contentTitle: string;
  content: React.ReactNode;
  imageUrl: string;
  actionText?: string;
  actionHref?: string;
};

export default function ErrorMessage({
  pageTitle = "",
  contentTitle,
  content,
  imageUrl,
  actionText = "Go back home",
  actionHref = "/",
}: ErrorMessageProps) {
  return (
    <>
      {pageTitle && <title>{pageTitle}</title>}
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12",
          "min-h-[60vh] p-6 sm:p-12 w-full max-w-4xl mx-auto", // Increased from max-w-2xl to max-w-4xl
        )}
      >
        {/* Image Wrapper */}
        {/* Added lg:max-w-xl and xl:max-w-2xl to let it scale up on bigger screens */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl">
          <Image
            src={imageUrl}
            alt={contentTitle}
            width={1200}
            height={720}
            priority
            className="w-full h-auto object-contain drop-shadow-sm"
          />
        </div>
        <span>{content}</span>
        {/* Call to Action Button */}
        <Link
          href={actionHref}
          className={clsx(
            "inline-flex items-center justify-center px-8 py-3.5",
            "text-base sm:text-lg font-medium tracking-wide transition-all duration-300",
            "bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1",
            "focus:outline-none focus:ring-4 focus:ring-slate-900/20 active:scale-95 active:translate-y-0",
          )}
        >
          {actionText}
        </Link>
      </div>
    </>
  );
}
