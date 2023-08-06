document.addEventListener("DOMContentLoaded", function() {
    const queryParams = new URLSearchParams(window.location.search);
    const total = queryParams.get("total");

    if (total) {
        document.getElementById("total-price").textContent = "Total Price: $" + total;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const total = sessionStorage.getItem("cartTotal");

    if (total) {
        document.getElementById("total-price").textContent = "Total Price: $" + total;
    }
});

$(document).ready(function() {
    $('form').on('submit', function(event) {
      var Name = $('#name').val();
      var Id = $('#id').val();
      var Street = $('#street').val();
      var StreetNumber = $('#street-number').val();
      var City = $('#city').val();
      var CreditCard = $('#credit-card').val();
      var CVV = $('#cvv').val();
      var Phone = $('#phone').val();
      

      
      var validateName = isOnlyLetters(Name);
      var validateId = hasSpecificNumberOfDigits(Id, 9);
      var validateStreet = isOnlyLetters(Street);
      var validateStreetNumber = containsOnlyNumbers(StreetNumber);
      var validateCity = isOnlyLetters(City);
      var validateCreditCard = hasSpecificNumberOfDigits(CreditCard, 16);
      var validateCVV = hasSpecificNumberOfDigits(CVV, 3);
      var validatePhone = hasSpecificNumberOfDigits(Phone, 10);

 

      if (!validateName) {
        event.preventDefault();
        $('#username-error').addClass('error-message').text("Name should contain only letters.");
      } else {
        $('#username-error').removeClass('error-message').text('');
      }

      
      if (!validatePhone) {
        event.preventDefault();
        $('#phone-error').addClass('error-message').text("Phone number should be 10 digits.");
      } else {
        $('#phone-error').removeClass('error-message').text('');
      }


      if (!validateId) {
        event.preventDefault();
        $('#id-error').addClass('error-message').text("ID should be 9 digits.");
      } else {
        $('#id-error').removeClass('error-message').text('');
      }

      if (!validateStreet) {
        event.preventDefault();
        $('#street-error').addClass('error-message').text("Street should contain only letters.");
      } else {
        $('#street-error').removeClass('error-message').text('');
      }

      if (!validateStreetNumber) {
        event.preventDefault();
        $('#street-number-error').addClass('error-message').text("Street Number should contain only numbers.");
      } else {
        $('#street-number-error').removeClass('error-message').text('');
      }

      if (!validateCity) {
        event.preventDefault();
        $('#city-error').addClass('error-message').text("City should contain only letters.");
      } else {
        $('#city-error').removeClass('error-message').text('');
      }

      if (!validateCreditCard) {
        event.preventDefault();
        $('#credit-card-error').addClass('error-message').text("Credit Card should be 16 digits.");
      } else {
        $('#credit-card-error').removeClass('error-message').text('');
      }

      if (!validateCVV) {
        event.preventDefault();
        $('#cvv-number-error').addClass('error-message').text("CVV should be 3 digits.");
      } else {
        $('#cvv-number-error').removeClass('error-message').text('');
      }

      var selectedMonth = parseInt($('#expiration-month').val());
      var selectedYear = parseInt($('#expiration-year').val());
  
      // Get the current date
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var currentMonth = currentDate.getMonth() + 1; // Month is zero-based
      
      // Compare the expiration date with the current date
      if (selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
        event.preventDefault();
        $('#expiration-date-error').addClass('error-message').text("Expiration date is not valid.");
      } else {
        $('#expiration-date-error').removeClass('error-message').text('');
      }

      if(validateName &&validateId && validateStreet && validateStreetNumber && 
        validateCity && validateCreditCard && validateCVV &&validatePhone && selectedYear >= currentYear && selectedMonth >= currentMonth )
        {
            event.preventDefault(); // Prevent the form from submitting
  
            // Get input values
            var name = $('#name').val();
            var phone = $('#phone').val();
            var id = $('#id').val();
            var city = $('#city').val();
            var street = $('#street').val();
            var streetNumber = $('#street-number').val();
            var creditCard = $('#credit-card').val();
            var cvv = $('#cvv').val();
            var expirationMonth = $('#expiration-month').val();
            var expirationYear = $('#expiration-year').val();
            var totalPrice  = $('#total-price').text();
        
            // Build modal content
            var modalContent = `
            <h2>Thank you for your purchas! We hope you will visit us again.</h2>
              <h2>Your Purches Details:</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>ID:</strong> ${id}</p>
              <p><strong>City:</strong> ${city}</p>
              <p><strong>Street:</strong> ${street}</p>
              <p><strong>Street Number:</strong> ${streetNumber}</p>
              <p><strong>Credit Card:</strong> ${creditCard}</p>
              <p><strong>CVV:</strong> ${cvv}</p>
              <p><strong>Expiration Date:</strong> ${expirationMonth}/${expirationYear}</p>
              <p><strong style="color: green;"></strong> <span style="color: green; font-weight: bold;">${totalPrice}</span></p>
             
             
            `;
        
            // Set modal content
            $('#modal-content').html(modalContent);
        
            // Show the modal
            $('#myModal').show();
        }
        
          // Close the modal when the close button is clicked
          $('.close').click(function() {
            $('#myModal').hide();
          });

  
    });
  });

  function isOnlyLetters(inputString) {
    // Regular expression to match only letters (uppercase and lowercase)
    var letterRegex = /^[A-Za-z]+$/;
  
    // Test the input string against the regular expression
    return letterRegex.test(inputString);
  }

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  function hasSpecificNumberOfDigits(inputString, numberOfDigits) {
    // Regular expression to match the specified number of digits
    var digitRegex = new RegExp(`^[0-9]{${numberOfDigits}}$`);
  
    // Test the input string against the regular expression
    return digitRegex.test(inputString);
  }



