// graph 1
const serverEndpoint = "http://127.0.0.1:8080/api/products";

// Fetch product data from the server
fetch(serverEndpoint)
  .then((response) => response.json())
  .then((products) => {
    // Create a map to aggregate quantities for each category
    const categoryQuantities = new Map();

    // Iterate through product data to aggregate quantities
    products.forEach((product) => {
      const { category, quantity } = product;
      if (categoryQuantities.has(category)) {
        categoryQuantities.set(
          category,
          categoryQuantities.get(category) + quantity
        );
      } else {
        categoryQuantities.set(category, quantity);
      }
    });

    // Extract aggregated category names and quantities
    var xValues = Array.from(categoryQuantities.keys());
    var yValues = Array.from(categoryQuantities.values());
    const barColors = [
      "#3498db",
      "#e74c3c",
      "#2ecc71",
      "#f39c12",
      "#9b59b6",
      "#1abc9c",
      "#d35400",
      "#8e44ad",
      "#27ae60",
      "#c0392b",
      "#2980b9",
      "#f1c40f",
      "#e67e22",
    ];

    // Set colors for each bar based on the index
    const backgroundColors = xValues.map(
      (category, index) => barColors[index % barColors.length]
    );

    new Chart("myChart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: backgroundColors,
            data: yValues,
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Distribution of Product Quantities",
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching product data:", error);
  });
// graph 2

const serverEndpoint2 = "http://127.0.0.1:8080/api/users";

// Fetch user data from the server
fetch(serverEndpoint2)
  .then((response) => response.json())
  .then((users) => {
    // Create an object to count users for each category
    const usersPerCategory = {
      "0 orders": 0,
      "1-5 orders": 0,
      "more than 5 orders": 0,
    };

    // Iterate through user data to count users per category
    users.forEach((user) => {
      console.log(user.email + " : " + user.orderHistory.lengthc);
      const orderCount = user.orderHistory.length;
      if (orderCount === 0) {
        usersPerCategory["0 orders"]++;
      } else if (orderCount <= 5) {
        usersPerCategory["1-5 orders"]++;
      } else {
        usersPerCategory["more than 5 orders"]++;
      }
    });

    // Extract categories and user counts
    const categories = Object.keys(usersPerCategory);
    const userCounts = Object.values(usersPerCategory);
    const barColors = [
      "#3498db",
      "#e74c3c",
      "#2ecc71",
      "#f39c12",
      "#9b59b6",
      "#1abc9c",
      "#d35400",
      "#8e44ad",
      "#27ae60",
      "#c0392b",
      "#2980b9",
      "#f1c40f",
      "#e67e22",
    ];

    // Set colors for each bar based on the index
    const backgroundColors = userCounts.map(
      (count, index) => barColors[index % barColors.length]
    );

    new Chart("myChart2", {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            backgroundColor: backgroundColors,
            data: userCounts,
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "User Order Distribution: Number of Users per Order Category",
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
  });
