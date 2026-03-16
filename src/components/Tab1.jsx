import React, { useState } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import NewWbAssembly from '../assets/new_wb_assembly_1.svg?react';
import { reHashdata } from '../../utils/reHashConsticuencyData';

function Tab1() {

  const [constitutionData, setConstitutionData] = useState(null)
  const handlePathClick = (event) => {
    const target = event.target;
    let constituency_name=target.getAttribute("sub_link");
    console.log(constituency_name);
    if (!target) return;

    // const dataTitleValue = target.dataset.title;
    // const consObj = reHashdata(dataTitleValue);
    // setConstitutionData(consObj);
  };

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

  return (

    <div className="w-[95%] h-87.5 m-auto border bg-gray-50">
      {/* <button
        onClick={exportSvgDataToCsv}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
      >
        Download CSV Data
      </button> */}
      <TransformWrapper
        initialScale={0.8}
        // centerOnInit={true}
        minScale={0.5}
        maxScale={10}
        initialPositionX={100}
      // disabled={true}         // Disables all internal events
      // panning={{ disabled: true }}  // Blocks dragging/moving
      // wheel={{ disabled: true }}    // Blocks mouse scrolling
      // pinch={{ disabled: true }}    // Blocks mobile pinching
      // doubleClick={{ disabled: true }} // Blocks double-tap zoom
      >
        <TransformComponent wrapperClass="!w-full !h-full" contentClass="flex items-center justify-center">
          {/* <div className="pb-10"> */}
          <NewWbAssembly
            className="w-full h-auto cursor-pointer"
            onClick={handlePathClick}
          />
          {/* </div> */}
        </TransformComponent>
      </TransformWrapper>
      {constitutionData && (
        <div className="mt-4 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-blue-900 border-b pb-2 mb-3">
            {constitutionData.con_name}
          </h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-gray-500">Candidate:</span>
            <span className="font-semibold text-right">{constitutionData.candidate_name}</span>

            <span className="text-gray-500">Party:</span>
            <span className="font-semibold text-right">{constitutionData.party}</span>

            <span className="text-gray-500">Votes:</span>
            <span className="font-semibold text-right">{constitutionData.votes} ({constitutionData.vote_percentage})</span>

            <span className="text-gray-500">Year:</span>
            <span className="font-semibold text-right">{constitutionData.year}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tab1