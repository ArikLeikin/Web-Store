var userID = null;
function showError(element, message) {
  $(element).text(message).css("color", "red");
}
function clearErrorMessages() {
  $(".error-message").text("");
}

function validatePhoneNumber(phone) {
  return /^05\d{8}$/.test(str);
}

function validateName(str) {
  return /^[A-Za-z\s]+$/.test(str);
}
function validateContainsAtSymbol(str) {
  return /@/.test(str);
}
function getUrlParameter(name) {
  const results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  if (results == null) {
    return null;
  } else {
    return decodeURI(results[1]) || 0;
  }
}
$(document).ready(function () {
  const urlID = getUrlParameter("id");
  console.log(urlID);

  if (urlID) {
    userID = urlID;
    const apiUrl = "http://127.0.0.1:8080/api/user/" + userID;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Fetch error: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById("firstName").value = data.name.firstName;
        document.getElementById("lastName").value = data.name.lastName;
        document.getElementById("phoneNumber").value = data.phoneNumber;
        document.getElementById("email").value = data.email;
        document.getElementById("permission").value = data.permission;
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~POST API ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
document.addEventListener("DOMContentLoaded", function () {
  $("#userEdit-form").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    // Get the input values
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var phoneNumber = $("#phoneNumber").val();
    var email = $("#email").val();
    var permission = $("#permission").val();

    let isValid = true;

    if (!validateName(firstName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "First name should be only letters.",
      });
      isValid = false;
    }

    if (!validateName(lastName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Last name should be only letters.",
      });
      isValid = false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone number can be only 10 digits and need to be start in '05'",
      });
      isValid = false;
    }

    if (!validateContainsAtSymbol(email)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Email address should contain @.",
      });
      isValid = false;
    }

    if (isValid && userID != null) {
      //const formData = $(this).serialize(); // Serialize form data
      //console.log(formData);
      var formData = {
        name: {
          firstName: $("#firstName").val(),
          lastName: $("#lastName").val(),
        },
        phoneNumber: $("#phoneNumber").val(),
        email: $("#email").val(),
        permission: $("#permission").val(),
      };
      console.log(formData);
      $.ajax({
        url: `http://127.0.0.1:8080/update/user/${userID}`,
        type: "POST",
        data: formData,
        success: function (response) {
          // Handle the response data here
          console.log(response);
          alert("Those personal details have been successfully updated");
        },
        error: function (error) {
          // Handle errors here
          console.error("Error:", error);
          console.error(
            "the url api we try to get to is :",
            `http://127.0.0.1:8080/update/user/${userID}`
          );
        },
      });
    }
  });
});
