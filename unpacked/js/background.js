/// infos

var updateIP = function() {

  getAPIKEY(function(link) {
    jQuery.ajax({
        url: link,        
      }).error(function(data) {
        //error
      }).done(function(data) {        
        //ok
        chrome.browserAction.setBadgeBackgroundColor({color:[7, 149, 0, 255]}); 
        chrome.browserAction.setBadgeText({text: 'OK'});
      });
  })
}

var getAPIKEY = function(cb) {
  var searchValue = 'APIKey_unlocator';
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
      console.log(ip);
      console.log(data.ip)
      if(ip != data.ip) {
        updateIP();
        chrome.storage.sync.set({'IP_unlocator': data.ip}, function() {});
      }      
    });
  })  
};


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