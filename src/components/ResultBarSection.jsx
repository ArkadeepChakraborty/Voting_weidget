// export default function ResultBarSection() {

//   const results = [
//     { party: "NDA", win: 202, lead: 0, total: 202, color: "bg-orange-400" },
//     { party: "MGB", win: 35, lead: 0, total: 35, color: "bg-blue-400" },
//     { party: "JSP", win: 0, lead: 0, total: 0, color: "bg-yellow-400" },
//     { party: "Others", win: 6, lead: 0, total: 6, color: "bg-gray-300" },
//   ];

//   return (
//     <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow p-4">

//       {/* Header */}
//       <div className="grid grid-cols-4 text-sm font-semibold text-gray-700 border-b pb-2">
//         <div>Alliance/Party</div>
//         <div className="text-center">WIN</div>
//         <div className="text-center">LEAD</div>
//         <div className="text-center">TOTAL</div>
//       </div>

//       {/* Rows */}
//       <div className="mt-2 space-y-2">

//         {results.map((item, index) => (
//           <div
//             key={index}
//             className={`grid grid-cols-4 items-center text-sm text-black p-2 rounded ${item.color}`}
//           >
//             <div className="font-semibold">{item.party}</div>
//             <div className="text-center">{item.win}</div>
//             <div className="text-center">{item.lead}</div>
//             <div className="text-center font-bold">{item.total}</div>
//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }




import { useEffect, useState } from "react";
import axios from "axios";

export default function ResultBarSection() {

  const [results, setResults] = useState([]);
  const API = "http://localhost:4848/api";

  const colors = {
    TMC: "bg-green-500",
    BJP: "bg-orange-400",
    CPIM: "bg-red-500",
    Cong: "bg-blue-400",
    OTHERS: "bg-gray-300",
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const res = await axios.get(`${API}/party/parties`);

      const data = res.data;

      const formatted = Object.entries(data).map(([party, seats]) => ({
        party,
        win: seats,
        lead: 0,
        total: seats,
        color: colors[party] || "bg-gray-200",
      }));

      setResults(formatted);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-transparent rounded-xl p-4 border border-gray-400">

      {/* Header */}
      <div className="grid grid-cols-4 text-sm font-semibold text-gray-700 border-b pb-2">
        <div>Alliance/Party</div>
        <div className="text-center">WIN</div>
        <div className="text-center">LEAD</div>
        <div className="text-center">TOTAL</div>
      </div>

      {/* Rows */}
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
  );
}