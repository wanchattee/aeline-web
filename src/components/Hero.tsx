"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full" style={{ marginTop: "97px" }}>
      {/* 3-column editorial grid — Balenciaga style */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full" style={{ height: "calc(100vh - 97px)" }}>
        {/* Column 1 */}
        <div className="relative overflow-hidden group">
          <Image
            src="/images/hero1.jpg"
            alt="Aeline.c collection"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="33vw"
            priority
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20" />
        </div>

        {/* Column 2 — center with text overlay */}
        <div className="relative overflow-hidden group">
          <Image
            src="/images/hero2.jpg"
            alt="Aeline.c fine jewelry"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="33vw"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center">
            <p
              style={{
                color: "#F5F0E8",
                fontSize: "0.625rem",
                letterSpacing: "0.25em",
                marginBottom: "0.75rem",
              }}
              className="uppercase font-medium"
            >
              New Collection
            </p>
            <h1
              style={{
                color: "#F5F0E8",
                fontSize: "2.25rem",
                letterSpacing: "0.3em",
                fontWeight: "700",
                lineHeight: 1.1,
              }}
              className="uppercase mb-8"
            >
              THE EDEN
              <br />
              COLLECTION
            </h1>
            <Link
              href="/collections"
              style={{
                color: "#F5F0E8",
                fontSize: "0.625rem",
                letterSpacing: "0.2em",
                borderBottom: "1px solid #F5F0E8",
                paddingBottom: "2px",
              }}
              className="uppercase font-medium hover:opacity-70 transition-opacity"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Column 3 */}
        <div className="relative overflow-hidden group">
          <Image
            src="/images/hero3.jpg"
            alt="Aeline.c jewelry"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="33vw"
            priority
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20" />
        </div>
      </div>
    </section>
  );
}
