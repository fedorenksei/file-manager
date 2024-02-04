import { log } from "node:console";
import { up } from "./commands/up.js";

const commandsData = {
  up: {
    argsAmount: 0,
    action: up,
  },
  cd: {
    argsAmount: 1,
    action: () => {},
  },
  ls: {
    argsAmount: 0,
    action: () => {},
  },
  cat: {
    argsAmount: 1,
    action: () => {},
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
export function handleCommand(command) {
  let commandName, args;

  try {
    ({ commandName, args } = parseCommand(command));
  } catch {
    log("\nInvalid input");
    return;
  }

  try {
    commandsData[commandName].action(...args);
  } catch {
    log("\nOperation failed");
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
