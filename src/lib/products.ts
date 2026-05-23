import { Product, Category } from "./types";

// ─── Fallback data (ใช้ตอน Google Sheets ยังไม่ได้ set up) ───────────────────
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Initial Charm Necklace — G",
    category: "Necklaces",
    price: 4500,
    imageUrl: "/images/product1.jpg",
    description: "Delicate initial charm on a 18k gold-filled chain.",
    slug: "initial-charm-necklace-g",
    inStock: true,
    featured: true,
    collectionName: "The Eden Collection",
  },
  {
    id: "2",
    name: "Stacking Ring Set",
    category: "Rings",
    price: 3200,
    imageUrl: "/images/product2.jpg",
    description: "Minimal gold stacking rings — sold as a set of 3.",
    slug: "stacking-ring-set",
    inStock: true,
    featured: true,
    collectionName: "The Eden Collection",
  },
  {
    id: "3",
    name: "Pearl Chain Bracelet",
    category: "Bracelets",
    price: 3800,
    imageUrl: "/images/product3.jpg",
    description: "Freshwater pearl and gold chain bracelet.",
    slug: "pearl-chain-bracelet",
    inStock: true,
    featured: false,
    collectionName: "The Eden Collection",
  },
  {
    id: "4",
    name: "Hoop Earrings — Small",
    category: "Earrings",
    price: 2900,
    imageUrl: "/images/product4.jpg",
    description: "Classic small hoop earrings in 18k gold-fill.",
    slug: "hoop-earrings-small",
    inStock: true,
    featured: true,
    collectionName: "The Eden Collection",
  },
  {
    id: "5",
    name: "Twisted Band Ring",
    category: "Rings",
    price: 2800,
    imageUrl: "/images/product5.jpg",
    description: "Elegantly twisted band ring in gold.",
    slug: "twisted-band-ring",
    inStock: true,
    featured: false,
  },
  {
    id: "6",
    name: "Layered Charm Necklace",
    category: "Necklaces",
    price: 5800,
    imageUrl: "/images/product6.jpg",
    description: "Two-layer charm necklace for effortless layering.",
    slug: "layered-charm-necklace",
    inStock: true,
    featured: true,
  },
  {
    id: "7",
    name: "Tennis Chain Bracelet",
    category: "Bracelets",
    price: 7500,
    imageUrl: "/images/product7.jpg",
    description: "Classic tennis chain in 18k gold-fill.",
    slug: "tennis-chain-bracelet",
    inStock: false,
    featured: false,
  },
  {
    id: "8",
    name: "Drop Earrings — Pearl",
    category: "Earrings",
    price: 3500,
    imageUrl: "/images/product8.jpg",
    description: "Freshwater pearl drop earrings on gold hooks.",
    slug: "drop-earrings-pearl",
    inStock: true,
    featured: false,
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
