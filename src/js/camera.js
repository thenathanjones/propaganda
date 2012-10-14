var destinationType;

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
  destinationType = navigator.camera.DestinationType;
}

function capturePhoto(uriCallback) {
  var options = {
                  quality: 100,
                  destinationType: destinationType.FILE_URI,
                  correctOrientation: true,
                  targetWidth: 1500
                };

  navigator.camera.getPicture(uriCallback, onFail, options);
}

function onFail(message) {
  alert('Failed because: ' + message);
}