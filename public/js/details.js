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



const productId = "64d0c13b1b865c48c367f6d8"; // Replace with your product ID
const url = `http://127.0.0.1:8080/product/${productId}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const productDetailsDiv = document.getElementById("product-details");
    
    const { title, price, description, category, condition, manufacture_date, supplier, quantity, image } = data.data;

    const productHTML = `
        <h1>${title}</h1>
        <p><strong>Price:</strong> $${price}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Condition:</strong> ${condition}</p>
        <p><strong>Manufacturer Date:</strong> ${manufacture_date}</p>
        <p><strong>Supplier:</strong> ${supplier}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <img src="${image}" alt="Product Image">
    `;
    
    productDetailsDiv.innerHTML = productHTML;
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

 
