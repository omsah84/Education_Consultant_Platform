import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-gray-900 text-white py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Sign Up to Start Searching
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Whether you're a tenant looking for the perfect space or a host ready to list your property — we’ve got you covered.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup?role=tenant">
            <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md font-semibold transition">
              Register as Tenant
            </button>
          </Link>
          <Link href="/signup?role=host">
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white border border-gray-500 rounded-md font-semibold transition">
              Register as Host
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
