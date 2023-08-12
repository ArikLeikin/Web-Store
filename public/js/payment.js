document.addEventListener("DOMContentLoaded", function () {
  const totalElement = document.querySelector("#total-price"); // Update this selector to match your payment page's total element

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const cartTotal = urlParams.get("total");

  if (cartTotal !== null) {
    totalElement.textContent = "Total(USD) $" + cartTotal;
  }
});

$(document).ready(function () {
  $("#purchase-form").submit(function (event) {
    event.preventDefault();
    clearErrorMessages();

    let isValid = true;

    const phone = $("#phone").val();
    if (!validatePhoneNumber(phone)) {
      showError("#phone-error", "Phone number must be 10 digits.");
      isValid = false;
    }

    const city = $("#city").val();
    if (!validateCity(city)) {
      showError("#city-error", "City name can only contain letters.");
      isValid = false;
    }

    const street = $("#street").val();
    if (!validateStreet(street)) {
      showError("#street-error", "Street name can only contain letters.");
      isValid = false;
    }

    const streetNumber = $("#street_number").val();
    if (!validateStreetNumber(streetNumber)) {
      showError("#street-number-error", "Street number must be digits.");
      isValid = false;
    }

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
      showError("#card-number-error", "Card number must have 4 digits each.");
      isValid = false;
    }

    const cardHolder = $("#card-holder").val();
    if (!validateCardHolder(cardHolder)) {
      showError("#card-holder-error", "Card holder name must have 9 digits.");
      isValid = false;
    }

    const expirationMonth = $("#card-expiration-month").val();
    const expirationYear = $("#card-expiration-year").val();
    if (!validateExpirationDate(expirationMonth, expirationYear)) {
      showError("#expiration-month-error", "Invalid expiration date.");
      isValid = false;
    }

    const cvv = $("#card-ccv").val();
    if (!validateCVV(cvv)) {
      showError("#cvv-number-error", "CVV must be 3 digits.");
      isValid = false;
    }

    if (isValid) {
      const phone = $("#phone").val();
      const city = $("#city").val();
      const street = $("#street").val();
      const streetNumber = $("#street_number").val();
      const cardHolder = $("#card-holder").val();
      const expirationMonth = $("#card-expiration-month").val();
      const expirationYear = $("#card-expiration-year").val();

      const totalElement = document.querySelector("#total-price");

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const cartTotal = urlParams.get("total");

      if (cartTotal !== null) {
        totalElement.textContent = "Total(USD) $" + cartTotal;
      }
      const modalContent = `
      <style>.select:after{ display:none;
      }</style>
          <h2>Thank you for your purchase! We hope you will visit us again.</h2>
          <h2>Your Purchase Details:</h2>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Street:</strong> ${street}</p>
          <p><strong>Street Number:</strong> ${streetNumber}</p>
          <p><strong>Card Holder:</strong> ${cardHolder}</p>
          <p><strong>Expiration Date:</strong> ${expirationMonth}/${expirationYear}</p>
          <p><strong>Total Amount:</strong> $${cartTotal}</p>
          
        `;

      $("#modal-content").html(modalContent);

      $("#myModal").show();
    }
  });

  $(".close").click(function () {
    $("#myModal").hide();
  });
});

function validatePhoneNumber(phone) {
  return /^\d{10}$/.test(phone);
}

function validateCity(city) {
  return /^[A-Za-z\s]+$/.test(city);
}

function validateStreet(street) {
  return /^[A-Za-z\s]+$/.test(street);
}

function validateStreetNumber(streetNumber) {
  return /^\d+$/.test(streetNumber);
}

function validateCardNumber(cardNumber) {
  return /^\d{4}$/.test(cardNumber);
}

function validateCardHolder(cardHolder) {
  return /^[A-Za-z\s]+$/.test(cardHolder);
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
