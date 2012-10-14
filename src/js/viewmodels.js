function MainViewModel() {
  var self = this;

  self.photos = ko.observableArray();

  var pictureReturned = function(uri) {
    self.photos.push(new PhotoViewModel(uri));
  };

  self.capture = function() {
    capturePhoto(pictureReturned);
  }

  return this;
}

function PhotoViewModel(uri) {
  var self = this;

  self.uri = ko.observable(uri);

  return this;
}