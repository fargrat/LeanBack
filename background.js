// Youtube Regex from http://stackoverflow.com/a/10315969/624466
// Thanks to Stephan Schmitz <eyecatchup@gmail.com>
const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

// Active Youtube tab id
var currentTabId;

// List of watched ids
var watchedIds = [];

// Listen to tab change event
chrome.tabs.onActivated.addListener(function(event) { 
    chrome.tabs.get(event.tabId, function(tab) { 
    	// Set currentTabId to active tab
    	currentTabId = tab;
    }); 
}); 

// Listen to video ended event from content script
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	chrome.tabs.query({currentWindow: true}, function(tabs) {
		watchedIds.push(currentTabId.id);
		console.log(currentTabId.title + ' : auf Liste :' + currentTabId.id);

		for(var i = 0; i < tabs.length; i++) { // iterate through all tabs
			// Check if tab is
				// 1. a Youtube Tab
				// 2. new tab is not the current tab
				// 3. has not already been watched
			if(checkURL(tabs[i].url) && !contains(tabs[i].id)) {
				// Switch tab
				chrome.tabs.update(tabs[i].id, {highlighted : true});

				// Notify content script to start the video in the new tab
				chrome.tabs.sendMessage(tabs[i].id, {text: 'start_video'}, function(tabs) {});
				return;
			}
		}

		watchedIds.length = 0;
		console.log('Liste voll - Lösche');

	});
});

// Check if array contains given id
function contains(id) {
	for(var i = 0; i < watchedIds.length; i++) {
		if(watchedIds[i] == id) { 
			return true; 
		}
	}

	return false;
}

// Check if url matches the Youtube Regex
function checkURL(url) {
	return url.match(regex) ? true : false;
}