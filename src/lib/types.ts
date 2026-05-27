export type Category = "Rings" | "Necklaces" | "Bracelets" | "Earrings" | "All";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;          // in THB, e.g. 4500 — when priceTo is set, this is the minimum
  priceTo?: number;       // optional max price → renders as "฿X – ฿Y" (use for ranges)
  imageUrl: string;       // Google Drive direct link or /images/xxx.jpg
  description: string;
  slug: string;
  inStock: boolean;
  featured: boolean;
  collectionName?: string;
}
