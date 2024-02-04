import { dirname } from "node:path";
import { getCurrentDir, setCurrentDir } from "../directory.js";

export function up() {
  const currentDir = getCurrentDir();
  const upperPath = dirname(currentDir);
  setCurrentDir(upperPath);
}
