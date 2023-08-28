var saveAddress = true;
var saveCard = true;
var global_cart_price;
$(document).ready(function () {
  const checkboxAddress = document.getElementById("saveAddress");
  const checkboxCard = document.getElementById("saveCard");
  const pointsSelect = document.getElementById("pointsSelect");

  checkboxAddress.addEventListener("change", function () {
    const isChecked = this.checked;

    // You can now use the isChecked value to perform actions based on whether the checkbox is checked or unchecked
    if (isChecked) {
      console.log("Address Checkbox is checked");
      saveAddress = true;
    } else {
      console.log("Address Checkbox is unchecked");
      saveAddress = false;
    }
  });

  checkboxCard.addEventListener("change", function () {
    const isChecked = this.checked;

    // You can now use the isChecked value to perform actions based on whether the checkbox is checked or unchecked
    if (isChecked) {
      console.log("Card Checkbox is checked");
      saveCard = true;
    } else {
      console.log("Card Checkbox is unchecked");
      saveCard = false;
    }
  });

  pointsSelect.addEventListener("change", function () {
    var options = pointsSelect.value;
    const totalElement = document.getElementById("total-price");
    $("#total-price").val(global_cart_price - parseInt(options));
    totalElement.textContent = global_cart_price - parseInt(options);
  });
});

function validateName(str) {
  return /^[A-Za-z\s]+$/.test(str);
}

function validateZipCode(phone) {
  return /^\d{5}$/.test(phone);
}
function validatePhoneNumber(phone) {
  return /^\d{10}$/.test(phone);
}

function validateStreetNumber(streetNumber) {
  return /^\d+$/.test(streetNumber);
}

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

/*~~~~~~~~~~~~~~~~~~~ card get api~~~~~~~~~~~~~~~~~~`*/
fetch("http://127.0.0.1:8080/api/current-user")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    if (data && data.creditCard) {
      document.getElementById("card-number-1").value =
        data.creditCard.card_number.substr(0, 4) || "";

      document.querySelector("#card-number-2").value =
        data.creditCard.card_number.substr(4, 4);
      document.querySelector("#card-number-3").value =
        data.creditCard.card_number.substr(8, 4);
      document.querySelector("#card-number-4").value =
        data.creditCard.card_number.substr(12, 4);

      document.querySelector("#card-holder").value =
        data.creditCard.holder_name;
      document.querySelector("#card-expiration-month").value =
        data.creditCard.expiration_date.substr(0, 2);
      document.querySelector("#card-expiration-year").value =
        data.creditCard.expiration_date.slice(-4);
      document.querySelector("#card-ccv").value = data.creditCard.ccv;
    } else {
      document.querySelector("#card-number-1").value = "";
      document.querySelector("#card-number-2").value = "";
      document.querySelector("#card-number-3").value = "";
      document.querySelector("#card-number-4").value = "";
      document.querySelector("#card-holder").value = "";
      document.querySelector("#card-expiration-month").value = "";
      document.querySelector("#card-expiration-year").value = "";
      document.querySelector("#card-ccv").value = "";
    }
  })
  .catch((error) => {
    console.error("Error fetching user details:", error);
  });

/*~~~~~~~~~~~~~~~~~~~ address get api~~~~~~~~~~~~~~~~~~`*/

fetch("http://127.0.0.1:8080/address")
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      document.getElementById("firstname").value = data.firstName;
      document.getElementById("lastname").value = data.lastName;
      document.getElementById("phone").value = data.phoneNumber;
      document.getElementById("country").value = data.country;
      document.getElementById("city").value = data.city;
      document.getElementById("zipcode").value = data.postalCode;
      document.getElementById("street").value = data.street;
      document.getElementById("street_number").value = data.streetNumber;

      console.log("Fetched Address Data:", data);
    } else {
      console.log("No address data found.");
    }
  })
  .catch((error) => {
    console.error("Error fetching address data:", error);
  });
// /*~~~~~~~~~~~~~~~~~~~ points get api~~~~~~~~~~~~~~~~~~`*/

$.ajax({
  url: "http://127.0.0.1:8080/api/current-user",
  type: "GET",
  dataType: "json",
  success: function (data) {
    document.getElementById("pointsNumber").textContent = data.points;

    updatePointsDropdown();
  },
  error: function (error) {
    console.error("Error fetching user data:", error);
  },
});

/*~~~~~~~~~~~~~~~~~~~ post  api~~~~~~~~~~~~~~~~~~`*/

$(document).ready(function () {
  $("#purchase-form").submit(function (event) {
    event.preventDefault();
    let isValid = true;

    const FirstName = $("#firstname").val();
    if (!validateName(FirstName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "First name can only contain letters.",
      });
      // showError("#firstname-error", "First name can only contain letters.");
      isValid = false;
    }

    const LastName = $("#lastname").val();
    if (!validateName(LastName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Last name can only contain letters.",
      });
      // showError("#lastname-error", "Last name can only contain letters.");
      isValid = false;
    }

    const country = $("#country").val();
    if (!validateName(country)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Country name can only contain letters.",
      });
      // showError("#country-error", "Country name can only contain letters.");
      isValid = false;
    }

    const zipcode = $("#zipcode").val();
    if (!validateZipCode(zipcode)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Zipcode can only contain only 5 digits.",
      });
      // showError("#zipcode-error", "Zipcode can only contain only 5 digits.");
      isValid = false;
    }

    const phone = $("#phone").val();
    if (!validatePhoneNumber(phone)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone number must be 10 digits.",
      });
      // showError("#phone-error", "Phone number must be 10 digits.");
      isValid = false;
    }

    const city = $("#city").val();
    if (!validateName(city)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "City name can only contain letters.",
      });
      isValid = false;
    }

    const street = $("#street").val();
    if (!validateName(street)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Street name can only contain letters.",
      });
      // showError("#street-error", "Street name can only contain letters.");
      isValid = false;
    }

    const streetNumber = $("#street_number").val();
    if (!validateStreetNumber(streetNumber)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Street number must be digits.",
      });
      // showError("#street-number-error", "Street number must be digits.");
      isValid = false;
    }

    const cardNumber = $("#card-number-1").val();
    const cardNumber1 = $("#card-number-2").val();
    const cardNumber2 = $("#card-number-3").val();
    const cardNumber3 = $("#card-number-4").val();

    if (
      !validateCardNumber(cardNumber) ||
      !validateCardNumber(cardNumber1) ||
      !validateCardNumber(cardNumber2) ||
      !validateCardNumber(cardNumber3)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Card number must have 4 digits each.",
      });
      // showError("#card-number-error", "Card number must have 4 digits each.");
      isValid = false;
    }

    const cardHolder = $("#card-holder").val();
    if (!validateCardHolder(cardHolder)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Card holder name must have 9 digits.",
      });
      isValid = false;
    }

    const expirationMonth = $("#card-expiration-month").val();
    const expirationYear = $("#card-expiration-year").val();
    if (!validateExpirationDate(expirationMonth, expirationYear)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Invalid expiration date.",
      });
      // showError("#expiration-month-error", "Invalid expiration date.");
      isValid = false;
    }

    const cvv = $("#card-ccv").val();
    if (!validateCVV(cvv)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: '"CVV must be 3 digits.',
      });
      // showError("#cvv-number-error", "CVV must be 3 digits.");
      isValid = false;
    }

    if (isValid) {
      const FirstName = $("#firstname").val();
      const LastName = $("#lastname").val();
      const country = $("#country").val();
      const zipcode = $("#zipcode").val();
      const phone = $("#phone").val();
      const city = $("#city").val();
      const street = $("#street").val();
      const streetNumber = $("#street_number").val();
      const cardHolder = $("#card-holder").val();
      const lastFourDigits = $("#card-number-4").val();
      const expirationMonth = $("#card-expiration-month").val();
      const expirationYear = $("#card-expiration-year").val();

      const totalElement = document.getElementById("total-price");

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const cartTotal = $("#total-price").val();

      // if (cartTotal !== null) {
      //   totalElement.textContent = cartTotal;
      //   $("#total-price").val(cartTotal);
      // }
      const modalContent = `
      <style>.select:after{ display:none;
      }</style>
          <h3>Thank you for your purchase! We hope you will visit us again.</h3>
          <h4>Your Purchase Details:</h4>
          <p>First Name: ${FirstName}<br>
           <p>Last Name: ${LastName}<br>        
           <p>Phone Number: ${phone}<br>
          <p>Address: ${street} ${streetNumber}, ${city}, ${country}<br>
          <p>Zipcode: ${zipcode}<br>
          <p>Card Number: ••••-••••-••••-${lastFourDigits}</p>
          <p><strong>Total Amount: $${$("#total-price").val()}</strong></p>
        `;

      $("#modal-content").html(modalContent);

      $("#myModal").show();
      $(".close").click(function () {
        $("#myModal").hide();
        window.location.href = "http://127.0.0.1:8080/my-account";
      });

      if (saveAddress) {
        var formData = {
          city: $("#city").val(),
          street: $("#street").val(),
          streetNumber: $("#street_number").val(),
          country: $("#country").val(),
          postalCode: $("#zipcode").val(),
          firstName: $("#firstname").val(),
          lastName: $("#lastname").val(),
          phoneNumber: $("#phone").val(),
        };
        $.ajax({
          url: "http://127.0.0.1:8080/address", // Replace with your actual URL
          type: "POST",
          data: formData,
          success: function (response) {
            console.log(response);
          },
          error: function (error) {
            // Handle errors here
            console.error("Error:", error);
          },
        });
      }
      var card_expiration_year = document.getElementById(
        "card-expiration-year"
      ).value;
      var card_expiration_month = document.getElementById(
        "card-expiration-month"
      ).value;
      var card_expiration = card_expiration_month + "/" + card_expiration_year;
      var card_number =
        document.getElementById("card-number-1").value +
        document.getElementById("card-number-2").value +
        document.getElementById("card-number-3").value +
        document.getElementById("card-number-4").value;
      if (saveCard) {
        var formData = {
          card_number: card_number,
          holder_name: $("#card-holder").val(),
          expiration_date: card_expiration,
          ccv: $("#card-ccv").val(),
        };
        console.log(formData.holder_name);

        // Send AJAX POST request
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:8080/creditcard",
          data: formData,
          success: function (response) {
            // Handle success response
            console.log("Success:", response);
          },
          error: function (error) {
            // Handle error response
            console.log("Error:", error);
          },
        });
      }
      calculateTotalPrice();

      var pointsSelect = document.getElementById("pointsSelect");
      var options = pointsSelect.value;
      console.log(options);
      var formData = {
        city: $("#city").val(),
        street: $("#street").val(),
        streetNumber: $("#street_number").val(),
        country: $("#country").val(),
        postalCode: $("#zipcode").val(),
        firstName: $("#firstname").val(),
        lastName: $("#lastname").val(),
        phone: $("#phone").val(),
        card_number: card_number,
        holder_name: $("#card-holder").val(),
        expiration_date: card_expiration,
        ccv: $("#card-ccv").val(),
        total_price: global_cart_price,
        points: options,
      };
      console.log(formData);

      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8080/payment",
        data: formData,
        success: function (response) {
          console.log("Payment successful:", response);
        },
        error: function (error) {
          console.error("Payment error:", error);
        },
      });
    }
  });
});

function calculateTotalPrice() {
  $.ajax({
    url: "http://127.0.0.1:8080/cart/products",
    method: "GET",
    dataType: "json",
    success: function (data) {
      data.data.forEach(function (product) {
        var productId = product.product;
        var productQuantity = product.quantity;
        calculate1(productId, productQuantity);

        function calculate1(productId, productQuantity) {
          $.ajax({
            url: `http://127.0.0.1:8080/api/product/${productId}`,
            method: "GET",
            dataType: "json",
          }).then(function (productData) {
            updateTotal(productData.data.price, productQuantity);
            updatePointsDropdown();
          });
        }
      });
    },
  });
}

let totalPrice = 0;
function updateTotal(price, quantity) {
  totalPrice += price * quantity;
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = totalPrice;
  $("#total-price").val(totalPrice);
  global_cart_price = totalPrice;
}

calculateTotalPrice();

function updatePointsDropdown() {
  var pointsSelect = document.getElementById("pointsSelect");
  var options = pointsSelect.options;
  var pointsNumber = parseInt(
    document.getElementById("pointsNumber").textContent
  );

  for (var i = 0; i < options.length; i++) {
    var optionValue = parseInt(options[i].value);
    options[i].disabled =
      pointsNumber < optionValue || totalPrice < optionValue;
  }
}
