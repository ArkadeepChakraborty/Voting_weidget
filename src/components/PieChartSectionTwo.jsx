import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function PieChartSectionTwo({ parties }) {

  const colors = ["#f97316", "#16a34a", "#ca8a04", "#be185d", "#2563eb"];

  if (!parties || parties.length === 0) {
    return <p className="text-center">Loading chart...</p>;
  }

  const totalSeats = parties.reduce((sum, p) => sum + p.votes, 0);

  const percentageData = parties.map((p) => ({
    name: p.name,
    percentage: (p.votes / totalSeats) * 100
  }));

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ResponsiveContainer width="100%" aspect={1.2}>
        <PieChart>

          <Pie
            data={percentageData}
            dataKey="percentage"
            nameKey="name"
            outerRadius="80%"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {percentageData.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          <Legend verticalAlign="bottom" />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}