document.addEventListener("DOMContentLoaded", function () {
  const minusButtons = document.querySelectorAll(".minus");
  const plusButtons = document.querySelectorAll(".plus");
  const removeButtons = document.querySelectorAll(".cart-remove");
  const quantityInputs = document.querySelectorAll(".input-text.qty");
  const subtotalElements = document.querySelectorAll(
    ".cart-item-value.subtotal"
  );
  const totalElement = document.querySelector(".cart-item-value.total");

  function updateItemSubtotal(input, priceElement, subtotalElement) {
    const quantity = parseInt(input.value);
    const price = parseFloat(priceElement.textContent.replace("$", ""));
    const subtotal = quantity * price;
    subtotalElement.textContent = "$" + subtotal.toFixed(2);
  }

  function updateTotal(adjustment = 0) {
    let total = 0;
    subtotalElements.forEach((subtotalElement) => {
      total += parseFloat(subtotalElement.textContent.replace("$", ""));
    });
    total += adjustment; // Add the adjustment to the total
    totalElement.textContent = "$" + total.toFixed(2);
  }

  minusButtons.forEach((minusButton) => {
    minusButton.addEventListener("click", function () {
      const input = minusButton.nextElementSibling;
      let quantity = parseInt(input.value);
      if (quantity > 1) {
        quantity--;
        input.value = quantity;
        const priceElement = input
          .closest(".cart-item")
          .querySelector(".cart-item-value.qty");
        const subtotalElement = input
          .closest(".cart-item")
          .querySelector(".cart-item-value.subtotal");
        updateItemSubtotal(input, priceElement, subtotalElement);
        updateTotal();
      }
    });
  });

  plusButtons.forEach((plusButton) => {
    plusButton.addEventListener("click", function () {
      const input = plusButton.previousElementSibling;
      let quantity = parseInt(input.value);
      quantity++;
      input.value = quantity;
      const priceElement = input
        .closest(".cart-item")
        .querySelector(".cart-item-value.qty");
      const subtotalElement = input
        .closest(".cart-item")
        .querySelector(".cart-item-value.subtotal");
      updateItemSubtotal(input, priceElement, subtotalElement);
      updateTotal();
    });
  });

  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener("click", function (event) {
      event.preventDefault();
      const cartItem = removeButton.closest(".cart-item");
      const subtotalElement = cartItem.querySelector(
        ".cart-item-value.subtotal"
      );
      const subtotal = parseFloat(subtotalElement.textContent.replace("$", ""));
      cartItem.parentNode.removeChild(cartItem);
      updateTotal(-subtotal); // Subtract the subtotal from the total
    });
  });

  quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener("input", function () {
      const priceElement = quantityInput
        .closest(".cart-item")
        .querySelector(".cart-item-value.qty");
      const subtotalElement = quantityInput
        .closest(".cart-item")
        .querySelector(".cart-item-value.subtotal");
      updateItemSubtotal(quantityInput, priceElement, subtotalElement);
      updateTotal();
    });
  });

  updateTotal();
});

document.addEventListener("DOMContentLoaded", function () {
  const subtotalElements = document.querySelectorAll(
    ".cart-item-value.subtotal"
  );
  const checkoutButton = document.querySelector(".bts-ns-hot");

  function calculateTotal() {
    let total = 0;
    subtotalElements.forEach((subtotalElement) => {
      total += parseFloat(subtotalElement.textContent.replace("$", ""));
    });
    return total.toFixed(2);
  }

  checkoutButton.addEventListener("click", function (event) {
    console.log("Clicke");
    event.preventDefault();
    const total = calculateTotal();
    window.location.href = "payment.html?total=" + total;
  });
});



document.addEventListener("DOMContentLoaded", async function () {
  const cartItemsContainer = document.querySelector(".cart-items");

  async function fetchProductDetails(productId) {
    const response = await fetch(`http://127.0.0.1:8080/api/product/${productId}`);
    const productData = await response.json();
    return productData;
  }

  function createCartItemElement(productData) {
    const cartItem = document.createElement("tr");
    cartItem.classList.add("cart-item");

    const cartItemDel = document.createElement("td");
    cartItemDel.classList.add("cart-item-block", "cart-item-del");

    const removeLink = document.createElement("a");
    removeLink.classList.add("cart-remove", "icon");
    removeLink.href = "#"; // Add the correct URL here

    const removeImage = document.createElement("img");
    removeImage.src = "../images/white-icons/x-icon.png"; // Add the correct image URL here

    removeLink.appendChild(removeImage);
    cartItemDel.appendChild(removeLink);
    cartItem.appendChild(cartItemDel);

    const cartItemFigure = document.createElement("td");
    cartItemFigure.classList.add("cart-item-block", "cart-item-figure");

    const productImage = document.createElement("img");
    productImage.src = productData.image;
    productImage.alt = productData.name;
    productImage.classList.add("cart-item-image");

    cartItemFigure.appendChild(productImage);
    cartItem.appendChild(cartItemFigure);

    const cartItemTitle = document.createElement("td");
    cartItemTitle.classList.add("cart-item-block", "cart-item-title");

    const productNameLink = document.createElement("a");
    productNameLink.href = "#item-link"; // Add the correct URL here
    productNameLink.textContent = productData.name;

    const productPriceLabel = document.createElement("span");
    productPriceLabel.classList.add("cart-item-label", "qty");
    productPriceLabel.textContent = "Price";

    const productPriceValue = document.createElement("span");
    productPriceValue.classList.add("cart-item-value", "qty");
    productPriceValue.textContent = "$" + productData.price.toFixed(2);

    cartItemTitle.appendChild(productNameLink);
    cartItemTitle.appendChild(document.createElement("br"));
    cartItemTitle.appendChild(productPriceLabel);
    cartItemTitle.appendChild(productPriceValue);
    cartItem.appendChild(cartItemTitle);

    const cartItemQuantity = document.createElement("td");
    cartItemQuantity.classList.add("cart-item-block", "cart-item-quantity");

    // Create the quantity input elements and buttons here

    cartItem.appendChild(cartItemQuantity);

    const cartItemSubtotal = document.createElement("td");
    cartItemSubtotal.classList.add("cart-item-block", "cart-item-subtotal");

    const subtotalValue = document.createElement("strong");
    subtotalValue.classList.add("cart-item-value", "subtotal");
    subtotalValue.textContent = "$" + productData.price.toFixed(2);

    cartItemSubtotal.appendChild(subtotalValue);
    cartItem.appendChild(cartItemSubtotal);

    return cartItem;
  }

  
  const cartProductsResponse = await fetch("http://127.0.0.1:8080/cart/products");
  const cartProductsData = await cartProductsResponse.json();


  for (const productId in cartProductsData) {
    if (cartProductsData.hasOwnProperty(productId)) {
      const productData = await fetchProductDetails(productId);
      const cartItem = createCartItemElement(productData);
      cartItemsContainer.appendChild(cartItem);
    }
  }
});

