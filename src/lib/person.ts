// JSON-LD Person for Home and About (tech spec §9). No employer here: the role line is
// shown on the About page only (decision 0001).
import { site } from "../config";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  sameAs: site.sameAs,
};
