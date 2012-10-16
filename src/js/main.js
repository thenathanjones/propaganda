$(function() {
  var viewModel = new MainViewModel();
  
  viewModel.currentPage.subscribe(function() {
    setTimeout(function() {$('.autosize').autosize();}, 250);
  });

  viewModel.currentPhoto.subscribe(function() {
    setTimeout(function() {$('.fancybox').fancybox().click();}, 50);
  });

  ko.applyBindings(viewModel);

  $('body').bind('swipeleft', function() {
    viewModel.swipeLeft();
  });

  $('body').bind('swiperight', function() {
    viewModel.swipeRight();
  });
});