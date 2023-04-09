// NOTE: I would have liked to make this a proper module with a `getSettings`
// function, however, because content scripts cannot easily (without hacks)
// import other modules I only have the default settings shared here. The
// content script and option page that use this work with chrome.storage.sync
// directly.

const DEFAULT_SETTINGS = {
  target: "_blank",
  showMark: true
};
