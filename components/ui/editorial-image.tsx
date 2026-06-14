"use client";

import type { ImageAsset } from "@/lib/data/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type EditorialImageProps = {
  image: ImageAsset;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  quality?: number;
  fill?: boolean;
  priority?: boolean;
};

export function EditorialImage({
  image,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className,
  imageClassName,
  quality = 75,
  fill = true,
  priority,
}: EditorialImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-border", !loaded && "animate-pulse", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={fill ? undefined : image.width}
        height={fill ? undefined : image.height}
        fill={fill}
        sizes={sizes}
        quality={priority || image.priority ? 85 : quality}
        priority={priority ?? image.priority}
        fetchPriority={priority || image.priority ? "high" : "auto"}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          imageClassName,
        )}
      />
    </div>
  );
}
