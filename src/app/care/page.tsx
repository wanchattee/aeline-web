import type { Metadata } from "next";
import InfoPage, { Section } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Care Guide",
  description: "How to care for your AELINE C jewelry so it keeps its shine.",
};

export default function CarePage() {
  return (
    <InfoPage
      eyebrow="Maison"
      title="Care Guide"
      intro="A little care keeps your pieces shining for years."
    >
      <Section title="Everyday wear">
        <ul className="list-disc flex flex-col gap-2" style={{ paddingLeft: "1.25rem" }}>
          <li>Put your jewelry on last — after perfume, lotion and hairspray.</li>
          <li>Take it off before swimming, showering, exercising or sleeping.</li>
          <li>Avoid water, perfume and heat as much as possible.</li>
        </ul>
      </Section>

      <Section title="Cleaning">
        <ul className="list-disc flex flex-col gap-2" style={{ paddingLeft: "1.25rem" }}>
          <li>Wipe gently with a soft, dry cloth after wearing.</li>
          <li>Do not use harsh chemicals, toothpaste or abrasive polishing cloths on plated pieces.</li>
          <li>Make sure pieces are completely dry before storing them.</li>
        </ul>
      </Section>

      <Section title="Storage">
        <ul className="list-disc flex flex-col gap-2" style={{ paddingLeft: "1.25rem" }}>
          <li>Store each piece separately in its pouch or box to prevent scratches and tangling.</li>
          <li>Keep away from humidity and direct sunlight.</li>
          <li>Lay chains flat or fasten the clasp to avoid knots.</li>
        </ul>
      </Section>
    </InfoPage>
  );
}
