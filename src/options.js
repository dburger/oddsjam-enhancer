const button = document.getElementById("save");
const target = document.getElementById("target");
const showMark = document.getElementById("showMark");
const hideMark = document.getElementById("hideMark");

button.addEventListener("click", (evt) => {
  chrome.storage.sync.set({settings: {target: target.value, showMark: showMark.checked}}, function(e) {
    // TODO(dburger): 1. show that it stored, 2. handle error
    if (chrome.runtime.lastError) {
      window.alert(chrome.runtime.lastError.message);
    }
  });


const configureOptions = ({settings}) => {
  target.value = settings.target;
  showMark.checked = settings.showMark;
  hideMark.checked = !settings.showMark;
};

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get({settings: DEFAULT_SETTINGS}, configureOptions);
});
