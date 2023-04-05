const button = document.createElement("button");
button.appendChild(document.createTextNode("Click"));

const findAnchor = (elem, stop) => {
  while (elem !== null && elem !== stop) {
    if (elem.tagName === "A") {
      return elem;
    }
    elem = elem.parentNode;
  }
  return null;
}

const findRow = (elem) => {
  while (elem !== null) {
    if (elem.id === "betting-tool-table-row") {
      return elem;
    }
    elem = elem.parentNode;
  }
  return null;
}

const rowToUrl = (row, img) => {
  return "http://www.etrade.com";
}

button.addEventListener("click", (evt) => {
  const imgs = document.querySelectorAll("img");
  for (const img of imgs) {
    const row = findRow(img);
    if (row !== null) {
      img.addEventListener("click", (evt) => {
        // evt.preventDefault();
      });
      const a = findAnchor(img, row);
      if (a !== null) {
        a.setAttribute("href", rowToUrl(row, img));
      } else {
        const a = document.createElement("a");
        a.setAttribute("href", rowToUrl(row, img));
        const parent = img.parentNode;
        parent.removeChild(img);
        a.appendChild(img);
        parent.appendChild(a);
      }
    }
  }
});

document.body.appendChild(button);
console.log("hooked");
