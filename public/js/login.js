$(document).ready(function () {
  $(".toggle-password").click(function () {
    $(this).toggleClass('active');
    var passwordInput = $(this).prev("input");
    if (passwordInput.attr("type") === "password") {
      passwordInput.attr("type", "text");
    } else {
      passwordInput.attr("type", "password");
    }
  });
});

$(document).ready(function () {
  $(".login-form").submit(function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = $("#username").val(); // Get the entered email
    const password = $("#password").val();

    $.ajax({
      type: "POST",
      url: "/login", // Adjust the URL to match your server's endpoint
      data: {
        email: email, // Send the email instead of the username
        password: password
      },
      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message
        }).then(() => {
          // Redirect or perform further actions upon successful login
          window.location.href = "/my-account"; // Example redirection
        });
      },
      error: function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.responseJSON.message
        });
      }
    });
  });
});
