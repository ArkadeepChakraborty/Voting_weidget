import React, { useRef, useState, useEffect } from "react";
import { FaRegCaretSquareRight, FaRegCaretSquareLeft } from "react-icons/fa";
import VideoCard from "./VideoCard";

const videos = [
  {
    logo: "https://tse1.mm.bing.net/th/id/OIP.3dg0qy8anN5uExdgKDO4JgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    page: "Narendra Modi",
    partyname: "ভারতীয় জনতা পার্টি (Bharatiya Janata Party)",
    bidhabsova: "Kolkata",
    thumbnail: "https://img.youtube.com/vi/lFeYU31TnQ8/hqdefault.jpg",
    videoUrl: "https://youtu.be/lFeYU31TnQ8",
    title: "কেন্দ্রীয় প্রকল্প নিয়ে বিজেপির সভা, উপস্থিত বহু নেতা",
    totalVotes: "150000"
  },
  {
    logo: "https://tse1.mm.bing.net/th/id/OIP.3dg0qy8anN5uExdgKDO4JgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    page: "Narendra Modi",
    partyname: "ভারতীয় জনতা পার্টি (Bharatiya Janata Party)",
    bidhabsova: "Kolkata",
    thumbnail: "https://img.youtube.com/vi/pkKn8q5AvsY?si=70leZFvLCpMhnm3B/hqdefault.jpg",
    videoUrl: "https://youtu.be/pkKn8q5AvsY?si=70leZFvLCpMhnm3B",
    title: "কেন্দ্রীয় প্রকল্প নিয়ে বিজেপির সভা, উপস্থিত বহু নেতা",
    totalVotes: "150000"
  },
  {
    logo: "https://tse1.mm.bing.net/th/id/OIP.3dg0qy8anN5uExdgKDO4JgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    page: "Narendra Modi",
    partyname: "ভারতীয় জনতা পার্টি (Bharatiya Janata Party)",
    bidhabsova: "Kolkata",
    thumbnail: "https://img.youtube.com/vi/0-FUhQKe-eU?si=teXONtgmdjnnUYYP/hqdefault.jpg",
    videoUrl: "https://youtu.be/0-FUhQKe-eU?si=teXONtgmdjnnUYYP",
    title: "কেন্দ্রীয় প্রকল্প নিয়ে বিজেপির সভা, উপস্থিত বহু নেতা",
    totalVotes: "150000"
  },
  {
    logo: "https://tse1.mm.bing.net/th/id/OIP.3dg0qy8anN5uExdgKDO4JgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    page: "Narendra Modi",
    partyname: "ভারতীয় জনতা পার্টি (Bharatiya Janata Party)",
    bidhabsova: "Kolkata",
    thumbnail: "https://img.youtube.com/vi/lFeYU31TnQ8/hqdefault.jpg",
    videoUrl: "https://youtu.be/lFeYU31TnQ8",
    title: "কেন্দ্রীয় প্রকল্প নিয়ে বিজেপির সভা, উপস্থিত বহু নেতা",
    totalVotes: "150000"
  }
];

const VideoCardsSection = () => {

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
    const container = scrollRef.current;
    const card = container.querySelector("div"); // first card
    const cardWidth = card.offsetWidth + 16; // 16 = gap-4

    container.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    const card = container.querySelector("div");
    const cardWidth = card.offsetWidth + 16;

    container.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full px-2 md:px-4 py-4">

      <h2 className="text-lg font-bold mb-3 text-center">
        Super Stars
      </h2>

      {/* LEFT BUTTON */}
      {showLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 md:left-1 lg:-left-6 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/80 backdrop-blur rounded-full shadow-md"
        >
          <FaRegCaretSquareLeft className="text-xl md:text-2xl lg:text-3xl" />
        </button>
      )}

      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2 px-1 md:px-4"
      >
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>

      {/* RIGHT BUTTON */}
      {showRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 md:right-1 lg:-right-6 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/80 backdrop-blur rounded-full shadow-md"
        >
          <FaRegCaretSquareRight className="text-xl md:text-2xl lg:text-3xl" />
        </button>
      )}

    </div>
  );
};

export default VideoCardsSection;