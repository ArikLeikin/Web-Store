
$(document).ready(function() {
    $('form').on('submit', function(event) {
      var price = $('#price').val();
      var bankAccount = $('#supplierID').val();

      var isPriceValid = containsOnlyNumbers(price) && parseFloat(price) > 0;
      var isBankAccountValid = containsOnlyNumbers(bankAccount);

      if (!isPriceValid) {
        event.preventDefault();
        $('#price-error').addClass('error-message').text("Please enter a valid price (numbers only and greater than zero).");
      } else {
        $('#price-error').removeClass('error-message').text('');
      }

      if (!isBankAccountValid) {
        event.preventDefault();
        $('#supplierID-error').addClass('error-message').text("Please enter a valid ID number (numbers only).");
      } else {
        $('#supplierID-error').removeClass('error-message').text('');
      }
    });
  });

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }