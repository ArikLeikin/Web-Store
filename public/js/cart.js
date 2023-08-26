// document.addEventListener("DOMContentLoaded", function () {
//   const minusButtons = document.querySelectorAll(".minus");
//   const plusButtons = document.querySelectorAll(".plus");
//   const removeButtons = document.querySelectorAll(".cart-remove");
//   const quantityInputs = document.querySelectorAll(".input-text.qty");
//   const subtotalElements = document.querySelectorAll(
//     ".cart-item-value.subtotal"
//   );
//   const totalElement = document.querySelector(".cart-item-value.total");

//   function updateItemSubtotal(input, priceElement, subtotalElement) {
//     const quantity = parseInt(input.value);
//     const price = parseFloat(priceElement.textContent.replace("$", ""));
//     const subtotal = quantity * price;
//     subtotalElement.textContent = "$" + subtotal.toFixed(2);
//   }

//   function updateTotal(adjustment = 0) {
//     let total = 0;
//     subtotalElements.forEach((subtotalElement) => {
//       total += parseFloat(subtotalElement.textContent.replace("$", ""));
//     });
//     total += adjustment; // Add the adjustment to the total
//     totalElement.textContent = "$" + total.toFixed(2);
//   }

//   minusButtons.forEach((minusButton) => {
//     minusButton.addEventListener("click", function () {
//       const input = minusButton.nextElementSibling;
//       let quantity = parseInt(input.value);
//       if (quantity > 1) {
//         quantity--;
//         input.value = quantity;
//         const priceElement = input
//           .closest(".cart-item")
//           .querySelector(".cart-item-value.qty");
//         const subtotalElement = input
//           .closest(".cart-item")
//           .querySelector(".cart-item-value.subtotal");
//         updateItemSubtotal(input, priceElement, subtotalElement);
//         updateTotal();
//       }
//     });
//   });

//   plusButtons.forEach((plusButton) => {
//     plusButton.addEventListener("click", function () {
//       const input = plusButton.previousElementSibling;
//       let quantity = parseInt(input.value);
//       quantity++;
//       input.value = quantity;
//       const priceElement = input
//         .closest(".cart-item")
//         .querySelector(".cart-item-value.qty");
//       const subtotalElement = input
//         .closest(".cart-item")
//         .querySelector(".cart-item-value.subtotal");
//       updateItemSubtotal(input, priceElement, subtotalElement);
//       updateTotal();
//     });
//   });

//   removeButtons.forEach((removeButton) => {
//     removeButton.addEventListener("click", function (event) {
//       event.preventDefault();
//       const cartItem = removeButton.closest(".cart-item");
//       const subtotalElement = cartItem.querySelector(
//         ".cart-item-value.subtotal"
//       );
//       const subtotal = parseFloat(subtotalElement.textContent.replace("$", ""));
//       cartItem.parentNode.removeChild(cartItem);
//       updateTotal(-subtotal); // Subtract the subtotal from the total
//     });
//   });

//   quantityInputs.forEach((quantityInput) => {
//     quantityInput.addEventListener("input", function () {
//       const priceElement = quantityInput
//         .closest(".cart-item")
//         .querySelector(".cart-item-value.qty");
//       const subtotalElement = quantityInput
//         .closest(".cart-item")
//         .querySelector(".cart-item-value.subtotal");
//       updateItemSubtotal(quantityInput, priceElement, subtotalElement);
//       updateTotal();
//     });
//   });

//   updateTotal();
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const subtotalElements = document.querySelectorAll(
//     ".cart-item-value.subtotal"
//   );
//   const checkoutButton = document.querySelector(".bts-ns-hot");

//   function calculateTotal() {
//     let total = 0;
//     subtotalElements.forEach((subtotalElement) => {
//       total += parseFloat(subtotalElement.textContent.replace("$", ""));
//     });
//     return total.toFixed(2);
//   }

//   // checkoutButton.addEventListener("click", function (event) {
//   //   console.log("Clicke");
//   //   event.preventDefault();
//   //   const total = calculateTotal();
//   //   window.location.href = "payment.html?total=" + total;
//   // });
// });



    $(document).ready(function() {
      const cartContainer = $(".cart-container");


      $.ajax({
        url: "http://127.0.0.1:8080/cart/products",
        method: "GET",
        dataType: "json",
        success: function(data) {
          console.log(data.data.length);
          var cartSection = $("<section>").addClass("cart");
          var cartItemsTable = $("<table>").addClass("cart-items");
          cartSection.append(cartItemsTable);

          var cartTotal = $("<div>").addClass("cart-total");
          var totalLabel = $("<span>").addClass("cart-item-label total").text("Total");
          var totalValue = $("<span>").addClass("cart-item-value total").text("$0.00");
          var checkoutButton = $("<button>").addClass("btn-ns-hot");
          var checkoutLink = $("<a>").attr("href", "http://127.0.0.1:8080/payment").text("CHECKOUT");
          checkoutButton.append(checkoutLink);
          cartTotal.append(totalLabel).append(totalValue).append("<br>").append(checkoutButton);
          cartSection.append(cartTotal);

          data.data.forEach(function(product) {
            var productId = product.product;
            var quantity = product.quantity;
            $.ajax({
              url: `http://127.0.0.1:8080/api/product/${productId}`,
              method: "GET",
              dataType: "json",
              success: function(productDetails) {
                console.log(productDetails);
                var cartItemRow = $("<tr>").addClass("cart-item").attr("id", "item-" + productId);

                // Cart Remove Cell
                var removeCell = $("<td>").addClass("cart-item-block cart-item-del");
                var removeLink = $("<a>")
                  .addClass("cart-remove icon")
                  .attr({
                    "href": "#",
                    "data-cart-itemid": "10b74f62-7f30-47cb-b78b-a12f682eaeab",
                    "data-confirm-delete": "Are you sure you want to delete this item?"
                  })
                  // .on("click", function(event) {
                  //   event.preventDefault();
                  //   if (confirm($(this).data("confirm-delete"))) {
                  //     var removedSubtotal = parseFloat(subtotalValue.text().replace("$", ""));
                  //     cartItemRow.remove();
                  //     updateTotal(-removedSubtotal);
                  //   }
                  // });
                var removeImage = $("<img>").attr("src", "../images/white-icons/x-icon.png");
                removeLink.append(removeImage);
                removeCell.append(removeLink);
                cartItemRow.append(removeCell);

                // Cart Item Image Cell
                var imageCell = $("<td>").addClass("cart-item-block cart-item-figure");
                var image = $("<img>").attr({
                  "src": productDetails.data.image[0].split("public")[1],
                  "alt": productDetails.data.title,
                  "title": productDetails.data.title
                }).addClass("cart-item-image");
                imageCell.append(image);
                cartItemRow.append(imageCell);

                // Cart Item Title Cell
                var titleCell = $("<td>").addClass("cart-item-block cart-item-title");
                var titleLink = $("<a>").addClass("cart-item-name").text(productDetails.data.title);
                var priceLabel = $("<span>").addClass("cart-item-label qty").text("Price");
                var priceValue = $("<span>").addClass("cart-item-value qty").text("$" + productDetails.data.price.toFixed(2));
                titleCell.append($("<h4>").append(titleLink)).append(priceLabel).append(priceValue);
                cartItemRow.append(titleCell);

                // Cart Item Quantity Cell
                var quantityCell = $("<td>").addClass("cart-item-block cart-item-quantity");
                var minusButtonn = $("<input>").addClass("minus btn").attr("type", "button").val("-");
                var quantityInputt = $("<input>").addClass("input-text qty text").attr({
                  "type": "text",
                  "size": "4",
                  "id": "quantity",
                  "value": quantity
                });
                var plusButtonn = $("<input>").addClass("plus btn").attr("type", "button").val("+");
                var quantityInputDiv = $("<div>").addClass("quantity-input").append(minusButtonn).append(quantityInputt).append(plusButtonn);
                quantityCell.append(quantityInputDiv);
                cartItemRow.append(quantityCell);

                // Cart Item Subtotal Cell
                var subtotalCell = $("<td>").addClass("cart-item-block cart-item-subtotal");
                var subtotalValue = $("<strong>").addClass("cart-item-value subtotal").text("$" + (productDetails.data.price * quantity).toFixed(2));
                subtotalCell.append(subtotalValue);
                cartItemRow.append(subtotalCell);

                // Append the cart item row to the table
                cartItemsTable.append(cartItemRow);

                // Update the total value based on the newly added item
                var currentTotal = parseFloat(totalValue.text().replace("$", ""));
                var productSubtotal = productDetails.price * quantity;
                totalValue.text("$" + (currentTotal + productSubtotal).toFixed(2));

                // Apply the event listeners and functions for quantity update and removal
                const minusButton = cartItemRow.find(".minus");
                const plusButton = cartItemRow.find(".plus");
                const quantityInput = cartItemRow.find(".input-text.qty");
                const subtotalElement = cartItemRow.find(".cart-item-value.subtotal");
                updateTotal();
                

                minusButton.on("click", function() {
                  let currentQuantity = parseInt(quantityInput.val());
                  if (currentQuantity > 1) {
                    currentQuantity--;
                    quantityInput.val(currentQuantity);
                    updateItemSubtotal(quantityInput, productDetails.data.price, subtotalElement);
                    updateTotal();
                  }
                });

                plusButton.on("click", function() {
                  let currentQuantity = parseInt(quantityInput.val());
                  currentQuantity++;
                  quantityInput.val(currentQuantity);
                  updateItemSubtotal(quantityInput, productDetails.data.price, subtotalElement);
                  updateTotal();
                });

                quantityInput.on("input", function() {
                  updateItemSubtotal(quantityInput, productDetails.data.price, subtotalElement);
                  updateTotal();
                });


                removeLink.on("click", function(event) {
                  event.preventDefault();
                  if (confirm($(this).data("confirm-delete"))) {
                    var cartItemId = productId;
                    $.ajax({
                      url: "http://127.0.0.1:8080/cart/delete",
                      method: "POST", 
                      data: {
                        product: cartItemId
                      },
                      success: function(response) {
                        cartItemRow.remove();
                        var removedSubtotal = parseFloat(subtotalValue.text().replace("$", ""));
                        updateTotal(-removedSubtotal);
                      },
                      error: function(xhr, status, error) {
                        console.error("Error deleting item: " + error);
                      }
                    });
                  }
                });

               
              }
            });
          });
        

          cartContainer.append(cartSection);

          // Add the checkout button click event
          checkoutButton.on("click", function(event) {
            event.preventDefault();
            const total = parseFloat(totalValue.text().replace("$", ""));
            if (total > 0) {
              window.location.href = "http://127.0.0.1:8080/payment?total=" + total.toFixed(2);
            } else {
              alert("Your cart is empty.");
            }
          });
          
        }
      });
     });

    function updateItemSubtotal(input, price, subtotalElement) {
      const quantity = parseInt(input.val());
      const subtotal = quantity * price;
      subtotalElement.text("$" + subtotal.toFixed(2));
    }

    function updateTotal(adjustment = 0) {
      const subtotalElements = $(".cart-item-value.subtotal");
      const totalElement = $(".cart-item-value.total");

      let total = 0;
      subtotalElements.each(function() {
        total += parseFloat($(this).text().replace("$", ""));
      });
      total += adjustment;
      total = Math.max(total, 0);
      totalElement.text("$" + total.toFixed(2));
    }

