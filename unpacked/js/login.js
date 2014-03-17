$( document ).ready(function() {
  var searchValue = 'APIKey_unlocator';
  //check APIKEY
  chrome.storage.sync.get(searchValue,function(object){
    if(typeof(object[searchValue]) != 'undefined')
    {
      $('#APIKey').val(object[searchValue]);
      
    }
  });

  $( "#loginForm" ).submit(function( event ) {
    event.preventDefault();
    var apiKey = $('#APIKey').val();
    chrome.storage.sync.set({searchValue: apiKey}, function() {});
    var bg = chrome.extension.getBackgroundPage();
    bg.updateIP();
  });
});