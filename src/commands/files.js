import { createReadStream, createWriteStream } from "node:fs";
import { rename, unlink, writeFile } from "node:fs/promises";
import { dirname, join, parse } from "node:path";
import { getCurrentDir } from "../directory.js";
import { getPath } from "../utils.js";
import { stdout } from "node:process";
import { log } from "node:console";

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
  srcPath = getPath(srcPath);
  const fileName = parse(srcPath).base;
  destPath = join(getPath(destPath), fileName);
  await writeFile(destPath, "", { flag: "wx" });

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

export function deleteFile() {}
