$(document).ready(function () {
    $("#addressUpdate-form").submit(function (event) {
      event.preventDefault();
      clearErrorMessages();
  
      let isValid = true;

      const FirstName = $("#firstname").val();
      if (!validateName(FirstName)) {
        showError("#firstname-error", "First name can only contain letters.");
        isValid = false;
      }

      const LastName = $("#lastname").val();
      if (!validateName(LastName)) {
        showError("#lastname-error", "Last name can only contain letters.");
        isValid = false;
      }

      const phone = $("#phone").val();
      if (!validatePhoneNumber(phone)) {
        showError("#phone-error", "Phone number can only contain only 10 digits.");
        isValid = false;
      }

      const country = $("#country").val();
      if (!validateName(country)) {
        showError("#country-error", "Country name can only contain letters.");
        isValid = false;
      }

      const zipcode = $("#zipcode").val();
      if (!validateZipCode(zipcode)) {
        showError("#zipcode-error", "Zipcode can only contain only 5 digits.");
        isValid = false;
      }
  
      const city = $("#city").val();
      if (!validateCity(city)) {
        showError("#city-error", "City name can only contain letters.");
        isValid = false;
      }
  
      const street = $("#street").val();
      if (!validateStreet(street)) {
        showError("#street-error", "Street name can only contain letters.");
        isValid = false;
      }
  
      const streetNumber = $("#street_number").val();
      if (!validateStreetNumber(streetNumber)) {
        showError("#street-number-error", "Street number must be digits.");
        isValid = false;
      }

      if (isValid) {
        const FirstName = $("#firstname").val();
        const LastName = $("#lastname").val();
        const phone = $("#phone").val();
        const country = $("#country").val();
        const zipcode = $("#zipcode").val();
        const city = $("#city").val();
        const street = $("#street").val();
        const streetNumber = $("#street_number").val();
  
        const modalContent = `
        <style>.select:after{ display:none;
        }</style>
            <h2>Your Address details is changed to: </h2>
            <p><strong>First Name:</strong> ${FirstName}</p>
            <p><strong>Last Name:</strong> ${LastName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Zipcode:</strong> ${zipcode}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Street:</strong> ${street}</p>
            <p><strong>Street Number:</strong> ${streetNumber}</p>
          `;

  
        $("#modal-content").html(modalContent);
  
        $("#myModal").show();
      }

    });
    $(".close").click(function () {
      $("#myModal").hide();
    });
  });
  

  function validateName(city) {
    return /^[A-Za-z\s]+$/.test(city);
  }

  function validatePhoneNumber(phone) {
    return /^\d{10}$/.test(phone);
  }

  function validateZipCode(phone) {
    return /^\d{5}$/.test(phone);
  }

  function validateCity(city) {
    return /^[A-Za-z\s]+$/.test(city);
  }
  
  function validateStreet(street) {
    return /^[A-Za-z\s]+$/.test(street);
  }
  
  function validateStreetNumber(streetNumber) {
    return /^\d+$/.test(streetNumber);
  }

  function showError(element, message) {
    $(element).text(message).css("color", "red");
  }
  
  function clearErrorMessages() {
    $(".error-message").text("");
  }



  