"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Charm library ─────────────────────────────────────────────────────────
const CHARMS = {
  puffyHeart:   { name: "Puffy Heart",   price: 890,  img: "/images/charms/charm1.png" },
  pinkDonut:    { name: "Pink Donut",    price: 790,  img: "/images/charms/charm2.png" },
  cloverFlower: { name: "Clover Flower", price: 890,  img: "/images/charms/charm3.png" },
  cherry:       { name: "Cherry",        price: 790,  img: "/images/charms/charm4.png" },
  starHeart:    { name: "Star Heart",    price: 990,  img: "/images/charms/charm5.png" },
  ribbonBow:    { name: "Ribbon Bow",    price: 790,  img: "/images/charms/charm6.png" },
};

const BASE_PRICE = 2500;

// ─── 4 curated sets — story-driven, emotion-first ─────────────────────────
const SETS = [
  {
    id: "romantic",
    name: "The Romantic",
    tagline: "For the dreamers who love love",
    story: "Four charms of softness, sweetness, and quiet adoration — meant for the one who notices small beauties everywhere.",
    charms: [CHARMS.puffyHeart, CHARMS.starHeart, CHARMS.pinkDonut, CHARMS.ribbonBow],
    accent: "#D4A5A5",
  },
  {
    id: "dreamer",
    name: "The Dreamer",
    tagline: "Wishing on stars, finding luck in every moment",
    story: "A trio that whispers — the four-leaf clover, the heart of the star, the donut that tastes of sunlit mornings.",
    charms: [CHARMS.starHeart, CHARMS.cloverFlower, CHARMS.pinkDonut],
    accent: "#C5B89D",
  },
  {
    id: "adventurer",
    name: "The Adventurer",
    tagline: "Pick your moments. Wear them forever.",
    story: "Cherry-bold, clover-lucky, star-bright — for the woman who collects experiences like other people collect souvenirs.",
    charms: [CHARMS.cherry, CHARMS.cloverFlower, CHARMS.starHeart],
    accent: "#1B4332",
  },
  {
    id: "minimalist",
    name: "The Minimalist",
    tagline: "Less is more. Two charms, infinite meaning.",
    story: "Two charms only — a puffy heart and a star heart. Quiet luxury for the woman who never needs to prove anything.",
    charms: [CHARMS.puffyHeart, CHARMS.starHeart],
    accent: "#0A0A0A",
  },
];

function formatPrice(n: number) {
  return `฿${n.toLocaleString()}`;
}

function setTotal(charms: typeof SETS[0]["charms"]) {
  return BASE_PRICE + charms.reduce((s, c) => s + c.price, 0);
}

function lineOrderUrl(set: typeof SETS[0]) {
  const total = setTotal(set.charms);
  const msg = encodeURIComponent(
    `สวัสดีค่ะ/ครับ — สนใจสั่ง Charm Bar Bracelet:\n\n` +
    `🌹 ${set.name}\n` +
    set.charms.map((c, i) => `   ${i + 1}. ${c.name}`).join("\n") +
    `\n\nรวม: ฿${total.toLocaleString()}`
  );
  return `https://line.me/ti/p/~@aelinec?msg=${msg}`;
}

export default function CharmBuilderPage() {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main style={{ paddingTop: "61px", minHeight: "100vh", backgroundColor: "#FAFAF8" }}>

        {/* ── HERO ── */}
        <section style={{
          position: "relative",
          height: "65vh",
          minHeight: 500,
          overflow: "hidden",
          backgroundColor: "#F5F0E8",
        }}>
          <Image
            src="/images/hero_coffee.jpg"
            alt="Aeline.c Charm Bar Bracelet"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            sizes="100vw"
          />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)" }} />

          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "0 2rem",
          }}>
            <p style={{
              color: "#F5F0E8", fontSize: "0.625rem",
              letterSpacing: "0.3em", marginBottom: "1rem",
            }} className="uppercase font-medium">
              Charm Bar Bracelet
            </p>
            <h1 style={{
              color: "#F5F0E8", fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "0.25em", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.25rem",
            }} className="uppercase">
              FIND YOUR STORY
            </h1>
            <p style={{
              color: "#F5F0E8", fontSize: "0.75rem", letterSpacing: "0.15em",
              maxWidth: 540, lineHeight: 1.8, opacity: 0.9,
            }} className="uppercase">
              Four curated bracelets, four worlds. Pick the one that already feels like you.
            </p>
          </div>
        </section>

        {/* ── BREADCRUMB ── */}
        <div style={{
          padding: "1.5rem 4rem 0",
          borderBottom: "1px solid #E8E4DC",
          paddingBottom: "1rem",
        }}>
          <nav style={{ fontSize: "0.563rem", letterSpacing: "0.12em" }} className="flex gap-2 uppercase text-gray-400">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-black">Charm Bar</span>
          </nav>
        </div>

        {/* ── SETS GRID ── */}
        <section style={{ padding: "4rem 4rem 5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: "#6B6B6B", marginBottom: "0.75rem" }} className="uppercase font-medium">
              Curated Collections
            </p>
            <h2 style={{ fontSize: "1.5rem", letterSpacing: "0.18em", fontWeight: 600 }} className="uppercase">
              Choose Your Set
            </h2>
            <p style={{ fontSize: "0.75rem", color: "#6B6B6B", marginTop: "0.75rem", letterSpacing: "0.04em" }}>
              Each set is hand-picked by our designer. Order via LINE — we craft and ship within 7–10 days.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            maxWidth: 1400,
            margin: "0 auto",
          }}>
            {SETS.map((set) => {
              const total = setTotal(set.charms);
              const isHovered = hoveredSet === set.id;

              return (
                <article
                  key={set.id}
                  onMouseEnter={() => setHoveredSet(set.id)}
                  onMouseLeave={() => setHoveredSet(null)}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #E8E4DC",
                    transition: "all 0.35s ease",
                    transform: isHovered ? "translateY(-6px)" : "none",
                    boxShadow: isHovered
                      ? "0 24px 48px rgba(0,0,0,0.10)"
                      : "0 2px 6px rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* ── Charms display (the visual sell) ── */}
                  <div style={{
                    backgroundColor: "#F9F6F0",
                    padding: "2.5rem 1.5rem 2rem",
                    borderBottom: "1px solid #E8E4DC",
                    position: "relative",
                    minHeight: 280,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {/* Bracelet (faint, as backdrop) */}
                    <div style={{
                      position: "absolute",
                      top: "30%",
                      left: "8%",
                      right: "8%",
                      height: 60,
                      opacity: 0.55,
                    }}>
                      <Image
                        src="/images/charms/bracelet.png"
                        alt=""
                        fill
                        style={{ objectFit: "contain" }}
                        unoptimized
                      />
                    </div>

                    {/* Charms — front and center */}
                    <div style={{
                      position: "relative",
                      zIndex: 2,
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      marginTop: 70,
                      flexWrap: "wrap",
                    }}>
                      {set.charms.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            width: 72,
                            height: 72,
                            position: "relative",
                            filter: `drop-shadow(0 6px 12px rgba(0,0,0,0.18))`,
                            transition: "transform 0.3s ease",
                            transform: isHovered ? `translateY(${i % 2 === 0 ? -4 : -2}px) rotate(${(i - 1.5) * 3}deg)` : "none",
                          }}
                        >
                          <Image
                            src={c.img}
                            alt={c.name}
                            fill
                            style={{ objectFit: "contain" }}
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Story & meta ── */}
                  <div style={{ padding: "1.75rem 1.5rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{
                      width: 24,
                      height: 1,
                      backgroundColor: set.accent,
                      marginBottom: "1rem",
                    }} />
                    <h3 style={{
                      fontSize: "0.875rem",
                      letterSpacing: "0.2em",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                    }} className="uppercase">
                      {set.name}
                    </h3>
                    <p style={{
                      fontSize: "0.625rem",
                      letterSpacing: "0.08em",
                      color: set.accent,
                      marginBottom: "1rem",
                      fontStyle: "italic",
                    }}>
                      {set.tagline}
                    </p>
                    <p style={{
                      fontSize: "0.75rem",
                      color: "#5C5C5C",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                      flex: 1,
                    }}>
                      {set.story}
                    </p>

                    {/* Charms list */}
                    <div style={{
                      borderTop: "1px solid #F0EDE8",
                      paddingTop: "1rem",
                      marginBottom: "1.25rem",
                    }}>
                      <p style={{ fontSize: "0.5rem", letterSpacing: "0.18em", color: "#9B9B9B", marginBottom: "0.5rem" }} className="uppercase">
                        Includes
                      </p>
                      <ul style={{ fontSize: "0.688rem", color: "#3A3A3A", lineHeight: 1.9 }}>
                        <li>· Charm Bar Bracelet (silver, adjustable)</li>
                        {set.charms.map((c, i) => (
                          <li key={i}>· {c.name}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Price + CTA */}
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <p style={{ fontSize: "0.625rem", letterSpacing: "0.12em", color: "#6B6B6B" }} className="uppercase">
                        Set price
                      </p>
                      <p style={{ fontSize: "1.125rem", color: set.accent, fontWeight: 700 }}>
                        {formatPrice(total)}
                      </p>
                    </div>

                    <a
                      href={lineOrderUrl(set)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        backgroundColor: isHovered ? set.accent : "#0A0A0A",
                        color: "#F5F0E8",
                        fontSize: "0.625rem",
                        letterSpacing: "0.22em",
                        padding: "1rem",
                        textAlign: "center",
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                      }}
                      className="uppercase font-medium"
                    >
                      Order via LINE
                    </a>
                    <p style={{ fontSize: "0.5rem", color: "#9B9B9B", letterSpacing: "0.08em", textAlign: "center", marginTop: "0.625rem" }} className="uppercase">
                      Crafted to order · 7–10 days
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Custom request ── */}
        <section style={{
          padding: "3rem 4rem 5rem",
          textAlign: "center",
          borderTop: "1px solid #E8E4DC",
          backgroundColor: "#fff",
        }}>
          <p style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: "#6B6B6B", marginBottom: "0.5rem" }} className="uppercase font-medium">
            Want something different?
          </p>
          <h3 style={{ fontSize: "1.125rem", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "1rem" }} className="uppercase">
            Build Your Own
          </h3>
          <p style={{ fontSize: "0.75rem", color: "#6B6B6B", maxWidth: 480, margin: "0 auto 1.5rem", lineHeight: 1.8 }}>
            Mix and match any charms you love. Message us on LINE and our designer will craft a bracelet just for you.
          </p>
          <a
            href={`https://line.me/ti/p/~@aelinec?msg=${encodeURIComponent("สวัสดีค่ะ/ครับ — สนใจ custom Charm Bar Bracelet ค่ะ/ครับ")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              border: "1px solid #0A0A0A",
              color: "#0A0A0A",
              fontSize: "0.625rem",
              letterSpacing: "0.22em",
              padding: "0.875rem 2.5rem",
              textDecoration: "none",
            }}
            className="uppercase font-medium hover:bg-black hover:text-white transition-colors"
          >
            Message Our Designer
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
