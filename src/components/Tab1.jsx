// import React, { useState, useEffect } from 'react'
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import NewWbAssembly from '../assets/new_wb_assembly_1.svg?react';
// import { reHashdata } from '../../utils/reHashConsticuencyData';


// function Tab1() {

//   const [constitutionData, setConstitutionData] = useState(null);
//   const [carouselIndex, setCarouselIndex] = useState(0);
//   const [selectedSeat,setSelectedSeat] = useState(null)
//   useEffect(() => {

//   const data = window.WB_ELECTION_DATA?.sheet_0;
//   if (!data) return;

//   const partyColor = {
//     AITC: "#00a651",
//     BJP: "#ff9933",
//     CPI: "#e53935",
//     CPIM: "#e53935",
//     INC: "#1976d2"
//   };

//   const seats = Object.entries(data);

//   seats.forEach(([seat, r], index) => {

//     setTimeout(() => {

//       const el = document.querySelector(`[sub_link="${r.constituency}"]`);

//       if (el) {
//         el.style.fill = partyColor[r.party] || "#cccccc";
//       }

//     }, index * 15); // controls animation speed

//   });

// }, []);

// useEffect(() => {

//   document.querySelectorAll("path[sub_link]").forEach(p => {

//     p.style.stroke = "none";
//     p.style.strokeWidth = "1";

//   });

//   if(selectedSeat){

//     const el = document.querySelector(`[sub_link="${selectedSeat}"]`);

//     if(el){

//       el.style.stroke = "#111";
//       el.style.strokeWidth = "3";

//       el.style.filter = "drop-shadow(0px 0px 6px rgba(0,0,0,0.6))";

//     }

//   }

// },[selectedSeat]);

//   const handlePathClick = (event) => {

//   const target = event.target;
//   if (!target) return;

//   const constituency_name = target.getAttribute("sub_link");
//   if (!constituency_name) return;

//   const seatKey = constituency_name
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g,"_");

//   const prev = window.WB_ELECTION_DATA?.sheet_0?.[seatKey];
//   const current = window.WB_ELECTION_DATA?.sheet_1?.[seatKey];

//   setSelectedSeat(constituency_name);

//   setConstitutionData({
//     prev,
//     current
//   });

// };

//   const buildCandidateList = (data) => {

//     const list = []

//     Object.keys(data).forEach(k => {

//       if (k === "constituency") return

//       list.push({
//         party: k.toUpperCase(),
//         candidate: data[k] || "Yet to be updated"
//       })

//     })

//     return list
//   }

//   const candidateList = constitutionData
//     ? buildCandidateList(constitutionData.current)
//     : []

//   const exportSvgDataToCsv = () => {
//     // 1. Select all paths that have the data-title attribute
//     const paths = document.querySelectorAll('path[data-title]');

//     // 2. Extract and parse data from each path
//     const rows = Array.from(paths).map(path => {
//       const rawData = path.getAttribute('data-title');
//       // Use your existing function
//       return reHashdata(rawData);
//     });

//     // 3. Define CSV headers
//     const headers = ["Constituency name", "Wining candidate", "Party", "Vote", "Vote Share", "Total Voters", "Year"];

//     // 4. Convert objects to CSV rows
//     const csvContent = [
//       headers.join(","), // Header row
//       ...rows.map(row => [
//         `"${row.con_name}"`,
//         `"${row.candidate_name}"`,
//         `"${row.party}"`,
//         `"${row.votes}"`,
//         `"${row.vote_percentage}"`,
//         `"${row.poll_vote}"`,
//         `"${row.year}"`
//       ].join(","))
//     ].join("\n");

//     // 5. Create a download link and trigger it
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "wb_assembly_data.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (

//     <div className="w-[95%] h-87.5 m-auto border bg-gray-50">
//       {/* <button
//         onClick={exportSvgDataToCsv}
//         className="mb-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
//       >
//         Download CSV Data
//       </button> */}
//       <TransformWrapper
//         initialScale={0.8}
//         // centerOnInit={true}
//         minScale={0.5}
//         maxScale={10}
//         initialPositionX={100}
//       // disabled={true}         // Disables all internal events
//       // panning={{ disabled: true }}  // Blocks dragging/moving
//       // wheel={{ disabled: true }}    // Blocks mouse scrolling
//       // pinch={{ disabled: true }}    // Blocks mobile pinching
//       // doubleClick={{ disabled: true }} // Blocks double-tap zoom
//       >
//         <TransformComponent wrapperClass="!w-full !h-full" contentClass="flex items-center justify-center">
//           {/* <div className="pb-10"> */}
//           <NewWbAssembly
//             className="w-full h-auto cursor-pointer"
//             onClick={handlePathClick}
//           />
//           {/* </div> */}
//         </TransformComponent>
//       </TransformWrapper>
//       {constitutionData && candidateList.length > 0 && (

//         <div className="mt-4 bg-white border rounded-xl shadow p-4">

//           <h4 className="font-bold text-blue-900 mb-3">
//             2026 Candidates
//           </h4>

//           <div className="flex items-center justify-between">

//             <button
//               onClick={() => setCarouselIndex((carouselIndex - 1 + candidateList.length) % candidateList.length)}
//               className="px-3 py-1 bg-gray-200 rounded"
//             >
//               ‹
//             </button>

//             <div className="text-center flex-1">

//               <div className="text-sm text-gray-500">
//                 {candidateList[carouselIndex].party}
//               </div>

//               <div className="font-semibold text-lg">
//                 {candidateList[carouselIndex].candidate}
//               </div>

//             </div>

//             <button
//               onClick={() => setCarouselIndex((carouselIndex + 1) % candidateList.length)}
//               className="px-3 py-1 bg-gray-200 rounded"
//             >
//               ›
//             </button>

//           </div>

//         </div>

//       )}
//       {constitutionData?.prev && (
//         <div className="mt-4 p-4 bg-white rounded-xl shadow-lg border border-gray-200">

//           <h3 className="text-lg font-bold text-blue-900 border-b pb-2 mb-3">
//             {constitutionData.prev.constituency}
//           </h3>

//           <div className="grid grid-cols-2 gap-y-2 text-sm">

//             <span className="text-gray-500">Winning Candidate:</span>
//             <span className="font-semibold text-right">
//               {constitutionData.prev.winning_candidate}
//             </span>

//             <span className="text-gray-500">Party:</span>
//             <span className="font-semibold text-right">
//               {constitutionData.prev.party}
//             </span>

//             <span className="text-gray-500">Votes:</span>
//             <span className="font-semibold text-right">
//               {constitutionData.prev.votes}
//             </span>

//             <span className="text-gray-500">Vote Share:</span>
//             <span className="font-semibold text-right">
//               {(constitutionData.prev.vote_share * 100).toFixed(2)}%
//             </span>

//             <span className="text-gray-500">Total Voters:</span>
//             <span className="font-semibold text-right">
//               {constitutionData.prev.total_voters}
//             </span>

//             <span className="text-gray-500">Year:</span>
//             <span className="font-semibold text-right">
//               2021
//             </span>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Tab1








import React, { useState, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import NewWbAssembly from '../assets/wb_assembly_map.svg?react';
import { reHashdata } from '../../utils/reHashConsticuencyData';
import { getPartyLogo } from '../utils/getPartyLogo';


function Tab1() {

  const [constitutionData, setConstitutionData] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [carouselIndexo, setCarouselIndexo] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const partyColor = {
    AITC: "#00a651",
    BJP: "#ff9933",
    CPI: "#e53935",
    CPIM: "#e53935",
    INC: "#1976d2",
    BGMP: "#ffff00",
    ISF: "#e53935"
  };

  useEffect(() => {
    const applyColors = () => {
      const data = window.WB_ELECTION_DATA?.sheet_0;
      if (!data) return;

      const root = window.__SHADOW_ROOT__ || document;

      Object.entries(data).forEach(([seat, r]) => {
        const el = root.querySelector(`[sub_link="${r.constituency}"]`);

        if (el) {
          el.style.fill = partyColor[r.party] || "#cccccc";
        } else {
          console.log("Not found:", r.constituency);
        }
      });
    };

    const timeout = setTimeout(() => {
      applyColors();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {

    document.querySelectorAll("path[sub_link]").forEach(p => {

      p.style.stroke = "none";
      p.style.strokeWidth = "1";

    });

    if (selectedSeat) {

      const el = document.querySelector(`[sub_link="${selectedSeat}"]`);

      if (el) {

        el.style.stroke = "#111";
        el.style.strokeWidth = "3";

        el.style.filter = "drop-shadow(0px 0px 6px rgba(0,0,0,0.6))";

      }

    }

  }, [selectedSeat]);

  const handlePathClick = (event) => {

    const target = event.target;
    if (!target) return;

    const constituency_name = target.getAttribute("sub_link");
    if (!constituency_name) return;

    const seatKey = constituency_name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");

    const prev = window.WB_ELECTION_DATA?.sheet_0?.[seatKey];
    const current = window.WB_ELECTION_DATA?.sheet_1?.[seatKey];

    setSelectedSeat(constituency_name);

    setConstitutionData({
      prev,
      current
    });

  };

  const buildCandidateList = (data) => {

    const list = []

    Object.keys(data).forEach(k => {

      if (k === "constituency") return

      list.push({
        party: k.toUpperCase(),
        candidate: data[k] || "Yet to be updated"
      })

    })

    return list
  }

  const candidateList = constitutionData
    ? buildCandidateList(constitutionData.current)
    : []

  const exportSvgDataToCsv = () => {
    // 1. Select all paths that have the data-title attribute
    const paths = document.querySelectorAll('path[data-title]');

    // 2. Extract and parse data from each path
    const rows = Array.from(paths).map(path => {
      const rawData = path.getAttribute('data-title');
      // Use your existing function
      return reHashdata(rawData);
    });

    // 3. Define CSV headers
    const headers = ["Constituency name", "Wining candidate", "Party", "Vote", "Vote Share", "Total Voters", "Year"];

    // 4. Convert objects to CSV rows
    const csvContent = [
      headers.join(","), // Header row
      ...rows.map(row => [
        `"${row.con_name}"`,
        `"${row.candidate_name}"`,
        `"${row.party}"`,
        `"${row.votes}"`,
        `"${row.vote_percentage}"`,
        `"${row.poll_vote}"`,
        `"${row.year}"`
      ].join(","))
    ].join("\n");

    // 5. Create a download link and trigger it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "wb_assembly_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (isPaused || candidateList.length === 0) return;

    const interval = setInterval(() => {
      setCarouselIndexo((prev) => (prev + 1) % candidateList.length);
    }, 3000); // change timing if needed

    return () => clearInterval(interval);
  }, [isPaused, candidateList.length]);

  return (
    <div className="w-[95%] md:w-[90%] lg:w-[75%] lg:max-w-4xl xl:max-w-5xl mx-auto space-y-4">

      {/* MAP CARD ONLY */}
      <div className="border border-gray-400 bg-gray-50 rounded-xl overflow-hidden relative">

        {/* 🔥 LEGEND */}
        <div className="absolute top-3 left-3  backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-serif z-10">

          <p className="font-bold text-gray-700 mb-2">Party</p>

          <div className="space-y-1">
            {Object.entries(partyColor).map(([party, color]) => (
              <div key={party} className="flex items-center gap-2">

                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: color }}
                ></span>

                <span className="text-gray-700">{party}</span>

              </div>
            ))}
          </div>

        </div>

        {/* MAP */}
        <div className="w-full h-87.5 md:h-112.5">

          <TransformWrapper
            initialScale={0.8}
            minScale={0.1}
            maxScale={10}
            initialPositionX={100}
          >
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="flex items-center justify-center -ml-13 lg:-ml-30 md:-ml-30"
            >
              <NewWbAssembly
                className="w-full h-full cursor-pointer"
                onClick={handlePathClick}
              />
            </TransformComponent>
          </TransformWrapper>

        </div>
      </div>

      {/* 2026 CANDIDATES CARD */}
      {constitutionData && candidateList.length > 0 && (
        <div
          className="bg-white border border-gray-200 rounded-xl shadow-lg p-5 font-serif"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Title */}
          <h4 className="font-bold text-blue-900 mb-4 text-center text-lg tracking-wide">
            2026 Candidates
          </h4>

          <div className="flex items-center justify-between">

            {/* LEFT BUTTON */}
            <button
              onClick={() =>
                setCarouselIndexo(
                  (carouselIndexo - 1 + candidateList.length) %
                  candidateList.length
                )
              }
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow transition"
            >
              ‹
            </button>

            {/* CANDIDATE CARD */}
            <div className="flex-1 flex justify-center">

              <div className="rounded-xl px-6 py-4 text-center w-55 transition">

                {/* Party Logo */}
                <img
                  src={getPartyLogo(candidateList[carouselIndexo].party)}
                  alt="party"
                  className="w-11 h-11 mx-auto rounded-full border-4 border-white shadow-md mb-3"
                />

                {/* Candidate Name */}
                <div className="font-semibold text-lg text-gray-800">
                  {candidateList[carouselIndexo].candidate}
                </div>

                {/* Party */}
                <div className="text-sm text-gray-500 mt-1">
                  {candidateList[carouselIndexo].party}
                </div>

              </div>

            </div>

            {/* RIGHT BUTTON */}
            <button
              onClick={() =>
                setCarouselIndexo(
                  (carouselIndexo + 1) % candidateList.length
                )
              }
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow transition"
            >
              ›
            </button>

          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {candidateList.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition ${index === carouselIndexo
                  ? "bg-blue-600 scale-110"
                  : "bg-gray-300"
                  }`}
              ></div>
            ))}
          </div>

        </div>
      )}

      {/* RESULT CARD */}
      {constitutionData?.prev && (
        <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200 font-serif">

          {/* Constituency */}
          <h3 className="text-lg font-bold text-blue-900 border-b pb-2 mb-4 text-center">
            {constitutionData.prev.constituency}
          </h3>

          {/* Candidate + Logo */}
          <div className="flex items-center justify-center gap-3 mb-3">

            <p className="text-base font-semibold">
              {constitutionData.prev.winning_candidate}
            </p>

            <img
              src={getPartyLogo(constitutionData.prev.party)}
              alt="party logo"
              className="w-8 h-8 rounded-full object-cover border"
            />

          </div>

          {/* Votes */}
          <p className="text-center text-sm text-gray-600">
            Votes:{" "}
            <span className="font-semibold text-gray-800">
              {constitutionData.prev.votes}
            </span>
          </p>

        </div>
      )}

    </div>
  );
}

export default Tab1