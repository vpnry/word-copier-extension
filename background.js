function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Word Copier Extension: copied to clipboard: " + text);
    })
    .catch((err) => {
      console.error("Word Copier Extension: failed to copy: ", err);
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyWord") {
    copyToClipboard(request.word);
    sendResponse({ status: "success" });
  }
});
