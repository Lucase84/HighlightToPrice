function getSelectionedText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text.split(" ");
}

function getCurrencyID(currency, symbols) {
  var ID = "";
  Object.values(symbols).some(function (i) {
    if (i["symbol"] == currency) {
      ID = i["id"];
      return true;
    }
  });
  return ID;
}

async function doSomethingWithSelectedText(event) {
  const symbols = JSON.parse(window.localStorage.getItem("symbols"));
  var tab = getSelectionedText();
  if (checkTextFormatting(tab, symbols)) {
    var currencyID = getCurrencyID(tab[1].toString().toLowerCase(), symbols);
    var currentPrice = await getPrice(currencyID);
    displayPrice(currentPrice, event);
  }
}

function displayPrice(currentPrice, event) {
  var popup = document.getElementById("popup");
  popup.innerHTML = "Current price in EUR : " + currentPrice.toString();
  popup.style.top = event.pageY + "px";
  popup.style.left = event.pageX + "px";
  popup.style.display = "flex";
}

async function getPrice(currencyID) {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/" + currencyID
  );
  const body = await response.json();
  return body["market_data"]["current_price"]["eur"];
}

function checkTextFormatting(tab, symbols) {
  if (tab.length != 2) {
    return false;
  }
  var value = tab[0];
  var currency = tab[1].toString().toLowerCase();

  if (Number(value) === NaN) {
    return false;
  }
  value = parseFloat(value);

  var isCurrencyInTab = Object.values(symbols).some(function (i) {
    if (i["symbol"] == currency) {
      return true;
    }
  });
  return isCurrencyInTab;
}

async function getAllSymbols() {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const body = await response.json();
  window.localStorage.setItem("symbols", JSON.stringify(body));
}
