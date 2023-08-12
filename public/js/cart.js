
document.addEventListener("DOMContentLoaded", function () {
 
  const minusButtons = document.querySelectorAll(".minus");
  const plusButtons = document.querySelectorAll(".plus");
  const removeButtons = document.querySelectorAll(".cart-remove");
  const quantityInputs = document.querySelectorAll(".input-text.qty");
  const subtotalElements = document.querySelectorAll(".cart-item-value.subtotal");
  const totalElement = document.querySelector(".cart-item-value.total");

  function updateItemSubtotal(input, priceElement, subtotalElement) {
    const quantity = parseInt(input.value);
    const price = parseFloat(priceElement.textContent.replace("$", ""));
    const subtotal = quantity * price;
    subtotalElement.textContent = "$" + subtotal.toFixed(2);
  }


    function updateTotal(adjustment = 0) {
    let total = 0;
    subtotalElements.forEach(subtotalElement => {
      total += parseFloat(subtotalElement.textContent.replace("$", ""));
    });
    total += adjustment; // Add the adjustment to the total
    totalElement.textContent = "$" + total.toFixed(2);
  }


  minusButtons.forEach(minusButton => {
    minusButton.addEventListener("click", function () {
      const input = minusButton.nextElementSibling;
      let quantity = parseInt(input.value);
      if (quantity > 1) {
        quantity--;
        input.value = quantity;
        const priceElement = input.closest(".cart-item").querySelector(".cart-item-value.qty");
        const subtotalElement = input.closest(".cart-item").querySelector(".cart-item-value.subtotal");
        updateItemSubtotal(input, priceElement, subtotalElement);
        updateTotal();
      }
    });
  });

  plusButtons.forEach(plusButton => {
    plusButton.addEventListener("click", function () {
      const input = plusButton.previousElementSibling;
      let quantity = parseInt(input.value);
      quantity++;
      input.value = quantity;
      const priceElement = input.closest(".cart-item").querySelector(".cart-item-value.qty");
      const subtotalElement = input.closest(".cart-item").querySelector(".cart-item-value.subtotal");
      updateItemSubtotal(input, priceElement, subtotalElement);
      updateTotal();
    });
  });

  removeButtons.forEach(removeButton => {
    removeButton.addEventListener("click", function (event) {
      event.preventDefault();
      const cartItem = removeButton.closest(".cart-item");
      const subtotalElement = cartItem.querySelector(".cart-item-value.subtotal");
      const subtotal = parseFloat(subtotalElement.textContent.replace("$", ""));
      cartItem.parentNode.removeChild(cartItem);
      updateTotal(-subtotal); // Subtract the subtotal from the total
    });
  });

  quantityInputs.forEach(quantityInput => {
    quantityInput.addEventListener("input", function () {
      const priceElement = quantityInput.closest(".cart-item").querySelector(".cart-item-value.qty");
      const subtotalElement = quantityInput.closest(".cart-item").querySelector(".cart-item-value.subtotal");
      updateItemSubtotal(quantityInput, priceElement, subtotalElement);
      updateTotal();
    });
  });

  updateTotal();
 
});

document.addEventListener("DOMContentLoaded", function () {
  const subtotalElements = document.querySelectorAll(".cart-item-value.subtotal");
  const checkoutButton = document.querySelector(".checkout a");

  function calculateTotal() {
    let total = 0;
    subtotalElements.forEach(subtotalElement => {
      total += parseFloat(subtotalElement.textContent.replace("$", ""));
    });
    return total.toFixed(2);
  }

  checkoutButton.addEventListener("click", function (event) {
    event.preventDefault();
    const total = calculateTotal();
    window.location.href = "payment.html?total=" + total;
  });
});