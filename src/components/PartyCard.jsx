export default function PartyCard({ party, onClick }) {
  return (
    <div
      onClick={() => onClick(party.name)}
      className={`${party.color} 
      rounded-3xl shadow-lg 
      p-6 flex flex-col items-center justify-center 
      hover:scale-105 hover:shadow-2xl 
      transition-all duration-300 
      cursor-pointer text-white`}
    >
      <div className="bg-white p-2 rounded-full mb-3 shadow">
        <img
          src={party.logo}
          alt={party.name}
          className="w-14 h-14 object-contain"
        />
      </div>

      <h2 className="text-lg font-semibold tracking-wide">
        {party.name}
      </h2>

      <p className="text-3xl font-bold mt-2">
        {party.votes}
      </p>
    </div>
  );
}