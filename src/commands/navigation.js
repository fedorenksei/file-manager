import { access, readdir } from "node:fs/promises";
import { dirname } from "node:path";
import { getCurrentDir, setCurrentDir } from "../directory.js";
import { getPath } from "../utils.js";

export function up() {
  setCurrentDir(dirname(getCurrentDir()));
}

export async function cd(path) {
  const resolvedPath = getPath(path);
  await access(resolvedPath);
  setCurrentDir(resolvedPath);
}

export async function ls() {
  console.table(
    (await readdir(getCurrentDir(), { withFileTypes: true }))
      .map((dirent) => ({
        Name: dirent.name,
        Type: dirent.isDirectory() ? "directory" : "file",
      }))
      .sort((ent1, ent2) => {
        if (ent1.Type === ent2.Type) {
          return ent1.Name.toLowerCase() > ent2.Name.toLowerCase() ? 1 : -1;
        }
        if (ent1.Type === "file") return 1;
        return -1;
      })
  );
}
