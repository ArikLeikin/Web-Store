$(document).ready(function () {
  $("#UpdateYad2-form").submit(function (event) {
    event.preventDefault();
    clearErrorMessages();

    let isValid = true;
    var price = $("#price").val();
    var bankAccount = $("#bankAccount").val();
    var productName = $("#productName").val();

    if (!validateLettersDigitsAndSpaces(productName)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Product name should be only letters or digits, and at least 4 characters.',
      });
      // $("#productName-error").text("Product name should be only letters or digits.");
      isValid= false; 
    }


    if (!containsOnlyNumbers(price)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter a valid price (numbers only and greater than zero).',
      });
      // showError(
      //   "#price-error",
      //   "Please enter a valid price (numbers only and greater than zero)."
      // );
      isValid = false;
    }

    if (!ValidBankAccount(bankAccount)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter a valid bank account (14 digits).',
      });
      // showError(
      //   "#bankAccount-error",
      //   "Please enter a valid bank account (14 digits)."
      // );
      isValid = false;
    }

    var productPhotos = $("#productPhotos")[0].files;
    if (productPhotos.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please upload at least 1 photo.',
      });
      isValid = false;
    } else if (productPhotos.length > 4) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'You can upload a maximum of 4 photos.',
      });
      isValid = false;

    }
  });
});

function validateLettersDigitsAndSpaces(str) {
  return /^[a-zA-Z0-9 ]{4,}$/.test(str);
}
function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}
function ValidBankAccount(str) {
  return str.length === 14 && /^[0-9]{14}$/.test(str);
}





function showError(element, message) {
  $(element).text(message).css("color", "red");
}

function clearErrorMessages() {
  $(".error-message").text("");
}
