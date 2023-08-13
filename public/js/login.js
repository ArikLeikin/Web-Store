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
    
    $('.login-form').submit(function (e) {
      e.preventDefault();

      const username = $('#username').val();
      const password = $('#password').val();

      // Send AJAX request
      $.ajax({
          url: '/login', // Replace with your server endpoint
          method: 'POST',
          dataType: 'json',
          data: {
              username: username,
              password: password
          },
          success: function (response, status, xhr) {
            if (xhr.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Redirect to a new page upon successful login if desired
                window.location.href = '/'; // Replace with your desired URL
              } else {
                  // Handle other success cases if needed
              }
          },
          error: function (xhr, status, error) {
              if (xhr.status === 401) {
                  // Handle unauthorized (401) response
                  Swal.fire({
                      icon: 'error',
                      title: 'User name or password are incorrect',
                      showConfirmButton: true,
                      timer: false
                  });
              } else {
                  console.error('Error:', error);
              }
          }
      });
  });
  });
  


  
  