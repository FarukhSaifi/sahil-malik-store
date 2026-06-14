import type { ImageAsset } from "@/lib/data/types";
import { BLUR_DATA_URL } from "./site";

/** Verified working Unsplash photo IDs (404-safe) */
export const IMAGE_IDS = {
  heroRunway: "1490481651871-ab68de25d43d",
  heroEditorial: "1469334031218-e382a71b716b",
  heroEmbroidery: "1558618666-fcd25c85cd64",
  eveningGown: "1595777457583-95e059d581b8",
  bridal: "1572804013309-59a88b7e92f1",
  menswear: "1507679799987-c73779587ccf",
  saree: "1610030469983-98e550d6193c",
  couture: "1515372039744-b8f02a3ae446",
  fashionWalk: "1556905055-8f358a7a47b2",
  editorial: "1445205170230-053b83016050",
  atelier: "1558769132-cb1aea458c5e",
  portrait1: "1524504388940-b1c1722653e1",
  portrait2: "1529626455594-4ff0802cfb7e",
  portrait3: "1488426862026-3ee34a7d66df",
  portrait4: "1534528741775-53994a69daeb",
  portrait5: "1520813792240-56fc4a3765a7",
  portrait6: "1566174053879-31528523f8ae",
  lookbookAlt: "1496747611176-843222e1e57c",
} as const;

type UnsplashOptions = {
  width: number;
  height?: number;
  alt: string;
  priority?: boolean;
};

export function unsplash(id: string, options: UnsplashOptions): ImageAsset {
  const height = options.height ?? Math.round(options.width * 1.25);

  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${options.width}&q=80`,
    alt: options.alt,
    width: options.width,
    height,
    blurDataURL: BLUR_DATA_URL,
    priority: options.priority,
  };
}

export function galleryFromIds(ids: string[], altPrefix: string, width = 1200): ImageAsset[] {
  return ids.map((id, i) =>
    unsplash(id, {
      width,
      alt: `${altPrefix} look ${i + 1}`,
    }),
  );
}
