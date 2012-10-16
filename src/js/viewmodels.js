AVAILABLE_ROOMS = {
                    'entry': {
                      type: 'entry',
                      template: 'interior',
                      attributes: ['walls', 'ceiling','floor','windows', 'electrical', 'comments']
                    },
                    'lounge': {
                      type: 'lounge',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'bedroom': {
                      type: 'bedroom',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'games room': {
                      type: 'games room',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'store room': {
                      type: 'store room',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'garage': {
                      type: 'garage',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'dining': {
                      type: 'dining',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'family room': {
                      type: 'family room',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'kitchen': {
                      type: 'kitchen',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'bathroom': {
                      type: 'bathroom',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'family room': {
                      type: 'family room',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'laundry': {
                      type: 'laundry',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    },
                    'toilet': {
                      type: 'toilet',
                      template: 'interior',
                      attributes: ['walls', 'ceiling', 'floor', 'windows', 'electrical', 'comments']
                    }
                 }

function MainViewModel() {
  var self = this;

  self.type = "PCR helper";
  self.template = "main";

  self.pages = ko.observableArray([this]);
  self.pages.push(new WhereNextViewModel(this));

  self.currentPage = ko.observable(self.pages()[0]);

  self.currentPhoto = ko.observable();
  self.currentPhotoVisible = false;

  self.pageIndex = ko.computed(function() {
    return self.pages().indexOf(self.currentPage());
  });

  var goToIndex = function(index) {
    var nextPage = self.pages()[index];
    self.currentPage(nextPage);
  }

  self.goToPage = function(page) {
    self.currentPage(page);
  }

  self.swipeLeft = function() {
    if (self.pageIndex() < self.pages().length - 1) {
      self.nextPage();
    }
  }

  self.swipeRight = function() {
    if (self.pageIndex() > 0) {
      self.previousPage();
    }
  }

  self.previousPage = function() {
    goToIndex(self.pageIndex() - 1);
  }

  self.nextPage = function() {
    goToIndex(self.pageIndex() + 1);
  }

  self.addPage = function(room, andGo) {
    self.pages.splice(self.pages().length - 1, 0, room);

    if (andGo) { self.currentPage(room); }
  }

  self.templateSelector = function(page) {
    return page ? page.template : 'blank';
  }

  self.generalCondition = ["Good", "Average", "Poor", "N/A"]

  self.photos = ko.observableArray();

  self.capture = function(source) {
    capturePhoto(function(uri) {
      var photo = new PhotoViewModel(uri, self);
      source.photos.push(photo);
      photo.edit();
    });
  };

  return this;
}

function RoomViewModel(roomDescription) {
  var self = this;

  self.type = roomDescription.type;
  self.template = roomDescription.template;

  roomDescription.attributes.forEach(function(attribute) {
    self[attribute] = ko.observable();
  });

  self.photos = ko.observableArray();

  return this;
}

function WhereNextViewModel(navigation) {
  var self = this;

  self.type = "where next?";
  self.template = "wherenext";

  self.rooms = [];
  for(var property in AVAILABLE_ROOMS) {
    self.rooms.push(property);
  }

  self.addRoom = function(roomName) {
    var room = new RoomViewModel(AVAILABLE_ROOMS[roomName]);

    navigation.addPage(room, true);
  }

  return this;
}

function PhotoViewModel(uri, navigation) {
  var self = this;

  self.uri = ko.observable(uri);

  self.comment = ko.observable();

  self.edit = function() {
    navigation.currentPhoto(self);
  }

  return this;
}