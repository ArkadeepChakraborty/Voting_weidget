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
          <div className="relative flex items-center justify-center mb-10">
            <button
              onClick={onBack}
              className="absolute left-0 w-10 h-10 flex items-center justify-center 
                         bg-gray-200 rounded-full hover:bg-gray-300 
                         shadow transition"
            >
              ←
            </button>

            <h3 className="text-2xl font-semibold text-center text-blue-400 underline">
              {partyName} District Performance
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* DISTRICT TABLE */}
            <div>
              <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-300">
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
                        className="p-3 text-center text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => setSelectedDistrict(item)}
                      >
                        {item.district}
                      </td>

                      <td className="p-3 text-center font-semibold">
                        {item.seats}
                      </td>
                      <td className="p-3 text-center">{item.winner}</td>
                      <td className="p-3 text-center">{item.loser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PIE CHART */}
            <div className="bg-gray-50 rounded-2xl shadow-inner p-6">
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
          <div className="relative flex items-center justify-center mb-10">
            <button
              onClick={() => setSelectedDistrict(null)}
              className="absolute left-0 w-10 h-10 flex items-center justify-center 
                         bg-gray-200 rounded-full hover:bg-gray-300 
                         shadow transition"
            >
              ←
            </button>

            <h3 className="text-2xl font-semibold text-center text-blue-400 underline">
              {selectedDistrict.district} Constituencies
            </h3>
          </div>

          {/* CONSTITUENCY TABLE FULL WIDTH */}
          <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-300">
            <thead className="bg-gray-200">
              <tr className="divide-x divide-gray-300">
                <th className="p-3 text-center">Constituency</th>
                <th className="p-3 text-center">Winning Leader</th>
                <th className="p-3 text-center">Winning Margin</th>
                <th className="p-3 text-center">Winning Party</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300">
              {selectedDistrict.constituencies.map((c, idx) => (
                <tr
                  key={idx}
                  className="divide-x divide-gray-300 hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-center">{c.name}</td>
                  <td className="p-3 text-center">{c.winner}</td>
                  <td className="p-3 text-center font-semibold">
                    {c.margin}
                  </td>
                  <td className="p-3 text-center">{c.party}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}