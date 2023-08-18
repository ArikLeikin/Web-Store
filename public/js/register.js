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


    const city = $("#firstName").val();
    if (!validateName(city)) {
      showError("#firstName-error", "First name can only contain letters.");
      isValid = false;
    }

    const street = $("#lastName").val();
    if (!validateName(street)) {
      showError("#lastName-error", "Last name can only contain letters.");
      isValid = false;
    }

    const phone = $("#phoneNumber").val();
    if (!validatePhoneNumber(phone)) {
      showError("#phoneNumber-error", "Phone number must be 10 digits.");
      isValid = false;
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


  
    

  });
});


function validateName(city) {
  return /^[A-Za-z\s]+$/.test(city);
}

function validatePhoneNumber(phone) {
  return /^\d{10}$/.test(phone);
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
  });

  $(".close").click(function () {
    $("#myModal").hide();
  });
});

$(document).ready(function () {
  $(".reg-form").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const formData = new FormData(this); // Gather form data

    $.ajax({
      type: "POST",
      url: "/register", // Update with your server endpoint
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        // Registration successful, redirect to login page
        window.location.href = "/login";
      },
      error: function (xhr) {
        const errorMessage = JSON.parse(xhr.responseText).message;

        // Display error message using SweetAlert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
        });
      },
    });
  });
});
