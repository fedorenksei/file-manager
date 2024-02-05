import { createReadStream, createWriteStream } from "node:fs";
import { rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { getCurrentDir } from "../directory.js";
import { getPath } from "../utils.js";
import { stdout } from "node:process";

export async function printFile(pathToFile) {
  await new Promise((resolve, reject) => {
    const readStream = createReadStream(getPath(pathToFile), "utf8");
    stdout.write("\n");
    readStream.pipe(stdout);
    readStream
      .on("end", () => {
        stdout.write("\n");
        resolve();
      })
      .on("error", reject);
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

export async function copyFile(srcPath, destPath) {
  await new Promise((resolve, reject) => {
    const readStream = createReadStream(getPath(srcPath));
    const writeStream = createWriteStream(getPath(destPath));
    readStream.pipe(writeStream);
    readStream.on("end", resolve).on("error", reject);
    writeStream.on("error", reject);
  });
}

export function moveFile() {}

export function deleteFile() {}
