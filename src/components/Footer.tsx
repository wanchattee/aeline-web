import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A0A0A", color: "#F5F0E8" }}>
      {/* Newsletter */}
      <div
        style={{ borderBottom: "1px solid #2A2A2A" }}
        className="px-6 py-12 text-center"
      >
        <p
          style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: "#C4A882" }}
          className="uppercase mb-3"
        >
          Join the Circle
        </p>
        <h3
          style={{ fontSize: "1.5rem", letterSpacing: "0.15em", fontWeight: "600" }}
          className="uppercase mb-6"
        >
          Subscribe & Receive 10% Off
        </h3>
        <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
          <input
            type="email"
            placeholder="YOUR EMAIL ADDRESS"
            style={{
              backgroundColor: "transparent",
              border: "1px solid #3A3A3A",
              color: "#F5F0E8",
              fontSize: "0.688rem",
              letterSpacing: "0.1em",
              padding: "0.875rem 1rem",
            }}
            className="flex-1 outline-none placeholder:text-gray-600 focus:border-white transition-colors"
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#1B4332",
              color: "#F5F0E8",
              fontSize: "0.625rem",
              letterSpacing: "0.2em",
              padding: "0.875rem 1.5rem",
              border: "none",
              whiteSpace: "nowrap",
            }}
            className="uppercase font-medium hover:bg-opacity-80 transition-opacity cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Main footer links */}
      <div className="px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <span
            style={{
              fontSize: "1rem",
              letterSpacing: "0.35em",
              fontWeight: "700",
              color: "#F5F0E8",
            }}
            className="uppercase block mb-4"
          >
            AELINE.C
          </span>
          <p
            style={{ fontSize: "0.75rem", lineHeight: 1.8, color: "#6B6B6B" }}
          >
            Fine jewelry handcrafted
            <br />
            in Bangkok, Thailand.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-white transition-colors">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="LINE" className="text-gray-500 hover:text-white transition-colors">
              <LineIcon />
            </a>
            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-white transition-colors">
              <FacebookIcon />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <p
            style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: "#C4A882" }}
            className="uppercase font-medium mb-4"
          >
            Shop
          </p>
          <ul className="space-y-3">
            {["New Arrivals", "Rings", "Necklaces", "Bracelets", "Earrings", "Gift Cards"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  style={{ fontSize: "0.75rem", color: "#6B6B6B", letterSpacing: "0.06em" }}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <p
            style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: "#C4A882" }}
            className="uppercase font-medium mb-4"
          >
            Information
          </p>
          <ul className="space-y-3">
            {["About", "Sustainability", "Care Guide", "Size Guide", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  style={{ fontSize: "0.75rem", color: "#6B6B6B", letterSpacing: "0.06em" }}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p
            style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: "#C4A882" }}
            className="uppercase font-medium mb-4"
          >
            Client Services
          </p>
          <ul className="space-y-3">
            <li>
              <p style={{ fontSize: "0.75rem", color: "#6B6B6B" }}>LINE: @aelinec</p>
            </li>
            <li>
              <p style={{ fontSize: "0.75rem", color: "#6B6B6B" }}>
                Mon – Sat: 10:00 – 18:00
              </p>
            </li>
            <li>
              <Link
                href="/shipping"
                style={{ fontSize: "0.75rem", color: "#6B6B6B" }}
                className="hover:text-white transition-colors"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                style={{ fontSize: "0.75rem", color: "#6B6B6B" }}
                className="hover:text-white transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: "1px solid #1A1A1A" }}
        className="px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3"
      >
        <p style={{ fontSize: "0.625rem", letterSpacing: "0.1em", color: "#3A3A3A" }}>
          © 2025 AELINE.C. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms", "Cookie Policy"].map((item) => (
            <Link
              key={item}
              href="#"
              style={{ fontSize: "0.625rem", letterSpacing: "0.08em", color: "#3A3A3A" }}
              className="hover:text-gray-400 transition-colors"
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
