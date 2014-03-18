/// infos

var updateIP = function() {
  checkIP(function(ip) {
    getAPIKEY(function(link) {      
      jQuery.ajax({
          url: link,        
        }).error(function(data) {
          //error
        }).done(function(data) { 

          switch(data) {
            case 'Missing or Invalid API Key':
              chrome.browserAction.setBadgeBackgroundColor({color:[254, 51, 0, 255]}); 
              chrome.browserAction.setBadgeText({text: '?'});
              break;

            case "IP "+ip+" exists":
            case "IP "+ip+" added":              
              chrome.browserAction.setBadgeBackgroundColor({color:[7, 149, 0, 255]}); 
              chrome.browserAction.setBadgeText({text: '✓'});
              break;

            default:               
              chrome.browserAction.setBadgeBackgroundColor({color:[254, 51, 0, 255]}); 
              chrome.browserAction.setBadgeText({text: '?'});
              break; 
          }
          
          
        });
    });
  });
}

var getAPIKEY = function(cb) {
  var searchValue = 'APIKey_unloc';
  chrome.storage.sync.get(searchValue,function(object){
    if(typeof(object[searchValue]) == 'undefined')
    {
      cb(null);
    } else {
      var token = object[searchValue];
      cb( token);
    }
  });
}

var checkIP = function(cb) {
  var searchValue = 'IP_unlocator';
  chrome.storage.sync.get(searchValue,function(object){
    if(typeof(object[searchValue]) == 'undefined')
    {
      cb(null);
    } else {
      var token = object[searchValue];
      cb(token);
    }
  });
}

var getIP = function() {
  checkIP(function(ip) {
    $.ajax({
      type: "GET",
      url: "https://jsonip.appspot.com/",
      dataType : 'json'
    }).done(function(data) {            
      if(ip != data.ip) {
        updateIP();
        chrome.storage.sync.set({'IP_unlocator': data.ip}, function() {});
      }      
    });
  })  
};

chrome.browserAction.setBadgeBackgroundColor({color:[254, 51, 0, 255]}); 
chrome.browserAction.setBadgeText({text: '?'});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {  
  getIP();
});

chrome.tabs.onSelectionChanged.addListener(function(tabId) {
  getIP();
});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {         
  getIP();
});

getIP();
updateIP();