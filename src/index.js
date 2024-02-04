import { log } from "node:console";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline";
import { handleCommand } from "./command-handler.js";
import { getUsername } from "./utils.js";
import { getCurrentDir, initDirectory } from "./directory.js";

const username = getUsername(process.argv);
initDirectory();

const rl = readline.createInterface({ input, output });

function listen() {
  rl.question(`You are currently in ${getCurrentDir()}\n\n`, (answer) => {
    if (answer === ".exit") {
      end();
      return;
    }
    log();
    handleCommand(answer);
    log();
    listen();
  });
}

rl.on("SIGINT", end);

log(`Welcome to the File Manager, ${username}!\n`);
listen();

function end() {
  log(`Thank you for using File Manager, ${username}, goodbye!\n`);
  rl.close();
}
