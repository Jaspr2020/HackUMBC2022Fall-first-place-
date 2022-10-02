// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id},
    func: sF,
  });

  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   func: setPageBackgroundColor,
  // });
});

function sF() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
  chrome.fontSettings.setFont( { fontId: 'asdf', genericFamily: 'standard'} )
  // chrome.fontSettings.setFont( { fontId: 'Impact', genericFamily: 'standard'});
  // chrome.fontSettings.setFont( { fontId: 'Impact', genericFamily: 'standard'});
}

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}