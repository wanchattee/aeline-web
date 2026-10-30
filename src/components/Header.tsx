"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  function submitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearchOpen(false);
    router.push(`/collections?q=${encodeURIComponent(q)}`);
  }

  return (
    <header
      style={{ borderBottom: "1px solid #E8E4DC" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white"
    >
      {/* Main navigation — same 4rem padding as page content */}
      <nav
        style={{ padding: "0.875rem clamp(1rem, 4vw, 4rem)" }}
        className="flex items-center justify-between relative"
      >
        {/* Left nav */}
        <div className="hidden md:flex items-center gap-7 flex-1">
          <Link href="/collections" className="nav-item">Collections</Link>
          <Link href="/charm-builder" className="nav-item">Charm Bar</Link>
          {/* Category links collide with the centered logo below ~1400px — Collections tabs cover them there */}
          <Link href="/collections?category=Rings" className="nav-item hidden min-[1400px]:inline">Rings</Link>
          <Link href="/collections?category=Necklaces" className="nav-item hidden min-[1400px]:inline">Necklaces</Link>
          <Link href="/collections?category=Bracelets" className="nav-item hidden min-[1400px]:inline">Bracelets</Link>
          <Link href="/collections?category=Earrings" className="nav-item hidden min-[1400px]:inline">Earrings</Link>
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
              AELINE C
            </span>
          </Link>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
          <Link href="/about" className="nav-item">About</Link>
          <div style={{ width: 1, height: 14, backgroundColor: "#E0DACB" }} />
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="nav-icon-btn"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>

        {/* Mobile right icons */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <SearchIcon />
          </button>
        </div>
      </nav>

      {/* Search bar */}
      {searchOpen && (
        <form
          onSubmit={submitSearch}
          role="search"
          style={{
            borderTop: "1px solid #E8E4DC",
            borderBottom: "1px solid #E8E4DC",
            padding: "0.875rem clamp(1rem, 4vw, 4rem)",
          }}
          className="flex items-center gap-3 animate-in slide-in-from-top duration-200"
        >
          <SearchIcon />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
            placeholder="WHAT ARE YOU LOOKING FOR?"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              color: "#0A0A0A",
            }}
            className="flex-1 outline-none bg-transparent placeholder:text-gray-400 uppercase"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            style={{ fontSize: "0.625rem", letterSpacing: "0.1em" }}
            className="uppercase text-gray-400 hover:text-black transition-colors"
          >
            Close
          </button>
        </form>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{ borderTop: "1px solid #E8E4DC" }}
          className="md:hidden absolute left-0 right-0 bg-white shadow-lg z-50"
        >
          {[
            { label: "Collections", href: "/collections" },
            { label: "Charm Bar", href: "/charm-builder" },
            { label: "Rings", href: "/collections?category=Rings" },
            { label: "Necklaces", href: "/collections?category=Necklaces" },
            { label: "Bracelets", href: "/collections?category=Bracelets" },
            { label: "Earrings", href: "/collections?category=Earrings" },
            { label: "About", href: "/about" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                borderBottom: "1px solid #E8E4DC",
                padding: "1rem clamp(1.5rem, 5vw, 4rem)",
              }}
              className="block uppercase font-medium hover:bg-stone-50 transition-colors"
            >
              {label}
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
