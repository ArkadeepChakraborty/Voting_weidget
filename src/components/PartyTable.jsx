import { useState } from "react";
import DistrictPieChart from "./DistrictPieChart";

export default function PartyTable({ partyName, data, onBack }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <div>
      {/* DISTRICT VIEW */}
      {!selectedDistrict && (
        <>
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6 sm:mb-10 px-2 sm:px-4">
            <button
              onClick={onBack} // or setSelectedDistrict(null)
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center
               bg-gray-200 rounded-full hover:bg-gray-300 
               shadow transition shrink-0"
            >
              ←
            </button>

            <h3 className="flex-1 text-center text-lg sm:text-2xl font-semibold text-blue-400 underline">
              {partyName} District Performance
            </h3>

            {/* Empty div to balance layout */}
            <div className="w-9 sm:w-10"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">

            {/* DISTRICT TABLE */}
            <div className="overflow-x-auto">
              <table className="min-w-140 w-full bg-white shadow-md rounded-xl border border-gray-300">
                <thead className="bg-gray-200">
                  <tr className="divide-x divide-gray-300">
                    <th className="p-3 text-center">District</th>
                    <th className="p-3 text-center">Total Seats</th>
                    <th className="p-3 text-center">Winning Leader</th>
                    <th className="p-3 text-center">Nearest Party (2nd)</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-300">
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className="divide-x divide-gray-300 hover:bg-gray-50 transition"
                    >
                      <td
                        className="p-2 sm:p-3 text-xs sm:text-sm text-center text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => setSelectedDistrict(item)}
                      >
                        {item.district}
                      </td>

                      <td className="p-2 sm:p-3 text-xs sm:text-sm text-center font-semibold">
                        {item.seats}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm text-center">{item.winner}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm text-center">{item.loser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PIE CHART */}
            <div className="bg-white/30 rounded-2xl p-4 sm:p-6 overflow-x-auto">
              <h3 className="text-lg font-semibold text-center mb-4">
                Seat Distribution by District
              </h3>

              <DistrictPieChart data={data} />
            </div>
          </div>
        </>
      )}

      {/* CONSTITUENCY VIEW */}
      {selectedDistrict && (
        <>
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6 sm:mb-10 px-2 sm:px-4">
            <button
              onClick={() => setSelectedDistrict(null)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center
               bg-gray-200 rounded-full hover:bg-gray-300 
               shadow transition shrink-0"
            >
              ←
            </button>

            <h3 className="flex-1 text-center text-lg sm:text-2xl font-semibold text-blue-400 underline">
              {selectedDistrict.district} Constituencies
            </h3>

            <div className="w-9 sm:w-10"></div>
          </div>

          {/* CONSTITUENCY TABLE FULL WIDTH */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-150 bg-white shadow-lg rounded-xl border border-gray-300">
              <thead className="bg-gray-200">
                <tr className="divide-x divide-gray-300">
                  <th className="p-4 text-center font-semibold">Constituency</th>
                  <th className="p-4 text-center font-semibold">Winning Leader</th>
                  <th className="p-4 text-center font-semibold">Winning Margin</th>
                  <th className="p-4 text-center font-semibold">Winning Party</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300">
                {selectedDistrict.constituencies.map((c, idx) => (
                  <tr
                    key={idx}
                    className="divide-x divide-gray-300 hover:bg-gray-50 transition"
                  >
                    <td className="p-4 text-center">{c.name}</td>
                    <td className="p-4 text-center">{c.winner}</td>
                    <td className="p-4 text-center font-semibold">
                      {c.margin}
                    </td>
                    <td className="p-4 text-center">{c.party}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}