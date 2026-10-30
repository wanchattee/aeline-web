import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        className="flex-1 flex flex-col items-center justify-center text-center"
        style={{ minHeight: "70vh", backgroundColor: "#F5F0E8", padding: "61px 1.5rem 0" }}
      >
        <p style={{ fontSize: "0.625rem", letterSpacing: "0.3em", color: "#1B4332", marginBottom: "1rem" }} className="uppercase font-medium">
          404
        </p>
        <h1
          style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", letterSpacing: "0.22em", fontWeight: 700, marginBottom: "1rem" }}
          className="uppercase"
        >
          Page Not Found
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#5C5C5C", lineHeight: 1.8, maxWidth: 420, marginBottom: "2rem" }}>
          The page you are looking for may have moved or no longer exists.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/collections"
            style={{ backgroundColor: "#1B4332", color: "#F5F0E8", fontSize: "0.688rem", letterSpacing: "0.2em", padding: "0.875rem 2rem" }}
            className="uppercase font-medium hover:opacity-80 transition-opacity"
          >
            Shop Collections
          </Link>
          <Link
            href="/"
            style={{ border: "1px solid #0A0A0A", color: "#0A0A0A", fontSize: "0.688rem", letterSpacing: "0.2em", padding: "0.875rem 2rem" }}
            className="uppercase font-medium hover:bg-black hover:text-white transition-all"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
