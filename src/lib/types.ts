export type Category =
  | "Rings"
  | "Necklaces"
  | "Bracelets"
  | "Earrings"
  | "Charms"
  | "All";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;          // in THB, e.g. 4500 — when priceTo is set, this is the minimum
  priceTo?: number;       // optional max price → renders as "฿X – ฿Y" (use for ranges)
  imageUrl: string;       // Google Drive direct link or /images/xxx.jpg — main image (cards + first in gallery)
  images?: string[];      // optional extra angles / on-model shots shown after imageUrl in the product gallery
  description: string;
  slug: string;
  inStock: boolean;
  featured: boolean;
  collectionName?: string;
  material?: string;      // e.g. "Sterling Silver", "18k Gold-filled" — optional
  tags?: string[];        // sub-category tags — e.g. ["Hearts"], ["Food"] for charms
}
