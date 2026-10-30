import type { Metadata } from "next";
import InfoPage, { Section } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "How to order AELINE C jewelry via LINE, delivery times and returns.",
};

const ORDER_STEPS = [
  ["Choose your piece", "Browse the collections or the Charm Bar and tap “Order via LINE”."],
  ["Chat with us", "Your order details open in LINE @aelinec. We confirm availability, size and the total."],
  ["Payment", "We send payment details in the chat once your order is confirmed."],
  ["Delivery", "We pack your piece with care and send you the tracking number."],
];

export default function ShippingPage() {
  return (
    <InfoPage
      eyebrow="Client Services"
      title="Shipping & Returns"
      intro="Every order is handled personally by our team through LINE."
    >
      <Section title="How to order">
        <ol className="flex flex-col gap-4">
          {ORDER_STEPS.map(([title, text], i) => (
            <li key={title} className="flex gap-4">
              <span
                style={{ color: "#1B4332", fontSize: "0.75rem", minWidth: "1.5rem", paddingTop: "0.15rem" }}
                className="font-semibold"
              >
                0{i + 1}
              </span>
              <span>
                <strong className="font-medium" style={{ color: "#0A0A0A" }}>{title}</strong> — {text}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Delivery">
        <p>Orders within Thailand usually arrive in 2–3 business days after shipping.</p>
        <p>Shipping fees and options are confirmed in the LINE chat together with your order total.</p>
      </Section>

      <Section title="Returns & exchanges">
        <p>
          Please check size and details with us before confirming your order. If your piece arrives damaged or is not
          what you ordered, message us on LINE as soon as possible with photos of the piece and its packaging so we
          can help.
        </p>
      </Section>
    </InfoPage>
  );
}
