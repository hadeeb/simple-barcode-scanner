import Scanner from "../src";
import { SimulateTyping } from "./helpers";

it("default export should be a function", () => {
  expect(Scanner).toBeInstanceOf(Function);
});

describe("Barcode scanner", () => {
  it("should return an object with 2 functions", () => {
    const scanner = Scanner();
    expect(Object.keys(scanner)).toHaveLength(2);
    expect(scanner).toHaveProperty("on");
    expect(scanner).toHaveProperty("off");
    expect(scanner.on).toBeInstanceOf(Function);
    expect(scanner.off).toBeInstanceOf(Function);
  });

  describe("handler", () => {
    it("should not fire on normal typing", async () => {
      const scanner = Scanner();
      const spy = jest.fn();
      scanner.on(spy);
      let code = "Hello";
      await SimulateTyping(code);
      expect(spy).toBeCalledTimes(0);
    });

    it("should not fire when event occurs outside target tree", async () => {
      const scanner = Scanner({
        element: document.body,
        preventDefault: false,
        stopPropagation: false
      });
      const spy = jest.fn();
      scanner.on(spy);
      let code = "Hello";
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(0);
      scanner.off();
    });

    it("should fire on barcode scan with correct value", async () => {
      const scanner = Scanner();
      const spy = jest.fn();
      scanner.on(spy);
      let code = "Hello";
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toHaveBeenNthCalledWith(1, code);
      code = "12345csdveS";
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(2, code);
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(3);
      expect(spy).toHaveBeenNthCalledWith(3, code);
      scanner.off();
    });

    it("should not fire on invalid code", async () => {
      const scanner = Scanner();
      const spy = jest.fn();
      scanner.on(spy);
      let code = "Hell/o";
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(0);
      code = "av";
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(0);
      scanner.off();
    });

    it("should not fire after removing the handler", async () => {
      const scanner = Scanner();
      const spy = jest.fn();
      scanner.on(spy);
      let code = "Hello";
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(1);
      scanner.off();
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(1);
    });
  });
});
