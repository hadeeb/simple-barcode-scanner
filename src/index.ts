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
     * @default document
     */
    element?: HTMLElement;
    /**
     * Array of keys indicating end of barcode
     * @default ["Enter"]
     * Refer {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values Key Values | MDN}
     */
    endKeys?: Array<string>;
    /**
     * Regular expression to check for a valid key in barcode
     * @default /^\w$/
     * Refer {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values Key Values | MDN}
     */
    validKey?: RegExp;
  }

  interface HandlerFunction {
    /**
     * @param code Scanned barcode
     * @param event Keyboard event from the end key
     */
    (code: string, event: KeyboardEvent): void;
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
  let fun: BarcodeScanner.HandlerFunction;
  options = Object.assign(
    {
      latency: 50,
      minLength: 3,
      element: document,
      endKeys: ["Enter"],
      validKey: /^\w$/
    },
    options
  );
  let prevTime: number = 0;
  let code: string = "";

  function EventHandler(e: KeyboardEvent): void {
    const { key, timeStamp } = e;
    const timeDiff = timeStamp - prevTime;
    prevTime = timeStamp;
    // Ignore shift key
    if (key === "Shift") return;

    const isValid = options.validKey.test(key);
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
          fun(code, e);
        }
      }
      // Invalid character, reset
      code = "";
    }
  }

  return {
    on: function(handler: BarcodeScanner.HandlerFunction) {
      options.element.removeEventListener("keydown", EventHandler, true);
      fun = handler;
      code = "";
      fun && options.element.addEventListener("keydown", EventHandler, true);
    },

    off: function() {
      options.element.removeEventListener("keydown", EventHandler, true);
    }
  };
}
