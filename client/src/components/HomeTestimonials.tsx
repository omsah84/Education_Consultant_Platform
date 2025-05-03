export default function Testimonials() {
    const reviews = [
      {
        name: "Anjali Sharma",
        role: "Student, Delhi University",
        feedback:
          "Finding a PG used to be stressful, but this platform made it super easy. No broker calls, just real options. Booked my room in one day!",
        avatar: "🧑‍🎓",
      },
      {
        name: "Rahul Mehta",
        role: "Working Professional",
        feedback:
          "Loved the verified listings and smooth booking process. Saved money and time—highly recommend!",
        avatar: "👨‍💼",
      },
      {
        name: "Priya Desai",
        role: "Intern, Bangalore",
        feedback:
          "The chat feature helped me connect directly with the property owner. Everything was transparent and quick!",
        avatar: "👩‍💻",
      },
    ];
  
    return (
      <section className="bg-gray-950 text-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">What Our Users Say</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl hover:bg-gray-700 transition text-left"
              >
                <div className="text-4xl mb-4">{review.avatar}</div>
                <p className="text-gray-300 mb-4 italic">"{review.feedback}"</p>
                <div>
                  <h4 className="font-semibold text-lg">{review.name}</h4>
                  <p className="text-sm text-gray-400">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  