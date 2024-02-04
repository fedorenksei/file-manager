import { log } from "node:console";
import { up } from "./commands/up.js";
import { cd } from "./commands/cd.js";
import { ls } from "./commands/ls.js";
import { cat } from "./commands/cat.js";

const commandsData = {
  up: {
    argsAmount: 0,
    action: up,
  },
  cd: {
    argsAmount: 1,
    action: cd,
  },
  ls: {
    argsAmount: 0,
    action: ls,
  },
  cat: {
    argsAmount: 1,
    action: cat,
  },
  add: {
    argsAmount: 1,
    action: () => {},
  },
  rn: {
    argsAmount: 2,
    action: () => {},
  },
  cp: {
    argsAmount: 2,
    action: () => {},
  },
  mv: {
    argsAmount: 2,
    action: () => {},
  },
  rm: {
    argsAmount: 1,
    action: () => {},
  },
  os: {
    argsAmount: 1,
    action: () => {},
  },
  hash: {
    argsAmount: 1,
    action: () => {},
  },
  compress: {
    argsAmount: 2,
    action: () => {},
  },
  decompress: {
    argsAmount: 2,
    action: () => {},
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
    log("Invalid input");
    return;
  }

  try {
    await commandsData[commandName].action(...args);
  } catch (err) {
    log("Operation failed");
  }
}

/**
 * @param {string} command
 */
function parseCommand(command) {
  const elements = command.split(" ");
  const commandName = elements[0];
  const args = elements.slice(1);

  if (
    !(commandName in commandsData) ||
    commandsData[commandName].argsAmount !== elements.length - 1
  )
    throw new Error();

  return { commandName, args };
}
