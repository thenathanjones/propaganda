$(function() {
  var viewModel = new MainViewModel();

  ko.applyBindings(viewModel);

  // $.event.special.swipe.horizontalDistanceThreshold = 100;
  // $.event.special.swipe.verticalDistanceThreshold = 100;

  // $('body').bind('swipeleft', function() {
  //   viewModel.swipeLeft();
  // });

  // $('body').bind('swiperight', function() {
  //   viewModel.swipeRight();
  // });
});