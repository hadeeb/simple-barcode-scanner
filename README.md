# Barcode Scanner

<a href="https://www.npmjs.org/package/simple-barcode-scanner"><img src="https://badgen.net/npm/v/simple-barcode-scanner" alt="npm"></a>
<a href="https://github.com/hadeeb/simple-barcode-scanner/blob/master/LICENSE"><img src="https://badgen.net/github/license/hadeeb/simple-barcode-scanner/green" alt="license"></a>
<a href="https://unpkg.com/simple-barcode-scanner"><img src="https://img.badgesize.io/https://unpkg.com/simple-barcode-scanner?compression=gzip" alt="gzip size"></a>

A simple JavaScript utility to read barcode from devices emulating a fast keyboard.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](https://github.com/hadeeb/simple-barcode-scanner/blob/master/LICENSE)

## Install

```bash
# Yarn
yarn add simple-barcode-scanner

# NPM
npm install --save simple-barcode-scanner
```

Then with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import BarcodeScanner from "simple-barcode-scanner";

// using CommonJS modules
const BarcodeScanner = require("simple-barcode-scanner");
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/simple-barcode-scanner"></script>
```

You can find the library on `window.BarcodeScanner`.

## Usage

```js
import BarcodeScanner from "simple-barcode-scanner";

const scanner = BarcodeScanner();

// Add a listener
scanner.on((code, event) => {
  event.preventDefault();
  console.log(code);
});

// Remove the listener
scanner.off();
```

## API

### BarcodeScanner

Creates a simple function to listen to barcode scanners

**Parameters**

- `Options` **Object**

  - `latency` **Number** Max time duration (in ms) between consecutive inputs

    _default: `50`_

  - `minLength` **Number** Min length of a valid barcode

    _default: `3`_

  - `element` **HTMLElement** The HTML element to attach the event listener to

    _default: `document`_

  - `endKeys` **Array&lt;string&gt;** Array of keys indicating end of barcode

    Refer [Key Values | MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

    _default: `["Enter"]`_

  - `validKey` **RegExp** Regular expression to check for a valid key in barcode

    Refer [Key Values | MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

    _default: `/^\w$/`_

Returns **Scanner**

### Scanner

- #### on

  Starts listening for barcode scans and add/replace the listener

  **Parameters**

  - handler **Function** Function to call on completion of barcode scan

    _Recieves the scanned code and the keyboard event of the last input as the parameters_

- #### off
  Stop listening for barcode scans and remove the listener

## Contribute

First off, thanks for taking the time to contribute!
Now, take a moment to be sure your contributions make sense to everyone else.

Development Start:

This project uses [**Typescript**](https://www.typescriptlang.org) for development and [**yarn**](https://yarnpkg.com/) for dependency management.

### Reporting Issues

Found a problem? Want a new feature? First of all see if your issue or idea has [already been reported](https://github.com/hadeeb/simple-barcode-scanner/issues).
If not, just open a [new clear and descriptive issue](https://github.com/hadeeb/simple-barcode-scanner/issues/new).

### Submitting pull requests

Pull requests are the greatest contributions, so be sure they are focused in scope, and do avoid unrelated commits.

- Fork it!
- Clone your fork: `git clone https://github.com/<your-username>/simple-barcode-scanner`
- Navigate to the newly cloned directory: `cd simple-barcode-scanner`
- Create a new branch for the new feature: `git checkout -b my-new-feature`
- Install the tools necessary for development: `yarn`
- Make your changes.
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request with full remarks documenting your changes.
