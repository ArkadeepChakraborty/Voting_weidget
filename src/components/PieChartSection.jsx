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



import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function PieChartSection({ parties }) {
  const colors = ["#f97316", "#16a34a", "#ca8a04", "#be185d", "#2563eb"];

  // State to track outer radius for responsiveness
  const [outerRadius, setOuterRadius] = useState(220);
  const [containerHeight, setContainerHeight] = useState(350);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) { // Mobile breakpoint
        setOuterRadius(120); // Smaller pie for mobile
        setContainerHeight(250);
      } else {
        setOuterRadius(220); // Desktop size
        setContainerHeight(350);
      }
    }

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ResponsiveContainer width="100%" height={containerHeight}>
        <PieChart>
          <Pie
            data={parties}
            dataKey="votes"
            nameKey="name"
            cx="50%"
            cy="90%"
            innerRadius={0}
            outerRadius={outerRadius}
            startAngle={180}
            endAngle={0}
          >
            {parties.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            height={30}
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ marginTop: -20 }}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}