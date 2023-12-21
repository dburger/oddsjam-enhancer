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

const findRow = (elem) => {
  while (elem !== null) {
    if (elem.id === "betting-tool-table-row") {
      return elem;
    }
    elem = elem.parentNode;
  }
  return null;
}

const getState = () => {
  // Fragile, but I don't see another more solid looking ID attribute.
  const stateTextBox = document.getElementById("headlessui-combobox-input-:r1:");
  if (stateTextBox === null) {
    console.warn("State not found, returning KS.");
    return "KS";
  }
  return stateTextBox.value;
}

function rowToEvent(row) {
  const header = row.parentNode.children.item(0);
  let i = 0;
  for (; i < header.children.length; i++) {
    if (header.children.item(i).textContent === "Event") {
      break;
    }
  }

  const parent = row.children.item(0).children.item(i).children.item(1);
  const teams = parent.children.item(0).textContent.split(" vs ");
  const event = parent.children.item(1).textContent.split(" | ");

  return {
    awayTeam: teams[0],
    homeTeam: teams[1],
    sport: event[0],
    league: event[1]
  }
}

const rowToUrl = (state, book, homeTeam, sport, league) => {
  state = state.toLowerCase();
  book = book.toLowerCase();
  homeTeam = homeTeam.toLowerCase();
  sport = sport.toLowerCase();
  league = league.toLowerCase();
  if (book === "espn bet") {
    return `https://espnbet.com/search?searchTerm=${homeTeam}`;
  } else if (book === "betfred") {
    return `https://${state}.betfredsports.com/`;
  } else if (book === "betmgm") {
    return `https://sports.${state}.betmgm.com/en/sports?popup=betfinder`;
  } else if (book === "betrivers") {
    return `https://${state}.betrivers.com/`;
  } else if (book === "caesars") {
    return `https://sportsbook.caesars.com/us/${state}/bet/${sport.toLowerCase()}/events/all`;
  } else if (book === "desert diamond") {
    return "https://www.playdesertdiamond.com/";
  } else if (book === "draftkings") {
    return `https://sportsbook.draftkings.com/leagues/${sport.toLowerCase()}/${league.toLowerCase()}`;
  } else if (book === "fanduel") {
    return `https://sportsbook.fanduel.com/search?q=${homeTeam}`;
  } else if (book === "hard rock") {
    return `https://www.hardrock.bet/${state}/`;
  } else if (book === "pointsbet (kansas)") {
    return `https://${state}.pointsbet.com/?search=${homeTeam}`;
  } else if (book === "superbook") {
    return `https://${state}.superbook.com/search`;
  } else if (book === "unibet") {
    return `https://${state}.unibet.com/`;
  } else if (book === "wynnbet") {
    return "https://bet.wynnbet.com/";
  } else if (book.startsWith("betway")) {
    return `https://${state}.betway.com/sports/find`;
  } else {
    return `https://www.pinnacle.com/en/search/${homeTeam}`;
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

    const state = getState();
    const book = img.alt;
    const event = rowToEvent(row);
    const url = rowToUrl(state, book, event.homeTeam, event.sport, event.league);

    getSettings(({settings}) => {
      const target = settings.target === "$book" ? book : settings.target;
      window.open(url, target);
  
      count++;
      console.log(`OddsJam Linker intercepted ${count} clicks.`);
    });
  }
}, true);

const markPinny = () => {
  let count = 0;
  // The OJ tables now have BOOKS and PINNY columns. We only want to mark the
  // rows where the BOOKS column has pinny odds. This code is fragile under
  // modifications of the OJ dom. It looks for h3s with text "Book", then
  // searches down from the node's parents looking for an img with alt "Pinny".
  // If found, it walks back up to the row with id "betting-tool-table-row" and
  // marks that row.
  const h3s = Array.from(document.querySelectorAll("h3"));
  const divs = h3s.filter(h3 => h3.textContent === "Book").map(h3 => h3.parentNode);
  for (const div of divs){
    if (hasPinny(div)) {
      const row = findRow(div);
      if (row) {
        // We indicate the bets with a background color. Removing the divs causes
        // react to blow up later with refreshing the content.
        row.style.backgroundColor = "yellow";
        count++;
      }
    }
  }
  console.log(`Marked ${count} rows.`);
};

document.addEventListener("keyup", (evt) => {
  if (evt.ctrlKey && evt.key === "m") {
    markPinny();
  }
});

getSettings(({settings}) => {
  if (settings.showMark) {
    const button = document.createElement("button");
    button.textContent = "MARK PINNY";
    button.addEventListener("click", (evt) => {
      markPinny();
    });

    document.body.prepend(button);
  }

  console.log("OddsJam Linker Hooks Set");
});
