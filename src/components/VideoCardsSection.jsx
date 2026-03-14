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
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <div className="relative px-4 py-4">

      <h2 className="text-lg font-bold mb-3 text-center">
        Super Stars
      </h2>

      {/* LEFT BUTTON */}
      {showLeft && (
        <button
          onClick={scrollLeft}
          className=" -ml-8 hidden md:hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 px-3 py-2 rounded-r-md"
        >
          <FaRegCaretSquareLeft size={30} />
        </button>
      )}

      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
      >
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>

      {/* RIGHT BUTTON */}
      {showRight && (
        <button
          onClick={scrollRight}
          className="-mr-8 hidden md:hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 px-3 py-2 rounded-l-md"
        >
          <FaRegCaretSquareRight size={30} />
        </button>
      )}

    </div>
  );
};

export default VideoCardsSection;