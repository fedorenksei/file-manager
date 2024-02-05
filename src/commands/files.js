import { createReadStream } from "node:fs";
import { getPath } from "../utils.js";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { getCurrentDir } from "../directory.js";

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

export async function addFile(fileName) {
  await writeFile(join(getCurrentDir(), fileName), "", { flag: "wx" });
}

export function renameFile() {}

export function copyFile() {}

export function moveFile() {}

export function deleteFile() {}
