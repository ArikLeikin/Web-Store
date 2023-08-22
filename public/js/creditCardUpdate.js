$(document).ready(function () {
  $("#creditCardUpdate-form").submit(function (event) {
    event.preventDefault();
    clearErrorMessages();

    let isValid = true;


    const cardNumber = $("#card-number").val();
    const cardNumber1 = $("#card-number-1").val();
    const cardNumber2 = $("#card-number-2").val();
    const cardNumber3 = $("#card-number-3").val();

    if (
      !validateCardNumber(cardNumber) ||
      !validateCardNumber(cardNumber1) ||
      !validateCardNumber(cardNumber2) ||
      !validateCardNumber(cardNumber3)
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Card number must have 4 digits each.',
      });
      // showError("#card-number-error", "Card number must have 4 digits each.");
      isValid = false;
    }

    const cardHolder = $("#card-holder").val();
    if (!validateCardHolder(cardHolder)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Card holder name must have 9 digits.',
      });
      // showError("#card-holder-error", "Card holder name must have 9 digits.");
      isValid = false;
    }

    const expirationMonth = $("#card-expiration-month").val();
    const expirationYear = $("#card-expiration-year").val();
    if (!validateExpirationDate(expirationMonth, expirationYear)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Invalid expiration date.',
      });
      // showError("#expiration-month-error", "Invalid expiration date.");
      isValid = false;
    }

    const cvv = $("#card-ccv").val();
    if (!validateCVV(cvv)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'CVV must be 3 digits.',
      });
      // showError("#cvv-number-error", "CVV must be 3 digits.");
      isValid = false;
    }



    if (isValid) {

      const cardHolder = $("#card-holder").val();
      const lastFourDigits = $("#card-number-3").val();
      const expirationMonth = $("#card-expiration-month").val();
      const expirationYear = $("#card-expiration-year").val();
      const modalContent = `
      <style>.select:after{ display:none;
      }</style>
          <h2>Your Credit Card details is changed to: </h2>
    
          <p><strong>Card Holder:</strong> ${cardHolder}</p>
          <p><strong>Last Four Digits of Credit Card:</strong> ${lastFourDigits}</p>
          <p><strong>Expiration Date:</strong> ${expirationMonth}/${expirationYear}</p>
        `;

      $("#modal-content").html(modalContent);

      $("#myModal").show();
    }
  });


  $(".close").click(function () {
    $("#myModal").hide();
  });
});





function validateCardNumber(cardNumber) {
  return /^\d{4}$/.test(cardNumber);
}

function validateCardHolder(cardHolder) {
  return cardHolder.length === 9 && /^[0-9]+$/.test(cardHolder);
}

function validateExpirationDate(expirationMonth, expirationYear) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const enteredYear = parseInt(expirationYear, 10);
  const enteredMonth = parseInt(expirationMonth, 10);

  if (enteredYear < currentYear) {
    return false;
  } else if (enteredYear === currentYear && enteredMonth < currentMonth) {
    return false;
  }
  return true;
}

function validateCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}

function showError(element, message) {
  $(element).text(message).css("color", "red");
}

function clearErrorMessages() {
  $(".error-message").text("");
}

