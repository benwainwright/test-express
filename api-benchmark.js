const fs = require("fs/promises");
const benchmark = require("api-benchmark");

const go = async () => {
  const url = `https://ezjj1ac8p8.execute-api.eu-west-2.amazonaws.com/prod`;

  const service = {
    api: url,
  };

  const routes = {
    withExpress: {
      method: `get`,
      route: `with-express`,
      minSamples: 100,
    },
    withoutExpress: {
      method: `get`,
      route: `without-express`,
      minSamples: 100,
    },
  };

  const html = await new Promise((accept, reject) => {
    benchmark.compare(service, routes, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      benchmark.getHtml(results, (error, html) => {
        if (error) {
          reject(error);
          return;
        }
        accept(html);
      });
    });
  });

  await fs.writeFile(`output.html`, html);
};

go().catch((error) => console.log(error));
