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
  // const copyButton = document.getElementById("copy-button");
  const doubleClickMode = document.getElementById("double-click-mode");

  // Load saved preference
  chrome.storage.sync.get(['doubleClickMode'], (result) => {
    doubleClickMode.checked = result.doubleClickMode || false;
  });

  // Save preference changes and update content script
  doubleClickMode.addEventListener('change', (e) => {
    const isDoubleClick = e.target.checked;
    chrome.storage.sync.set({ doubleClickMode: isDoubleClick });
    
    // Notify content script of change
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'updateClickMode',
        isDoubleClick: isDoubleClick
      });
    });
  });

  // copyButton.addEventListener("click", () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedWord" }, (response) => {
  //       if (response && response.word) {
  //         copyToClipboard(response.word);
  //       }
  //     });
  //   });
  // });
});
