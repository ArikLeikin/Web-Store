var cardHeaders = document.querySelectorAll(".card-header");
for (var i = 0; i < cardHeaders.length; i++) {
  cardHeaders[i].addEventListener("click", function () {
    toggleCard(this);
  });
}
function toggleCard(cardHeader) {
  var card = cardHeader.parentNode;
  var cardBody = card.querySelector(".card-body");
  cardBody.style.display =
    cardBody.style.display === "block" ? "none" : "block";
}
