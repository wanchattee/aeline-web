import type { Metadata } from "next";
import InfoPage, { InfoTable, Section } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Find your ring, bracelet and necklace size.",
};

const RING_SIZES: (string | number)[][] = [
  ["4", "14.9", "46.8"],
  ["5", "15.7", "49.3"],
  ["6", "16.5", "51.9"],
  ["7", "17.3", "54.4"],
  ["8", "18.1", "57.0"],
  ["9", "19.0", "59.5"],
];

const NECKLACE_LENGTHS: (string | number)[][] = [
  ["40 cm", "Sits close to the base of the neck"],
  ["45 cm", "Rests on the collarbone — the most popular length"],
  ["50 cm", "Falls just below the collarbone"],
];

export default function SizeGuidePage() {
  return (
    <InfoPage
      eyebrow="Maison"
      title="Size Guide"
      intro="Not sure about your size? Message us on LINE and we'll help you choose."
    >
      <Section title="Rings">
        <p>
          Wrap a strip of paper around the base of your finger, mark where it overlaps, and measure the length in
          millimetres — that is your circumference. Or measure the inside diameter of a ring that already fits you.
        </p>
        <InfoTable head={["US Size", "Inner Diameter (mm)", "Circumference (mm)"]} rows={RING_SIZES} />
        <p style={{ fontSize: "0.75rem", color: "#6B6B6B" }}>
          Measure at the end of the day when fingers are slightly larger. If you are between sizes, choose the larger one.
        </p>
      </Section>

      <Section title="Bracelets">
        <p>
          Measure around your wrist bone with a soft tape measure, snug but not tight. Add 1–2 cm for a comfortable fit,
          or 2–3 cm if you prefer a looser look.
        </p>
      </Section>

      <Section title="Necklaces">
        <InfoTable head={["Length", "Where it falls"]} rows={NECKLACE_LENGTHS} />
      </Section>
    </InfoPage>
  );
}
