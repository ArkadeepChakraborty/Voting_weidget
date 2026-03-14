import VideoCardsSection from "../components/VideoCardsSection";

import NewsTicker from "../components/NewsTicker";
import CandidateCarousel from "../components/CandidateCarousel";
import TwoCandidateSection from "../components/TwoCandidateSection";
import ResultBarSection from "../components/ResultBarSection";
import ResultPieBarSection from "../components/ResultPieBarSection";
import ElectionBannerSection from "../components/ElectionBannerSection";
import DonutPieChartSection from "../components/DonutPieChartSection";

export default function HomePage() {
  const parties = [
    { name: "তৃণমূল", votes: 180 },
    { name: "বিজেপি", votes: 75 },
    { name: "বাম", votes: 47 }
  ];

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/WB.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-xs bg-white/10"></div>

      <div className="relative z-8">
        <NewsTicker />

        <ElectionBannerSection />

        {/* Page container */}
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">

          <VideoCardsSection />

          {/* <DonutPieChartSection parties={parties} />

          <ResultBarSection /> */}

          <ResultPieBarSection />

          {/* <VideoCardsSection /> */}

          <CandidateCarousel />

          <TwoCandidateSection />

        </div>

      </div>

    </div>
  );
}