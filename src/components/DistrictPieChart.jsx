// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// export default function DistrictPieChart({ data }) {
//   const COLORS = [
//     "#f97316",
//     "#16a34a",
//     "#ca8a04",
//     "#be185d",
//     "#2563eb",
//     "#7c3aed",
//   ];

//   return (
//     <div className="flex justify-center">
//       <PieChart width={400} height={350}>
//         <Pie
//           data={data}
//           dataKey="seats"
//           nameKey="district"
//           outerRadius={120}
//           label
//         >
//           {data.map((_, index) => (
//             <Cell key={index} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// }





import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DistrictPieChart({ data }) {
  // Generate dynamic colors based on data length
  const generateColors = (count) => {
    return Array.from({ length: count }, (_, index) =>
      `hsl(${(index * 360) / count}, 70%, 55%)`
    );
  };

  const colors = generateColors(data.length);

  return (
    <div className="w-full h-87.5">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="seats"
            nameKey="district"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}