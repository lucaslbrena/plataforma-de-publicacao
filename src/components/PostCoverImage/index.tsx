import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type PostCoverImageProps = {
  imageProps: ComponentProps<typeof Image>;
  linkProps: ComponentProps<typeof Link>;
};

export function PostCoverImage({ imageProps, linkProps }: PostCoverImageProps) {
  return (
    <Link
      {...linkProps}
      className={clsx(
        "w-full h-full overflow-hidden rounded-xl",
        linkProps.className,
      )}
    >
      <Image
        {...imageProps}
        className={clsx(
          "w-full h-full object-cover object-center group-hover:scale-105 transition",
          imageProps.className,
        )}
        alt={imageProps.alt}
        width={1200}
        height={720}
        priority
      ></Image>
    </Link>
  );
}
