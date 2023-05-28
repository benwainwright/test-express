import { Stats } from "fast-stats";
import { requestWithTime } from "./fetch-with-timing.js";
import { forceColdStart } from "./force-cold-start.js";
import cliProgress from "cli-progress";

export const doBenchmark = async (
  url: string,
  functionName: string,
  numberOfRequsts: number
) => {
  const progress = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  const timings = new Stats();
  progress.start(numberOfRequsts, 0);
  await Array.from({ length: numberOfRequsts }).reduce(
    async (accum, _, index) => {
      await accum;
      await forceColdStart(functionName);
      timings.push(await requestWithTime(url));
      progress.update(index + 1);
    },
    Promise.resolve()
  );

  return timings;
};
