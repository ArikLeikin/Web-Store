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

    const FirstName = $("#firstname").val();
      if (!validateName(FirstName)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: 'First name can only contain letters.',
        });
        // showError("#firstname-error", "First name can only contain letters.");
        isValid = false;
      }

      const LastName = $("#lastname").val();
      if (!validateName(LastName)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: 'Last name can only contain letters.',
        });
        // showError("#lastname-error", "Last name can only contain letters.");
        isValid = false;
      }

      const country = $("#country").val();
      if (!validateName(country)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: 'Country name can only contain letters.',
        });
        // showError("#country-error", "Country name can only contain letters.");
        isValid = false;
      }

      const zipcode = $("#zipcode").val();
      if (!validateZipCode(zipcode)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: 'Zipcode can only contain only 5 digits.',
        });
        // showError("#zipcode-error", "Zipcode can only contain only 5 digits.");
        isValid = false;
      }

    const phone = $("#phone").val();
    if (!validatePhoneNumber(phone)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Phone number must be 10 digits.',
      });
      // showError("#phone-error", "Phone number must be 10 digits.");
      isValid = false;
    }

    const city = $("#city").val();
    if (!validateCity(city)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'City name can only contain letters.',
      });
      // showError("#city-error", "City name can only contain letters.");
      isValid = false;
    }

    const street = $("#street").val();
    if (!validateStreet(street)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Street name can only contain letters.',
      });
      // showError("#street-error", "Street name can only contain letters.");
      isValid = false;
    }

    const streetNumber = $("#street_number").val();
    if (!validateStreetNumber(streetNumber)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Street number must be digits.',
      });
      // showError("#street-number-error", "Street number must be digits.");
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
      const lastFourDigits= $("#card-number-3").val();
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
          <p><strong>First Name:</strong> ${FirstName}</p>
           <p><strong>Last Name:</strong> ${LastName}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Zipcode:</strong> ${zipcode}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Street:</strong> ${street}</p>
          <p><strong>Street Number:</strong> ${streetNumber}</p>
          <p><strong>Card Holder:</strong> ${cardHolder}</p>
          <p><strong>Last Four Digits of Credit Card:</strong> ${lastFourDigits}</p>
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

function validateName(city) {
  return /^[A-Za-z\s]+$/.test(city);
}

function validateZipCode(phone) {
  return /^\d{5}$/.test(phone);
}
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


fetch('http://127.0.0.1:8080/address')
  .then(response => response.json())
  .then(data => {  
    if (data) {
      document.getElementById('firstname').value = data.firstName;
      document.getElementById('lastname').value = data.lastName;
      document.getElementById('phone').value = data.phoneNumber;
      document.getElementById('country').value = data.country;
      document.getElementById('city').value = data.city;
      document.getElementById('zipcode').value = data.postalCode;
      document.getElementById('street').value = data.street;
      document.getElementById('street_number').value = data.streetNumber;

      console.log('Fetched Address Data:', data);
    } else {
      console.log('No address data found.');
    }
  })
  .catch(error => {
    console.error('Error fetching address data:', error);
  });



  $(document).ready(function () {
    $.ajax({
      url: 'http://127.0.0.1:8080/creditcard',
      type: 'GET',
      dataType: 'json', 
      success: function (data) {
        const cardNumber =data.card_number;
        $('#card-number').val(cardNumber.substr(0, 4));
        $('#card-number-1').val(cardNumber.substr(4, 4));
        $('#card-number-2').val(cardNumber.substr(8, 4));
        $('#card-number-3').val(cardNumber.substr(12, 4));
        $('#card-holder').val(data.holder_name);
        $('#card-expiration-month').val(data.expiration_date);
        $('#card-ccv').val(data.ccv);
      },
      error: function () {
        console.log('Error fetching credit card data');
      },
    });
  });


  $.ajax({
    url: 'http://127.0.0.1:8080/api/current-user',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
     document.getElementById('pointsNumber').textContent=data.points; 
      updatePointsDropdown();
    },
    error: function(error) {
      console.error('Error fetching user data:', error);
    }
  });
  
function updatePointsDropdown() {
  var pointsSelect = document.getElementById("pointsSelect");
  var options = pointsSelect.options;
  var pointsNumber = parseInt(document.getElementById("pointsNumber").textContent);

  for (var i = 0; i < options.length; i++) {
    var optionValue = parseInt(options[i].value);
    options[i].disabled = pointsNumber < optionValue;
  }
}


$(document).ready(function () {
  $("#purchase-button").click(function (event) {
    event.preventDefault();

    const checkbox = $(".cl-checkbox-address");


 
    // if (checkbox.checked) {
      const firstName = $("#firstname").val();
      const lastName = $("#lastname").val();
      const phoneNumber = $("#phone").val();
      const country = $("#country").val();
      const city = $("#city").val();
      const postalCode = $("#zipcode").val();
      const street = $("#street").val();
      const streetNumber = $("#street_number").val();

      const data = {
        firstName,
        lastName,
        phoneNumber,
        country,
        city,
        postalCode,
        street,
        streetNumber,
      };
      console.log(data);

      $.ajax({
        url: "http://127.0.0.1:8080/address",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (result) {
          console.log("Data sent successfully:", result);
          $("#purchase-form").submit();
        },
        error: function (error) {
          console.error("Error sending data:", error);
        },
      });
    // } else {
    //   $("#purchase-form").submit();
    // }
  });
});


$(document).ready(function () {
  $("#purchase-button").click(function (event) {
    event.preventDefault();

    const checkbox = $(".cl-checkbox");
    // if (checkbox.prop("checked")) {
      const card_number =
        $("#card-number").val() +
        $("#card-number-1").val() +
        $("#card-number-2").val() +
        $("#card-number-3").val();

      const holder_name = $("#card-holder").val();
      const expiration_date = $("#card-expiration-month").val();
      const ccv = $("#card-ccv").val();
      const data = {
        card_number,
        holder_name,
        expiration_date,
        ccv,
      };

      $.ajax({
        url: "http://127.0.0.1:8080/creditcard",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (result) {
          console.log("Data sent successfully:", result);
          $("#purchase-form").submit();
        },
        error: function (error) {
          console.error("Error sending data:", error);
        },
      });
    // } else {
    //   $("#purchase-form").submit();
    // }
  });
});



$(document).ready(function() {
  function updatePoints() {
    var selectedPoints = parseInt($("#pointsSelect").val());
    var totalPrice = parseFloat($("#total-price").text().replace("Total(USD) $", ""));
    
    var updatedPoints = -selectedPoints + Math.round(totalPrice * 0.1);

    $("#pointsNumber").text(updatedPoints);
    $("#pointsSelect option").each(function() {
      var optionPoints = parseInt($(this).val());
      if (optionPoints <= updatedPoints) {
        $(this).prop("disabled", false);
      } else {
        $(this).prop("disabled", true);
      }
    });

    // Update points on the server
    updatePointsOnServer(updatedPoints);
  }

  function updatePointsOnServer(updatedPoints) {
    // Construct the API URL
    var apiUrl = "http://127.0.0.1:8080/api/current-user";

    // Create a request body
    var requestBody = JSON.stringify({ points: updatedPoints });

    // Make a POST request to update points
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    })
    .then(response => response.json())
    .then(data => {
      console.log("Points updated on the server:", data);
      // You can handle the response data if needed
    })
    .catch(error => {
      console.error("Error updating points:", error);
    });
  }

  // Call the updatePoints function when the select value changes
  $("#pointsSelect").on("change", updatePoints);

  // Call the updatePoints function initially to set up the UI
  updatePoints();
});


$(document).ready(function() {
  $("#purchase-form").submit(function(event) {
    event.preventDefault();
    var firstName = $("#firstname").val();
    var lastName = $("#lastname").val();
    var phoneNumber = $("#phone").val();
    var country = $("#country").val();
    var city = $("#city").val();
    var postalCode = $("#zipcode").val();
    var street = $("#street").val();
    var streetNumber = $("#street_number").val();
    var card_number = $("#card-number").val()+$("#card-number-1").val()+$("#card-number-2").val()+$("#card-number-3").val();
    var holder_name = $("#card-holder").val();
    var expiration_date = $("#card-expiration-month").val();
    var ccv = $("#card-ccv").val();
    var points = $("#pointsNumber").val();

    var formData = {
      firstname: firstName,
      lastname: lastName,
      phone: phoneNumber,
      country: country,
      city: city,
      postalCode: postalCode,
      street: street,
      streetNumber: streetNumber,
      card_number: card_number,
      holder_name: holder_name,
      expiration_date: expiration_date,
      ccv: ccv,
      points: points
    };

 
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8080/payment",
      data: formData,
      success: function(response) {
        console.log("Payment successful:", response);

      },
      error: function(error) {
        console.error("Payment error:", error);
      }
    });
  });
});
