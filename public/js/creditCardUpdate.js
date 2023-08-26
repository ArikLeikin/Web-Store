// $(document).ready(function () {
//   $("#creditCardUpdate-form").submit(function (event) {
//     event.preventDefault();
//     let isValid = true;

//     const cardNumber = $("#card-number-1").val();
//     const cardNumber1 = $("#card-number-2").val();
//     const cardNumber2 = $("#card-number-3").val();
//     const cardNumber3 = $("#card-number-4").val();

//     if (
//       !validateCardNumber(cardNumber) ||
//       !validateCardNumber(cardNumber1) ||
//       !validateCardNumber(cardNumber2) ||
//       !validateCardNumber(cardNumber3)
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Card number must have 4 digits each.",
//       });
//       // showError("#card-number-error", "Card number must have 4 digits each.");
//       isValid = false;
//     }

//     const cardHolder = $("#card-holder").val();
//     if (!validateCardHolder(cardHolder)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Card holder name must have 9 digits.",
//       });
//       // showError("#card-holder-error", "Card holder name must have 9 digits.");
//       isValid = false;
//     }

//     const expirationMonth = $("#card-expiration-month").val();
//     const expirationYear = $("#card-expiration-year").val();
//     if (!validateExpirationDate(expirationMonth, expirationYear)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Invalid expiration date.",
//       });
//       // showError("#expiration-month-error", "Invalid expiration date.");
//       isValid = false;
//     }

//     const cvv = $("#card-ccv").val();
//     if (!validateCVV(cvv)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "CVV must be 3 digits.",
//       });
//       // showError("#cvv-number-error", "CVV must be 3 digits.");
//       isValid = false;
//     }

//     if (isValid) {
//       const cardHolder = $("#card-holder").val();
//       const lastFourDigits = $("#card-number-4").val();
//       const expirationMonth = $("#card-expiration-month").val();
//       const expirationYear = $("#card-expiration-year").val();
//       const modalContent = `
//       <style>.select:after{ display:none;
//       }</style>
//           <h2>Your Credit Card details is changed to: </h2>

//           <p><strong>Card Holder:</strong> ${cardHolder}</p>
//           <p><strong>Last Four Digits of Credit Card:</strong> ${lastFourDigits}</p>
//           <p><strong>Expiration Date:</strong> ${expirationMonth}/${expirationYear}</p>
//         `;

//       $("#modal-content").html(modalContent);

//       $("#myModal").show();
//     }
//   });

//   $(".close").click(function () {
//     $("#myModal").hide();
//   });
// });

// function validateCardNumber(cardNumber) {
//   return /^\d{4}$/.test(cardNumber);
// }

// function validateCardHolder(cardHolder) {
//   return cardHolder.length === 9 && /^[0-9]+$/.test(cardHolder);
// }

// function validateExpirationDate(expirationMonth, expirationYear) {
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth() + 1;
//   const enteredYear = parseInt(expirationYear, 10);
//   const enteredMonth = parseInt(expirationMonth, 10);

//   if (enteredYear < currentYear) {
//     return false;
//   } else if (enteredYear === currentYear && enteredMonth < currentMonth) {
//     return false;
//   }
//   return true;
// }

// function validateCVV(cvv) {
//   return /^\d{3}$/.test(cvv);
// }

// function showError(element, message) {
//   $(element).text(message).css("color", "red");
// }

// function clearErrorMessages() {
//   $(".error-message").text("");
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("creditCardUpdate-form");

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const cardNumber =
//       document.getElementById("card-number").value +
//       document.getElementById("card-number-1").value +
//       document.getElementById("card-number-2").value +
//       document.getElementById("card-number-3").value;
//     const cardHolder = document.getElementById("card-holder").value;
//     const expirationMonth = document.getElementById(
//       "card-expiration-month"
//     ).value;
//     const expirationYear = document.getElementById(
//       "card-expiration-year"
//     ).value;
//     const ccv = document.getElementById("card-ccv").value;

//     const data = {
//       card_number: cardNumber,
//       holder_name: cardHolder,
//       expiration_date: expirationMonth,
//       ccv: ccv,
//     };

//     $.ajax({
//       url: "http://127.0.0.1:8080/creditcard",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify(data),
//       success: function (result) {
//         console.log("Response from server:", result);
//       },
//       error: function (error) {
//         console.error("Error sending data:", error);
//       },
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const response = await fetch("http://127.0.0.1:8080/creditcard");
//     const creditCardData = await response.json();

//     const cardNumber = creditCardData.card_number.toString();

//     document.querySelector("#card-holder-1").value = cardNumber.substr(0, 4);
//     document.querySelector("#card-holder-2").value = cardNumber.substr(4, 4);
//     document.querySelector("#card-holder-3").value = cardNumber.substr(8, 4);
//     document.querySelector("#card-holder-4").value = cardNumber.substr(12, 4);

//     document.querySelector("#card-holder").value = creditCardData.card_holder;
//     document.querySelector("#card-expiration-month").value =
//       creditCardData.expiration_month;
//     document.querySelector("#card-expiration-year").value =
//       creditCardData.expiration_year;
//     document.querySelector("#card-ccv").value = creditCardData.ccv;
//   } catch (error) {
//     console.error("Error fetching or populating credit card data:", error);
//   }
// });

/*~~~~~~~~~~~~~~~~ get api ~~~~~~~~~~~~~~~~~~~~*/
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

/*~~~~~~~~~~~~~~~~ post api ~~~~~~~~~~~~~~~~~~~~*/

/*card update*/
document.addEventListener("DOMContentLoaded", function () {
  $("#creditCardUpdate-form").submit(function (event) {

    event.preventDefault(); // Prevent the default form submission

    // Collect form data
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

        alert("card details updated successfully");

      },
      error: function (error) {
        // Handle error response
        console.log("Error:", error);
      },
    });
  });
});

/*delete button*/

$(document).ready(function () {
  // Listener for the delete address button
  const deleteAddressButton = document.getElementById("delete-card-btn");
  deleteAddressButton.addEventListener("click", function () {
    const confirmed = confirm("Are you sure you want to delete this card?");
    if (confirmed) {
      clearCardFields();
      submitCardForm();
    }
  });

  // Function to clear address form fields
  function clearCardFields() {
    document.getElementById("card-number-1").value = "";
    document.getElementById("card-number-2").value = "";
    document.getElementById("card-number-3").value = "";
    document.getElementById("card-number-4").value = "";
    document.getElementById("card-holder").value = "";
    document.getElementById("card-ccv").value = "";
    document.getElementById("card-expiration-month").value = "";
    document.getElementById("card-expiration-year").value = "";
  }

  // Function to submit the address form
  function submitCardForm() {
    var formData = {
      card_number: "",
      holder_name: "",
      expiration_date: "",
      ccv: "",
    };
    $.ajax({
      url: "http://127.0.0.1:8080/creditcard",
      type: "POST",
      data: formData,
      success: function (response) {
        console.log(response);
        alert("credit card deleted successfully");
      },
      error: function (error) {
        console.error("Error:", error);
        // Handle error
      },
    });
  }
});
