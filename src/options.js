const button = document.getElementById("save");
const target = document.getElementById("target");
const showMark = document.getElementById("showMark");
const hideMark = document.getElementById("hideMark");

button.addEventListener("click", (evt) => {
  setSettings(target.value, showMark.checked, (e) => {
    if (chrome.runtime.lastError) {
      window.alert(chrome.runtime.lastError.message);
    }
  });
});

const loadOptions = ({settings}) => {
  target.value = settings.target;
  showMark.checked = settings.showMark;
  hideMark.checked = !settings.showMark;
};

document.addEventListener("DOMContentLoaded", (evt) => {
  getSettings(loadOptions);
});
