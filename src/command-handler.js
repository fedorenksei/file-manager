import { log } from "node:console";

const commandsData = {
  up: {
    argsAmount: 0,
  },
  cd: {
    argsAmount: 1,
  },
  ls: {
    argsAmount: 0,
  },
  cat: {
    argsAmount: 1,
  },
  add: {
    argsAmount: 1,
  },
  rn: {
    argsAmount: 2,
  },
  cp: {
    argsAmount: 2,
  },
  mv: {
    argsAmount: 2,
  },
  rm: {
    argsAmount: 1,
  },
  os: {
    argsAmount: 1,
  },
  hash: {
    argsAmount: 1,
  },
  compress: {
    argsAmount: 2,
  },
  decompress: {
    argsAmount: 2,
  },
};

/**
 * @param {string} command
 */
export function handleCommand(command) {
  let data;
  try {
    data = parseCommand(command);
  } catch {
    log("Invalid input");
    return;
  }
  log("success");
}

/**
 * @param {string} command
 */
function parseCommand(command) {
  const elements = command.split(" ");
  const commandName = elements[0];

  if (
    !(commandName in commandsData) ||
    commandsData[commandName].argsAmount !== elements.length - 1
  )
    throw new Error();

  return elements;
}
