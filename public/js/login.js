$(document).ready(function() {
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
  
  $(document).ready(function () {
    $(".login-form").submit(function (event) {
      event.preventDefault(); // Prevent default form submission
      
      const username = $("#username").val();
      const password = $("#password").val();
      
      $.ajax({
        type: "POST",
        url: "/login", // Adjust the URL to match your server's endpoint
        data: {
          username: username,
          password: password
        },
        success: function (response) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message
          }).then(() => {
            // Redirect or perform further actions upon successful login
            window.location.href = "/dashboard"; // Example redirection
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
   

  
  