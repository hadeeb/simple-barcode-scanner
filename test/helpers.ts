export function SimulateTyping(word: string) {
  for (let i = 0; i < word.length; i++) {
    if (word.charAt(i) === word.charAt(i).toUpperCase()) keyPress("Shift");
    keyPress(word.charAt(i));
  }
  keyPress("Enter");
}

function keyPress(key: string) {
  let event = new KeyboardEvent("keydown", { key: key });
  document.documentElement.dispatchEvent(event);
}
