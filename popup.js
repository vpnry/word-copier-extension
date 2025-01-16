function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Word Copier Extension: copied to clipboard: " + text);
    })
    .catch((err) => {
      console.error("Word Copier Extension: could not copy text: ", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.getElementById("copy-button");
  copyButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedWord" }, (response) => {
        if (response && response.word) {
          copyToClipboard(response.word);
        }
      });
    });
  });
});
