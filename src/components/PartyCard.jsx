// export default function PartyCard({ party, onClick }) {
//   return (
//     <div
//       onClick={() => onClick(party.name)}
//       className={`${party.color}
//       rounded-2xl sm:rounded-3xl shadow-lg
//       p-4 sm:p-6
//       flex flex-col items-center justify-center
//       hover:scale-105 hover:shadow-2xl
//       transition-all duration-300
//       cursor-pointer text-white`}
//     >
//       <div className="bg-white p-1.5 sm:p-2 rounded-full mb-2 sm:mb-3 shadow">
//         <img
//           src={party.logo}
//           alt={party.name}
//           className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
//         />
//       </div>

//       <h2 className="text-sm sm:text-lg font-semibold tracking-wide text-center">
//         {party.name}
//       </h2>

//       <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">
//         {party.votes}
//       </p>
//     </div>
//   );
// }


export default function PartyCard({ party, onClick }) {
  return (
    <div
      onClick={() => onClick(party.name)}
      className={`
      ${party.color}
      rounded-2xl sm:rounded-3xl shadow-lg
      p-4 sm:p-6
      flex flex-col items-center justify-center
      hover:scale-105 hover:shadow-2xl
      transition-all duration-300
      cursor-pointer text-white`}
    >

      <div className="bg-white p-2 rounded-full mb-3 shadow">
        <img
          src={party.logo}
          alt={party.name}
          className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
        />
      </div>

      <h2 className="text-sm sm:text-lg font-semibold text-center">
        {party.name}
      </h2>

      <p className="text-xl sm:text-3xl font-bold mt-2">
        {party.votes}
      </p>

    </div>
  );
}