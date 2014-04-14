/// infos

var updateIP = function() {
  console.log('updateIP');
  checkIP(function(ip) {
    getAPIKEY(function(link) {      
      jQuery.ajax({
          url: link,        
        }).error(function(data) {
          //error
          chrome.browserAction.setBadgeBackgroundColor({color:[254, 51, 0, 255]}); 
          chrome.browserAction.setBadgeText({text: '?'});
          callmelater();
        }).done(function(data) { 
          chrome.storage.local.set({'MSG_unlocator': data}, function() {});
          switch(data) {
            case 'Missing or Invalid API Key':              
              chrome.browserAction.setBadgeBackgroundColor({color:[254, 51, 0, 255]}); 
              chrome.browserAction.setBadgeText({text: '?'});
              chrome.browserAction.setTitle({title: 'Missing or Invalid API Key'});
              break;

            case 'Your Subscription Has Expired ':
              chrome.browserAction.setBadgeBackgroundColor({color:[254, 51, 0, 255]}); 
              chrome.browserAction.setBadgeText({text: 'x'});
              chrome.browserAction.setTitle({title: 'Your Subscription Has Expired'});
              break;  

            case "IP "+ip+" exists":
            case "IP "+ip+" added":          
              chrome.browserAction.setBadgeBackgroundColor({color:[7, 149, 0, 255]}); 
              chrome.browserAction.setBadgeText({text: '✓'});
              chrome.browserAction.setTitle({title: 'Let\'s Have Fun !'});
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

var callmelater = function() {
  console.log("call in 5'");
  setTimeout(function(){
    updateIP();
    console.log("called in 5'");
  },5000);
}

var getAPIKEY = function(cb) {
  var searchValue = 'APIKey_unloc';
  chrome.storage.local.get(searchValue,function(object){
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
  chrome.storage.local.get(searchValue,function(object){
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
    }).error(function(data) {
      $.ajax({
        type: "GET",
        url: "http://ipinfo.io/ip",
        dataType : 'TXT'
      }).error(function(data) {
        callmelater();
      }).done(function(data) {            
        if(ip != ip) {
          updateIP();
          chrome.storage.local.set({'IP_unlocator': data.ip}, function() {});
        }      
      });
    }).done(function(data) {            
      if(ip != data.ip) {
        updateIP();
        chrome.storage.local.set({'IP_unlocator': data.ip}, function() {});
      }      
    });
  })  
};

chrome.browserAction.setBadgeBackgroundColor({color:[254, 51, 0, 255]}); 
chrome.browserAction.setBadgeText({text: '?'});


var createRefresh = function() {
  var searchValueRefresh = 'refresh';
  chrome.storage.local.get(searchValueRefresh,function(object){
    if(typeof(object[searchValueRefresh]) != 'undefined')
    {
      UnlRefresher(object[searchValueRefresh])
    } else {
      chrome.storage.local.set({'refresh' : '30000'}, function() {
          UnlRefresher();
      });
    }
  });
}
var makeAnUpdate = '',
    call= 0

var UnlRefresher = function(TimeR) {
  var searchValueRefresh = 'refresh';
  chrome.storage.local.get(searchValueRefresh,function(object){
    console.log(object[searchValueRefresh]);
    if(typeof(object[searchValueRefresh]) != 'undefined')
    {
      var timer = object[searchValueRefresh];
      makeAnUpdate = setInterval(function() {
        getIP();
        call++;
        chrome.browserAction.setBadgeText({text: ''+call});
      }, parseInt(timer));
    }
  });
  
}


chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    if(key == 'refresh')
      clearInterval(makeAnUpdate);
      createRefresh();
    if(key == 'APIKey_unloc' || key == 'IP_unlocator')
      updateIP();
  }
});

getIP();
createRefresh();