import { delay } from "bluebird";

export async function SimulateTyping(word: string, speed: number = 80) {
  for (let i = 0; i < word.length; i++) {
    if (word.charAt(i) === word.charAt(i).toUpperCase()) {
      await delay(speed);
      keyPress("Shift");
    }
    await delay(speed);
    keyPress(word.charAt(i));
  }
  await delay(speed);
  keyPress("Enter");
}

function keyPress(key: string) {
  let event = new KeyboardEvent("keydown", { key: key });
  document.documentElement.dispatchEvent(event);
}
