// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   LabelList,
//   Legend
// } from "recharts";

// export default function ResultPieBarSection() {

//   const results = [
//     { party: "তৃণমূল", win: 180, lead: 0, total: 180, color: "bg-green-400" },
//     { party: "বিজেপি", win: 75, lead: 0, total: 75, color: "bg-orange-400" },
//     { party: "বাম", win: 41, lead: 0, total: 41, color: "bg-red-600" },
//     { party: "অন্যরা", win: 6, lead: 0, total: 6, color: "bg-gray-300" },
//   ];

//   const parties = [
//     { name: "তৃণমূল", votes: 180 },
//     { name: "বিজেপি", votes: 75 },
//     { name: "বাম", votes: 41 },
//     { name: "অন্যরা", votes: 6 },
//   ];

//   const colors = ["#22c55e", "#f97316", "#b91c1c", "#3b82f6", "#eab308"];

//   const renderLabel = ({ value, x, y }) => (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor="middle"
//       dominantBaseline="central"
//       fontSize="11"
//       fontWeight="bold"
//     >
//       {value}
//     </text>
//   );

//   return (
//     <div className="w-full max-w-xl mx-auto rounded-xl p-4 border border-gray-400 -mb-1">

//       {/* PIE CHART */}
//       <h2 className="text-center font-semibold text-sm sm:text-base -mb-12">
//         ২০২১ নির্বাচনের পঞ্চায়েত ফলাফল
//       </h2>

//       <div className="w-full h-55 sm:h-65 md:h-75">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>

//             <Pie
//               data={parties}
//               dataKey="votes"
//               nameKey="name"
//               cx="50%"
//               cy="90%"
//               startAngle={180}
//               endAngle={0}
//               innerRadius="55%"
//               outerRadius="110%"
//               paddingAngle={2}
//             >
//               {parties.map((entry, index) => (
//                 <Cell key={index} fill={colors[index % colors.length]} />
//               ))}

//               <LabelList content={renderLabel} />
//             </Pie>

//             <Tooltip />

//             <Legend
//               verticalAlign="bottom"
//               align="center"
//               iconType="circle"
//               wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
//             />

//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* RESULT BAR SECTION */}

//       <div className="mt-6">

//         {/* Header */}
//         <div className="grid grid-cols-4 text-sm font-semibold text-gray-700 border-b pb-2">
//           <div>Alliance/Party</div>
//           <div className="text-center">WIN</div>
//           <div className="text-center">LEAD</div>
//           <div className="text-center">TOTAL</div>
//         </div>

//         {/* Rows */}
//         <div className="mt-2 space-y-2">
//           {results.map((item, index) => (
//             <div
//               key={index}
//               className={`grid grid-cols-4 items-center text-sm text-black p-2 rounded ${item.color}`}
//             >
//               <div className="font-semibold">{item.party}</div>
//               <div className="text-center">{item.win}</div>
//               <div className="text-center">{item.lead}</div>
//               <div className="text-center font-bold">{item.total}</div>
//             </div>
//           ))}
//         </div>

//       </div>

//     </div>
//   );
// }









import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ResultPieBarSection() {

  const [results, setResults] = useState([]);
  const [parties, setParties] = useState([]);
  const API = "http://localhost:4848/api";

  const partyMap = {
    TMC: { name: "তৃণমূল", color: "bg-green-400", chartColor: "#22c55e" },
    BJP: { name: "বিজেপি", color: "bg-orange-400", chartColor: "#f97316" },
    CPIM: { name: "বাম", color: "bg-red-600", chartColor: "#b91c1c" },
    Cong: { name: "কংগ্রেস", color: "bg-blue-400", chartColor: "#3b82f6" },
    OTHERS: { name: "অন্যরা", color: "bg-gray-300", chartColor: "#9ca3af" }
  };

  useEffect(() => {
    fetchPartyData();
  }, []);

  const fetchPartyData = async () => {
    try {
      const res = await axios.get(`${API}/party/parties`);

      const data = res.data;

      const barData = [];
      const pieData = [];

      Object.keys(data).forEach((key) => {

        const votes = Number(data[key]);

        barData.push({
          party: partyMap[key]?.name || key,
          win: votes,
          lead: 0,
          total: votes,
          color: partyMap[key]?.color || "bg-gray-200"
        });

        pieData.push({
          name: partyMap[key]?.name || key,
          votes: votes,
          color: partyMap[key]?.chartColor || "#9ca3af"
        });

      });

      setResults(barData);
      setParties(pieData);

    } catch (error) {
      console.error(error);
    }
  };

  const renderLabel = ({ value, x, y }) => (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="11"
      fontWeight="bold"
    >
      {value}
    </text>
  );

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl p-4 border border-gray-400 -mb-1">

      {/* PIE CHART */}
      <h2 className="text-center font-semibold text-sm sm:text-base -mb-12">
        ২০২১ নির্বাচনের পঞ্চায়েত ফলাফল
      </h2>

      <div className="w-full h-55 sm:h-65 md:h-75">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={parties}
              dataKey="votes"
              nameKey="name"
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius="55%"
              outerRadius="110%"
              paddingAngle={2}
            >
              {parties.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}

              <LabelList content={renderLabel} />
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
            />

          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* RESULT BAR SECTION */}
      <div className="mt-6">

        <div className="grid grid-cols-4 text-sm font-semibold text-gray-700 border-b pb-2">
          <div>Alliance/Party</div>
          <div className="text-center">WIN</div>
          <div className="text-center">LEAD</div>
          <div className="text-center">TOTAL</div>
        </div>

        <div className="mt-2 space-y-2">
          {results.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 items-center text-sm text-black p-2 rounded ${item.color}`}
            >
              <div className="font-semibold">{item.party}</div>
              <div className="text-center">{item.win}</div>
              <div className="text-center">{item.lead}</div>
              <div className="text-center font-bold">{item.total}</div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}