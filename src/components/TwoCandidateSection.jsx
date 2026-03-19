import React from "react";

/* -------- Candidate Data -------- */

const candidates = [
  {
    id: 1,
    name: "Sri Madhab Kanta",
    party: "AITC",
    votes: "120,000",
    status: "এগিয়ে রয়েছেন",
    partyIcon:
      "https://tse3.mm.bing.net/th/id/OIP.WlOIorPE1J4uQse34mMSdQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 2,
    name: "Mrs. Ananya Das",
    party: "BJP",
    votes: "115,000",
    status: "পিছিয়ে রয়েছেন",
    partyIcon:
      "https://tse3.mm.bing.net/th/id/OIP.WlOIorPE1J4uQse34mMSdQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

/* -------- Merged Candidate Card -------- */

const MergedCandidateCard = ({ winner, loser }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border p-5 font-serif">

      <div className="text-center mb-6">
        <span
          className="text-xl sm:text-sm font-bold px-4 py-1 rounded shadowbg-green-400 text-black"        >
          Panihati
        </span>
      </div>

      <div className="flex justify-between items-center">

        {/* ================= LEFT (WINNER) ================= */}
        <div className="w-1/2 flex flex-col items-center text-center">

          {/* Image + Arrow */}
          <div className="relative">
            <img
              src={winner.partyIcon}
              className="w-20 h-20 rounded-full object-cover border-4 border-green-400"
            />

            {/* Up Arrow Badge */}
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow">
              ▲
            </div>
          </div>

          {/* Details */}
          <h3 className="mt-3 text-base font-bold text-gray-800">
            {winner.name}
          </h3>

          <p className="text-sm text-gray-500">{winner.party}</p>

          <p className="text-sm mt-1">
            Votes: <span className="font-semibold">{winner.votes}</span>
          </p>
        </div>

        {/* DIVIDER */}
        <div className="h-28 w-px bg-gray-300 mx-2"></div>

        {/* ================= RIGHT (LOSER) ================= */}
        <div className="w-1/2 flex flex-col items-center text-center">

          {/* Image + Arrow */}
          <div className="relative">
            <img
              src={loser.partyIcon}
              className="w-20 h-20 rounded-full object-cover border-4 border-red-500"
            />

            {/* Down Arrow Badge */}
            <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow">
              ▼
            </div>
          </div>

          {/* Details */}
          <h3 className="mt-3 text-base font-bold text-gray-800">
            {loser.name}
          </h3>

          <p className="text-sm text-gray-500">{loser.party}</p>

          <p className="text-sm mt-1">
            Votes: <span className="font-semibold">{loser.votes}</span>
          </p>
        </div>

      </div>
    </div>
  );
};

/* -------- Page -------- */

export default function TwoCandidateSection() {
  const winner = candidates.find(c => c.status === "এগিয়ে রয়েছেন");
  const loser = candidates.find(c => c.status !== "এগিয়ে রয়েছেন");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 font-serif">

      <h2 className="text-2xl font-bold text-center mb-6">
        Top Candidates
      </h2>

      <MergedCandidateCard winner={winner} loser={loser} />

    </div>
  );
}