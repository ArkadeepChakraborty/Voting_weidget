import React, { useRef, useState, useEffect } from "react";
import { FaRegCaretSquareRight } from "react-icons/fa";
import { FaRegCaretSquareLeft } from "react-icons/fa";

/* ---------------- Candidate Data ---------------- */

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
    {
        id: 3,
        name: "শ্রী রাহুল রায়",
        votes: "98,000",
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

/* ---------------- Candidate Card ---------------- */

const CandidateCard = ({ candidate }) => {
    const isLeading = candidate.status === "এগিয়ে রয়েছেন";

    return (
        <div className="min-w-80 sm:min-w-75 md:min-w-85 snap-center p-2">
            <div className="relative bg-white rounded-lg shadow border">

                {/* Status */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <span
                        className={`text-xs sm:text-sm font-bold px-4 py-1 rounded shadow
            ${isLeading ? "bg-green-400 text-black" : "bg-red-600 text-white"}`}
                    >
                        {candidate.status}
                    </span>
                </div>

                {/* Body */}
                <div className="flex items-center p-4 pt-8 bg-cyan-100 rounded-t-lg">
                    <div className="flex items-center ml-5">
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
        </div>
    );
};

/* ---------------- Carousel ---------------- */

export default function CandidateCarousel() {
    const scrollRef = useRef(null);

    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const checkScroll = () => {
        const el = scrollRef.current;

        const scrollLeft = el.scrollLeft;
        const scrollWidth = el.scrollWidth;
        const clientWidth = el.clientWidth;

        setShowLeft(scrollLeft > 5);
        setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
    };

    useEffect(() => {
        checkScroll();
    }, []);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    };

    return (
        <div className="relative max-w-6xl mx-auto px-2 lg:px-8 py-8 -mb-8">

            <h2 className="text-xl font-bold text-center mb-4">
                Top Candidates
            </h2>

            {/* LEFT BUTTON */}
            {showLeft && (
                <button
                    onClick={scrollLeft}
                    className=" -ml-4 hidden md:hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 px-3 py-2 rounded-r-md"
                >
                    <FaRegCaretSquareLeft size={30} />
                </button>
            )}

            {/* SCROLL AREA */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
            >
                {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
            </div>

            {/* RIGHT BUTTON */}
            {showRight && (
                <button
                    onClick={scrollRight}
                    className=" -mr-4 hidden md:hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 px-3 py-2 rounded-l-md"
                >
                    <FaRegCaretSquareRight size={30} />
                </button>
            )}
        </div>
    );
}