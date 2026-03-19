import { partylist } from "../data/partylist";

export const getPartyLogo = (partyName) => {
  if (!partyName) return partylist.find(p => p.name === "Others")?.logo;

  const match = partylist.find(
    p => p.name.toLowerCase() === partyName.toLowerCase()
  );

  return match
    ? match.logo
    : partylist.find(p => p.name === "Others")?.logo;
};