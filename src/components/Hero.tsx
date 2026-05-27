"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section style={{
      position: "relative",
      width: "100%",
      marginTop: "61px",
      height: "calc(100vh - 61px)",
      minHeight: 600,
      overflow: "hidden",
      backgroundColor: "#F5F0E8",
    }}>
      <Image
        src="/images/hero_coffee.jpg"
        alt="Aeline.c — Fine jewelry, Bangkok"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
        sizes="100vw"
      />
      {/* gradient overlay — darker at bottom for text readability */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)",
      }} />

      {/* Centered editorial text */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 2rem",
      }}>
        <p style={{
          color: "#F5F0E8",
          fontSize: "0.625rem",
          letterSpacing: "0.35em",
          marginBottom: "1.25rem",
          opacity: 0.95,
        }} className="uppercase font-medium">
          New Collection · Spring 2026
        </p>
        <h1 style={{
          color: "#F5F0E8",
          fontSize: "clamp(2rem, 5vw, 3.75rem)",
          letterSpacing: "0.25em",
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: "1.5rem",
        }} className="uppercase">
          THE EDEN
          <br />
          COLLECTION
        </h1>
        <p style={{
          color: "#F5F0E8",
          fontSize: "0.813rem",
          letterSpacing: "0.12em",
          maxWidth: 540,
          lineHeight: 1.85,
          opacity: 0.92,
          marginBottom: "2.5rem",
        }}>
          Quiet pieces for women who carry their own world gracefully.
          Handcrafted in Bangkok.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/collections"
            style={{
              backgroundColor: "#F5F0E8",
              color: "#0A0A0A",
              fontSize: "0.625rem",
              letterSpacing: "0.22em",
              padding: "1rem 2.5rem",
              textDecoration: "none",
            }}
            className="uppercase font-medium hover:opacity-80 transition-opacity"
          >
            Shop the Collection
          </Link>
          <Link
            href="/charm-builder"
            style={{
              backgroundColor: "transparent",
              color: "#F5F0E8",
              fontSize: "0.625rem",
              letterSpacing: "0.22em",
              padding: "1rem 2.5rem",
              border: "1px solid #F5F0E8",
              textDecoration: "none",
            }}
            className="uppercase font-medium hover:bg-white hover:text-black transition-all"
          >
            Build Your Charm Bar
          </Link>
        </div>
      </div>
    </section>
  );
}
