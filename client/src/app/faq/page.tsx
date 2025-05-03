"use client";

import FaqSection from "@/components/FAQFaqSection.tsx";
import Header from "@/components/HomeHeader";
import Footer from "@/components/HomeFooter";

export default function FaqPage() {
  return (
    <div>
      <Header/>
    <main className="bg-black min-h-screen text-white pt-16">
      <FaqSection />
    </main>
    <Footer/>
    </div>
  );
}
