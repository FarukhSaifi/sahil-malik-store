import type { FaqItem, LegalDocument, LegalSection } from "@/types";

export const POLICIES_PAGE: LegalDocument = {
  title: "Our Policies",
  subtitle: "Client Care",
  intro:
    "At Sahil Malik Couture, every outfit is crafted with meticulous attention to detail and a commitment to exceptional craftsmanship. To ensure a seamless experience for our clients, we encourage you to review our policies regarding orders, payments, shipping, exchanges, and privacy. By placing an order or using our website, you agree to the terms outlined in our policies.",
  sections: [
    {
      id: "order-policy",
      title: "Order Policy",
      items: [
        "All products are subject to availability.",
        "Certain outfits may be made-to-order or customized according to client requirements.",
        "Product colours may vary slightly due to screen settings and photography.",
        "Measurements provided by clients are considered final for custom and bespoke orders.",
      ],
    },
    {
      id: "payment-policy",
      title: "Payment Policy",
      items: [
        "Full payment is required to confirm an order unless otherwise agreed.",
        "All prices displayed are in INR.",
        "We accept all major payment methods, including Credit Cards, Debit Cards, UPI, Net Banking, and other secure online payment options available at checkout.",
        "Cash on Delivery (COD) is not available.",
        "Sahil Malik Couture reserves the right to revise pricing without prior notice.",
      ],
    },
    {
      id: "shipping-policy",
      title: "Shipping Policy",
      items: [
        "Domestic and international shipping options are available.",
        "Delivery timelines may vary depending on the nature of the order.",
        "Bespoke and made-to-order outfits require additional production time.",
        "Clients will receive shipping confirmation once the order has been dispatched.",
      ],
    },
    {
      id: "exchange-policy",
      title: "Exchange Policy",
      items: [
        "As most outfits are made-to-order or customized, exchanges and returns are generally not accepted.",
        "In the rare event of a manufacturing defect, clients must notify us within 48 hours of receiving the order.",
        "Any approved alterations or resolutions will be handled at the discretion of Sahil Malik Couture.",
      ],
      footerNote: "For any assistance, our team is always available to help.",
    },
  ] satisfies LegalSection[],
};

export const TERMS_OF_SERVICE: LegalDocument = {
  title: "Terms of Service",
  subtitle: "Legal",
  intro:
    "Welcome to Sahil Malik Couture. By accessing our website, placing an order, booking an appointment, or using our services, you agree to be bound by these Terms of Service.",
  sections: [
    {
      id: "use-of-website",
      title: "1. Use of Website",
      paragraphs: [
        "The content on this website is provided for informational and shopping purposes only. Unauthorized use, reproduction, or distribution of any content is prohibited.",
      ],
    },
    {
      id: "products-services",
      title: "2. Products & Services",
      paragraphs: [
        "All outfits are subject to availability. We reserve the right to modify, discontinue, or update products and services without prior notice.",
      ],
    },
    {
      id: "custom-bespoke",
      title: "3. Custom & Bespoke Orders",
      paragraphs: [
        "Measurements and specifications provided by clients are considered final. Custom-made and bespoke outfits cannot be cancelled, exchanged, or refunded once production has commenced.",
      ],
    },
    {
      id: "pricing",
      title: "4. Pricing",
      paragraphs: [
        "Prices are subject to change without prior notice. Applicable taxes and shipping charges may be added during checkout.",
      ],
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property",
      paragraphs: [
        "All designs, photographs, logos, content, graphics, and creative materials displayed on this website are the exclusive property of Sahil Malik Couture and may not be used without written permission.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "6. Limitation of Liability",
      paragraphs: [
        "Sahil Malik Couture shall not be liable for indirect, incidental, or consequential damages arising from the use of our website, products, or services.",
      ],
    },
    {
      id: "governing-law",
      title: "7. Governing Law",
      paragraphs: [
        "These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of New Delhi courts.",
      ],
    },
  ] satisfies LegalSection[],
};

export const PRIVACY_POLICY: LegalDocument = {
  title: "Privacy Policy",
  subtitle: "Your Data",
  intro: "Sahil Malik Couture values your privacy and is committed to protecting your personal information.",
  sections: [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      intro: "We may collect:",
      items: [
        "Name",
        "Email Address",
        "Phone Number",
        "Billing & Shipping Address",
        "Appointment Details",
        "Payment Information",
        "Website Usage Data",
      ],
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      intro: "We use your information to:",
      items: [
        "Process orders",
        "Schedule consultations and appointments",
        "Provide customer support",
        "Share order updates",
        "Improve our website experience",
        "Inform you about new collections, launches, and exclusive events",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      paragraphs: [
        "We take appropriate measures to protect your personal information from unauthorized access, disclosure, or misuse.",
      ],
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      paragraphs: [
        "We may work with trusted third-party service providers for payment processing, shipping, analytics, and website operations. These providers are required to maintain confidentiality and security standards.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      paragraphs: ["Our website may use cookies to improve functionality and enhance user experience."],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      paragraphs: [
        "You may request access, correction, or deletion of your personal information by contacting us directly.",
      ],
    },
    {
      id: "policy-changes",
      title: "Policy Changes",
      paragraphs: [
        "Sahil Malik Couture reserves the right to update this Privacy Policy at any time. Any revisions will be posted on this page.",
      ],
    },
  ] satisfies LegalSection[],
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "made-to-order",
    question: "Are your outfits made-to-order?",
    answer: "Most Sahil Malik Couture outfits are crafted on order to ensure exceptional quality and fit.",
  },
  {
    id: "bespoke-services",
    question: "Do you offer bespoke services?",
    answer: "Yes. We offer bespoke consultations and custom tailoring for select outfits.",
  },
  {
    id: "delivery-timeline",
    question: "How long does delivery take?",
    answer:
      "Delivery timelines vary depending on the outfit and level of customization. Our team will provide an estimated timeline at the time of order confirmation.",
  },
  {
    id: "international-shipping",
    question: "Do you ship internationally?",
    answer: "Yes, we offer worldwide shipping.",
  },
  {
    id: "exchanges-returns",
    question: "Can I exchange or return my order?",
    answer:
      "Due to the customized nature of our outfits, returns and exchanges are generally not accepted. Please refer to our policy page for detailed information.",
  },
  {
    id: "book-appointment",
    question: "How can I book an appointment?",
    answer: "Appointments can be scheduled through our website, Instagram, or by contacting our studio directly.",
  },
  {
    id: "studio-location",
    question: "Where is your studio located?",
    answer: "Our couture studio is located in Shahpur Jat, New Delhi.",
  },
  {
    id: "customization",
    question: "Can outfits be customized?",
    answer: "Yes. Select styles can be customized based on fabric, colour, fit, and design requirements.",
  },
  {
    id: "garment-care",
    question: "How do I care for my outfit?",
    answer: "We recommend professional dry cleaning only to preserve the quality and craftsmanship of your outfit.",
  },
  {
    id: "contact",
    question: "How can I contact Sahil Malik Couture?",
    answer: "You may contact us via email, phone, Instagram, or by visiting our Shahpur Jat studio.",
  },
  {
    id: "ready-to-wear-vs-bespoke",
    question: "Are your outfits ready-to-wear or bespoke?",
    answer:
      "The outfits featured on our website are ready-to-wear and available in standard sizes for immediate purchase. For clients seeking personalized designs, fit modifications, or exclusive creations, Sahil Malik Couture also offers bespoke services by appointment.",
  },
  {
    id: "payment-options",
    question: "What payment options are available?",
    answer:
      "We accept all major payment modes including Credit Cards, Debit Cards, UPI, Net Banking, and other secure payment methods available on our website.",
  },
  {
    id: "cod",
    question: "Is Cash on Delivery (COD) available?",
    answer:
      "No. Cash on Delivery is currently not available. All orders must be prepaid through the payment methods available on our website.",
  },
];
