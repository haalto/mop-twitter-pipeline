import { createServer } from "./server";
import { config } from "./config";

(async () => {
  const { port } = config;
  try {
    (await createServer()).listen(port, () => {
      console.log(`🚀 Server ready`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
