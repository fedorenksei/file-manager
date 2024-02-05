import { log } from "node:console";
import { sep } from "node:path";
import { compressFile, decompressFile } from "./commands/compressor.js";
import {
  addFile,
  copyFile,
  deleteFile,
  moveFile,
  printFile,
  renameFile,
} from "./commands/files.js";
import { calculateHash } from "./commands/hash.js";
import {
  changeDirectory,
  goToUpperDirectory,
  listFiles,
} from "./commands/navigation.js";
import { getOsInfo, osCommandOptions } from "./commands/operating-system.js";
import { getRandomSadFace } from "./decorations.js";

const commandsData = {
  up: {
    arguments: [],
    action: goToUpperDirectory,
  },
  cd: {
    arguments: ["path"],
    action: changeDirectory,
  },
  ls: {
    arguments: [],
    action: listFiles,
  },
  cat: {
    arguments: ["path"],
    action: printFile,
  },
  add: {
    arguments: ["name"],
    action: addFile,
  },
  rn: {
    arguments: ["path", "name"],
    action: renameFile,
  },
  cp: {
    arguments: ["path", "path"],
    action: copyFile,
  },
  mv: {
    arguments: ["path", "path"],
    action: moveFile,
  },
  rm: {
    arguments: ["path"],
    action: deleteFile,
  },
  os: {
    arguments: ["os-option"],
    action: getOsInfo,
  },
  hash: {
    arguments: ["path"],
    action: calculateHash,
  },
  compress: {
    arguments: ["path", "path"],
    action: compressFile,
  },
  decompress: {
    arguments: ["path", "path"],
    action: decompressFile,
  },
};

/**
 * @param {string} command
 */
export async function handleCommand(command) {
  let commandName, args;

  try {
    ({ commandName, args } = parseCommand(command));
  } catch {
    log(`\n${getRandomSadFace()} Invalid input\n`);
    return;
  }

  try {
    await commandsData[commandName].action(...args);
  } catch (err) {
    log(`\n${getRandomSadFace()} Operation failed\n`);
  }
}

/**
 * @param {string} command
 */
function parseCommand(command) {
  const elements = command.split(" ");
  const commandName = elements[0];
  const signature = commandsData[commandName].arguments;
  const inputArgs = elements.slice(1);

  if (
    !commandsData.hasOwnProperty(commandName) ||
    signature.length !== inputArgs.length
  ) {
    throw new Error();
  }

  for (let i = 0; i < inputArgs.length; i++) {
    validateArgument(signature[i], inputArgs[i]);
  }

  return { commandName, args: inputArgs };
}

/**
 * @param {'path' | 'name' | 'os-option'} type
 * @param {string} arg
 */
function validateArgument(type, arg) {
  if (type === "name" && arg.includes(sep)) {
    throw new Error();
  }

  if (type === "os-option" && !osCommandOptions.includes(arg)) {
    throw new Error();
  }
}
