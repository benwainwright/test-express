import fetch from "node-fetch";

export const requestWithTime = async (url: string) => {
  const start = Date.now();
  await fetch(url);
  const millis = Date.now() - start;
  return millis;
};
