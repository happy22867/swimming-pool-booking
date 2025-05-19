import Navbar from "../components/homepage/Navbar";
import VideoBackground from "../components/homepage/VideoBackground";
import HeroSection from "../components/homepage/HeroSection";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import Footer from "../components/homepage/Footer";
import PoolsSection from "../components/homepage/PoolsSection";

export default function HomePage() {
  return (
    <div className="font-sans">

      {/* 🔹 Only this part has the video background */}
      <div className="relative h-[calc(100vh-0px)] overflow-hidden">
        <VideoBackground />

        {/* Content over video */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
        </div>

        {/* Optional overlay for contrast */}
        <div className="absolute inset-0 bg-black opacity-30 z-0" />
      </div>

      {/* 🔹 This part is outside video background */}
      <div className="relative z-20">
        <PoolsSection />
        <WhyChooseUs />
        <Footer />
      </div>
    </div>
  );
}
