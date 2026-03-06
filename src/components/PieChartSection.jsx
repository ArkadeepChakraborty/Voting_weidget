// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { parties } from "../data/parties";

// export default function PieChartSection() {
//   const colors = ["#f97316", "#16a34a", "#ca8a04", "#be185d", "#2563eb"];

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <ResponsiveContainer width="100%" aspect={1.2}>
//         <PieChart>
//           <Pie
//             data={parties}
//             dataKey="votes"
//             nameKey="name"
//             outerRadius="80%"
//           >
//             {parties.map((_, index) => (
//               <Cell
//                 key={index}
//                 fill={colors[index % colors.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend verticalAlign="bottom"/>
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }



import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function PieChartSection({ parties }) {

  const colors = ["#f97316", "#16a34a", "#ca8a04", "#be185d", "#2563eb"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ResponsiveContainer width="100%" aspect={1.2}>
        <PieChart>
          <Pie
            data={parties}
            dataKey="votes"
            nameKey="name"
            outerRadius="80%"
          >
            {parties.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}