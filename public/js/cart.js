// Add event listeners and update total price
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".item");
    const checkoutButton = document.querySelector(".checkout");

    items.forEach(function(item) {
        const quantityInput = item.querySelector("#quantity");
        const priceElement = item.querySelector("p");

        quantityInput.addEventListener("change", function() {
            updateTotalPrice();
        });

        item.querySelector(".remove-item").addEventListener("click", function() {
            item.remove();
            updateTotalPrice();
        });
    });

    // checkoutButton.addEventListener("click", function() {
    //     // You can add your checkout process here
    //     alert("Thank you for your purchase!");
    // });

    function updateTotalPrice() {
        const items = document.querySelectorAll(".item");
        let total = 0;

        items.forEach(function(item) {
            const quantity = parseInt(item.querySelector("#quantity").value);
            const price = parseFloat(item.querySelector("p").textContent.replace("Price: $", ""));
            total += quantity * price;
        });

        document.querySelector(".cart-total p").textContent = "Total: $" + total.toFixed(2);
        sessionStorage.setItem("cartTotal", total);
    }

    updateTotalPrice();
});
