
const serverEndpoint = 'http://127.0.0.1:8080/api/products';

// Fetch product data from the server
fetch(serverEndpoint)
  .then(response => response.json())
  .then(products => {
    // Create a map to aggregate quantities for each category
    const categoryQuantities = new Map();

    // Iterate through product data to aggregate quantities
    products.forEach(product => {
      const { category, quantity } = product;
      if (categoryQuantities.has(category)) {
        categoryQuantities.set(category, categoryQuantities.get(category) + quantity);
      } else {
        categoryQuantities.set(category, quantity);
      }
    });

    // Extract aggregated category names and quantities
    var xValues = Array.from(categoryQuantities.keys());
    var yValues = Array.from(categoryQuantities.values());
    var barColors = [];

    // Alternate between two colors for each column
    for (let i = 0; i < xValues.length; i++) {
      barColors.push(i % 2 === 0 ? "blue" : "orange");
    }

    new Chart("myChart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Distribution of Product Quantities"
        }
      }
    });
  })
  .catch(error => {
    console.error("Error fetching product data:", error);
  });
