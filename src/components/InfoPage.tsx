import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Shared shell for text pages (About, Care, Size Guide, Shipping, FAQ, Privacy)
export default function InfoPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* Cream main bg fills the gap under the shorter mobile header */}
      <main className="flex-1" style={{ paddingTop: "61px", backgroundColor: "#F5F0E8" }}>
        {/* Page title */}
        <div
          style={{
            borderBottom: "1px solid #E8E4DC",
            padding: "4rem clamp(1.5rem, 5vw, 4rem) 3rem",
          }}
          className="text-center"
        >
          <p style={{ fontSize: "0.625rem", letterSpacing: "0.3em", color: "#1B4332", marginBottom: "1rem" }} className="uppercase font-medium">
            {eyebrow}
          </p>
          <h1
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", letterSpacing: "0.22em", fontWeight: 700, lineHeight: 1.3 }}
            className="uppercase"
          >
            {title}
          </h1>
          {intro && (
            <p
              style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "#5C5C5C", maxWidth: 560, margin: "1.25rem auto 0" }}
            >
              {intro}
            </p>
          )}
        </div>

        {/* Body */}
        <div style={{ backgroundColor: "#FFFFFF" }}>
          <div
            style={{ maxWidth: 720, margin: "0 auto", padding: "3.5rem clamp(1.5rem, 5vw, 2rem) 5rem" }}
            className="flex flex-col gap-12"
          >
            {children}
            <LineCta />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        style={{ fontSize: "0.688rem", letterSpacing: "0.25em", color: "#1B4332", marginBottom: "1rem" }}
        className="uppercase font-semibold"
      >
        {title}
      </h2>
      <div style={{ fontSize: "0.875rem", lineHeight: 1.85, color: "#3A3A3A" }} className="flex flex-col gap-4">
        {children}
      </div>
    </section>
  );
}

export function InfoTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.813rem" }}>
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  fontSize: "0.625rem",
                  letterSpacing: "0.15em",
                  color: "#6B6B6B",
                  fontWeight: 500,
                  padding: "0.75rem 1rem 0.75rem 0",
                  borderBottom: "1px solid #0A0A0A",
                  whiteSpace: "nowrap",
                }}
                className="uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={String(row[0])}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  style={{ padding: "0.75rem 1rem 0.75rem 0", borderBottom: "1px solid #E8E4DC", color: "#3A3A3A" }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LineCta() {
  return (
    <div
      style={{ border: "1px solid #E8E4DC", backgroundColor: "#FAFAF8", padding: "2rem" }}
      className="text-center"
    >
      <p style={{ fontSize: "0.688rem", letterSpacing: "0.2em", marginBottom: "0.5rem" }} className="uppercase font-medium">
        Still have a question?
      </p>
      <p style={{ fontSize: "0.813rem", color: "#5C5C5C", lineHeight: 1.7, marginBottom: "1.25rem" }}>
        Our team replies on LINE, Monday – Saturday, 10:00 – 18:00 (ICT).
      </p>
      <a
        href="https://line.me/ti/p/~@aelinec"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          backgroundColor: "#1B4332",
          color: "#F5F0E8",
          fontSize: "0.688rem",
          letterSpacing: "0.2em",
          padding: "0.875rem 2rem",
          textDecoration: "none",
        }}
        className="uppercase font-medium hover:opacity-80 transition-opacity"
      >
        Message us on LINE
      </a>
    </div>
  );
}
