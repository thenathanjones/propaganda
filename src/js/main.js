$(function() {
  var viewModel = new MainViewModel();

  viewModel.currentPage.subscribe(function() {
    setTimeout(function() { $('#current-page').trigger('create'); }, 0);
  });

  ko.applyBindings(viewModel);
});