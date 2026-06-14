import { IMAGE_IDS, unsplash } from "./images";

import type { Celebrity } from "@/types";

export const CELEBRITIES: Celebrity[] = [
  {
    name: "Alia Bhatt",
    image: unsplash(IMAGE_IDS.portrait1, {
      width: 600,
      height: 800,
      alt: "Alia Bhatt in Sahil Malik",
    }),
  },
  {
    name: "Zendaya",
    image: unsplash(IMAGE_IDS.portrait2, {
      width: 600,
      height: 800,
      alt: "Zendaya in Sahil Malik",
    }),
  },
  {
    name: "Kareena Kapoor",
    image: unsplash(IMAGE_IDS.portrait3, {
      width: 600,
      height: 800,
      alt: "Kareena Kapoor in Sahil Malik",
    }),
  },
  {
    name: "Priyanka Chopra",
    image: unsplash(IMAGE_IDS.portrait4, {
      width: 600,
      height: 800,
      alt: "Priyanka Chopra in Sahil Malik",
    }),
  },
  {
    name: "Ananya Pandey",
    image: unsplash(IMAGE_IDS.portrait5, {
      width: 600,
      height: 800,
      alt: "Ananya Pandey in Sahil Malik",
    }),
  },
  {
    name: "Gigi Hadid",
    image: unsplash(IMAGE_IDS.portrait6, {
      width: 600,
      height: 800,
      alt: "Gigi Hadid in Sahil Malik",
    }),
  },
];
