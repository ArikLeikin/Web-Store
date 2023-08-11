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
});

$(document).ready(function () {
  // Use the correct ID selector '#item__account'
  $("#login-link").click(function (event) {
    event.preventDefault(); // Prevent default link behavior

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const modalContent = `
   <form method="POST" action="/login" class="login-form">
      <label  class="login-user" for="username">Username:</label>
      <input class="input-user" type="text" id="username" name="username" required />
      <br />
      <div class="password-field">
        <label class="login-pass" for="password">Password:</label>
        <input class="input-pass" type="password" id="password" name="password" required />
        <span class="toggle-password"><i class="fas fa-eye"></i></span>
      </div>
      <br />
      <input class="login-btn" type="submit" value="Login" />
    </form>
    <p>Not a member? <a href="register.html">Register here</a></p>
  `;

    $("#modal-content").html(modalContent);

    $("#myModal").show();
  });

  $(".close").click(function () {
    $("#myModal").hide();
  });
});
