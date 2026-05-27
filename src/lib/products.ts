import { Product, Category } from "./types";

// ─── Fallback data (ใช้ตอน Google Sheets ยังไม่ได้ set up) ───────────────────
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Nine Lucky Gemstones",
    category: "Necklaces",
    price: 1290,
    imageUrl: "/images/products/nine-lucky-gemstones.png",
    description: "Initial letter pendant framed by nine multi-colored gemstones — each stone hand-set in 18k gold-plated brass. A modern take on the lucky letter charm.",
    slug: "nine-lucky-gemstones",
    inStock: true,
    featured: true,
    collectionName: "The Eden Collection",
  },
  {
    id: "2",
    name: "Bracelet Silver",
    category: "Bracelets",
    price: 490,
    imageUrl: "/images/products/bracelet-silver.png",
    description: "Sterling-finished paperclip chain bracelet. Lightweight, layerable, and built to wear every day.",
    slug: "bracelet-silver",
    inStock: true,
    featured: true,
    collectionName: "Essentials",
  },
  {
    id: "3",
    name: "Charm Bar Bracelet",
    category: "Bracelets",
    price: 1490,
    imageUrl: "/images/products/charm-bar.png",
    description: "Our signature gold charm bar bracelet — twisted-link chain, adjustable extension. The canvas for your story. Pair with charms below.",
    slug: "charm-bar-bracelet",
    inStock: true,
    featured: true,
    collectionName: "Charm Bar",
  },
  {
    id: "4",
    name: "Charm Bar — Individual Charms",
    category: "Bracelets",
    price: 50,
    priceTo: 150,
    imageUrl: "/images/products/charm.png",
    description: "Hand-picked charms to make your bracelet yours. Each charm priced individually from ฿50 to ฿150. Choose your own combination via LINE.",
    slug: "charm-bar-charms",
    inStock: true,
    featured: true,
    collectionName: "Charm Bar",
  },
];

// ─── Fetch จาก Google Apps Script ────────────────────────────────────────────
async function fetchFromSheets(): Promise<Product[]> {
  const url = process.env.GOOGLE_SHEETS_API_URL;
  if (!url) return FALLBACK_PRODUCTS;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 }, // cache 60 วินาที — auto refresh ทุกนาที
    });

    if (!res.ok) throw new Error(`Sheets fetch failed: ${res.status}`);

    const json = await res.json();

    // ── parse rows จาก Apps Script response ──────────────────────────────────
    // format: { products: [...] } ตาม script ที่เราเขียน
    if (!json.products || !Array.isArray(json.products)) {
      throw new Error("Invalid response format from Google Sheets");
    }

    return json.products.map(
      (row: Record<string, string>): Product => ({
        id: String(row.id ?? ""),
        name: String(row.name ?? ""),
        category: (row.category as Category) ?? "Rings",
        price: Number(row.price) || 0,
        priceTo: row.price_to ? Number(row.price_to) || undefined : undefined,
        imageUrl: String(row.image_url ?? "/images/product1.jpg"),
        description: String(row.description ?? ""),
        slug: String(row.slug ?? row.name?.toLowerCase().replace(/\s+/g, "-") ?? ""),
        inStock: String(row.in_stock).toUpperCase() === "TRUE",
        featured: String(row.featured).toUpperCase() === "TRUE",
        collectionName: row.collection_name ? String(row.collection_name) : undefined,
      })
    );
  } catch (err) {
    console.error("[products] Using fallback data —", err);
    return FALLBACK_PRODUCTS;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function getAllProducts(): Promise<Product[]> {
  return fetchFromSheets();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await fetchFromSheets();
  return all.filter((p) => p.featured && p.inStock);
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  const all = await fetchFromSheets();
  if (category === "All") return all;
  return all.filter((p) => p.category === category);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await fetchFromSheets();
  return all.find((p) => p.slug === slug);
}

export function formatPrice(thb: number): string {
  return `฿${thb.toLocaleString("th-TH")}`;
}

// Format a product's price — handles price ranges (priceTo)
export function formatProductPrice(p: Pick<Product, "price" | "priceTo">): string {
  if (p.priceTo && p.priceTo > p.price) {
    return `${formatPrice(p.price)} – ${formatPrice(p.priceTo)}`;
  }
  return formatPrice(p.price);
}
