document.body.style.backgroundColor = 'white';
var video = document.getElementsByTagName("video")[0];

video.addEventListener('ended', function(e) {
	chrome.runtime.sendMessage("test", function(response) { });
});

chrome.runtime.onMessage.addListener(function(message, sender, response) {
		document.body.style.backgroundColor = 'pink';
	var video = document.getElementsByTagName("video")[0];
	if (video) {
		video.play();
      }
}); 
