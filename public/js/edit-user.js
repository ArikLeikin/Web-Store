$(document).ready(function () {
    $("#userEdit-form").submit(function (event) {
      event.preventDefault();
      clearErrorMessages();
      let isValid = true;
  
      const FirstName = $("#firstName").val();
      if (!validateName(FirstName)) {
           Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "First name can only contain letters.",
        });
        //showError("#firstName-error", "First name can only contain letters.");
        isValid = false;
      }
  
      const LastName = $("#lastName").val();
      if (!validateName(LastName)) {
         Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Last name can only contain letters.",
      });
        //showError("#lastName-error", "Last name can only contain letters.");
        isValid = false;
      }
  
      const phone = $("#phoneNumber").val();
      if (!validatePhoneNumber(phone)) {
         Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Phone number must be 10 digits.",
         });
       // showError("#phoneNumber-error", "Phone number must be 10 digits.");
        isValid = false;
      }

      const password = $("#password").val();
      var passwordPattern = /^(?=.{4,})/;
    if (!passwordPattern.test(password)) {
            Swal.fire({
              icon: "error",
              title: "Invalid Password",
              text: "Password must contain at least 4 characters.",
            });
      //showError("#password-error", "Password must contain at least 4 characters.");
      isValid = false;
    }

    });
});

function showError(element, message) {
  $(element).text(message).css("color", "red");
}
function clearErrorMessages() {
  $(".error-message").text("");
}

function validatePhoneNumber(phone) {
    return /^\d{10}$/.test(phone);
  }

  function validateName(str) {
    return /^[A-Za-z\s]+$/.test(str);
  }