document.addEventListener("DOMContentLoaded", function () {
 
    const minusButtons = document.querySelectorAll(".minus");
    const plusButtons = document.querySelectorAll(".plus");
    const quantityInputs = document.querySelectorAll(".input-text.qty");

    minusButtons.forEach(minusButton => {
      minusButton.addEventListener("click", function () {
        const input = minusButton.nextElementSibling;
        let quantity = parseInt(input.value);
        if (quantity > 1) {
          quantity--;
          input.value = quantity;
        }
      });
    });
  
    plusButtons.forEach(plusButton => {
      plusButton.addEventListener("click", function () {
        const input = plusButton.previousElementSibling;
        let quantity = parseInt(input.value);
        quantity++;
        input.value = quantity;
      });
    });
  
   
  });