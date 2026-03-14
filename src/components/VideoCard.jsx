import { FaPlay } from "react-icons/fa";

const VideoCard = ({ video }) => {

  const openVideo = () => {
    window.open(video.videoUrl, "_blank");
  };

  return (
    <div
      onClick={openVideo}
      className="cursor-pointer min-w-65 sm:min-w-70 md:min-w-75 lg:min-w-[320px] 
      bg-white/70 rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition"
    >

      {/* Header */}
      <div className="flex items-center gap-2 p-3">
        <img
          src={video.logo}
          alt="logo"
          className="w-7 h-7 rounded-full object-cover"
        />

        <div className="text-xs leading-tight">
          <p className="font-semibold text-gray-800 mb-0.5">{video.page}</p>
          <p className="text-gray-500 text-[10px] mb-0.5">{video.partyname}</p>
          <p className="text-gray-500 text-[10px]"><span className="mr-1">বিধানসভা:</span>{video.bidhabsova}</p>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="relative px-3">
        <img
          src={video.thumbnail}
          alt="video"
          className="w-full h-36 object-cover rounded-md"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-600 p-3 rounded-full text-white shadow-lg">
            <FaPlay size={14} />
          </div>
        </div>
      </div>

      {/* Title */}
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