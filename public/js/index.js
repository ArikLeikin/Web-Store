
 src="https://code.jquery.com/jquery-3.6.0.min.js"
$(document).ready(function () {
  // Use the correct ID selector '#item__account'
  $("#item__account").click(function (event) {
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
  <p class="sign-note">Not a member? <a href="register.html">Register here</a></p>
`;

    $("#modal-content").html(modalContent);

    $("#myModal").show();

    $(".toggle-password").click(function() {
      $(this).toggleClass('active');
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
