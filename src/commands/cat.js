import { createReadStream } from "node:fs";
import { getPath } from "../utils.js";

export async function cat(pathToFile) {
  await new Promise((resolve, reject) => {
    const readStream = createReadStream(getPath(pathToFile), "utf8");
    readStream.pipe(process.stdout);
    readStream
      .on("end", () => resolve())
      .on("error", () => {
        reject();
      });
  });
}
