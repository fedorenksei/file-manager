import { dirname } from "node:path";
import { getCurrentDir, setCurrentDir } from "../directory.js";

export function up() {
  setCurrentDir(dirname(getCurrentDir()));
}
