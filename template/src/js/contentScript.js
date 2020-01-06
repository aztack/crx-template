window.addEventListener('message', e => {
  if (e.source === window) {
    chrome.runtime.sendMessage(e.data);
  }
});