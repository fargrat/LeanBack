// Get video player
var video = document.getElementsByTagName("video")[0];

// Wait for video to end
video.addEventListener('ended', function(e) {
	// Notify event page
	chrome.runtime.sendMessage("video_ended", function(response) { });
});

// Wait for 
chrome.runtime.onMessage.addListener(function(message, sender, response) {
	// Check if there is a video player
	if (video) {
		// Start video on new tab
		video.play();
      }
}); 
