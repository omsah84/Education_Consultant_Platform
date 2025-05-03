const values = [
    "Transparency in pricing & listings",
    "Community & user trust",
    "No brokers, no hassle",
    "Secure digital experience",
  ];
  
  export default function ValuesSection() {
    return (
      <section className="py-16 px-6 bg-gray-900 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-8">
            Our Core Values
          </h2>
  
          {/* Values Box */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-wrap justify-center gap-6">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-3 bg-gray-700 p-6 rounded-md w-60 sm:w-72 md:w-80 lg:w-96 shadow-md"
              >
                <span className="text-cyan-400 text-2xl">✅</span>
                <p className="text-lg sm:text-xl text-gray-300">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  