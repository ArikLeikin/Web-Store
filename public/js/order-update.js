var orderID = null;
function getUrlParameter(name) {
  const results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  if (results == null) {
    return null;
  } else {
    return decodeURI(results[1]) || 0;
  }
}

$(document).ready(function () {
  const urlID = getUrlParameter("id");

  if (urlID) {
    orderID = urlID;
    $.ajax({
      url: "http://127.0.0.1:8080/get/order/" + orderID,
      method: "GET",
      dataType: "json",
      success: function (data) {
        const cartItemsContainer = $(".cart-items");
        const cartDetailsContainer = $(".cart-details");
        $("#order-total").text("$" + data.data.total_price);
        $("#order-date").text(data.data.order_date.split("T")[0]);
        $("#order-status").val(data.data.status);
        var userDetailsTemplate = `
        <h3>User Details</h3>
        <p>Full Name: ${data.data.user_info.name.firstName} ${data.data.user_info.name.lastName}</p>
        <p>Phone Number: ${data.data.user_info.phoneNumber}</p>
        <p>Email: ${data.data.user_info.email}</p>
      `;

        // Append the user details template to the cart details container
        cartDetailsContainer.append(userDetailsTemplate);

        // check if the user is admin
        fetch("http://127.0.0.1:8080/api/current-user")
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Fetch error: ${response.status} ${response.statusText}`
              );
            }
            return response.json();
          })
          .then((data) => {
            const orderStatusSelect = document.getElementById("order-status");

            if (data.permission === "admin") {
              orderStatusSelect.disabled = false;
            } else orderStatusSelect.disabled = true;
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });

        for (let i = 0; i < data.data.products.length; i++) {
          let product = data.data.products[i].item;
          //  console.log("the product " + product.title);

          var productId = product._id;

          console.log("the product " + product._id);

          $.ajax({
            url: `http://127.0.0.1:8080/api/product/${productId}`,
            method: "GET",
            dataType: "json",
            success: function (productDetails) {
              var curr_prod_id = productDetails.data._id;
              var quantity = data.data.products[i].quantity;
              // Create the template for each product
              var productTemplate = `
                <tr class="cart-item" id="item-${curr_prod_id}">
                  <td class="cart-item-block cart-item-figure">
                  <a
                        href="/product-details?id=${curr_prod_id}">
                    <img
                      src="${productDetails.data.image}" 
                      alt="${productDetails.data.title}"
                      title="${productDetails.data.title}"
                      class="cart-item-image"
                    /></a>
                  </td>
                  <td class="cart-item-block cart-item-title">
                    <h4>
                      <a
                        href="/product-details?id=${curr_prod_id}"
                        class="cart-item-name"
                        style="color: rgb(0, 0, 0); text-decoration: none"
                      >
                        ${productDetails.data.title}
                      </a>
                    </h4>
                    <span class="cart-item-label qty">Price for One</span>
                    <span class="cart-item-value qty">$${productDetails.data.price.toFixed(
                      2
                    )}</span>
                  </td>
                  <td class="cart-item-block cart-item-quantity">
                  <span class="qty text">${quantity}</span>
                    
                  </td>
                  <td class="cart-item-block cart-item-subtotal">
                    <strong class="cart-item-value subtotal">$${(
                      productDetails.data.price * quantity
                    ).toFixed(2)}</strong>
                  </td>
                </tr>
              `;

              // Append the product template to the cart items container
              cartItemsContainer.append(productTemplate);
            },
          });
        }
      },
    });

    $("#order-status").on("change", function () {
      const newStatus = $(this).val(); // Get the selected value

      // Make an AJAX request to update the order status
      $.ajax({
        url: "http://127.0.0.1:8080/update/order/" + orderID,
        method: "POST",
        data: { status: newStatus }, // Send the new status as data
        success: function (response) {
          console.log("Order status updated successfully.");
        },
        error: function (error) {
          console.error("Error updating order status:", error);
        },
      });
    });
  }
});
