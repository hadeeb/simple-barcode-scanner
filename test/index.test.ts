import Scanner from "../src";
import { SimulateTyping } from "./helpers";

it("default export should be a function", () => {
  expect(Scanner).toBeInstanceOf(Function);
});

describe("Barcode scanner", () => {
  it("should return an object with 2 functions", () => {
    const scanner = Scanner();
    expect(scanner).toHaveProperty("on");
    expect(scanner).toHaveProperty("off");
    expect(scanner.on).toBeInstanceOf(Function);
    expect(scanner.off).toBeInstanceOf(Function);
  });

  describe("handler", () => {
    it("should fire on barcode scan with correct value", () => {
      const scanner = Scanner();
      let x: KeyboardEvent = void 0;
      const spy = jest.fn(code => (x = code));
      scanner.on(spy);
      let code = "Hello";
      SimulateTyping(code);
      expect(spy).toBeCalledTimes(1);
      expect(x).toBe(code);
      code = "12345csdveS";
      SimulateTyping(code);
      expect(spy).toBeCalledTimes(2);
      expect(x).toBe(code);
      SimulateTyping(code);
      expect(spy).toBeCalledTimes(3);
      expect(x).toBe(code);
      scanner.off();
    });

    it("should not fire on invalid code", () => {
      const scanner = Scanner();
      let x: KeyboardEvent = void 0;
      const spy = jest.fn(code => (x = code));
      scanner.on(spy);
      let code = "Hell/o";
      SimulateTyping(code);
      expect(spy).toBeCalledTimes(0);
      expect(x).toBe(void 0);
      code = "av";
      SimulateTyping(code);
      expect(spy).toBeCalledTimes(0);
      expect(x).toBe(void 0);
      scanner.off();
    });

    it("should not fire after removing the handler", () => {
      const scanner = Scanner();
      const spy = jest.fn();
      scanner.on(spy);
      let code = "Hello";
      SimulateTyping(code);
      expect(spy).toBeCalledTimes(1);
      scanner.off();
      SimulateTyping(code);
      expect(spy).toBeCalledTimes(1);
    });
  });
});
