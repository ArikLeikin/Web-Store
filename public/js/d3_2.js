const serverEndpoint = 'http://127.0.0.1:8080/api/users';

// Fetch user data from the server
fetch(serverEndpoint)
  .then(response => response.json())
  .then(users => {
    // Create an object to count users for each category
    const usersPerCategory = {
      "0 orders": 0,
      "1-5 orders": 0,
      "more than 5 orders": 0
    };

    // Iterate through user data to count users per category
    users.forEach(user => {
        console.log(user.email + " : " + user.orderHistory.length);
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
    const barColors = ["red", "green", "blue"];

    new Chart("myChart", {
      type: "bar",
      data: {
        labels: categories,
        datasets: [{
          backgroundColor: barColors,
          data: userCounts
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "User Order Distribution: Number of Users per Order Category"
        }
      }
    });
  })
  .catch(error => {
    console.error("Error fetching user data:", error);
  });
