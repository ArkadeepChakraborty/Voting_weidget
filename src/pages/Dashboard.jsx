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
import PartyCard from "../components/PartyCard";
import PieChartSection from "../components/PieChartSection";
import BarChartComponent from "../components/BarChartComponent";
import { parties as partyConfig } from "../data/parties";

export default function Dashboard() {

  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [candidateData, setCandidateData] = useState([]);
  const [voteData, setVoteData] = useState([]);
  // const [seatsData, setSeatsData] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const API = "http://localhost:5000/api";

  const [allConstituencies, setAllConstituencies] = useState([]);
  const [filteredConstituencies, setFilteredConstituencies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch all constituencies once
  useEffect(() => {
    const fetchConstituencies = async () => {
      try {
        const res = await fetch(`${API}/election/constituencies`);
        if (!res.ok) throw new Error("Failed to load constituencies");
        const data = await res.json();
        setAllConstituencies(data);
        setFilteredConstituencies(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchConstituencies();
  }, []);

  // FETCH OVERALL PARTY DATA

  const fetchParties = async () => {
    try {

      const res = await fetch(`${API}/party/parties`);

      if (!res.ok) throw new Error("Failed to load parties");

      const data = await res.json();

      const formatted = Object.entries(data).map(([name, votes]) => {

        const config = partyConfig.find(
          (p) => p.name.toLowerCase() === name.toLowerCase()
        );

        return {
          name,
          votes: Number(votes),
          color: config?.color || "bg-gray-500",
          logo: config?.logo || null
        };

      });

      setParties(formatted);

    } catch (error) {

      console.error("Error fetching parties:", error);

    }
  };

  // SEARCH CONSTITUENCY

  const searchConstituency = async () => {

    if (!searchText.trim()) return;

    const name = searchText.trim();

    try {

      setIsSearchMode(true);

      const percentRes = await fetch(
        `${API}/election/constituency/vote-percentage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name })
        }
      );

      if (!percentRes.ok) {

        alert("Constituency not found");
        setIsSearchMode(false);
        return;

      }

      const percentData = await percentRes.json();

      const formattedParties = percentData.map((item) => {

        const config = partyConfig.find(
          (p) => p.name.toLowerCase() === item.party.toLowerCase()
        );

        return {
          name: item.party,
          votes: Number(item.votes),
          percentage: item.percentage,
          color: config?.color || "bg-gray-500",
          logo: config?.logo || null
        };

      });

      setParties(formattedParties);

      // Candidates

      const candidateRes = await fetch(
        `${API}/election/constituency/candidates`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name })
        }
      );

      if (candidateRes.ok) {

        const candidateJson = await candidateRes.json();
        setCandidateData(candidateJson);

      }

      // Party Votes

      const voteRes = await fetch(
        `${API}/election/constituency/votes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name })
        }
      );

      if (voteRes.ok) {

        const voteJson = await voteRes.json();
        setVoteData(voteJson);

      }

    } catch (error) {

      console.error("Search error:", error);

    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value) {
      setFilteredConstituencies(allConstituencies);
      return;
    }

    const lowerValue = value.toLowerCase();
    const filtered = allConstituencies.filter((c) =>
      c.toLowerCase().includes(lowerValue)
    );
    setFilteredConstituencies(filtered);
  };

  // CLEAR SEARCH

  const clearSearch = () => {

    setIsSearchMode(false);
    setSearchText("");
    setCandidateData([]);
    setVoteData([]);
    fetchParties();

  };

  useEffect(() => {

    fetchParties();

  }, []);

  return (

    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-300 py-6 px-3 md:px-6">

      <div
        className="relative max-w-7xl mx-auto rounded-3xl shadow-2xl p-4 md:p-10 overflow-hidden"
        style={{
          backgroundImage: "url('/WB.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>

        <div className="relative z-10">

          <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8 font-serif">
            West Bengal Election Dashboard
          </h1>

          {/* SEARCH BAR */}

          <div
            className={`flex justify-center items-center gap-3 mb-10 ${isSearchMode ? "flex-col" : "flex-row"
              }`}
          >
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search Constituency..."
                value={searchText}
                onChange={handleSearchChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="w-full px-4 py-2 border rounded-lg shadow"
              />

              {showDropdown && filteredConstituencies.length > 0 && (
                <ul className="absolute top-full left-0 right-0 max-h-60 overflow-y-auto bg-white border rounded-lg shadow mt-1 z-50">
                  {filteredConstituencies.map((c, idx) => (
                    <li
                      key={idx}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onMouseDown={() => {
                        setSearchText(c);
                        setShowDropdown(false);
                      }}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={`flex gap-3 ${isSearchMode ? "w-full justify-center" : ""}`}>

              <button
                onClick={searchConstituency}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
              >
                Search
              </button>

              {isSearchMode && (
                <button
                  onClick={clearSearch}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg shadow"
                >
                  Clear
                </button>
              )}

            </div>
          </div>

          {/* PARTY CARDS */}

          {!selectedParty && (

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">

              {parties.map((party) => (

                <PartyCard
                  key={party.name}
                  party={party}
                  onClick={(name) => setSelectedParty(name)}
                />

              ))}

            </div>

          )}

          {/* PIE CHART */}

          {!isSearchMode && (

            <div className="mt-14">

              <div className="bg-white/20 backdrop-blur-md p-5 md:p-8 rounded-2xl shadow-xl">

                <h3 className="text-xl md:text-2xl font-semibold text-center -mb-10">
                  Seat Distribution
                </h3>

                <PieChartSection parties={parties} />

              </div>

            </div>

          )}

          {/* SEARCH RESULT */}

          {isSearchMode && (

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* CANDIDATES */}

              <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl shadow-lg overflow-x-auto">

                <h3 className="text-lg md:text-xl font-semibold text-center mb-4">
                  Candidates
                </h3>

                <table className="w-full text-sm">

                  <thead>

                    <tr className="bg-gray-200">
                      <th className="p-2 border">Party</th>
                      <th className="p-2 border">Candidate</th>
                      <th className="p-2 border">Image</th>
                    </tr>

                  </thead>

                  <tbody>

                    {candidateData.map((item) => (

                      <tr key={item.party}>

                        <td className="border p-2 text-center">
                          {item.party}
                        </td>

                        <td className="border p-2 text-center">
                          {item.name}
                        </td>

                        <td className="border p-2 flex justify-center">

                          {item.image && (
                            <img
                              src={`http://localhost:5000/uploads/candidates/${item.image}`}
                              alt={item.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {/* BAR CHART */}

              <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl shadow-lg">

                <h3 className="text-lg md:text-xl font-semibold text-center mb-4">
                  Vote Comparison
                </h3>

                <BarChartComponent data={voteData} />

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}