import type { Metadata } from "next";
import Link from "next/link";
import InfoPage, { Section } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Our Story",
  description: "AELINE C — fine jewelry handcrafted in Bangkok.",
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="Maison"
      title="Our Story"
      intro="Fine jewelry handcrafted in Bangkok — designed for women who carry their own world quietly, gracefully."
    >
      <Section title="Made in Bangkok">
        <p>
          AELINE C is a jewelry studio based in Bangkok. Every piece is designed and finished by our small team,
          with attention to the details you notice every time you wear it.
        </p>
      </Section>

      <Section title="Jewelry that tells your story">
        <p>
          We believe jewelry should feel personal. Our{" "}
          <Link href="/charm-builder" className="underline hover:opacity-60">Charm Bar</Link>{" "}
          lets you choose the charms that mean something to you and pair them with our signature Charm Bar Bracelet —
          so no two are quite the same.
        </p>
      </Section>

      <Section title="Order with a conversation">
        <p>
          We take every order personally through LINE. Tell us what you love, ask about sizing or materials,
          and we&apos;ll help you choose — just like visiting our booth.
        </p>
        <p>
          <Link href="/collections" className="underline hover:opacity-60">Explore the collections</Link>
        </p>
      </Section>
    </InfoPage>
  );
}
