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


  $(document).ready(function() {
    // Replace this with the actual product ID you want to retrieve
    var productId = "64d0c1872f31cd1e45478f1e";
    

    // Send a GET request to the server
    $.get("http://127.0.0.1:8080/product/" + productId, function(data) {
      // 'data' contains the JSON response from the server
      // Update the product details in the HTML
      var productDetails = `
        <div class="col-md-6">
          <h2>${data.title}</h2>
          <p>Price: $${data.price}</p>
          <p>Description: ${data.description}</p>
          <p>Condition: ${data.condition}</p>
          <p>Category: ${data.category}</p>
          <p>Manufacture Date: ${data.manufacture_date}</p>
          <p>Supplier: ${data.supplier}</p>
          <p>Quantity: ${data.quantity}</p>
          <p>Age Range: ${data.age_range.from} - ${data.age_range.to} years</p>
        </div>
        <div class="col-md-6">
          <img src="${data.image}" alt="${data.title}" class="img-fluid">
        </div>
      `;
      $("#product-details").html(productDetails);
     });
    });