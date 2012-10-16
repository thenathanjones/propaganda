$(function() {
  var viewModel = new MainViewModel();
  
  viewModel.currentPage.subscribe(function() {
    setTimeout(function() {$('.autosize').autosize();}, 250);
  });

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