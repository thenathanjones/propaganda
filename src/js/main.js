$(function() {
  var viewModel = new MainViewModel();
  
  viewModel.currentPage.subscribe(function() {
    setTimeout(function() {$('.autosize').autosize();}, 250);
  });

  ko.applyBindings(viewModel);
});