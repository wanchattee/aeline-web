import { Product, Category } from "./types";

// ─── Fallback data — single source of truth for ALL product categories ────────
// (used when Google Sheets is not set up)
const FALLBACK_PRODUCTS: Product[] = [
  // ── Necklaces ──────────────────────────────────────────────────────────────
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
    material: "18k Gold-plated Brass",
  },

  // ── Bracelets ──────────────────────────────────────────────────────────────
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
    material: "Sterling Silver",
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
    material: "18k Gold-filled",
  },

  // ── Charms ─────────────────────────────────────────────────────────────────
  {
    id: "c1",
    name: "Puffy Heart",
    category: "Charms",
    price: 890,
    imageUrl: "/images/charms/charm1.png",
    description: "A smooth, dimensional puffy heart. The quiet classic.",
    slug: "charm-puffy-heart",
    inStock: true,
    featured: true,
    collectionName: "Charm Bar",
    material: "Sterling Silver",
    tags: ["Hearts"],
  },
  {
    id: "c2",
    name: "Pink Donut",
    category: "Charms",
    price: 790,
    imageUrl: "/images/charms/charm2.png",
    description: "Hand-painted pink enamel donut with sprinkle detail.",
    slug: "charm-pink-donut",
    inStock: true,
    featured: true,
    collectionName: "Charm Bar",
    material: "Silver + Enamel",
    tags: ["Food"],
  },
  {
    id: "c3",
    name: "Clover Flower",
    category: "Charms",
    price: 890,
    imageUrl: "/images/charms/charm3.png",
    description: "Four-leaf clover — for luck that finds you when you're not looking.",
    slug: "charm-clover-flower",
    inStock: true,
    featured: false,
    collectionName: "Charm Bar",
    material: "Sterling Silver",
    tags: ["Nature"],
  },
  {
    id: "c4",
    name: "Cherry",
    category: "Charms",
    price: 790,
    imageUrl: "/images/charms/charm4.png",
    description: "A pair of cherries with bright enamel finish.",
    slug: "charm-cherry",
    inStock: true,
    featured: false,
    collectionName: "Charm Bar",
    material: "Silver + Enamel",
    tags: ["Food"],
  },
  {
    id: "c5",
    name: "Star Heart",
    category: "Charms",
    price: 990,
    imageUrl: "/images/charms/charm5.png",
    description: "A heart cradling a tiny star — a wish made wearable.",
    slug: "charm-star-heart",
    inStock: true,
    featured: true,
    collectionName: "Charm Bar",
    material: "Sterling Silver",
    tags: ["Hearts"],
  },
  {
    id: "c6",
    name: "Ribbon Bow",
    category: "Charms",
    price: 790,
    imageUrl: "/images/charms/charm6.png",
    description: "A delicate silver ribbon — soft, feminine, timeless.",
    slug: "charm-ribbon-bow",
    inStock: true,
    featured: true,
    collectionName: "Charm Bar",
    material: "Sterling Silver",
    tags: ["Symbols"],
  },
];

// ─── Fetch from Google Apps Script ────────────────────────────────────────────
async function fetchFromSheets(): Promise<Product[]> {
  const url = process.env.GOOGLE_SHEETS_API_URL;
  if (!url) return FALLBACK_PRODUCTS;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 }, // cache 60s — auto refresh every minute
    });

    if (!res.ok) throw new Error(`Sheets fetch failed: ${res.status}`);

    const json = await res.json();

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
        material: row.material ? String(row.material) : undefined,
        tags: row.tags
          ? String(row.tags).split(",").map((t) => t.trim()).filter(Boolean)
          : undefined,
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

// ── Featured on home page — excludes Charms (those live on their own page) ──
export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await fetchFromSheets();
  return all.filter((p) => p.featured && p.inStock && p.category !== "Charms");
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

// ── Charm-specific helpers ──────────────────────────────────────────────────
export async function getAllCharms(): Promise<Product[]> {
  const all = await fetchFromSheets();
  return all.filter((p) => p.category === "Charms");
}

export async function getCharmTags(): Promise<string[]> {
  const charms = await getAllCharms();
  const set = new Set<string>();
  charms.forEach((c) => c.tags?.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

// ── Pricing helpers ─────────────────────────────────────────────────────────
export function formatPrice(thb: number): string {
  return `฿${thb.toLocaleString("th-TH")}`;
}

export function formatProductPrice(p: Pick<Product, "price" | "priceTo">): string {
  if (p.priceTo && p.priceTo > p.price) {
    return `${formatPrice(p.price)} – ${formatPrice(p.priceTo)}`;
  }
  return formatPrice(p.price);
}

// ── LINE order link for a single product (used by charm cards) ──────────────
export function productLineOrderUrl(p: Product): string {
  const lines = [
    `สวัสดีค่ะ/ครับ — สนใจสั่งซื้อ:`,
    ``,
    `• ${p.name}`,
    p.material ? `• ${p.material}` : null,
    `• ราคา ${formatProductPrice(p)}`,
  ].filter(Boolean);
  return `https://line.me/ti/p/~@aelinec?msg=${encodeURIComponent(lines.join("\n"))}`;
}
