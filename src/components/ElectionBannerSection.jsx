export default function ElectionBannerSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-2 py-4 -mb-7">

      <div className="rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition">

        <img
          src="/election-banner.webp"
          alt="Upcoming Election 2026"
          className="w-full h-24 md:h-32 lg:h-36 object-cover"
        />

      </div>

    </div>
  );
}