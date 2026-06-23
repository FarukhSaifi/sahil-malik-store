import Image from "next/image";

import { IMAGE_QUALITY, IMAGE_SIZES } from "@/constants/layout";

import { cn } from "@/lib/utils";

import type { EditorialImageProps } from "@/types";

/**
 * EditorialImage component optimized for performance.
 * Now a Server Component to reduce client-side JS.
 * Uses CSS-only pulse and built-in Next.js blur placeholder.
 */
export function EditorialImage({
  image,
  sizes = IMAGE_SIZES.editorialDefault,
  className,
  imageClassName,
  quality = IMAGE_QUALITY.default,
  fill = true,
  priority,
}: EditorialImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-border", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={fill ? undefined : image.width}
        height={fill ? undefined : image.height}
        fill={fill}
        sizes={sizes}
        quality={priority || image.priority ? IMAGE_QUALITY.priority : quality}
        priority={priority ?? image.priority}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
