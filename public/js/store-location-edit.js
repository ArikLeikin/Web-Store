document.addEventListener("DOMContentLoaded", function () {

    const Id = window.location.search.split("=")[1];





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
          text: "Phone number can be only 10 digits",
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
            address:$("#address").val(),
            phone_number: $("#phoneNumber").val(),
            phone_area_code:$("#phoneareacode").val(),
            latitude:$("#latitude").val(),
            longitude: $("#longitude").val() 
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
  

  function validatePhoneNumber(phone) {
    return /^\d{10}$/.test(phone);
  }

  function containsDigits(input) {
    return /\d+/.test(input);
  }

  function containsDigitsAndDot(input) {
    return /^[\d.]+$/.test(input);
  }