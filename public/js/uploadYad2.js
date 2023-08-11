
$(document).ready(function() {
    $('form').on('submit', function(event) {
      var price = $('#price').val();
      var bankAccount = $('#bankAccount').val();

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
        $('#bankAccount-error').addClass('error-message').text("Please enter a valid bank account (numbers only).");
      } else {
        $('#bankAccount-error').removeClass('error-message').text('');
      }
    });
  });

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

