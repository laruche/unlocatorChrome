$( document ).ready(function() {
  var searchValue = 'APIKey_unloc';
  //check APIKEY
  chrome.storage.sync.get(searchValue,function(object){
    if(typeof(object[searchValue]) != 'undefined')
    {
      $('#APIKey').val(object[searchValue]);      
    }
  });

  $( "#loginForm" ).submit(function( event ) {
    event.preventDefault();    
    chrome.storage.sync.set({"APIKey_unloc": $('#APIKey').val()}, function() {
      var bg = chrome.extension.getBackgroundPage();
      bg.updateIP();
    });
    
  });
});