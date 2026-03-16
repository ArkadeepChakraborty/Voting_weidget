import { useState } from "react";
import ResultBarSection from "./ResultBarSection";
import ResultPieBarSection from "./ResultPieBarSection";

export default function ResultTabsSection() {

    const [activeTab, setActiveTab] = useState("map");

    return (
        <div className="w-full">

            <div className="md:hidden">

                {/* TAB BUTTONS */}
                <div className="flex gap-2 mb-3">
                    <button
                        onClick={() => setActiveTab("map")}
                        className={`flex-1 py-2 rounded-full text-sm font-semibold border 
              ${activeTab === "map"
                                ? "bg-orange-400 text-white"
                                : "bg-gray-200 text-black"
                            }`}
                    >
                        মানচিত্র দেখুন
                    </button>

                    <button
                        onClick={() => setActiveTab("data")}
                        className={`flex-1 py-2 rounded-full text-sm font-semibold border
              ${activeTab === "data"
                                ? "bg-orange-400 text-white"
                                : "bg-gray-200 text-black"
                            }`}
                    >
                        তথ্য দেখুন
                    </button>
                </div>

                {/* TAB CONTENT */}
                {activeTab === "map" && <ResultPieBarSection />}
                {activeTab === "data" && <ResultBarSection />}

            </div>

            <div className="hidden md:block space-y-6 mt-4">
                <ResultPieBarSection />
                <div className="mt-0 md:mt-5 lg:mt-5 -mb-4">
                    <ResultBarSection />
                </div>
            </div>

        </div>
    );
}