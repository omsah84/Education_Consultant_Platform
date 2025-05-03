import Footer from "@/components/HomeFooter";
import Header from "@/components/HomeHeader";
import HeroSection from "@/components/HomeHero";
import HowItWorks from "@/components/HomeHowItWork";
import WhyUseUs from "@/components/HomeWhyUseUs";
import Testimonials from "@/components/HomeTestimonials";
import CallToAction from "@/components/HomeCallToAction";
export default function Home() {
  return (
    <>
    <Header/>
    <HeroSection/>
    <HowItWorks/>
    <WhyUseUs/>
    <Testimonials/>
    <CallToAction/>
    <Footer/>
    </>
  );
}
