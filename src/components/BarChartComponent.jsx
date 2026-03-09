import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

export default function BarChartComponent({ data }) {

    const colors = ["#16a34a", "#ca8a04", "#ef4444", "#be185d", "#2563eb"];


    return (

        <ResponsiveContainer width="100%" height={300}>

            <BarChart
                layout="vertical"
                data={data}
            >

                <XAxis type="number" />

                <YAxis
                    dataKey="party"
                    type="category"
                />

                <Tooltip />

                <Bar dataKey="votes">

                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}

                </Bar>

            </BarChart>

        </ResponsiveContainer>

    );
}