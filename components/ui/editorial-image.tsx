"use client";

import { useState } from "react";

import Image from "next/image";

import { IMAGE_QUALITY, IMAGE_SIZES } from "@/constants/layout";

import { cn } from "@/lib/utils";

import type { EditorialImageProps } from "@/types";

export function EditorialImage({
  image,
  sizes = IMAGE_SIZES.editorialDefault,
  className,
  imageClassName,
  quality = IMAGE_QUALITY.default,
  fill = true,
  priority,
}: EditorialImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-border",
        !loaded && "animate-pulse motion-reduce:animate-none",
        className,
      )}
    >
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
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-opacity duration-500 motion-reduce:transition-none",
          loaded ? "opacity-100" : "opacity-0",
          imageClassName,
        )}
      />
    </div>
  );
}
