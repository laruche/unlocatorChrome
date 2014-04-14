$( document ).ready(function() {
  var searchValue = 'APIKey_unloc';
  //check APIKEY
  chrome.storage.local.get(searchValue,function(object){
    if(typeof(object[searchValue]) != 'undefined')
    {
      $('#APIKey').val(object[searchValue]);      
      var bg = chrome.extension.getBackgroundPage();
      bg.updateIP();
    }
  });

  chrome.storage.local.get('MSG_unlocator',function(object){

    if(typeof(object['MSG_unlocator']) != 'undefined')
    {
      var message = object['MSG_unlocator'];
      if(message == "Your Subscription Has Expired ") {      
        $('#messageAPI').html('<div class="alert alert-danger alert-dismissable">Your Subscription Has Expired, <a target="_blank" href="http://unlocator.com/account/aff/go/a41FRdeZON3XIS37">Upgrade to paid version</a></div>');          
        $('#messageAPIHelp').hide();
        $('#messageAccount').hide();
      } else if(message == 'Missing or Invalid API Key') {
        $('#messageAPI').html('<div class="alert alert-warning alert-dismissable">Please add you API Key on Extension</div>');          
      } else {
        $('#messageAPIHelp').hide();
        $('#messageAccount').hide();
      }
    }
  });

  chrome.storage.local.get('refresh',function(object){
    if(typeof(object['refresh']) != 'undefined')
    {
      $('#APITime').val(object['refresh']/60/1000);            
    }
  });

  $( "#loginForm" ).submit(function( event ) {
    event.preventDefault();    
    chrome.storage.local.set({"APIKey_unloc": $('#APIKey').val()}, function() {});
    
  });

  $( "#refreshForm" ).submit(function( event ) {
    event.preventDefault();    
    chrome.storage.local.set({"refresh": $('#APITime').val()*60*1000}, function() {});
    
  });
});