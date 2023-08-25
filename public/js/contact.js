// document.getElementById("contactForm").addEventListener("submit", function (event) {
//     event.preventDefault();
//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const message = document.getElementById("message").value;


//     alert("Thank you for contacting us, " + name + "! We will get back to you soon.");
//     document.getElementById("contactForm").reset();
//   });

$(document).ready(function () {
  $('#contactForm').on('submit', function (event) {
    var name = $('#name').val();
    var isNameValid = /^[a-zA-Z\s]+$/.test(name); // Validate only letters and spaces

    if (!isNameValid) {
      event.preventDefault();
      $('#name-error').addClass('error-message').text("Please enter a valid name (letters only).");
    } else {
      $('#name-error').removeClass('error-message').text('');
    }
  });
});


