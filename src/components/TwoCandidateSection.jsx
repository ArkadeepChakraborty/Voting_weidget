import React from "react";

/* -------- Candidate Data -------- */

const candidates = [
  {
    id: 1,
    name: "শ্রী মাধব কান্ত",
    votes: "120,000",
    status: "এগিয়ে রয়েছেন",
    partyIcon: "https://tse3.mm.bing.net/th/id/OIP.WlOIorPE1J4uQse34mMSdQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 2,
    name: "শ্রীমতী অনন্যা দাস",
    votes: "115,000",
    status: "পিছিয়ে রয়েছেন",
    partyIcon: "https://tse3.mm.bing.net/th/id/OIP.WlOIorPE1J4uQse34mMSdQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

/* -------- Candidate Card -------- */

const CandidateCard = ({ candidate }) => {
  const isLeading = candidate.status === "এগিয়ে রয়েছেন";

  return (
    <div className="bg-cyan-100 rounded-lg shadow border relative">

      {/* Status */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span
          className={`text-xs sm:text-sm font-bold px-4 py-1 rounded shadow
          ${isLeading ? "bg-green-400 text-black" : "bg-red-600 text-white"}`}
        >
          {candidate.status}
        </span>
      </div>

      {/* Body */}
      <div className="flex items-center ml-5 p-4 pt-8">

        <img
          src={candidate.partyIcon}
          alt="party"
          className="w-14 h-14 rounded-full border-4 border-orange-400 object-cover"
        />

        <div className="ml-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {candidate.name}
          </h2>
        </div>
      </div>

      {/* Votes */}
      <div className="bg-[#1a2d5e] text-white flex justify-between items-center p-3 rounded-b-lg">

        <p className="text-sm sm:text-base">
          ভোট পেয়েছেন : <span className="font-bold">{candidate.votes}</span>
        </p>

        <div
          className={`px-2 py-1 rounded text-lg font-bold
          ${isLeading ? "bg-green-400 text-black" : "bg-red-600 text-white"}`}
        >
          {isLeading ? "▲" : "▼"}
        </div>

      </div>

    </div>
  );
};

/* -------- Page -------- */

export default function TwoCandidateSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h2 className="text-xl font-bold text-center mb-6">
        Top Candidates
      </h2>

      {/* Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}

      </div>

    </div>
  );
}