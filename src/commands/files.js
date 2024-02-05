import { createReadStream } from "node:fs";
import { rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { getCurrentDir } from "../directory.js";
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

export async function addFile(fileName) {
  await writeFile(join(getCurrentDir(), fileName), "", { flag: "wx" });
}

export async function renameFile(pathToFile, newName) {
  const srcPath = getPath(pathToFile);
  const destPath = join(dirname(srcPath), newName);
  await rename(srcPath, destPath);
}

export function copyFile() {}

export function moveFile() {}

export function deleteFile() {}
