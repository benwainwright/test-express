import { forceColdStart } from "./force-cold-start";
import { doBenchmark } from "./do-benchmark";
import fs from "fs/promises";
import path from "node:path";

const go = async () => {
  const data = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "outputs.json"), "utf8")
  )[`my-test-stack`];

  console.log(`Resetting cold starts`);
  await forceColdStart(data.withexpressfunctionoutput);
  await forceColdStart(data.getidwithexpressfunctionoutput);

  console.log(`Running first load test`);
  const withoutExpressurl = data.restapiwithoutexpressoutput;
  await doBenchmark("Without Express", withoutExpressurl);

  console.log(`Running second load test`);
  const withExpressUrl = data.restapiwithexpressoutput;
  await doBenchmark("With Express", withExpressUrl);
};

go().catch((error) => console.log(error));
