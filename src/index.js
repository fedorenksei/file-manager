import { log } from "node:console";
import { stdin, stdout } from "node:process";
import readline from "node:readline";
import { handleCommand } from "./command-handler.js";
import { getUsername } from "./utils.js";
import { getCurrentDir, initDirectory } from "./directory.js";
import {
  getRandomHappyFace,
  greetUser,
  logSeparator,
  sayGoodBye,
} from "./decorations.js";

const username = getUsername(process.argv);
initDirectory();

const rl = readline.createInterface({ input: stdin, output: stdout });

function listen() {
  rl.question(
    `\n${getRandomHappyFace()} You are currently in ${getCurrentDir()}\n\n`,
    async (answer) => {
      if (answer === ".exit") {
        end();
        return;
      }
      await handleCommand(answer);
      logSeparator();
      listen();
    }
  );
}

rl.on("SIGINT", end);

greetUser(username);
listen();

function end() {
  sayGoodBye(username);
  rl.close();
}
