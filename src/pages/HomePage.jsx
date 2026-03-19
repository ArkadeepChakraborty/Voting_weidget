import { useEffect, useState } from "react";

import VideoCardsSection from "../components/VideoCardsSection";
import NewsTicker from "../components/NewsTicker";
import CandidateCarousel from "../components/CandidateCarousel";
import TwoCandidateSection from "../components/TwoCandidateSection";
import ResultBarSection from "../components/ResultBarSection";
import ResultPieBarSection from "../components/ResultPieBarSection";
import ElectionBannerSection from "../components/ElectionBannerSection";
import DonutPieChartSection from "../components/DonutPieChartSection";
import ResultTabsSection from "../components/ResultTabsSection";
import WestBengalNews from "../components/WestBengalNews";

export default function HomePage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const parties = [
    { name: "তৃণমূল", votes: 180 },
    { name: "বিজেপি", votes: 75 },
    { name: "বাম", votes: 47 }
  ];

  /* DATA CHECK (SIMULATING SERVER / WINDOW DATA) */
  useEffect(() => {

    const checkData = async () => {
      try {
        setLoading(true);
        setError(false);

        // simulate slight delay (optional)
        await new Promise((res) => setTimeout(res, 800));

        const data = window.WB_ELECTION_DATA;

        if (!data) {
          throw new Error("No data found");
        }

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    checkData();

  }, []);

  /* ================= LOADING UI ================= */
 if (loading) {
  return (
    <div className="h-screen flex items-center justify-center bg-white">

      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* text */}
        <p className="text-sm text-gray-500 font-serif">
          Fetching election data...
        </p>

      </div>

    </div>
  );
}

  /* ================= MAIN UI ================= */
  return (
    <div className="min-h-screen relative">

      <div className="absolute inset-0 backdrop-blur-xs bg-white/10"></div>

      <div className="relative z-8">

        {/* <NewsTicker /> */}
        {/* <ElectionBannerSection /> */}

        <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">

          <VideoCardsSection />

          {/* Optional sections */}
          {/* <DonutPieChartSection parties={parties} /> */}
          {/* <ResultBarSection /> */}
          {/* <ResultPieBarSection /> */}

          <ResultTabsSection />

          {/* <CandidateCarousel /> */}
          {/* <TwoCandidateSection /> */}
          {/* <WestBengalNews /> */}

        </div>

      </div>
    </div>
  );
}