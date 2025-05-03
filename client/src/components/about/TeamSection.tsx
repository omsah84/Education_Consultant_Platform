import Image from "next/image";

const team = [
  {
    name: "Om Sah",
    role: "Founder & CTO",
    image: "/image/omsah.png",
    address: "Nepal",
  },
  {
    name: "Priya Desai",
    role: "Co-founder & CEO",
    image: "/image/omsah.png",
    address: "Nepal",
  },
  {
    name: "Rahul Mehta",
    role: "Design Lead",
    image: "/image/omsah.png",
    address: "Bangladesh",
  },
  {
    name: "Ravi Singh",
    role: "Backend Developer",
    image: "/image/omsah.png",
    address: "India",
  },
  {
    name: "Ravi Singh",
    role: "Backend Developer",
    image: "/image/omsah.png",
    address: "India",
  },
  {
    name: "Ravi Singh",
    role: "Backend Developer",
    image: "/image/omsah.png",
    address: "India",
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12 bg-black text-white">
      {/* Team Section Header */}
      <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-12">
        Meet the Team
      </h2>

      {/* Team Member Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-gray-700"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>

              {/* Address Section inside Each Card */}
              <div className="mt-4 text-sm text-gray-300">
                <p>{member.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
