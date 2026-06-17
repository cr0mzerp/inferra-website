export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Inferra",
    applicationCategory: "OperatingSystem",
    operatingSystem: "x86_64",
    description:
      "A ground-up AI-native operating system. Open-source, Wayland-native, with an intelligent intent-routing core.",
    url: "https://inferra.live",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Inferra",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
