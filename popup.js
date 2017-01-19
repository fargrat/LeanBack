const regex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
var currentTabId;

function renderText(statusText) {
	document.getElementById('status').textContent += "\n" + statusText;
}

function checkURL(url) {
	return url.match(regex) ? true : false;
}

document.addEventListener('DOMContentLoaded', function() {
	// Get current tab
	chrome.tabs.query({active: true}, function(tabs) {
		console.log("Current tab: " + tabs[0].url);
		if(checkURL(tabs[0].url)) {
			chrome.tabs.sendMessage(tabs[0].id, {text: 'request_video'}, callback);
			currentTabId = tabs[0].id;
		}
	});

	// Get all youtube tabs
	// Can be removed
	chrome.tabs.query({currentWindow: true}, function(tabs) {
		for(var i = 0; i < tabs.length; i++) {
			if(checkURL(tabs[i].url)) {
			console.log(tabs[i].url + "is Selected: " + tabs[i].highlighted + " is Active: " + tabs[i].active);
			}
		}
	});

});

function callback(response) {
	console.log('loaded');
	chrome.tabs.query({currentWindow: true}, function(tabs) {
		for(var i = 0; i < tabs.length; i++) {
			if(checkURL(tabs[i].url) && tabs[i].url != currentTabId) {
				console.log(tabs[i].url);
				// Update new current tab
				currentTabId = tabs[i].id;

				// Switch tab
				chrome.tabs.update(currentTabId, {highlighted : true});
				console.log(tabs[i].id);
			}
		}
	});
}
