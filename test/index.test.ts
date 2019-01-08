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

    it("should fire on barcode scan with correct value", async () => {
      const scanner = Scanner();
      let x: KeyboardEvent = void 0;
      const spy = jest.fn(code => (x = code));
      scanner.on(spy);
      let code = "Hello";
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(1);
      expect(x).toBe(code);
      code = "12345csdveS";
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(2);
      expect(x).toBe(code);
      await SimulateTyping(code, 30);
      expect(spy).toBeCalledTimes(3);
      expect(x).toBe(code);
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
