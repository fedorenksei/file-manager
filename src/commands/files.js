import { createReadStream, createWriteStream } from "node:fs";
import { rename, unlink, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { stdout } from "node:process";
import { getCurrentDir } from "../directory.js";
import { getPath } from "../utils.js";
import { log } from "node:console";

export async function printFile(pathToFile) {
  await new Promise((resolve, reject) => {
    const readStream = createReadStream(getPath(pathToFile), "utf8");
    log("\n------The content of your file should begin here------");
    readStream.pipe(stdout);
    readStream
      .on("end", () => {
        resolve();
      })
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

export async function copyFile(srcPath, destPath) {
  srcPath = getPath(srcPath);
  const fileName = basename(srcPath);
  destPath = join(getPath(destPath), fileName);

  await new Promise((resolve, reject) => {
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);
    readStream.pipe(writeStream);
    readStream.on("end", resolve).on("error", reject);
    writeStream.on("error", reject);
  });
}

export async function moveFile(srcPath, destPath) {
  await copyFile(srcPath, destPath);
  await unlink(getPath(srcPath));
}

export async function deleteFile(pathToFile) {
  await unlink(getPath(pathToFile));
}
