import { useState } from "react";
import ResultPieBarSection from "./ResultPieBarSection";
import Tab1 from "./Tab1";

export default function ResultTabsSection() {

  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="w-full md:w-[90%] lg:w-[75%] lg:max-w-4xl xl:max-w-5xl mx-auto space-y-4">

      {/* TAB BUTTONS (ALL DEVICES) */}
      <div className="flex gap-2 mb-6">

        <button
          onClick={() => setActiveTab("map")}
          className={`flex-1 py-2 rounded-full text-sm font-semibold border transition font-serif
            ${activeTab === "map"
              ? "bg-orange-400 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
        >
          Map View
        </button>

        <button
          onClick={() => setActiveTab("data")}
          className={`flex-1 py-2 rounded-full text-sm font-semibold border transition font-serif
            ${activeTab === "data"
              ? "bg-orange-400 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
        >
          Data View
        </button>

      </div>

      {/* TAB CONTENT (ONLY ONE RENDERS) */}
      <div className="transition-all duration-300">
        {activeTab === "map" && <Tab1 />}
        {activeTab === "data" && <ResultPieBarSection />}
      </div>

    </div>
  );
}





// import { useState, useEffect } from "react";
// import ResultPieBarSection from "./ResultPieBarSection";
// import Tab1 from "./Tab1";

// export default function ResultTabsSection() {

//     const [activeTab, setActiveTab] = useState("map");

//     // ✅ Mobile + Tablet
//     const [isTabView, setIsTabView] = useState(() =>
//         typeof window !== "undefined" ? window.innerWidth < 1024 : true
//     );

//     useEffect(() => {
//         const handleResize = () => {
//             setIsTabView(window.innerWidth < 1024);
//         };

//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return (
//         <div className="w-full">

//             {/* MOBILE + TABLET (TAB VIEW) */}
//             {isTabView && (
//                 <>
//                     {/* TAB BUTTONS */}
//                     <div className="flex gap-2 mb-6 ">
//                         <button
//                             onClick={() => setActiveTab("map")}
//                             className={`flex-1 py-2 rounded-full text-sm font-semibold border
//                 ${activeTab === "map"
//                                     ? "bg-orange-400 text-white"
//                                     : "bg-gray-200 text-black"
//                                 }`}
//                         >
//                             মানচিত্র দেখুন
//                         </button>

//                         <button
//                             onClick={() => setActiveTab("data")}
//                             className={`flex-1 py-2 rounded-full text-sm font-semibold border
//                 ${activeTab === "data"
//                                     ? "bg-orange-400 text-white"
//                                     : "bg-gray-200 text-black"
//                                 }`}
//                         >
//                             তথ্য দেখুন
//                         </button>
//                     </div>

//                     {/* TAB CONTENT */}
//                     {activeTab === "map" && <Tab1 />}
//                     {activeTab === "data" && <ResultPieBarSection/>}
//                 </>
//             )}

//             {/* DESKTOP ONLY */}
//             {!isTabView && (
//                 <div className="space-y-6 mt-4">
//                     <Tab1 />
//                     <div className="mt-0 lg:mt-5 -mb-4">
//                         <ResultPieBarSection />
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// }