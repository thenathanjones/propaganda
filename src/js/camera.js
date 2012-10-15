var destinationType;

document.addEventListener("deviceready",onDeviceReady,false);

var dummyCapture = function(callback) { callback('file:///Users/thenathanjones/Development/warconcepts/photospike/build/images/icon-camera.jpeg'); };
var cordovaCapture = function(uriCallback) {
  var options = {
                  quality: 100,
                  destinationType: destinationType.FILE_URI,
                  correctOrientation: true,
                  targetWidth: 1500
                };

  navigator.camera.getPicture(uriCallback, onFail, options);
}

capturePhoto = dummyCapture;

function onDeviceReady() {
  destinationType = navigator.camera.DestinationType;
  capturePhoto = cordovaCapture;
}


function onFail(message) {
  alert('Failed because: ' + message);
}