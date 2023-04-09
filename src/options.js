const button = document.getElementById("save");
const target = document.getElementById("target");
const showMark = document.getElementById("showMark");
// const markRadios = document.querySelectorAll('input[name="mark"]');
// console.log(markRadios.length);

button.addEventListener("click", (evt) => {
  console.log("target", target.value);
  console.log("showMark", showMark.checked === true);
  /*
      chrome.storage.sync.set({groups: groups}, function(e) {
      // TODO(dburger): 1. show that it stored, 2. handle error
      if (chrome.runtime.lastError) {
        window.alert(chrome.runtime.lastError.message);
      }
    });
*/

});
