const hasPinny = (elem) => {
  if (elem.alt === "Pinny") {
    return true;
  }
  for (let i = 0; i < elem.children.length; i++) {
    if (hasPinny(elem.children.item(i))) {
      return true;
    }
  }
  return false;
}

const button = document.createElement("button");
button.textContent = "MARK";
button.addEventListener("click", (evt) => {
  const divs = document.querySelectorAll("div#betting-tool-table-row");
  console.log("is", divs.length);
  for (const div of divs){
    if (hasPinny(div)) {
      // We indicate the bets with a background color. Removing the divs causes
      // react to blow up later with refreshing the content.
      div.style.backgroundColor = "lightyellow";
    }
  }
});

document.body.prepend(button);

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
  book = book.toLowerCase();
  sport = sport.toLowerCase();
  league = league.toLowerCase();
  if (book === "barstool") {
    if (sport === "hockey") {
      sport = "ice_hockey";
    }
    return `https://www.barstoolsportsbook.com/sports/${sport.toLowerCase()}/${league.toLowerCase()}`;
  } else if (book === "betmgm") {
    return `https://sports.ks.betmgm.com/en/sports`;
  } else if (book === "caesars") {
    return `https://sportsbook.caesars.com/us/ks/bet/${sport.toLowerCase()}/events/all`;
  } else if (book === "draftkings") {
    return `https://sportsbook.draftkings.com/leagues/${sport.toLowerCase()}/${league.toLowerCase()}`
  } else if (book === "fanduel") {
    return `https://sportsbook.fanduel.com/navigation/${league.toLowerCase()}`;
  } else if (book === "pointsbet (kansas)") {
    return `https://ks.pointsbet.com/sports/basketball/${league.toUpperCase()}`;
  } else {
    const term = "Celtics";
    return `https://www.pinnacle.com/en/search/${term}`;
  }
}

let count = 0;

window.addEventListener('click', function(evt) {
  if (evt.target.tagName === "IMG") {
    const img = evt.target;
    const row = findRow(img);
    if (row === null) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();

    const book = img.alt;
    const event = rowToEvent(row);
    const parts = event.split(" | ");
    const sport = parts[0];
    const league = parts[1];
    const url = rowToUrl(book, sport, league);
    window.open(url, book);

    img.style.border = "2px solid red";
    count++;
    console.log(`OddsJam Linker intercepted ${count} clicks.`);
  }
}, true);

console.log("OddsJam Linker Hooks Set");
