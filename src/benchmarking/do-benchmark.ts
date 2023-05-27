import autocannon from "autocannon";

export const doBenchmark = async (title: string, url: string) => {
  return new Promise((accept) => {
    const instance = autocannon(
      {
        title,
        url,
      },
      () => {}
    );
    instance.on("done", accept);
    autocannon.track(instance);
  });
};
