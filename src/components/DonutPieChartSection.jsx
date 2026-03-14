// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   LabelList,
//   Legend
// } from "recharts";

// export default function PieChartSection({ parties }) {

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
//     <div className="w-full max-w-xl mx-auto bg-cyan-100 rounded-xl p-4 shadow">

//       <h2 className="text-center font-semibold text-sm sm:text-base -mb-13">
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
//               wrapperStyle={{
//                 fontSize: "12px",
//                 marginTop: "10px"
//               }}
//             />

//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//     </div>
//   );
// }






import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend
} from "recharts";

export default function PieChartSection() {

  const [parties, setParties] = useState([]);
  const API = "http://localhost:4848/api";

  const colors = ["#22c55e", "#f97316", "#b91c1c", "#3b82f6", "#eab308"];

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const res = await axios.get(`${API}/party/parties`);

      const data = res.data;

      const formatted = Object.entries(data).map(([key, value]) => ({
        name: key,
        votes: Number(value)
      }));

      setParties(formatted);

    } catch (error) {
      console.error("Error fetching parties:", error);
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
    <div className="w-full max-w-xl mx-auto bg-transparent rounded-xl p-4 border border-gray-400">

      <h2 className="text-center font-semibold text-sm sm:text-base -mb-13">
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
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}

              <LabelList content={renderLabel} />

            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                fontSize: "12px",
                marginTop: "10px"
              }}
            />

          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}