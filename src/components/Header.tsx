"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{ borderBottom: "1px solid #E8E4DC" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white"
    >
      {/* Main navigation — same 4rem padding as page content */}
      <nav
        style={{ padding: "0.875rem 4rem" }}
        className="flex items-center justify-between relative"
      >
        {/* Left nav */}
        <div className="hidden md:flex items-center gap-7 flex-1">
          <Link href="/collections" className="nav-item">Collections</Link>
          <Link href="/charm-builder" className="nav-item">Charm Bar</Link>
          <Link href="/rings" className="nav-item">Rings</Link>
          <Link href="/necklaces" className="nav-item">Necklaces</Link>
          <Link href="/bracelets" className="nav-item">Bracelets</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-5"
          aria-label="Menu"
        >
          <span
            style={{ backgroundColor: "#0A0A0A", height: "1px" }}
            className={`block w-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
          />
          <span
            style={{ backgroundColor: "#0A0A0A", height: "1px" }}
            className={`block w-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            style={{ backgroundColor: "#0A0A0A", height: "1px" }}
            className={`block w-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
          />
        </button>

        {/* Center logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1.125rem",
                letterSpacing: "0.38em",
                fontWeight: "700",
                textTransform: "uppercase",
                color: "#0A0A0A",
              }}
            >
              AELINE.C
            </span>
          </Link>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
          <Link href="/earrings" className="nav-item">Earrings</Link>
          <Link href="/about" className="nav-item">About</Link>
          <div style={{ width: 1, height: 14, backgroundColor: "#E0DACB" }} />
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="nav-icon-btn"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <button className="nav-icon-btn" aria-label="Wishlist">
            <HeartIcon />
          </button>
          <button className="nav-icon-btn relative" aria-label="Cart">
            <BagIcon />
            <span
              style={{
                backgroundColor: "#1B4332",
                color: "#fff",
                fontSize: "0.5rem",
                lineHeight: 1,
              }}
              className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold"
            >
              0
            </span>
          </button>
        </div>

        {/* Mobile right icons */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <SearchIcon />
          </button>
          <button className="relative" aria-label="Cart">
            <BagIcon />
          </button>
        </div>
      </nav>

      {/* Search bar */}
      {searchOpen && (
        <div
          style={{
            borderTop: "1px solid #E8E4DC",
            borderBottom: "1px solid #E8E4DC",
            padding: "0.875rem 4rem",
          }}
          className="flex items-center gap-3 animate-in slide-in-from-top duration-200"
        >
          <SearchIcon />
          <input
            autoFocus
            type="text"
            placeholder="WHAT ARE YOU LOOKING FOR?"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              color: "#0A0A0A",
            }}
            className="flex-1 outline-none bg-transparent placeholder:text-gray-400 uppercase"
          />
          <button
            onClick={() => setSearchOpen(false)}
            style={{ fontSize: "0.625rem", letterSpacing: "0.1em" }}
            className="uppercase text-gray-400 hover:text-black transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{ borderTop: "1px solid #E8E4DC" }}
          className="md:hidden absolute left-0 right-0 bg-white shadow-lg z-50"
        >
          {["Collections", "Charm Bar", "Rings", "Necklaces", "Bracelets", "Earrings", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                borderBottom: "1px solid #E8E4DC",
                padding: "1rem 4rem",
              }}
              className="block uppercase font-medium hover:bg-stone-50 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        .nav-item {
          font-size: 0.688rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 500;
          color: #0A0A0A;
          transition: opacity 0.2s ease;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }
        .nav-item:hover {
          opacity: 0.5;
        }
        .nav-icon-btn {
          color: #0A0A0A;
          transition: opacity 0.2s ease;
          cursor: pointer;
        }
        .nav-icon-btn:hover {
          opacity: 0.5;
        }
      `}</style>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
