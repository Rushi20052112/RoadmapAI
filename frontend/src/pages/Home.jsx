import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import PricingSection from "../components/PricingSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070d18]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}