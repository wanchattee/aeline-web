import type { Metadata } from "next";
import Link from "next/link";
import InfoPage, { Section } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about ordering AELINE C jewelry.",
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I place an order?",
    a: (
      <>
        Tap “Order via LINE” on any product. Your order opens in a chat with LINE @aelinec, where we confirm the details
        with you. See <Link href="/shipping" className="underline hover:opacity-60">Shipping &amp; Returns</Link> for the full steps.
      </>
    ),
  },
  {
    q: "How does the Charm Bar work?",
    a: (
      <>
        Pick the charms you love in the <Link href="/charm-builder" className="underline hover:opacity-60">Charm Bar</Link>,
        then send them to us on LINE. We&apos;ll help you pair them with our Charm Bar Bracelet.
      </>
    ),
  },
  {
    q: "How long does delivery take?",
    a: "Orders within Thailand usually arrive in 2–3 business days after shipping.",
  },
  {
    q: "How do I find my size?",
    a: (
      <>
        Use our <Link href="/size-guide" className="underline hover:opacity-60">Size Guide</Link>, or message us on LINE
        and we&apos;ll help you choose.
      </>
    ),
  },
  {
    q: "How should I care for my jewelry?",
    a: (
      <>
        Keep it away from water, perfume and heat, and store each piece separately. Read the full{" "}
        <Link href="/care" className="underline hover:opacity-60">Care Guide</Link>.
      </>
    ),
  },
  {
    q: "Can I see the pieces in person?",
    a: "We regularly pop up at events in Bangkok. Follow us on Instagram @aeline.c for our next location.",
  },
];

export default function FaqPage() {
  return (
    <InfoPage eyebrow="Client Services" title="FAQ">
      <Section title="Frequently asked questions">
        <div style={{ borderTop: "1px solid #E8E4DC" }}>
          {FAQS.map(({ q, a }) => (
            <details key={q} style={{ borderBottom: "1px solid #E8E4DC" }} className="group">
              <summary
                style={{ padding: "1.125rem 0", color: "#0A0A0A", listStyle: "none" }}
                className="flex justify-between items-center gap-4 cursor-pointer font-medium"
              >
                {q}
                <span style={{ color: "#1B4332" }} className="text-lg leading-none transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div style={{ paddingBottom: "1.25rem" }}>{a}</div>
            </details>
          ))}
        </div>
      </Section>
    </InfoPage>
  );
}
