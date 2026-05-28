// ─── Charm types ─────────────────────────────────────────────────────────────
export type CharmCategory =
  | "All"
  | "Hearts"
  | "Symbols"
  | "Food"
  | "Nature"
  | "Letters"
  | "Animals";

export interface Charm {
  id: string;
  name: string;
  slug: string;
  category: CharmCategory;
  price: number;
  imageUrl: string;
  material: string;       // e.g. "Silver", "18k Gold-filled", "Enamel"
  description?: string;
  inStock: boolean;
  featured: boolean;
}

// ─── Fallback data (used when Google Sheets is not set up) ───────────────────
const FALLBACK_CHARMS: Charm[] = [
  {
    id: "c1",
    name: "Puffy Heart",
    slug: "puffy-heart",
    category: "Hearts",
    price: 890,
    imageUrl: "/images/charms/charm1.png",
    material: "Sterling Silver",
    description: "A smooth, dimensional puffy heart. The quiet classic.",
    inStock: true,
    featured: true,
  },
  {
    id: "c2",
    name: "Pink Donut",
    slug: "pink-donut",
    category: "Food",
    price: 790,
    imageUrl: "/images/charms/charm2.png",
    material: "Silver + Enamel",
    description: "Hand-painted pink enamel donut with sprinkle detail.",
    inStock: true,
    featured: true,
  },
  {
    id: "c3",
    name: "Clover Flower",
    slug: "clover-flower",
    category: "Nature",
    price: 890,
    imageUrl: "/images/charms/charm3.png",
    material: "Sterling Silver",
    description: "Four-leaf clover — for luck that finds you when you're not looking.",
    inStock: true,
    featured: false,
  },
  {
    id: "c4",
    name: "Cherry",
    slug: "cherry",
    category: "Food",
    price: 790,
    imageUrl: "/images/charms/charm4.png",
    material: "Silver + Enamel",
    description: "A pair of cherries with bright enamel finish.",
    inStock: true,
    featured: false,
  },
  {
    id: "c5",
    name: "Star Heart",
    slug: "star-heart",
    category: "Hearts",
    price: 990,
    imageUrl: "/images/charms/charm5.png",
    material: "Sterling Silver",
    description: "A heart cradling a tiny star — a wish made wearable.",
    inStock: true,
    featured: true,
  },
  {
    id: "c6",
    name: "Ribbon Bow",
    slug: "ribbon-bow",
    category: "Symbols",
    price: 790,
    imageUrl: "/images/charms/charm6.png",
    material: "Sterling Silver",
    description: "A delicate silver ribbon — soft, feminine, timeless.",
    inStock: true,
    featured: true,
  },
];

// ─── Fetch from Google Apps Script (same pattern as products) ────────────────
async function fetchFromSheets(): Promise<Charm[]> {
  const url = process.env.GOOGLE_SHEETS_CHARMS_URL;
  if (!url) return FALLBACK_CHARMS;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Charms sheet fetch failed: ${res.status}`);

    const json = await res.json();
    if (!json.charms || !Array.isArray(json.charms)) {
      throw new Error("Invalid response format from charms sheet");
    }

    return json.charms.map(
      (row: Record<string, string>): Charm => ({
        id: String(row.id ?? ""),
        name: String(row.name ?? ""),
        slug: String(row.slug ?? row.name?.toLowerCase().replace(/\s+/g, "-") ?? ""),
        category: (row.category as CharmCategory) ?? "Symbols",
        price: Number(row.price) || 0,
        imageUrl: String(row.image_url ?? ""),
        material: String(row.material ?? "Silver"),
        description: row.description ? String(row.description) : undefined,
        inStock: String(row.in_stock).toUpperCase() === "TRUE",
        featured: String(row.featured).toUpperCase() === "TRUE",
      })
    );
  } catch (err) {
    console.error("[charms] Using fallback data —", err);
    return FALLBACK_CHARMS;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function getAllCharms(): Promise<Charm[]> {
  return fetchFromSheets();
}

export async function getCharmsByCategory(category: CharmCategory): Promise<Charm[]> {
  const all = await fetchFromSheets();
  if (category === "All") return all;
  return all.filter((c) => c.category === category);
}

export async function getCharmCategories(): Promise<CharmCategory[]> {
  const all = await fetchFromSheets();
  const set = new Set<CharmCategory>(["All"]);
  all.forEach((c) => set.add(c.category));
  return Array.from(set);
}

export function formatCharmPrice(thb: number): string {
  return `฿${thb.toLocaleString("th-TH")}`;
}

export function charmLineOrderUrl(charm: Charm): string {
  const msg = encodeURIComponent(
    `สวัสดีค่ะ/ครับ — สนใจสั่งซื้อ charm:\n\n` +
    `• ${charm.name}\n` +
    `• ${charm.material}\n` +
    `• ราคา ${formatCharmPrice(charm.price)}\n`
  );
  return `https://line.me/ti/p/~@aelinec?msg=${msg}`;
}
