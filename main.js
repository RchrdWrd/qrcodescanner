/*
  FileName: main.js
  Author: John Richard Ward Daily
  Function: It's just a little manager module to make coding easier with qr-scanner.min.js.
*/

import QrScanner from "./modules/qr-scanner/qr-scanner.min.js";

function QrCode(videoElementId, resultHandler, errorHandler) {
  const scanner = new QrScanner(document.getElementById(videoElementId), (result) => resultHandler(result), {
    onDecodeError: (error) => {errorHandler(error)},
    highlightScanRegion: true,
    highlightCodeOutline: true,
  });

  return {
    scanner: scanner
  };
}

export default QrCode
