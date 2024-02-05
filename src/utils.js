import { isAbsolute, join, normalize } from "node:path";
import { getCurrentDir } from "./directory.js";

/**
 * @param {string[]} args
 */
export function getUsername(args) {
  const PREFIX = "--username=";
  const arg = args.filter((value) => value.startsWith(PREFIX))[0];
  if (!arg) return;
  return arg.split("=")[1];
}

export function getPath(path) {
  return normalize(isAbsolute(path) ? path : join(getCurrentDir(), path));
}
