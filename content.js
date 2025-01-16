document.addEventListener("click", function (event) {
  // Get the clicked element and its text content
  const clickedElement = event.target;
  const text = clickedElement.textContent;

  // Get click coordinates relative to the element
  const range = document.caretRangeFromPoint(event.clientX, event.clientY);
  if (!range) return;

  // Get the text node and offset at click position
  const node = range.startContainer;
  const offset = range.startOffset;

  // Only proceed if we clicked on a text node
  if (node.nodeType === Node.TEXT_NODE) {
    // Get the word at click position using regex
    const words = node.textContent.split(/\b/);
    let position = 0;
    let clickedWord = "";

    // Find which word was clicked
    for (let word of words) {
      if (position <= offset && offset <= position + word.length) {
        clickedWord = word.trim();
        break;
      }
      position += word.length;
    }

    // Copy if we found a word
    if (clickedWord && /\w+/.test(clickedWord)) {
      navigator.clipboard
        .writeText(clickedWord)
        .then(() => {
          console.log("Word Copier Extension: copied to clipboard: " + clickedWord);

          // Create a range for the clicked word
          const wordRange = document.createRange();
          wordRange.setStart(node, position);
          wordRange.setEnd(node, position + clickedWord.length);

          // Add visual highlight
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(wordRange);

          // Remove highlight after 5000ms
          //   setTimeout(() => selection.removeAllRanges(), 5000);
        })
        .catch((err) => console.error("Word Copier Extension: could not copy text: ", err));
    }
  }
});
