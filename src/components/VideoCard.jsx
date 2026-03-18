import { FaPlay } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const VideoCard = ({ video }) => {
  const [hover, setHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const getVideoId = (url) => {
    if (!url) return "";
    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      return url.split("v=")[1].split("&")[0];
    }
    return "";
  };

  const videoId = getVideoId(video.videoUrl);

  const openVideo = () => {
    if (video.videoUrl) {
      window.open(video.videoUrl, "_blank");
    }
  };

  useEffect(() => {
    if (!isMobile || video.type !== "video") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.7 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [isMobile, video.type]);

  const shouldPlay =
    video.type === "video" && (isMobile ? isVisible : hover);

  return (
    <div
      ref={cardRef}
      onClick={() => {
        if (video.type === "video" && !shouldPlay) openVideo();
      }}
      onMouseEnter={() => !isMobile && setHover(true)}
      onMouseLeave={() => !isMobile && setHover(false)}
      className="snap-center cursor-pointer 
      min-w-65 sm:min-w-70 md:min-w-75 lg:min-w-[320px]
      aspect-square
      bg-white rounded-xl shadow-md overflow-hidden 
      flex flex-col hover:shadow-2xl transition duration-300"
    >

      {/* ================= VIDEO CARD ================= */}
      {video.type === "video" ? (
        <>
          {/* HEADER */}
          <div className="flex items-center gap-2 px-3 py-2">
            <img
              src={video.logo}
              alt="logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-xs leading-tight">
              <p className="font-semibold text-sm">{video.name}</p>
              <p className="text-[11px] text-gray-500">
                {video.constituency}
              </p>
              <p className="text-[11px] text-gray-500">
                {video.party}
              </p>
            </div>
          </div>

          {/* VIDEO */}
          <div className="h-[50%] px-3 pt-2">
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">

              {!shouldPlay ? (
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`}
                  allow="autoplay"
                />
              )}

              {/* Play Button */}
              {!shouldPlay && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-600 p-4 rounded-full text-white shadow-lg">
                    <FaPlay size={16} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* TITLE */}
          <div className="h-[35%] px-3 pb-3 flex items-center">
            <p className="text-sm font-medium leading-snug line-clamp-3">
              {video.title}
            </p>
          </div>
        </>
      ) : (
        /* ================= IMAGE CARD ================= */
        <div className="relative flex flex-1">

          {/* LEFT IMAGE */}
          <div className="w-1/2 flex flex-col items-center justify-center bg-gray-50">
            <img
              src={video.thumbnail}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />
            <p className="text-sm font-semibold mt-2 text-center px-2">
              {video.name}
            </p>
          </div>

          {/* DIVIDER */}
          <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-gray-200"></div>

          {/* RIGHT CONTENT */}
          <div className="w-1/2 p-4 flex flex-col justify-center font-serif">

            <div className="flex items-center gap-2 mb-3">
              <img
                src={video.logo}
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-sm font-semibold">{video.party}</p>
            </div>

            <p className="text-xs text-gray-500 mb-1">
              {video.constituency}
            </p>

            <p className="text-sm text-gray-700 leading-snug line-clamp-3">
              Key candidate from {video.constituency}. Strong local presence and active political engagement.
            </p>

          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;