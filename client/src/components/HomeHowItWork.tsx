export default function HowItWorks() {
    const steps = [
      {
        title: "Search",
        description: "Find hostels, PGs, rooms, and flats that fit your preferences by location, rent, and property type.",
        icon: "🔍",
      },
      {
        title: "Chat",
        description: "Message property owners or managers directly—no middlemen or brokers involved.",
        icon: "💬",
      },
      {
        title: "Book",
        description: "Confirm your booking online securely with verified listings and real-time availability.",
        icon: "📅",
      },
      {
        title: "Move In",
        description: "Pack up and move in! Enjoy a hassle-free start to your new stay.",
        icon: "🚚",
      },
    ];
  
    return (
      <section className="bg-gray-950 text-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">How It Works</h2>
  
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg hover:bg-gray-700 transition"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  