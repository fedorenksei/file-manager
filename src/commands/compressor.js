import { createReadStream, createWriteStream } from "node:fs";
import { basename, join, parse } from "node:path";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { getPath } from "../utils.js";

/**
 * @param {'compress' | 'decompress'} type
 * @param {string} srcPath
 * @param {string} destDirPath
 */
async function operation(type, srcPath, destPath) {
  await new Promise((resolve, reject) => {
    srcPath = getPath(srcPath);
    const newFileName =
      type === "compress" ? basename(srcPath) + ".br" : parse(srcPath).name;
    destPath = join(getPath(destPath), newFileName);

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);
    const brotliStream =
      type === "compress" ? createBrotliCompress() : createBrotliDecompress();

    readStream.pipe(brotliStream).pipe(writeStream);

    readStream.on("error", reject).on("end", resolve);
    writeStream.on("error", reject);
    brotliStream.on("error", reject);
  });
}

export async function compressFile(...args) {
  await operation("compress", ...args);
}

export async function decompressFile(...args) {
  await operation("decompress", ...args);
}
