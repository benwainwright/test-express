// import { forceColdStart } from "./force-cold-start.js";
import { doBenchmark } from "./do-benchmark.js";
import fs from "fs/promises";
import path from "node:path";
import { table } from "table";

const go = async () => {
  const data = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "outputs.json"), "utf8")
  )[`my-test-stack`];

  const withoutExpressurl = data.restapiwithoutexpressoutput;
  console.log("Doing first benchmark");
  const withoutBenchmarkResult = await doBenchmark(
    withoutExpressurl,
    data.getwithidwithoutexpressfunctionoutput,
    100
  );

  const withExpressUrl = data.restapiwithexpressoutput;
  console.log("\nDoing second benchmark");
  const withBenchmarkResult = await doBenchmark(
    withExpressUrl,
    data.getidwithexpressfunctionoutput,
    100
  );

  const tableData = [
    ["url", "2.5%", "50%", "99%", "Mean", "Stdev", "Max"],
    [
      withoutExpressurl,
      withoutBenchmarkResult.percentile(2.5),
      withoutBenchmarkResult.percentile(50),
      withoutBenchmarkResult.percentile(99),
      withoutBenchmarkResult.amean(),
      withoutBenchmarkResult.stddev(),
      withoutBenchmarkResult.max,
    ],

    [
      withExpressUrl,
      withBenchmarkResult.percentile(2.5),
      withBenchmarkResult.percentile(50),
      withBenchmarkResult.percentile(99),
      withBenchmarkResult.amean(),
      withBenchmarkResult.stddev(),
      withBenchmarkResult.max,
    ],
  ];

  console.log(`\n${table(tableData)}`);
};

go().catch((error) => console.log(error));
