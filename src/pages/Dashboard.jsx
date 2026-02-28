import { useState } from "react";
import { parties } from "../data/parties";
import { districtData } from "../data/districtData";
import PartyCard from "../components/PartyCard";
import PieChartSection from "../components/PieChartSection";
import PartyTable from "../components/PartyTable";

export default function Dashboard() {
  const [selectedParty, setSelectedParty] = useState(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 py-10 px-6">
      <div
        className="relative max-w-7xl mx-auto rounded-3xl shadow-2xl p-10 overflow-hidden"
        style={{
          backgroundImage: "url('/WB.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xs"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 font-serif underline">
            Election Dashboard
          </h1>

          {/* DASHBOARD */}
          {!selectedParty && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {parties.map((party) => (
                  <PartyCard
                    key={party.id}
                    party={party}
                    onClick={() => setSelectedParty(party.name)}
                  />
                ))}
              </div>

              <div className="mt-16 flex justify-center">
                <div className="bg-gray-50 p-8 rounded-2xl shadow-inner">
                  <PieChartSection />
                </div>
              </div>
            </>
          )}

          {/* TABLE */}
          {selectedParty && (
            <PartyTable
              partyName={selectedParty}
              data={districtData[selectedParty]}
              onBack={() => setSelectedParty(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}




{/* <div id="root"></div>
<script src="path-to/index-75KXp-Xd.js"></script>
<link rel="stylesheet" href="path-to/index-BQNC8tcG.css"></link> */}