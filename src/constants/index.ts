export const BASE_URL = "https://660160fd87c91a11641ab523.mockapi.io/users";
export const USER_LOCATIONS = [
  "ABU DHABI",
  "AMSTERDAM",
  "AUSTIN",
  "BARCELONA",
  "BENGALURU",
  "BRASÍLIA",
  "BRUSSELS",
  "BUENOS AIRES",
];

export const getUserAvatarUrl = (val: number) => {
  return `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${val}.jpg`;
};
