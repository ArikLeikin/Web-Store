$(document).ready(function () {
  $(".toggle-password").click(function () {
    $(this).toggleClass("active");
    var passwordInput = $(this).prev("input");
    if (passwordInput.attr("type") === "password") {
      passwordInput.attr("type", "text");
    } else {
      passwordInput.attr("type", "password");
    }
  });
});

$(document).ready(function () {
  $("#registration-form").submit(function (event) {
    event.preventDefault();
    clearErrorMessages();

    let isValid = true;
    var username = $("#firstName").val();
    var username = $("#lastName").val();
    var username = $("#phoneNumber").val();
    var password = $("#password").val();
    var passwordValidation = $("#password-validation").val();
  });
});

function validateName(city) {
  return /^[A-Za-z\s]+$/.test(city);
}

function validatePhoneNumber(str) {
  return /^(05\d{8}|0\d{8})$/.test(str);
}

function showError(element, message) {
  $(element).text(message).css("color", "red");
}

function clearErrorMessages() {
  $(".error-message").text("");
}

$(document).ready(function () {
  // Use the correct ID selector '#item__account'
  $("#login-link").click(function (event) {
    event.preventDefault(); // Prevent default link behavior

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const modalContent = `
    <form method="POST" action="/login" class="login-form">
    <label  class="login-user" for="username">Email:</label>
    <input class="input-user" type="email" id="username" name="username" required />
    <br />
    <div class="password-field">
      <label class="login-pass" for="password">Password:</label>
      <input class="input-pass" type="password" id="password" name="password" required />
      <span class="toggle-password"><i class="fas fa-eye"></i></span>
    </div>
    <br />
    <input class="login-btn" type="submit" value="Login" />
  </form>
  <p class="sign-note">Not a member? <a href="register.html">Register here</a></p>
`;

    $("#modal-content").html(modalContent);

    $("#myModal").show();

    $(".toggle-password").click(function () {
      $(this).toggleClass("active");
      var passwordInput = $(this).prev("input");
      if (passwordInput.attr("type") === "password") {
        passwordInput.attr("type", "text");
      } else {
        passwordInput.attr("type", "password");
      }
    });
  });

  $(".close").click(function () {
    $("#myModal").hide();
  });
});

$(document).ready(function () {
  $("#registration-form").submit(function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the input values
    var password = $("#password").val();
    var confirmPassword = $("#password-validation").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var phoneNumber = $("#phoneNumber").val();

    if (!validateOnlyLettersWithSpaces(firstName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "First name should be only letters.",
      });
      return;
    }

    if (!validateOnlyLettersWithSpaces(lastName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Last name should be only letters.",
      });
      return;
    }
    function validateOnlyLettersWithSpaces(str) {
      return /^[a-zA-Z\s]+$/.test(str);
    }

    if (!validateTenDigits(phoneNumber)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone number Must be 10 digits",
      });
      return;
    }

    function validateTenDigits(str) {
      return /^\d{10}$/.test(str);
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords Do Not Match",
        text: "Please make sure the passwords match.",
      });
      return; // Exit the function if passwords don't match
    }

    // Check password strength
    var passwordPattern = /^(?=.{4,})/;
    if (!passwordPattern.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain at least 4 characters.",
      });
      return; // Exit the function if password is invalid
    }

    // Serialize the form data
    var formData = $(this).serialize();

    // Make the AJAX POST request
    $.ajax({
      type: "POST",
      url: "/register", // Replace with the actual endpoint URL
      data: formData,
      success: function (response) {
        // Show a success message using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: response.message, // Assuming the response contains a "message" field
        });
        window.location.href = "/login";
      },
      error: function (error) {
        // Show an error message using SweetAlert2
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.responseJSON.message, // Assuming the response contains an "message" field
        });
      },
    });
  });
});
