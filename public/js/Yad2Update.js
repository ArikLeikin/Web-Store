// $(document).ready(function () {
//     $("UpdateYad2-form").on("submit", function (event) {
//       var price = $("#price").val();
//       var bankAccount = $("#bankAccount").val();
  
//       var isPriceValid = containsOnlyNumbers(price) && parseFloat(price) > 0;
//       var isBankAccountValid = containsOnlyNumbers(bankAccount);
  
//       if (!isPriceValid) {
//         event.preventDefault();
//         $("#price-error")
//           .addClass("error-message")
//           .text(
//             "Please enter a valid price (numbers only and greater than zero)."
//           );
//       } else {
//         $("#price-error").removeClass("error-message").text("");
//       }
  
//       if (!isBankAccountValid) {
//         event.preventDefault();
//         $("#bankAccount-error")
//           .addClass("error-message")
//           .text("Please enter a valid bank account (numbers only).");
//       } else {
//         $("#bankAccount-error").removeClass("error-message").text("");
//       }
//     });
//   });
  
//   function containsOnlyNumbers(str) {
//     return /^\d+$/.test(str);
//   }
  
  $(document).ready(function () {
    $("#UpdateYad2-form").submit(function (event) {
      event.preventDefault();
      clearErrorMessages();
  
      let isValid = true;
      var price = $("#price").val();
       var bankAccount = $("#bankAccount").val();
  
      if (!containsOnlyNumbers(price)) {
        showError("#price-error", "Please enter a valid price (numbers only and greater than zero).");
        isValid = false;
      }

      if (!ValidBankAccount(bankAccount)) {
        showError("#bankAccount-error", "Please enter a valid bank account (14 digits).");
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