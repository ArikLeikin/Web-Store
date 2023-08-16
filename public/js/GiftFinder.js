document.addEventListener("DOMContentLoaded", function () {
  const ageSelect = document.getElementById("age");
  const categorySelect = document.getElementById("category");
  const searchButton = document.getElementById("searchButton");
  const resultsDiv = document.getElementById("results");

  searchButton.addEventListener("click", function () {
    const selectedAge = ageSelect.value;
    const selectedCategory = categorySelect.value;
    const selectedPrice = priceInput.value;

    // Use the selected values to fetch and display results
    // For now, let's just simulate displaying results
    resultsDiv.innerHTML = `<p>Displaying results for Age: ${selectedAge}, Category: ${selectedCategory}, Price: $${selectedPrice}</p>`;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const priceOptions = document.querySelectorAll(".price-option");

  priceOptions.forEach(function (priceOption, index) {
    priceOption.addEventListener("click", function () {
      // Remove active class from all images
      priceOptions.forEach(function (item) {
        item.classList.remove("active");
      });

      // Add active class to the clicked image
      priceOption.classList.add("active");
    });
  });
});
