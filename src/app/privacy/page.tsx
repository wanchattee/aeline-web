import type { Metadata } from "next";
import InfoPage, { Section } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AELINE C collects and uses personal data, in line with Thailand's PDPA.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Last updated: October 2026"
    >
      <Section title="Who we are">
        <p>
          AELINE C (“we”, “us”) is a jewelry studio in Bangkok, Thailand. This policy explains how we handle your
          personal data in line with Thailand&apos;s Personal Data Protection Act B.E. 2562 (PDPA).
        </p>
      </Section>

      <Section title="What we collect">
        <p>This website has no account sign-up or checkout. We only receive personal data when you contact us, for example in LINE:</p>
        <ul className="list-disc flex flex-col gap-2" style={{ paddingLeft: "1.25rem" }}>
          <li>Your name and LINE display name</li>
          <li>Delivery address and phone number</li>
          <li>Order details and our chat history with you</li>
        </ul>
      </Section>

      <Section title="How we use it">
        <ul className="list-disc flex flex-col gap-2" style={{ paddingLeft: "1.25rem" }}>
          <li>To confirm, prepare and deliver your order</li>
          <li>To answer your questions and provide after-sales support</li>
          <li>To keep records required by law, such as accounting records</li>
        </ul>
        <p>
          We do not sell your personal data. We share it only with the services needed to complete your order, such as
          delivery companies.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          This website uses only the essential cookies and storage needed for it to work. We do not use advertising
          cookies.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          Under the PDPA you may ask to access, correct or delete your personal data, or withdraw your consent. To make
          a request, message us on LINE @aelinec.
        </p>
      </Section>
    </InfoPage>
  );
}
