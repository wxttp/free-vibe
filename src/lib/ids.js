import Hashids from "hashids";

const hashids = new Hashids(process.env.NEXT_PUBLIC_ID_SALT || "app-salt", 8); 
export const encodeId = (n) => hashids.encode(n);
export const decodeId = (s) => {
  const [n] = hashids.decode(s);
  return typeof n === "number" ? n : null;
};
