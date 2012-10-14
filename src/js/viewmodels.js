function MainViewModel() {
  var self = this;

  self.type = "PCR";
  self.template = "main";

  self.pages = ko.observableArray([this, new EntryViewModel(), new LoungeViewModel()])

  self.currentPage = ko.observable(self.pages()[0]);

  self.pageIndex = ko.computed(function() {
    return self.pages().indexOf(self.currentPage());
  });

  var goToIndex = function(index) {
    var nextPage = self.pages()[index];
    self.currentPage(nextPage);
  }

  self.previousPage = function() {
    goToIndex(self.pageIndex() - 1);
  }

  self.nextPage = function() {
    goToIndex(self.pageIndex() + 1);
  }

  self.templateSelector = function(page) {
    return page ? page.template : 'blank';
  }

  self.photos = ko.observableArray();

  var pictureReturned = function(uri) {
    self.photos.push(new PhotoViewModel(uri));
  };

  self.capture = function() {
    capturePhoto(pictureReturned);
  }

  return this;
}

function EntryViewModel() {
  var self = this;

  self.type = "entry";
  self.template = "interior";

  self.walls = ko.observable();

  self.photos = ko.observableArray();

  var pictureReturned = function(uri) {
    self.photos.push(new PhotoViewModel(uri));
  };

  self.capture = function() {
    capturePhoto(pictureReturned);
  }
}

function LoungeViewModel() {
  var self = this;

  self.type = "lounge";
  self.template = "lounge";

  self.walls = ko.observable(); 

  self.photos = ko.observableArray();

  var pictureReturned = function(uri) {
    self.photos.push(new PhotoViewModel(uri));
  };

  self.capture = function() {
    capturePhoto(pictureReturned);
  }
}

function WhereNextViewModel(navigation) {
  var self = this;

  self.type = "where next?";
  self.template = "wherenext";

  self.rooms = ["Entry", "Lounge"];

  self.addRoom = function(roomName) {
    var room;

    switch(roomName) {
      case "Entry":
        room = new EntryViewModel();
        break;
      case "Lounge": 
        room = new LoungeViewModel();
        break;
    }

    var lastPage = navigation.pages.pop();
    navigation.pages.push(room);
    navigation.pages.push(lastPage);

    navigation.goToPage(room);
  }

  return this;
}

function PhotoViewModel(uri) {
  var self = this;

  self.uri = ko.observable(uri);

  return this;
}