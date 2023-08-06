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
  

  $(document).ready(function() {
    $('form').on('submit', function(event) {
      var username = $('#username').val();
      var password = $('#password').val();
      var passwordValidation = $('#password-validation').val();
      
      if (username.length < 5 || password.length < 5 || passwordValidation.length < 5||password !== passwordValidation) {
        event.preventDefault(); // Prevent form submission
        
        if (username.length < 5) {
          $('#username-error').addClass('error-message').text('Username must be at least 5 characters long (including numbers).'); //For Example, will be changed
        } else {
          $('#username-error').removeClass('error-message').text('');
        }
        
        if (password.length < 5) {
          $('#password-error').addClass('error-message').text('Password must be at least 5 characters long (including numbers).');
        } else {
          $('#password-error').removeClass('error-message').text('');
        }
        
        if (passwordValidation.length < 5) {
          $('#password-validation-error').addClass('error-message').text('Password validation must be at least 5 characters long (including numbers).');
        } else {
          $('#password-validation-error').removeClass('error-message').text('');
        }

        if (password !== passwordValidation) {
          event.preventDefault(); // Prevent form submission
          $('#password-validation-error').addClass('error-message').text('Passwords do not match.');
        } else {
          $('#password-validation-error').removeClass('error-message').text('');
        }

      }
    });
  });