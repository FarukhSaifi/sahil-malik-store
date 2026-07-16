import { SITE } from "@/constants/site";

import { getCelebrities } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { CelebrityGrid } from "@/components/sections/celebrity-grid";

export const metadata = buildMetadata({
  title: `${SITE.pages.asSeenOn.metaTitle} | ${SITE.name}`,
  description: SITE.pages.asSeenOn.metaDescription,
  path: SITE.routes.asSeenOn,
});

export default function AsSeenOnPage() {
  const celebrities = getCelebrities();

  return <CelebrityGrid archive celebrities={celebrities} showViewAll={false} />;
}
