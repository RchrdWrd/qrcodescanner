/*
  FileName: main.js
  Author: John Richard Ward Daily
  Function: A little functional based module to make coding easier with qr-scanner.min.js.
*/

import QrScanner from "./modules/qr-scanner/qr-scanner.min.js"

function QrCode(videoElementId, resultHandler, errorHandler) {
  const cameras = []
  var cameraIndex = 0

  QrScanner.listCameras(true).then((camera) => {
    camera.map((camera) => {
      cameras.push({ CameraId: camera.id, CameraLabel: camera.label })
    })
  })

  const scanner = new QrScanner(
    document.getElementById(videoElementId),
    (result) => resultHandler(result),
    {
      onDecodeError: (error) => {
        errorHandler(error)
      },
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }
  )

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay)
    })
  }

  function hasMoreCamera() {
    if (cameras.length > 1) return true
    else return false
  }

  function switchCamera() {
    if (cameraIndex === cameras.length - 1) cameraIndex = 0
    else cameraIndex += 1
    scanner.setCamera(cameras[cameraIndex].CameraId)
  }

  function start() {
    scanner.setCamera(cameras[cameraIndex].CameraId)
    scanner.start()
  }

  function stop() {
    scanner.stop()
  }

  return {
    cameras: cameras,
    hasMoreCamera: hasMoreCamera,
    switchCamera: switchCamera,
    start: start,
    stop: stop,
  }
}

export default QrCode
