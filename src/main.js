window.onload = function () {
  if (window.localStorage.getItem("symbols") == null) {
    getAllSymbols();
  }
  if (document.getElementById("popup") == null) {
    var popup = document.createElement("div");
    popup.setAttribute("id", "popup");
    document.body.appendChild(popup);
  }
};

document.addEventListener("mouseup", function (event) {
  doSomethingWithSelectedText(event);
});

document.addEventListener("mousedown", function (event) {
  if (document.getElementById("popup") != null) {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
  }
});
