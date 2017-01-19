const regex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
var currentTabId;
chrome.tabs.onActivated.addListener(function(evt){ 
    chrome.tabs.get(evt.tabId, function(tab){ 
    	currentTabId = tab.id;
    }); 
}); 

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	alert('ended.');

	chrome.tabs.query({currentWindow: true}, function(tabs) {
		for(var i = 0; i < tabs.length; i++) {
			if(checkURL(tabs[i].url) && tabs[i].id != currentTabId) {
				alert('found ' + currentTabId + ' and ' + tabs[i].id);
				// Update new current tab
				currentTabId = tabs[i].id;

				// Switch tab
				chrome.tabs.update(tabs[i].id, {highlighted : true});
				chrome.tabs.sendMessage(tabs[i].id, {text: 'start_video'}, function(tabs) {});
				return;
			}
		}
	});
});


function checkURL(url) {
	return url.match(regex) ? true : false;
}
