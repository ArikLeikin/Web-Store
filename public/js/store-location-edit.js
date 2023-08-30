document.addEventListener("DOMContentLoaded", function () {
  const Id = window.location.search.split("=")[1];
  console.log(Id);
  const url = `http://127.0.0.1:8080/get/store-locations/${Id}`;

  fetch(`http://127.0.0.1:8080/get/store-locations/${Id}`)
    .then((response) => response.json())
    .then((data) => {
      // Assuming the data structure matches the form field names
      const { address, phone_number, phone_area_code, longitude, latitude } =
        data.data;
      console.log(data);
      console.log(address);

      // Populate form fields with data
      document.getElementById("address").value = address;
      document.getElementById("phoneNumber").value = phone_number;
      document.getElementById("phoneareacode").value = phone_area_code;
      document.getElementById("longitude").value = longitude;
      document.getElementById("latitude").value = latitude;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  $("#store-location-edit-form").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    // Get the input values

    var phoneNumber = $("#phoneNumber").val();
    var phoneareacode = $("#phoneareacode").val();
    var longitude = $("#longitude").val();
    var latitude = $("#latitude").val();

    let isValid = true;

    if (!validatePhoneNumber(phoneNumber)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone number must be 10 digits and need to be start in '05'",
      });
      isValid = false;
    }

    if (!containsDigits(phoneareacode)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone Area Code should be only digits.",
      });
      isValid = false;
    }

    if (!containsDigitsAndDot(longitude)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Longitude should be only digits and a dot.",
      });
      isValid = false;
    }

    if (!containsDigitsAndDot(latitude)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Latitude should be only digits and a dot.",
      });
      isValid = false;
    }

    if (isValid) {
      var formData = {
        address: $("#address").val(),
        phone_number: $("#phoneNumber").val(),
        phone_area_code: $("#phoneareacode").val(),
        latitude: $("#latitude").val(),
        longitude: $("#longitude").val(),
      };
      console.log(formData);
      $.ajax({
        url: `http://127.0.0.1:8080/update/store-locations/${Id}`,
        type: "POST",
        data: formData,
        success: function (response) {
          // Handle the response data here
          console.log(response);
          alert("The details are successfully updated");
          window.location.href = "http://127.0.0.1:8080/manager";
        },
        error: function (error) {
          // Handle errors here
          console.error("Error:", error);
          console.error(
            "the url api we try to get to is :",
            `http://127.0.0.1:8080/update/store-locations/${Id}`
          );
        },
      });
    }
  });
});

function validatePhoneNumber(str) {
  return /^(05\d{8}|0\d{8})$/.test(str);
}

function containsDigits(input) {
  return /\d+/.test(input);
}

function containsDigitsAndDot(input) {
  return /^[\d.]+$/.test(input);
}
