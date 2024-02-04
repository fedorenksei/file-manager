/**
 * @param {string[]} args
 */
export function getUsername(args) {
  const PREFIX = "--username=";
  const arg = args.filter((value) => value.startsWith(PREFIX))[0];
  if (!arg) return;
  return arg.split("=")[1];
}
