import { log, table } from "node:console";
import { EOL, arch, cpus, homedir, userInfo } from "node:os";

const optionsFunctions = {
  "--EOL": () => log(EOL === "\n" ? "\\n" : "\\r\\n"),
  "--cpus": () => {
    const cpusData = cpus();
    log(`There are ${cpusData.length} CPUs`);
    table(
      cpusData.map((cpuData) => ({
        Model: cpuData.model,
        "Clock rate": cpuData.speed / 1000,
      }))
    );
  },
  "--homedir": () => log(homedir()),
  "--username": () => log(userInfo().username),
  "--architecture": () => log(arch()),
};

export function getOsInfo(option) {
  log();
  optionsFunctions[option]();
  log();
}

export const osCommandOptions = Object.keys(optionsFunctions);
