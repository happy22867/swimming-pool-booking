import Navbar from "../components/homepage/Navbar";
import VideoBackground from "../components/homepage/VideoBackground";
import HeroSection from "../components/homepage/HeroSection";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import Footer from "../components/homepage/Footer";
import PoolsSection from "../components/homepage/PoolsSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      <VideoBackground />

      <div className="relative z-10">
        <Navbar />        {/* Navbar imports Sidebar internally */}
        <HeroSection />
      </div>

      <div className="relative z-20">
        <PoolsSection />
        <WhyChooseUs />
        <Footer />
      </div>
    </div>
  );
}
