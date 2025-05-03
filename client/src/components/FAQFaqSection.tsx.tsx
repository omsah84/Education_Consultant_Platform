// components/about/FaqSection.tsx
export default function FaqSection() {
    const tenantFaqs = [
      {
        question: "How do I book a room?",
        answer: "You can browse listings, choose your preferred property, and book directly through our secure platform.",
      },
      {
        question: "What should I do if I have trouble with a host?",
        answer: "Contact our 24/7 support team immediately. We'll mediate and help resolve any issues quickly.",
      },
      {
        question: "Can I cancel my booking?",
        answer: "Yes, cancellation policies vary by listing. Please check the specific property's policy before booking.",
      },
    ];
  
    const hostFaqs = [
      {
        question: "How do I list a property?",
        answer: "Sign up as a host, go to your dashboard, and follow the steps to add a new verified property listing.",
      },
      {
        question: "What’s the process for tenant verification?",
        answer: "All tenants go through ID and background verification to ensure safety and trust for hosts.",
      },
      {
        question: "How do I get paid for a booking?",
        answer: "Payments are released securely to your account 24 hours after the tenant’s check-in.",
      },
    ];
  
    return (
      <section className="bg-gray-900 text-white py-16 px-6 sm:px-10 lg:px-16">
        <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-12">
          Frequently Asked Questions
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-6 underline underline-offset-4">For Tenants</h3>
            <ul className="space-y-6">
              {tenantFaqs.map((faq, idx) => (
                <li key={idx}>
                  <p className="font-medium text-cyan-400 mb-1">{faq.question}</p>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
  
          <div>
            <h3 className="text-xl font-semibold mb-6 underline underline-offset-4">For Hosts</h3>
            <ul className="space-y-6">
              {hostFaqs.map((faq, idx) => (
                <li key={idx}>
                  <p className="font-medium text-blue-400 mb-1">{faq.question}</p>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
  