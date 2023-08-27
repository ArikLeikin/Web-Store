// $(document).ready(function () {
//     $("#add-user-form").submit(function (event) {
//       event.preventDefault();
//       let isValid = true;
  
//       const FirstName = $("#firstname").val();
//       if (!validateName(FirstName)) {
//         // Swal.fire({
//         //   icon: "warning",
//         //   title: "Validation Error",
//         //   text: "First name can only contain letters.",
//         // });
//          showError("#firstname-error", "First name can only contain letters.");
//         isValid = false;
//       }
  
//       const LastName = $("#lastname").val();
//       if (!validateName(LastName)) {
//         // Swal.fire({
//         //   icon: "warning",
//         //   title: "Validation Error",
//         //   text: "Last name can only contain letters.",
//         // });
//         showError("#lastname-error", "Last name can only contain letters.");
//         isValid = false;
//       }
  
//       const phone = $("#phoneNumber").val();
//       if (!validatePhoneNumber(phone)) {
//         // Swal.fire({
//         //   icon: "warning",
//         //   title: "Validation Error",
//         //   text: "Phone number must be 10 digits.",
//         // });
//         showError("#phoneNumber-error", "Phone number must be 10 digits.");
//         isValid = false;
//       }

//       const password = $("#password").val();
//       var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
//     if (!passwordPattern.test(password)) {
//       // Swal.fire({
//       //   icon: "error",
//       //   title: "Invalid Password",
//       //   text: "Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.",
//       // });
//       showError("#password-error", "Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.");
//       isValid = false;
//     }

//     // if (!isValid) {
//     //   event.returnValue = false; 
//     //   }

//     });
// });

// function showError(element, message) {
//   $(element).text(message).css("color", "red");
// }

// function clearErrorMessages() {
//   $(".error-message").text("");
// }
// function validatePhoneNumber(phone) {
//     return /^\d{10}$/.test(phone);
//   }

//   function validateName(str) {
//     return /^[A-Za-z\s]+$/.test(str);
//   }

//   function containsAtSymbol(inputString) {
//     const pattern = /@/;
//     return pattern.test(inputString);
//   }


