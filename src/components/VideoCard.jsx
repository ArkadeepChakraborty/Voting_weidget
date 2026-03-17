// import { FaPlay } from "react-icons/fa";

// const VideoCard = ({ video }) => {

//   const openVideo = () => {
//     window.open(video.videoUrl, "_blank");
//   };

//   return (
//     <div
//       onClick={openVideo}
//       className="cursor-pointer min-w-65 sm:min-w-70 md:min-w-75 lg:min-w-[320px] 
//       bg-cyan-100 rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition"
//     >

//       {/* Header */}
//       <div className="flex items-center gap-2 p-3">
//         <img
//           src={video.logo}
//           alt="logo"
//           className="w-7 h-7 rounded-full object-cover"
//         />

//         <div className="text-xs leading-tight">
//           <p className="font-semibold text-gray-800 mb-0.5">{video.page}</p>
//           <p className="text-gray-500 text-[10px] mb-0.5">{video.partyname}</p>
//           <p className="text-gray-500 text-[10px]"><span className="mr-1">বিধানসভা:</span>{video.bidhabsova}</p>
//         </div>
//       </div>

//       {/* Thumbnail */}
//       <div className="relative px-3">
//         <img
//           src={video.thumbnail}
//           alt="video"
//           className="w-full h-36 object-cover rounded-md"
//         />

//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="bg-red-600 p-3 rounded-full text-white shadow-lg">
//             <FaPlay size={14} />
//           </div>
//         </div>
//       </div>

//       {/* Title */}
//       <div className="p-3">
//         <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-3">
//           {video.title}
//         </p>
//         <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-3">
//           <span className="mr-1">Total Votes:</span>{video.totalVotes}
//         </p>
//       </div>

//     </div>
//   );
// };

// export default VideoCard;




import { FaPlay } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const VideoCard = ({ video }) => {
  const [hover, setHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  // Detect screen size properly (responsive)
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Extract YouTube ID safely
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
    window.open(video.videoUrl, "_blank");
  };

  // Intersection Observer (ONLY for mobile)
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.75,  
      }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [isMobile]);

  // FINAL LOGIC
  const shouldPlay = isMobile ? isVisible : hover;

  return (
    <div
      ref={cardRef}
      onClick={(e) => {
        if (!shouldPlay) openVideo();
      }}
      onMouseEnter={() => !isMobile && setHover(true)}
      onMouseLeave={() => !isMobile && setHover(false)}
      className="snap-center cursor-pointer min-w-65 sm:min-w-70 md:min-w-75 lg:min-w-[320px]
      bg-cyan-100 rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition"
    >

      <div className="flex items-center gap-2 p-3">
        <img
          src={video.logo}
          alt="logo"
          className="w-7 h-7 rounded-full object-cover"
        />

        <div className="text-xs leading-tight">
          <p className="font-semibold text-gray-800 mb-0.5">{video.page}</p>
          <p className="text-gray-500 text-[10px] mb-0.5">{video.partyname}</p>
          <p className="text-gray-500 text-[10px]">
            <span className="mr-1">বিধানসভা:</span>{video.bidhabsova}
          </p>
        </div>
      </div>

      {/* Video Area */}
      <div className="relative px-3">

        {!shouldPlay ? (
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="video"
            className="w-full h-36 object-cover rounded-md"
          />
        ) : (
          <iframe
            key={videoId} // prevents reload glitches
            className="w-full h-36 rounded-md"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&playsinline=1`}
            allow="autoplay; encrypted-media"
          />
        )}

        {!shouldPlay && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-600 p-3 rounded-full text-white shadow-lg">
              <FaPlay size={14} />
            </div>
          </div>
        )}

      </div>

      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-3">
          {video.title}
        </p>

        <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-3">
          <span className="mr-1">Total Votes:</span>{video.totalVotes}
        </p>
      </div>

    </div>
  );
};

export default VideoCard;