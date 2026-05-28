import Link from "next/link";
import Image from "next/image";

export default function BrandBanner() {
  return (
    <section className="w-full relative overflow-hidden" style={{ height: "60vh", minHeight: "400px" }}>
      <Image
        src="/images/product6.jpg"
        alt="Aeline C brand"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(27, 67, 50, 0.7)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p
          style={{
            color: "#C4A882",
            fontSize: "0.625rem",
            letterSpacing: "0.3em",
            marginBottom: "1.5rem",
          }}
          className="uppercase font-medium"
        >
          Est. 2022 — Bangkok, Thailand
        </p>
        <h2
          style={{
            color: "#F5F0E8",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "0.2em",
            fontWeight: "700",
            lineHeight: 1.15,
            marginBottom: "2rem",
          }}
          className="uppercase"
        >
          Crafted for
          <br />
          the timeless
        </h2>
        <p
          style={{
            color: "#C4A882",
            fontSize: "0.875rem",
            maxWidth: "480px",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
          }}
        >
          Every piece tells a story of intention and craft.
          Fine jewelry made to accompany life&apos;s most meaningful moments.
        </p>
        <Link
          href="/about"
          style={{
            borderColor: "#C4A882",
            color: "#C4A882",
            fontSize: "0.625rem",
            letterSpacing: "0.2em",
            padding: "0.875rem 2.5rem",
            border: "1px solid",
          }}
          className="uppercase font-medium hover:bg-white hover:text-black transition-all duration-300"
        >
          Our Story
        </Link>
      </div>
    </section>
  );
}
