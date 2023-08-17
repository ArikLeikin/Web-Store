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

/*$(document).ready(function () {
  $("form").on("submit", function (event) {
    var username = $("#username").val();
    var password = $("#password").val();
    var passwordValidation = $("#password-validation").val();

    if (
      username.length < 5 ||
      password.length < 5 ||
      passwordValidation.length < 5 ||
      password !== passwordValidation
    ) {
      event.preventDefault(); // Prevent form submission

      if (username.length < 5) {
        $("#username-error")
          .addClass("error-message")
          .text(
            "Username must be at least 5 characters long (including numbers)."
          ); //For Example, will be changed
      } else {
        $("#username-error").removeClass("error-message").text("");
      }

      if (password.length < 5) {
        $("#password-error")
          .addClass("error-message")
          .text(
            "Password must be at least 5 characters long (including numbers)."
          );
      } else {
        $("#password-error").removeClass("error-message").text("");
      }

      if (passwordValidation.length < 5) {
        $("#password-validation-error")
          .addClass("error-message")
          .text(
            "Password validation must be at least 5 characters long (including numbers)."
          );
      } else {
        $("#password-validation-error").removeClass("error-message").text("");
      }

      if (password !== passwordValidation) {
        event.preventDefault(); // Prevent form submission
        $("#password-validation-error")
          .addClass("error-message")
          .text("Passwords do not match.");
      } else {
        $("#password-validation-error").removeClass("error-message").text("");
      }
    }
  });
});*/

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
  });

  $(".close").click(function () {
    $("#myModal").hide();
  });
});

$(document).ready(function() {
  $("#registration-form").submit(function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the input values
    var password = $("#password").val();
    var confirmPassword = $("#password-validation").val();

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
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordPattern.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.",
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
      success: function(response) {
        // Show a success message using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: response.message, // Assuming the response contains a "message" field
        });
      },
      error: function(error) {
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
