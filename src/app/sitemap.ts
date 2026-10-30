import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";

const SITE = "https://aeline-web.vercel.app";

const PAGES = ["", "/collections", "/charm-builder", "/about", "/care", "/size-guide", "/shipping", "/faq", "/privacy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  return [
    ...PAGES.map((path) => ({ url: `${SITE}${path}` })),
    ...products.map((p) => ({ url: `${SITE}/products/${p.slug}` })),
  ];
}
