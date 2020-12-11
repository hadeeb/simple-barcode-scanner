const scanner = simpleBarcodeScanner({
  devicePrefix: 'QW'
});

scanner.on((data, e) => {
  console.log(data)
})