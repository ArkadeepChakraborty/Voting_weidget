// import { useState } from "react";
// import { parties } from "../data/parties";
// import { districtData } from "../data/districtData";
// import PartyCard from "../components/PartyCard";
// import PieChartSection from "../components/PieChartSection";
// import PartyTable from "../components/PartyTable";

// export default function Dashboard() {
//   const [selectedParty, setSelectedParty] = useState(null);

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 py-10 px-4 sm:px-6">
//       <div
//         className="relative max-w-7xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 overflow-hidden"
//         style={{
//           backgroundImage: "url('/WB.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

//         <div className="relative z-10">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 font-serif underline">
//             Election Dashboard
//           </h1>

//           {/* ================= DASHBOARD ================= */}
//           {!selectedParty && (
//             <>
//               {/* Party Cards */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
//                 {parties.map((party) => (
//                   <PartyCard
//                     //key={party.name}  
//                     key={party.id}  // FIXED
//                     party={party}
//                     onClick={() => setSelectedParty(party.name)}
//                   />
//                 ))}
//               </div>

//               {/* Pie Charts Section */}
//               <div className="mt-10 sm:mt-14 md:mt-16">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

//                   {/* Left Pie Chart */}
//                   <div className="bg-white/30 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg w-full">
//                     <h3 className="text-base sm:text-lg md:text-2xl font-semibold text-center mb-4">
//                       Seat Distribution of Parties
//                     </h3>
//                     <div className="border rounded-lg p-2 sm:p-4">
//                       <PieChartSection />
//                     </div>
//                   </div>

//                   {/* Right Pie Chart */}
//                   <div className="bg-white/30 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg w-full">
//                     <h3 className="text-base sm:text-lg md:text-2xl font-semibold text-center mb-4">
//                       Overall Performance Overview
//                     </h3>
//                     <div className="border rounded-lg p-2 sm:p-4">
//                       <PieChartSection />
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </>
//           )}

//           {/* ================= PARTY TABLE ================= */}
//           {selectedParty && (
//             <PartyTable
//               partyName={selectedParty}
//               data={districtData[selectedParty]}
//               onBack={() => setSelectedParty(null)}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// {/* <div id="root"></div>
// <script src="path-to/index-75KXp-Xd.js"></script>
// <link rel="stylesheet" href="path-to/index-BQNC8tcG.css"></link> */}













import { useEffect, useState } from "react";
import { districtData } from "../data/districtData";
import PartyCard from "../components/PartyCard";
import PieChartSection from "../components/PieChartSection";
import PartyTable from "../components/PartyTable";
import PieChartSectionTwo from "../components/PieChartSectionTwo";
import { parties as partyConfig } from "../data/parties";

export default function Dashboard() {

  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);

  useEffect(() => {

  const fetchParties = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/party/parties");

      const data = await res.json();

      const formatted = Object.entries(data).map(([name, votes]) => {

        const config = partyConfig.find(
          (p) => p.name.toLowerCase() === name.toLowerCase()
        );

        return {
          name,
          votes: Number(votes),
          color: config?.color || "bg-gray-500",
          logo: config?.logo || ""
        };

      });

      setParties(formatted);

    } catch (error) {
      console.error("Error fetching parties:", error);
    }

  };

  fetchParties();

}, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 py-10 px-4 sm:px-6">
      <div
        className="relative max-w-7xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 overflow-hidden"
        style={{
          backgroundImage: "url('/WB.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        <div className="relative z-10">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 font-serif underline">
            Election Dashboard
          </h1>

          {/* ================= DASHBOARD ================= */}

          {!selectedParty && (
            <>
              {/* Party Cards */}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">

                {parties.map((party) => (

                  <PartyCard
                    key={party.name}
                    party={party}
                    onClick={(name) => setSelectedParty(name)}
                  />

                ))}

              </div>

              {/* Pie Charts */}

              <div className="mt-10 sm:mt-14 md:mt-16">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                  <div className="bg-white/30 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg w-full">
                    <h3 className="text-base sm:text-lg md:text-2xl font-semibold text-center mb-4">
                      Seat Distribution of Parties
                    </h3>

                    <div className="border rounded-lg p-2 sm:p-4">
                      <PieChartSection parties={parties} />
                    </div>

                  </div>

                  <div className="bg-white/30 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg w-full">
                    <h3 className="text-base sm:text-lg md:text-2xl font-semibold text-center mb-4">
                      Overall Performance Overview (Percentage)
                    </h3>

                    <div className="border rounded-lg p-2 sm:p-4">
                      <PieChartSectionTwo parties={parties} />
                    </div>

                  </div>

                </div>

              </div>
            </>
          )}

          {/* ================= PARTY TABLE ================= */}

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