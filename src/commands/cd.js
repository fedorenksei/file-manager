import { access } from "node:fs/promises";
import { setCurrentDir } from "../directory.js";
import { getPath } from "../utils.js";

export async function cd(path) {
  const resolvedPath = getPath(path);
  await access(resolvedPath);
  setCurrentDir(resolvedPath);
}
