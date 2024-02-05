import { createReadStream } from "node:fs";
import { getPath } from "../utils.js";

export async function printFile(pathToFile) {
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

export function addFile() {}

export function renameFile() {}

export function copyFile() {}

export function moveFile() {}

export function deleteFile() {}
