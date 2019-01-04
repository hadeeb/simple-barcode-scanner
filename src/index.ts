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
     * Array of keys indicating end of barcode
     * @default ["Enter", "ArrowDown", "ArrowRight", "End"]
     * Refer {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values Key Values | MDN}
     */
    endKeys?: Array<string>;
    /**
     * Regular expression to check for a valid key in barcode
     * @default /^[a-zA-Z0-9]$/
     * Refer {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values Key Values | MDN}
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
      endKeys: ["Enter", "ArrowDown", "ArrowRight", "End"],
      validKey: /^[a-zA-Z0-9]$/,
      preventDefault: true,
      stopPropagation: true
    },
    options
  ) as BarcodeScanner.Option;
  let prevTime: number = Date.now();
  let code: string = "";

  function EventHandler(e: KeyboardEvent): void {
    const { key } = e;
    const currTime = Date.now();
    const timeDiff = currTime - prevTime;
    prevTime = currTime;
    // Ignore shift key
    if (key === "Shift") return;

    const isValid: Boolean = options.validKey.test(key);
    const isEndKey = options.endKeys.includes(key);

    if (timeDiff > options.latency) {
      // Maybe a normal key press or start of barcode
      if (!isEndKey && isValid) {
        code = key;
      } else code = "";
    } else if (isValid) {
      // Still scanning
      code += key;
    } else {
      if (isEndKey) {
        // End of barcode
        if (code.length >= options.minLength) {
          fun && fun(code);
          if (options.preventDefault) e.preventDefault();
          if (options.stopPropagation) e.stopPropagation();
        }
      }
      // Invalid character, reset
      code = "";
    }
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
