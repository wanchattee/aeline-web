import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#F5F0E8", color: "#0A0A0A", borderTop: "1px solid #DDD5C5" }}>

      {/* ── Main content — 4-column refined ── */}
      <div
        style={{ padding: "4rem clamp(1.5rem, 5vw, 4rem) 3rem" }}
        className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-6 gap-y-10 md:gap-12"
      >

        {/* Brand col */}
        <div>
          <span style={{
            fontSize: "1rem",
            letterSpacing: "0.38em",
            fontWeight: 700,
            color: "#0A0A0A",
          }} className="uppercase block">
            AELINE C
          </span>
          <div style={{
            width: 28,
            height: 1,
            backgroundColor: "#1B4332",
            margin: "1.25rem 0",
          }} />
          <p style={{
            fontSize: "0.75rem",
            color: "#5C5C5C",
            lineHeight: 1.85,
            letterSpacing: "0.02em",
            maxWidth: 260,
            marginBottom: "1.5rem",
          }}>
            Fine jewelry handcrafted in Bangkok — designed for women who carry their own world quietly, gracefully.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
            <a href="https://www.instagram.com/aeline.c" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "#0A0A0A", opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
              <InstagramIcon />
            </a>
            <a href="https://line.me/ti/p/~@aelinec" target="_blank" rel="noopener noreferrer" aria-label="LINE" style={{ color: "#0A0A0A", opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
              <LineIcon />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61563070916816" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "#0A0A0A", opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
              <FacebookIcon />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <p style={{
            fontSize: "0.563rem",
            letterSpacing: "0.3em",
            color: "#1B4332",
            marginBottom: "1.5rem",
          }} className="uppercase font-semibold">
            Shop
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              ["New Arrivals", "/collections"],
              ["Charm Bar", "/charm-builder"],
              ["Rings", "/collections?category=Rings"],
              ["Necklaces", "/collections?category=Necklaces"],
              ["Bracelets", "/collections?category=Bracelets"],
              ["Earrings", "/collections?category=Earrings"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  style={{
                    fontSize: "0.75rem",
                    color: "#3A3A3A",
                    letterSpacing: "0.04em",
                  }}
                  className="hover:text-black hover:opacity-60 transition-all"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Maison */}
        <div>
          <p style={{
            fontSize: "0.563rem",
            letterSpacing: "0.3em",
            color: "#1B4332",
            marginBottom: "1.5rem",
          }} className="uppercase font-semibold">
            Maison
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              ["Our Story", "/about"],
              ["Craftsmanship", "/craftsmanship"],
              ["Sustainability", "/sustainability"],
              ["Care Guide", "/care"],
              ["Size Guide", "/size-guide"],
              ["Journal", "/journal"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  style={{
                    fontSize: "0.75rem",
                    color: "#3A3A3A",
                    letterSpacing: "0.04em",
                  }}
                  className="hover:text-black hover:opacity-60 transition-all"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Client services */}
        <div>
          <p style={{
            fontSize: "0.563rem",
            letterSpacing: "0.3em",
            color: "#1B4332",
            marginBottom: "1.5rem",
          }} className="uppercase font-semibold">
            Client Services
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li>
              <a
                href="https://line.me/ti/p/~@aelinec"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.75rem",
                  color: "#0A0A0A",
                  letterSpacing: "0.04em",
                  fontWeight: 500,
                }}
                className="hover:opacity-60 transition-opacity"
              >
                LINE · @aelinec
              </a>
            </li>
            <li>
              <p style={{ fontSize: "0.75rem", color: "#3A3A3A", letterSpacing: "0.04em" }}>
                Mon – Sat
              </p>
              <p style={{ fontSize: "0.75rem", color: "#3A3A3A", letterSpacing: "0.04em" }}>
                10:00 – 18:00 ICT
              </p>
            </li>
            <li>
              <Link
                href="/shipping"
                style={{ fontSize: "0.75rem", color: "#3A3A3A", letterSpacing: "0.04em" }}
                className="hover:text-black hover:opacity-60 transition-all"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                style={{ fontSize: "0.75rem", color: "#3A3A3A", letterSpacing: "0.04em" }}
                className="hover:text-black hover:opacity-60 transition-all"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Legal bottom bar — refined ── */}
      <div style={{
        borderTop: "1px solid #DDD5C5",
        padding: "1.5rem clamp(1.5rem, 5vw, 4rem)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        backgroundColor: "#EFE9DC",
      }}>
        <p style={{ fontSize: "0.625rem", letterSpacing: "0.12em", color: "#8B8472" }}>
          © 2025 AELINE C · Crafted with care in Bangkok
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <Link
              key={item}
              href="#"
              style={{ fontSize: "0.625rem", letterSpacing: "0.12em", color: "#8B8472" }}
              className="uppercase hover:text-black transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
