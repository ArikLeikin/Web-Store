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

fetch("http://127.0.0.1:8080/cart/products")
  .then((response) => response.json())
  .then((items) => {
    const cartItemsTable = document.querySelector(".cart-items");
    console.log(items);
    items.forEach((item) => {
      // Use the correct variable name "item"
      console.log("111: " + item);
      const cartItemRow = document.createElement("tr");
      cartItemRow.classList.add("cart-item");
      cartItemRow.id = item.id; // Use "item.id" instead of "product.id"

      // Create the elements and set their content and attributes
      const deleteLink = document.createElement("a");
      deleteLink.className = "cart-remove icon";
      deleteLink.setAttribute("data-cart-itemid", item.id); // Use "item.id"
      deleteLink.setAttribute("href", "#");
      deleteLink.setAttribute(
        "data-confirm-delete",
        "Are you sure you want to delete this item?"
      );
      const deleteIcon = document.createElement("img");
      deleteIcon.setAttribute("src", "../images/white-icons/x-icon.png");
      deleteLink.appendChild(deleteIcon);
      const deleteCell = document.createElement("td");
      deleteCell.className = "cart-item-block cart-item-del";
      deleteCell.appendChild(deleteLink);

      // Create the product image
      const productImage = document.createElement("img");
      productImage.setAttribute("src", item.image); // Use "item.image"
      productImage.setAttribute("alt", item.name); // Use "item.name"
      productImage.setAttribute("title", item.name); // Use "item.name"
      productImage.setAttribute("data-sizes", "auto");
      productImage.className = "cart-item-image";
      const imageCell = document.createElement("td");
      imageCell.className = "cart-item-block cart-item-figure";
      imageCell.appendChild(productImage);

      // Create the product title and price elements
      const productNameLink = document.createElement("a");
      productNameLink.setAttribute("href", "#item-link");
      productNameLink.textContent = item.name; // Use "item.name"
      const productName = document.createElement("h4");
      productName.className = "cart-item-name";
      productName.appendChild(productNameLink);
      const priceLabel = document.createElement("span");
      priceLabel.className = "cart-item-label qty";
      priceLabel.textContent = "Price";
      const priceValue = document.createElement("span");
      priceValue.className = "cart-item-value qty";
      priceValue.textContent = item.price; // Use "item.price"
      const titleCell = document.createElement("td");
      titleCell.className = "cart-item-block cart-item-title";
      titleCell.appendChild(productName);
      titleCell.appendChild(priceLabel);
      titleCell.appendChild(priceValue);

      // ... Create other cells similarly ...

      // Append the cells to the row
      cartItemRow.appendChild(deleteCell);
      cartItemRow.appendChild(imageCell);
      cartItemRow.appendChild(titleCell);
      // ... Append other cells ...

      // Append the row to the table
      cartItemsTable.appendChild(cartItemRow);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
