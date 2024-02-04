import { isAbsolute, join, normalize } from "node:path";
import { getCurrentDir, setCurrentDir } from "../directory.js";
import { access } from "node:fs/promises";

export async function cd(path) {
  const resolvedPath = normalize(
    isAbsolute(path) ? path : join(getCurrentDir(), path)
  );
  await access(resolvedPath);
  setCurrentDir(resolvedPath);
}
