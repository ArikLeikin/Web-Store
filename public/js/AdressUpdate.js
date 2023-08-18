$(document).ready(function () {
    $("#addressUpdate-form").submit(function (event) {
      event.preventDefault();
      clearErrorMessages();
  
      let isValid = true;
  
  
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

        const city = $("#city").val();
        const street = $("#street").val();
        const streetNumber = $("#street_number").val();
  
        const modalContent = `
        <style>.select:after{ display:none;
        }</style>
            <h2>Your Address details is changed to: </h2>
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



  