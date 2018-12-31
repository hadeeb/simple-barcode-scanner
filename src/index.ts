import { assign } from "./utils";

export declare namespace BarcodeScanner {
  interface Option {
    /**
     * Max time duration (in ms) between consecutive inputs
     * @default 50
     */
    latency?: number;
    /**
     * Min length of a valid barcode
     * @default 3
     */
    minLength?: number;
    /**
     * The HTML element to attach the event listener to
     * @default document.documentElement
     */
    element?: HTMLElement;
    /**
     * Array of keycodes indicating end of barcode
     * @default [8, 9, 13, 32, 34, 39, 40, 41, 43]
     */
    endKeys?: Array<number>;
    /**
     * Regular expression to check for a valid key in barcode
     * @default /[a-zA-Z0-9-_+]/
     */
    validKey?: RegExp;
    /**
     * Whether to prevent default action on completion of scanning
     * @default true
     */
    preventDefault?: Boolean;
    /**
     * Whether to stop propagating event on completion of scanning
     * @default true
     */
    stopPropagation?: Boolean;
  }

  interface HandlerFunction {
    /**
     * @param code Scanned barcode
     */
    (code: string): void;
  }

  interface Scanner {
    /**
     * Starts listening for barcode scans and add/replace the listener
     *
     * @param {Function} handler Function to call on completion of barcode scan
     */
    on: (handler: HandlerFunction) => void;

    /**
     * Stop listening for barcode scans and remove the listener
     */
    off: () => void;
  }
}

/**
 * Simple JavaScript utility to listen for barcode scanners emulating keyboard
 */
export default function BarcodeScanner(
  options?: BarcodeScanner.Option
): BarcodeScanner.Scanner {
  let fun: Function = void 0;
  options = assign(
    {
      latency: 50,
      minLength: 3,
      element: document.documentElement,
      endKeys: [8, 9, 13, 32, 34, 39, 40, 41, 43],
      validKey: /[a-zA-Z0-9-_+]/,
      preventDefault: true,
      stopPropagation: true
    },
    options
  ) as BarcodeScanner.Option;
  let prevTime: number = Date.now();
  let code: string = "";

  function EventHandler(e: KeyboardEvent): void {
    const { keyCode } = e;
    const currTime = Date.now();

    const input: string = String.fromCharCode(keyCode);
    const isValid: Boolean = options.validKey.test(input);
    const isEndKey = options.endKeys.includes(keyCode);
    const timeDiff = currTime - prevTime;
    prevTime = currTime;

    if (timeDiff > options.latency) {
      if (!isEndKey && isValid) {
        code = input;
      } else code = "";
    } else if (isEndKey) {
      if (code.length >= options.minLength) {
        fun && fun(code);
      }
      code = "";
      if (options.preventDefault) e.preventDefault();
      if (options.stopPropagation) e.stopPropagation();
    } else if (isValid) code += input;
  }

  return {
    on: function(handler: Function) {
      fun = handler;
      options.element.addEventListener("keydown", EventHandler, true);
    },

    off: function() {
      fun = undefined;
      options.element.removeEventListener("keydown", EventHandler, true);
    }
  };
}
