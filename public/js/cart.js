$(document).ready(function () {
  const cartContainer = $(".cart-container");

  $.ajax({
    url: "http://127.0.0.1:8080/cart/products",
    method: "GET",
    dataType: "json",
    success: function (data) {
      var alertBox = document.getElementById("cart-alert-box");
      if (data.data.length > 0) {
        alertBox.style.display = "none";
        var cartSection = $("<section>").addClass("cart");
        var cartItemsTable = $("<table>").addClass("cart-items");
        cartSection.append(cartItemsTable);

        var cartTotal = $("<div>").addClass("cart-total");
        var totalLabel = $("<span>")
          .addClass("cart-item-label total")
          .text("Total");
        var totalValue = $("<span>")
          .addClass("cart-item-value total")
          .text("$0.00");
        var checkoutButton = $("<button>").addClass("btn-ns-hot");
        var checkoutLink = $("<a>")
          .attr("href", "http://127.0.0.1:8080/payment")
          .text("CHECKOUT");
        checkoutButton.append(checkoutLink);
        cartTotal
          .append(totalLabel)
          .append(totalValue)
          .append("<br>")
          .append(checkoutButton);
        cartSection.append(cartTotal);

        data.data.forEach(function (product) {
          var productId = product.product;
          var quantity = product.quantity;
          $.ajax({
            url: `http://127.0.0.1:8080/api/product/${productId}`,
            method: "GET",
            dataType: "json",
            success: function (productDetails) {
              console.log(productDetails);
              var cartItemRow = $("<tr>")
                .addClass("cart-item")
                .attr("id", "item-" + productId);

              // Cart Remove Cell
              var removeCell = $("<td>").addClass(
                "cart-item-block cart-item-del"
              );
              var removeLink = $("<a>").addClass("cart-remove icon").attr({
                href: "#",
                "data-cart-itemid": "10b74f62-7f30-47cb-b78b-a12f682eaeab",
                "data-confirm-delete":
                  "Are you sure you want to delete this item?",
              });

              var removeImage = $("<img>").attr(
                "src",
                "../images/white-icons/x-icon.png"
              );
              removeLink.append(removeImage);
              removeCell.append(removeLink);
              cartItemRow.append(removeCell);

              // Cart Item Image Cell
              var imageCell = $("<td>").addClass(
                "cart-item-block cart-item-figure"
              );
              var image = $("<img>")
                .attr({
                  src: productDetails.data.image[0].split("public")[1],
                  alt: productDetails.data.title,
                  title: productDetails.data.title,
                })
                .addClass("cart-item-image");
              imageCell.append(image);
              cartItemRow.append(imageCell);

              // Cart Item Title Cell
              var titleCell = $("<td>").addClass(
                "cart-item-block cart-item-title"
              );
              var titleLink = $("<a>")
                .attr("href", "/product-details?id=" + productId)
                .addClass("cart-item-name")
                .text(productDetails.data.title)
                .css({
                  color: "black",
                  "text-decoration": "none",
                });
              var priceLabel = $("<span>")
                .addClass("cart-item-label qty")
                .text("Price");
              var priceValue = $("<span>")
                .addClass("cart-item-value qty")
                .text("$" + productDetails.data.price.toFixed(2));
              titleCell
                .append($("<h4>").append(titleLink))
                .append(priceLabel)
                .append(priceValue);
              cartItemRow.append(titleCell);

              // Cart Item Quantity Cell
              var quantityCell = $("<td>").addClass(
                "cart-item-block cart-item-quantity"
              );
              var minusButtonn = $("<input>")
                .addClass("minus btn")
                .attr("type", "button")
                .val("-");
              var quantityInputt = $("<input>")
                .addClass("input-text qty text")
                .attr({
                  type: "text",
                  size: "4",
                  id: "quantity",
                  value: quantity,
                });
              var plusButtonn = $("<input>")
                .addClass("plus btn")
                .attr("type", "button")
                .val("+");
              var quantityInputDiv = $("<div>")
                .addClass("quantity-input")
                .append(minusButtonn)
                .append(quantityInputt)
                .append(plusButtonn);
              quantityCell.append(quantityInputDiv);
              cartItemRow.append(quantityCell);

              // Cart Item Subtotal Cell
              var subtotalCell = $("<td>").addClass(
                "cart-item-block cart-item-subtotal"
              );
              var subtotalValue = $("<strong>")
                .addClass("cart-item-value subtotal")
                .text("$" + (productDetails.data.price * quantity).toFixed(2));
              subtotalCell.append(subtotalValue);
              cartItemRow.append(subtotalCell);

              // Append the cart item row to the table
              cartItemsTable.append(cartItemRow);

              // Update the total value based on the newly added item
              var currentTotal = parseFloat(totalValue.text().replace("$", ""));
              var productSubtotal = productDetails.price * quantity;
              totalValue.text(
                "$" + (currentTotal + productSubtotal).toFixed(2)
              );

              // Apply the event listeners and functions for quantity update and removal
              const minusButton = cartItemRow.find(".minus");
              const plusButton = cartItemRow.find(".plus");
              const quantityInput = cartItemRow.find(".input-text.qty");
              const subtotalElement = cartItemRow.find(
                ".cart-item-value.subtotal"
              );
              updateTotal();

              minusButton.on("click", function () {
                let currentQuantity = parseInt(quantityInput.val());
                currentQuantity--;
                var cartItemId = productId;

                if (currentQuantity > 1) {
                  $.ajax({
                    url: "http://127.0.0.1:8080/cart/update",
                    method: "POST",
                    data: {
                      productId: cartItemId,
                      quantity: currentQuantity,
                    },
                    success: function (response) {
                      quantityInput.val(currentQuantity);
                      updateItemSubtotal(
                        quantityInput,
                        productDetails.data.price,
                        subtotalElement
                      );
                      updateTotal();
                    },
                    error: function (xhr, status, error) {
                      console.error("Error update (-) item: " + error);
                    },
                  });
                }
              });

              plusButton.on("click", function (event) {
                event.preventDefault();
                let currentQuantity = parseInt(quantityInput.val());
                currentQuantity++;
                var cartItemId = productId;

                $.ajax({
                  url: "http://127.0.0.1:8080/cart/update",
                  method: "POST",
                  data: {
                    productId: cartItemId,
                    quantity: currentQuantity,
                  },
                  success: function (response) {
                    quantityInput.val(currentQuantity);
                    updateItemSubtotal(
                      quantityInput,
                      productDetails.data.price,
                      subtotalElement
                    );
                    updateTotal();
                  },
                  error: function (xhr, status, error) {
                    console.error("Error update (+) item: " + error);
                  },
                });
              });

              quantityInput.on("input", function () {
                updateItemSubtotal(
                  quantityInput,
                  productDetails.data.price,
                  subtotalElement
                );
                updateTotal();
              });

              removeLink.on("click", function (event) {
                event.preventDefault();
                if (confirm($(this).data("confirm-delete"))) {
                  var cartItemId = productId;
                  $.ajax({
                    url: "http://127.0.0.1:8080/cart/delete",
                    method: "POST",
                    data: {
                      product: cartItemId,
                    },
                    success: function (response) {
                      cartItemRow.remove();
                      var removedSubtotal = parseFloat(
                        subtotalValue.text().replace("$", "")
                      );
                      console.log("remove" + removedSubtotal);
                      updateTotal(-removedSubtotal);
                    },
                    error: function (xhr, status, error) {
                      console.error("Error deleting item: " + error);
                    },
                  });
                }
              });
            },
          });
        });

        cartContainer.append(cartSection);

        // Add the checkout button click event
        checkoutButton.on("click", function (event) {
          event.preventDefault();
          const total = parseFloat(totalValue.text().replace("$", ""));
          if (total > 0) {
            window.location.href =
              "http://127.0.0.1:8080/payment?total=" + total.toFixed(2);
          } else {
            alert("Your cart is empty.");
          }
        });
      } else {
        alertBox.style.display = "block";
      }
    },
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
  subtotalElements.each(function () {
    total += parseFloat($(this).text().replace("$", ""));
    console.log("a" + total);
  });
  //total += adjustment;
  total = Math.max(total, 0);
  console.log(total);
  totalElement.text("$" + total.toFixed(2));

  if (total <= 0) {
    document.getElementById("cart-alert-box").style.display = "block";

    document.getElementById("cart-container").style.display = "none";
  }
}
