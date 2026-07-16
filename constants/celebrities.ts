import { localImage } from "@/constants/images";
import { SITE } from "@/constants/site";

import type { Celebrity } from "@/types";

function celebImage(src: string, name?: string) {
  return localImage(src, {
    width: 600,
    height: 800,
    alt: name ? `${name} in Sahil Malik` : SITE.sections.asSeenOn.unnamedAlt,
  });
}

/**
 * Full As Seen On archive from `public/media/Celeb Photos`
 * (exact duplicate source files omitted). Omit `name` when identity is uncertain.
 */
export const CELEBRITIES: Celebrity[] = [
  {
    id: "salim-merchant",
    name: "Salim Merchant",
    featured: true,
    image: celebImage("/media/celebrities/salim-merchant.jpg", "Salim Merchant"),
  },
  {
    id: "manoj-bajpayee",
    name: "Manoj Bajpayee",
    featured: true,
    image: celebImage("/media/celebrities/manoj-bajpayee.jpg", "Manoj Bajpayee"),
  },
  {
    id: "darshan-raval",
    name: "Darshan Raval",
    featured: true,
    image: celebImage("/media/celebrities/darshan-raval.jpg", "Darshan Raval"),
  },
  {
    id: "saina-nehwal",
    name: "Saina Nehwal",
    featured: true,
    image: celebImage("/media/celebrities/saina-nehwal.jpg", "Saina Nehwal"),
  },
  {
    id: "as-seen-on-05",
    name: "Soundarya Sharma",
    featured: true,
    image: celebImage("/media/celebrities/soundarya-sharma.jpg"),
  },
  {
    id: "vikas-khanna",
    name: "Vikas Khanna",
    featured: true,
    image: celebImage("/media/celebrities/vikas-khanna.jpg", "Vikas Khanna"),
  },
  {
    id: "salim-merchant-02",
    name: "Salim Merchant",
    image: celebImage("/media/celebrities/salim-merchant-02.jpg", "Salim Merchant"),
  },
  {
    id: "manoj-bajpayee-02",
    name: "Manoj Bajpayee",
    image: celebImage("/media/celebrities/manoj-bajpayee-02.jpg", "Manoj Bajpayee"),
  },
  {
    id: "as-seen-on-09",
    image: celebImage("/media/celebrities/salim-merchant-03.jpg"),
  },
  {
    id: "darshan-raval-02",
    image: celebImage("/media/celebrities/darshan-raval-02.jpg", "Darshan Raval"),
  },
  {
    id: "as-seen-on-11",
    image: celebImage("/media/celebrities/salim-merchant-meta.jpg"),
  },
];
