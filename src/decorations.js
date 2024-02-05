import { log } from "node:console";

export function logSeparator() {
  log("------------------------------------------------------");
}

export function getRandomSadFace() {
  const faces = [
    "(ಥ﹏ಥ)",
    "(╯︵╰,)",
    "(╥_╥)",
    "(; ⌣̀_⌣́)",
    "(⌣_⌣”)",
    "(´；д；`)",
    "(⊙_☉)",
    "(╯_╰)",
    "（；へ：）",
    "（ｉДｉ）",
    "(/ω＼)",
    "｡：ﾟ(｡ﾉω＼｡)ﾟ･｡",
  ];
  return faces[Math.floor(Math.random() * faces.length)];
}

export function getRandomHappyFace() {
  const faces = [
    "٩(◕‿◕｡)۶ ",
    "\\(｡♥‿♥｡)/",
    "ヽ(＾Д＾)ﾉ",
    " \\(ʘ‿ʘ)/ ",
    "ヽ(•‿•)ﾉ ",
    "⌒°(❛ᴗ❛)°⌒",
    "\\(*^‿^*)/",
    "\\(＾▽＾)/ ",
    " \\(≧◡≦)/ ",
    " \\(^_^)/ ",
    " \\(◠‿◠)/ ",
  ];
  return faces[Math.floor(Math.random() * faces.length)];
}

export function greetUser(username) {
  const dashesUsernameLength = Array(username.length).fill("-").join("");
  log(`
 ||  ||  ||¯¯  ||    ||    //¯¯\\\\  ||
 ||--||  ||--  ||    ||    ||  ||  ||
 ||  ||  ||__  ||__  ||__  \\\\__//  ◊◊

+---------------------------------${dashesUsernameLength}+ 
|  Welcome to the File Manager, ${username}! |
+---------------------------------${dashesUsernameLength}+\n`);
}

export function sayGoodBye(username) {
  const dashesUsernameLength = Array(username.length).fill("-").join("");
  log(`
 ||¯) \\  / ||¯¯ ||
 ||<   ||  ||-- ||
 ||_)  ||  ||__ ◊◊

+--------------------------------------${dashesUsernameLength}---------+ 
|  Thank you for using File Manager, ${username}, goodbye! |
+--------------------------------------${dashesUsernameLength}---------+\n`);
}
