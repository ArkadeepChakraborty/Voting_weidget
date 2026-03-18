import React, { useRef, useState, useEffect } from "react";
import { FaRegCaretSquareRight, FaRegCaretSquareLeft } from "react-icons/fa";
import VideoCard from "./VideoCard";
import { getPartyLogo } from "../utils/getPartyLogo";

const VideoCardsSection = () => {
  const scrollRef = useRef(null);

  const [cards, setCards] = useState([]);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const data = window.WB_ELECTION_DATA?.sheet_3;

    if (!data) return;

    const formatted = Object.values(data)
      .filter(item => item.image_url !== 0 || item.video_url !== 0)
      .map(item => {
        const isVideo = item.video_url && item.video_url !== 0;

        return {
          type: isVideo ? "video" : "image",
          name: item.candicate_name,
          party: item.party,
          constituency: item.constituency,

          // ✅ PARTY LOGO ADDED HERE
          logo: getPartyLogo(item.party),

          thumbnail: isVideo
            ? `https://img.youtube.com/vi/${extractYouTubeId(item.video_url)}/hqdefault.jpg`
            : item.image_url,

          videoUrl: isVideo ? item.video_url : null,
          title: isVideo ? item.video_title : item.candicate_name,
        };
      });

    setCards(formatted);
  }, []);

  /* ================= YOUTUBE ID EXTRACT ================= */
  const extractYouTubeId = (url) => {
    try {
      const regExp =
        /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(regExp);
      return match ? match[1] : "";
    } catch {
      return "";
    }
  };

  /* ================= SCROLL LOGIC ================= */
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
  }, [cards]);

  const scrollLeft = () => {
    const container = scrollRef.current;
    const card = container.querySelector(".card-item");
    if (!card) return;

    const cardWidth = card.offsetWidth + 16;

    container.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    const card = container.querySelector(".card-item");
    if (!card) return;

    const cardWidth = card.offsetWidth + 16;

    container.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full px-2 md:px-4 py-4">

      <h1 className="text-3xl font-bold mb-3 text-center font-serif">
        Key Candidates
      </h1>

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
        {cards.map((item, index) => (
          <div
            key={index}
            className="card-item snap-start"
          >
            <VideoCard video={item} />
          </div>
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