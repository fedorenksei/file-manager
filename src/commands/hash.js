import { createHash } from "node:crypto";
import { getPath } from "../utils.js";
import { createReadStream } from "node:fs";
import { log } from "node:console";

export async function calculateHash(pathToFile) {
  pathToFile = getPath(pathToFile);
  await new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    createReadStream(pathToFile, "utf8")
      .on("data", (chunk) => {
        hash.update(chunk);
      })
      .on("end", () => {
        log();
        log(`Hash for ${pathToFile}:`);
        console.log(hash.digest("hex"));
        log();
        resolve();
      })
      .on("error", reject);
  });
}
