import { getCurrentDir } from "../directory.js";
import { readdir } from "node:fs/promises";

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
