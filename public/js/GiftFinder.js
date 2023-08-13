document.addEventListener("DOMContentLoaded", function () {
    const ageSelect = document.getElementById("age");
    const categorySelect = document.getElementById("category");
    const searchButton = document.getElementById("searchButton");
    const resultsDiv = document.getElementById("results");
  
    // priceInput.addEventListener("input", function () {
    //   priceValue.textContent = `$0 - $${priceInput.value}`;
    // });
  
    searchButton.addEventListener("click", function () {
      const selectedAge = ageSelect.value;
      const selectedCategory = categorySelect.value;
      const selectedPrice = priceInput.value;
  
      // Use the selected values to fetch and display results
      // For now, let's just simulate displaying results
      resultsDiv.innerHTML = `<p>Displaying results for Age: ${selectedAge}, Category: ${selectedCategory}, Price: $${selectedPrice}</p>`;
            
    
    });
    
  });

