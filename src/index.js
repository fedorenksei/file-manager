import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { log } from "node:console";
import { getUsername } from "./utils.js";

const username = getUsername(process.argv);

const rl = readline.createInterface({ input, output });

function listen() {
  rl.question("You are currently in path_to_working_directory\n", (answer) => {
    if (answer === ".exit") {
      end();
      return;
    }
    listen();
  });
}

rl.on("SIGINT", end);

log(`Welcome to the File Manager, ${username}!`);
listen();

function end() {
  log(`Thank you for using File Manager, ${username}, goodbye!`);
  rl.close();
}
