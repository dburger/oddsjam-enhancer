let count = 0;

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


function rowToEvent(row) {
  const header = row.parentNode.children.item(0);
  let i = 0;
  for (; i < header.children.length; i++) {
    if (header.children.item(i).textContent === "Event") {
      break;
    }
  }
  return row.children.item(i).children.item(1).children.item(1).textContent;
}

const rowToUrl = (book, sport, league) => {
  if (book === "Barstool") {
    return `https://www.barstoolsportsbook.com/sports/${sport.toLowerCase()}/${league.toLowerCase()}`;
  } else if (book === "BetMGM") {
    return `https://sports.ks.betmgm.com/en/sports`;
  } else if (book === "Caesars") {
    return `https://sportsbook.caesars.com/us/ks/bet/${sport.toLowerCase()}/events/all`;
  } else if (book === "DraftKings") {
    return `https://sportsbook.draftkings.com/leagues/${sport.toLowerCase()}/${league.toLowerCase()}`
  } else if (book === "FanDuel") {
    return `https://sportsbook.fanduel.com/navigation/${league.toLowerCase()}`;
  } else if (book === "PointsBet (Kansas)") {
    return `https://ks.pointsbet.com/sports/basketball/${league.toUpperCase()}`;
  } else {
    const term = "Celtics";
    return `https://www.pinnacle.com/en/search/${term}`;
  }
}

const buttonLabel = () => {
  return `Linkify (${count})`;
}

const button = document.createElement("button");
button.appendChild(document.createTextNode(buttonLabel()));

const IMG_BORDER = "2px solid red";

button.addEventListener("click", (evt) => {
  const imgs = document.querySelectorAll("img");
  for (const img of imgs) {
    const row = findRow(img);
    if (row !== null) {
      if (img.style.border === IMG_BORDER) {
        continue;
      }
      const anchor = findAnchor(img, row);
      if (anchor) {
        anchor.setAttribute("href", "#");
      }
      img.style.cursor = "pointer";
      img.style.border = IMG_BORDER;
      img.addEventListener("click", (evt) => {
        evt.preventDefault();
        const book = img.alt;
        const event = rowToEvent(row);
        const parts = event.split(" | ");
        const sport = parts[0];
        const league = parts[1];
        const url = rowToUrl(book, sport, league);
        window.open(url, "_blank");
      });
      count++;
    }
  }
  button.innerText = buttonLabel();
});


// const logo = document.querySelector('img[alt="OddsJam"]')
// logo.parentNode.appendChild(button);
// document.body.appendChild(button);
document.body.prepend(button);
