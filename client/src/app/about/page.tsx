"use client";

import MissionSection from "@/components/about/MissionSection";
import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/ValuesSection";
import WhyChooseUsSection from "@/components/HomeWhyUseUs";
import CallToActionSection from "@/components/HomeCallToAction";
import AboutHeader from "@/components/about/AboutHeader";
import Header from "@/components/HomeHeader";
import Footer from "@/components/HomeFooter";

export default function AboutPage() {
  return (
    <div>
      <Header/>
  
    <main className="bg-black text-white min-h-screen pt-16">
      {/* Header Section */}
      <AboutHeader />

      {/* Mission Section */}
      <MissionSection />

      {/* Values Section */}
      <ValuesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Team Section */}
      <TeamSection />

      {/* Call to Action Section */}
      <CallToActionSection />
      <Footer/>
    </main>
    </div>
  );
}
