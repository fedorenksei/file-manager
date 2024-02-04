import { homedir } from "node:os";

let directory;

export function initDirectory() {
  directory = homedir();
}

export function getCurrentDir() {
  return directory;
}

export function setCurrentDir(newDirectory) {
  directory = newDirectory;
}
