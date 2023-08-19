$(document).ready(function () {
  $("#UpdateYad2-form").submit(function (event) {
    event.preventDefault();
    clearErrorMessages();

    let isValid = true;
    var price = $("#price").val();
    var bankAccount = $("#bankAccount").val();

    if (!containsOnlyNumbers(price)) {
      showError(
        "#price-error",
        "Please enter a valid price (numbers only and greater than zero)."
      );
      isValid = false;
    }

    if (!ValidBankAccount(bankAccount)) {
      showError(
        "#bankAccount-error",
        "Please enter a valid bank account (14 digits)."
      );
      isValid = false;
    }
  });
});

function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}
function ValidBankAccount(str) {
  return bankAccount.length === 14 && /^[0-9]+$/.test(str);
}

function showError(element, message) {
  $(element).text(message).css("color", "red");
}

function clearErrorMessages() {
  $(".error-message").text("");
}
