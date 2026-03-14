import { useEffect, useRef } from "react";

const headlines = [
  "বাকি ৫ দিন, চড়ছে SIR-এর জমি পড়, এবার সরকারি তৎপরতা",
  "ছাত্র ভোটার তালিকায় নাম না থাকলে করণীয় কী",
  "রাজ্যে নতুন উন্নয়ন প্রকল্প ঘোষণা",
];

export default function NewsTicker() {
  const tickerRef = useRef(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    let animation;

    function startScroll() {
      let position = 0;

      function animate() {
        position -= 1;
        ticker.style.transform = `translateX(${position}px)`;

        if (Math.abs(position) >= ticker.scrollWidth / 2) {
          position = 0;
        }

        animation = requestAnimationFrame(animate);
      }

      animate();
    }

    startScroll();

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="w-full flex items-center bg-gray-200 overflow-hidden border">

      {/* Left NEWS label */}
      <div className="flex bg-red-600 text-white font-bold px-4 py-2 text-sm">
        <span className="hidden md:block lg:block mr-1">BREAKING</span> NEWS
      </div>

      {/* Ticker area */}
      <div className="flex-1 overflow-hidden">
        <div
          ref={tickerRef}
          className="flex items-center whitespace-nowrap"
        >
          {[...headlines, ...headlines].map((text, index) => (
            <div key={index} className="flex items-center mr-5">

              {/* Number box */}
              <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 mr-2">
                {index % headlines.length + 1}
              </span>

              {/* Headline */}
              <span className="text-sm text-gray-800">
                {text}
              </span>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}