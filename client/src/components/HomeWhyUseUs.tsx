export default function WhyUseUs() {
  const benefits = [
    {
      title: "Verified Listings",
      description: "Every property is verified to ensure you get accurate information and a trustworthy experience.",
      icon: "✅",
    },
    {
      title: "Secure Booking",
      description: "Book with confidence through a safe and secure platform that protects your information.",
      icon: "🔒",
    },
    {
      title: "No Broker Fees",
      description: "Skip the middleman and save money with 100% broker-free listings.",
      icon: "💸",
    },
    {
      title: "24/7 Support",
      description: "We’re here to help — anytime, for both tenants and hosts.",
      icon: "🕒",
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">Why Use Us</h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
            >
              <div className="text-5xl mb-4 text-cyan-400">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-sm text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
