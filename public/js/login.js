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
  


  
  