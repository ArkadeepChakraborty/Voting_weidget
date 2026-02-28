import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { parties } from "../data/parties";

export default function PieChartSection() {
  const colors = ["#f97316", "#16a34a", "#ca8a04", "#be185d", "#2563eb"];

  return (
    <PieChart width={450} height={350}>
      <Pie
        data={parties}
        dataKey="votes"
        nameKey="name"
        outerRadius={120}
        label
      >
        {parties.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={colors[index % colors.length]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}