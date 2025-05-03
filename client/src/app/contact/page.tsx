"use client";

import ContactSection from "@/components/ContactContactSection";
import Header from "@/components/HomeHeader";
import Footer from "@/components/HomeFooter";

export default function ContactPage() {
  return (
    <>
    <Header/>
    <main className="bg-black min-h-screen text-white pt-16">
      <ContactSection />
    </main>
    <Footer/>
    </>
  );
}
