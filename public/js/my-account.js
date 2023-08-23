$(document).ready(function () {
  // Update email form submission
  $("#updateEmailForm").submit(function (event) {
    event.preventDefault();
    const newEmail = $("#newEmail").val();
    // Logic to update email goes here
  });

  // Generate accordion cards for order history
  for (let i = 1; i <= 3; i++) {
    $("#orderHistoryAccordion").append(`
            <div class="card">
                <div class="card-header" data-toggle="collapse" data-target="#order${i}">
                    Order ${i}
                </div>
                <div class="card-content collapse" id="order${i}">
                    <!-- Order ${i} details go here -->
                </div>
            </div>
        `);
  }
});

/*collapsible-div for address button*/
$(document).ready(function () {
  var coll = document.getElementsByClassName("collapsible-div");
  var i;
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");

      var content = this.nextElementSibling;
      content.classList.toggle("slideout");

      if (content.style.display === "block") {
        content.style.display = "none";
        content.classList.toggle("slidein");
        content.classList.toggle("slideout");
      } else {
        content.style.display = "block";
        content.classList.toggle("slidein");
        content.classList.toggle("slideout");
      }
    });
  }
});

function show(showPage) {
  $(".page-section").hide();
  $("#" + showPage).show();
}

$(document).ready(function () {
  show("order-history"); /*default tab*/

  $("#order-history-link").click(function () {
    show("order-history");
  });

  $("#personal-details-link").click(function (e) {
    show("personal-details");
  });

  $("#change-password-link").click(function () {
    show("change-password");
  });

  $("#addresses-link").click(function () {
    show("addresses");
  });

  $("#payment_methods-link").click(function () {
    show("payment-methods");
  });

  $("#wish_list-link").click(function () {
    show("wish-list");
  });

  $("#yad2_list-link").click(function () {
    show("yad2-list");
  });

});





$(document).ready(function() {
  $("#update-details-form").submit(function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the input values
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var phoneNumber = $("#phoneNumber").val();
    var email = $("#email").val();

    let isValid = true;


    // if (!validateOnlyLetters(firstName)) {
    //   showError("#firstName-error", "First name can only contain letters.");
    //   isValid = false;
    // }


    if (!validateOnlyLetters(firstName)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "First name should be only letters.",
      });
      isValid = false;
    }

    if (!validateOnlyLetters(lastName)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Last name should be only letters.",
      });
      isValid = false;
    }
    function validateOnlyLetters(str) {
      return /^[a-zA-Z]+$/.test(str);
    }
    
    if (!validateTenDigits(phoneNumber)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Phone number can be only 10 digits",
      });
      isValid = false;
    }

      function validateTenDigits(str) {
        return /^\d{10}$/.test(str);
      }
      
      if (!validateContainsAtSymbol(email)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: "Email address should contain @.",
        });
        isValid = false;
      }

      function validateContainsAtSymbol(str) {
        return /@/.test(str);
      }
      
      if (!isValid) {

        return false;
      }
  });
});



$(".btn-account-page").click(function () {
    // event.preventDefault();
    // clearErrorMessages();

    let isValid = true;

    const FirstName = $("#firstname").val();
    if (!validateName(FirstName)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "First name should be only letters.",
      });
      // showError("#firstname-error", "First name can only contain letters.");
      isValid = false;
    }

    const LastName = $("#lastname").val();
    if (!validateName(LastName)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Last name should be only letters.",
      });
      // showError("#lastname-error", "Last name can only contain letters.");
      isValid = false;
    }

    const phone = $("#phone").val();
    if (!validatePhoneNumber(phone)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Phone number can be only 10 digits",
      });
      // showError("#phone-error", "Phone number can only contain only 10 digits.");
      isValid = false;
    }

    const country = $("#country").val();
    if (!validateName(country)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Country name can only contain letters.",
      });
      // showError("#country-error", "Country name can only contain letters.");
      isValid = false;
    }

    const zipcode = $("#zipcode").val();
    if (!validateZipCode(zipcode)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Zipcode can only contain only 5 digits.",
      });
      // showError("#zipcode-error", "Zipcode can only contain only 5 digits.");
      isValid = false;
    }

    const city = $("#city").val();
    if (!validateCity(city)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "City name can only contain letters.",
      });
      // showError("#city-error", "City name can only contain letters.");
      isValid = false;
    }

    const street = $("#street").val();
    if (!validateStreet(street)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Street name can only contain letters.",
      });
      // showError("#street-error", "Street name can only contain letters.");
      isValid = false;
    }

    const streetNumber = $("#street_number").val();
    if (!validateStreetNumber(streetNumber)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Street number must be digits",
      })
      // showError("#street-number-error", "Street number must be digits.");
      isValid = false;
    }

    if (!isValid) {

      return false;
    }

  });

// });


function validateName(city) {
  return /^[A-Za-z\s]+$/.test(city);
}

function validatePhoneNumber(phone) {
  return /^\d{10}$/.test(phone);
}

function validateZipCode(phone) {
  return /^\d{5}$/.test(phone);
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




$(document).ready(function() {
  $("#update-details-form").submit(function(e) {

    var newpassword = $("#newpassword").val();
    
  var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (!passwordPattern.test(newpassword)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Password",
      text: "Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.",
    });
    return; // Exit the function if password is invalid
  }
  
  });
});




$(document).ready(function() {
  $("#new-address-form").submit(function(e) {

    let isValid = true;

      const FirstName = $("#firstname").val();
      if (!validateName(FirstName)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: "First name can only contain letters.",
        })
        // showError("#firstname-error", "First name can only contain letters.");
        isValid = false;
      }

      const LastName = $("#lastname").val();
      if (!validateName(LastName)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: "Last name can only contain letters.",
        })
        // showError("#lastname-error", "Last name can only contain letters.");
        isValid = false;
      }

      const phone = $("#phoneNumber").val();
      if (!validatePhoneNumber(phone)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: "Phone number can only contain only 10 digits.",
        })
        // showError("#phoneNumber-error", "Phone number can only contain only 10 digits.");
        isValid = false;
      }

      const country = $("#country").val();
      if (!validateName(country)) {
        // showError("#country-error", "Country name can only contain letters.");
        isValid = false;
      }

      
      const city = $("#city").val();
      if (!validateCity(city)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: "ZCity name can only contain letters.",
        })
        // showError("#city-error", "City name can only contain letters.");
        isValid = false;
      }
  
      const street = $("#street").val();
      if (!validateStreet(street)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: "Street name can only contain letters.",
        })
        // showError("#street-error", "Street name can only contain letters.");
        isValid = false;
      }
  
      const streetNumber = $("#streetno").val();
      if (!validateStreetNumber(streetNumber)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: "Street number must be digits.",
        })
        // showError("#streetnoerror", "Street number must be digits.");
        isValid = false;
      }

      const zipcode = $("#zipcode").val();
      if (!validateZipCode(zipcode)) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: "Zipcode can only contain only 5 digits.",
        })
        // showError("#zipcode-error", "Zipcode can only contain only 5 digits.");
        isValid = false;
      }

      if (!isValid) {

        return false;
      }
  
  });
});
function validateName(city) {
  return /^[A-Za-z\s]+$/.test(city);
}

function validatePhoneNumber(phone) {
  return /^\d{10}$/.test(phone);
}

function validateZipCode(phone) {
  return /^\d{5}$/.test(phone);
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




$(document).ready(function () {
  $("#new-payment-form").submit(function (event) {
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
        text: "ZCard number must have 4 digits each.",
      })
      // showError("#card-number-error", "Card number must have 4 digits each.");
      isValid = false;
    }

    const cardHolder = $("#card-holder").val();
    if (!validateCardHolder(cardHolder)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Card holder name must have 9 digits.",
      })
      // showError("#card-holder-error", "Card holder name must have 9 digits.");
      isValid = false;
    }

    const expirationMonth = $("#card-expiration-month").val();
    const expirationYear = $("#card-expiration-year").val();
    if (!validateExpirationDate(expirationMonth, expirationYear)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Invalid expiration date.",
      })
      // showError("#expiration-month-error", "Invalid expiration date.");
      isValid = false;
    }

    const cvv = $("#card-ccv").val();
    if (!validateCVV(cvv)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "CCV must be 3 digits.",
      })
      // showError("#cvv-number-error", "CCV must be 3 digits.");
      isValid = false;
    }
    if (!isValid) {

      return false;
    }
    
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


document.addEventListener("DOMContentLoaded", function() {
  const deleteIcon = document.getElementById("address");

  if (deleteIcon) {
    deleteIcon.addEventListener("click", function(event) {
      // const confirmDelete = confirm("Are you sure you want to delete this address?");
      Swal.fire({
        icon: 'warning',
        title: 'Confirmation',
        text: "Are you sure you want to delete this address?",
      })
    
      event.preventDefault(); // Prevents the default action (e.g., navigation or form submission)
      
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const deleteIcon = document.getElementById("payment");

  if (deleteIcon) {
    deleteIcon.addEventListener("click", function(event) {
      // const confirmDelete = confirm("Are you sure you want to delete this payment method?");
      Swal.fire({
        icon: 'warning',
        title: 'Confirmation',
        text: "Are you sure you want to delete this payment method?",
      })
    
      event.preventDefault(); // Prevents the default action (e.g., navigation or form submission)
      
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const deleteIcon = document.getElementById("wish");

  if (deleteIcon) {
    deleteIcon.addEventListener("click", function(event) {
      // const confirmDelete = confirm("Are you sure you want to delete this product from your wishlist?");
      Swal.fire({
        icon: 'warning',
        title: 'Confirmation',
        text: "Are you sure you want to delete this product from your wishlist?",
      })
    
      event.preventDefault(); // Prevents the default action (e.g., navigation or form submission)
      
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const deleteIcon = document.getElementById("yad2");

  if (deleteIcon) {
    deleteIcon.addEventListener("click", function(event) {
      // const confirmDelete = confirm("Are you sure you want to delete this product from the website?");
      Swal.fire({
        icon: 'warning',
        title: 'Confirmation',
        text: "Are you sure you want to delete this product from the website?",
      })
    
      event.preventDefault(); // Prevents the default action (e.g., navigation or form submission)
      
    });
  }
});


document.addEventListener("DOMContentLoaded", function() {
  const addToCartBtn = document.getElementById("addToCartBtn");
  const cartModal = document.getElementById("cartModal");

  addToCartBtn.addEventListener("click", function() {
    cartModal.style.display = "block"; // Show the modal

    setTimeout(function() {
      cartModal.style.display = "none"; // Hide the modal after 1 second
    }, 1000);
  });
});



// Get a reference to the form fields
const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const phoneNumberField = document.getElementById("phoneNumber");
const countryField = document.getElementById("country");
const cityField = document.getElementById("city");
const streetField = document.getElementById("street");
const streetNoField = document.getElementById("streetno");
const zipcodeField = document.getElementById("zipcode");

// Make an HTTP request to fetch the address data
fetch("http://127.0.0.1:8080/address")
  .then(response => response.json())
  .then(addressData => {
    // Check if address data exists
    if (addressData) {
      // Fill the form fields with the retrieved data
      firstNameField.value = addressData.firstName;
      lastNameField.value = addressData.lastName;
      phoneNumberField.value = addressData.phoneNumber;
      countryField.value = addressData.country;
      cityField.value = addressData.city;
      streetField.value = addressData.street;
      streetNoField.value = addressData.streetno;
      zipcodeField.value = addressData.postalCode;
    }
  })
  .catch(error => {
    console.error("Error fetching address data:", error);
  });
