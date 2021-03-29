import Scanner from "../src";
import { simulateTyping } from "./helpers";

it("default export should be a function", () => {
  expect(Scanner).toBeInstanceOf(Function);
});

describe("Barcode scanner", () => {
  it("should return a function", () => {
    const cleanup = Scanner(() => {});
    expect(cleanup).toBeInstanceOf(Function);
    cleanup();
  });

  describe("handler", () => {
    it("should not fire on normal typing", async () => {
      const spy = jest.fn();
      const cleanup = Scanner(spy);
      let code = "Hello";
      await simulateTyping(code);
      expect(spy).toBeCalledTimes(0);
      cleanup();
    });

    it("should not fire when event occurs outside target tree", async () => {
      const el = document.createElement("div");
      document.body.appendChild(el);
      const spy = jest.fn();
      const cleanup = Scanner(spy, {
        element: el,
      });

      let code = "Hello";
      await simulateTyping(code, 30);
      expect(spy).toBeCalledTimes(0);
      cleanup();
    });

    it("should fire on barcode scan with correct value", async () => {
      const spy = jest.fn();
      const cleanup = Scanner(spy);

      let code = "Hello";
      await simulateTyping(code, 30);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toHaveBeenNthCalledWith(1, code, expect.any(KeyboardEvent));
      code = "12345csdveS";
      await simulateTyping(code, 30);
      expect(spy).toBeCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(2, code, expect.any(KeyboardEvent));
      await simulateTyping(code, 30);
      expect(spy).toBeCalledTimes(3);
      expect(spy).toHaveBeenNthCalledWith(3, code, expect.any(KeyboardEvent));
      cleanup();
    });

    it("should not fire on invalid code", async () => {
      const spy = jest.fn();
      const cleanup = Scanner(spy);
      let code = "Hell/o";
      await simulateTyping(code, 30);
      expect(spy).toBeCalledTimes(0);
      code = "av";
      await simulateTyping(code, 30);
      expect(spy).toBeCalledTimes(0);
      cleanup();
    });

    it("should not fire after removing the handler", async () => {
      const spy = jest.fn();
      const cleanup = Scanner(spy);
      let code = "Hello";
      await simulateTyping(code, 30);
      expect(spy).toBeCalledTimes(1);
      cleanup();
      await simulateTyping(code, 30);
      expect(spy).toBeCalledTimes(1);
    });
  });
});
