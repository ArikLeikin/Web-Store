document.addEventListener("DOMContentLoaded", function () {
  $("#search-form").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    window.location.href =
      "http://127.0.0.1:8080/products?search_query=" +
      document.getElementById("search_query").value;
  });
});

// $(document).ready(function () {
//   const userIsLoggedIn = false; // Change this to true if the user is logged in

//   $("#wishlist-link").on("click", function (event) {
//     event.preventDefault(); // Prevent default link behavior

//     if (userIsLoggedIn) {
//       // Redirect to the proper wishlist page
//       window.location.href = "path-to-wishlist-page.html";
//     } else {
//       // Show SweetAlert alert
//       Swal.fire({
//         icon: "error",
//         title: "Not Logged In",
//         text: "You must be logged in to view the wishlist.",
//         confirmButtonColor: "#3085d6",
//         confirmButtonText: "OK",
//       });
//     }
//   });

//   $("#logout").on("click", function (event) {});
// });

fetch("http://127.0.0.1:8080/api/current-user")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    const logoutDiv = document.getElementById("logout");
    logoutDiv.style.display = "block";
  })
  .catch((error) => {
    const logoutDiv = document.getElementById("logout");
    logoutDiv.style.display = "none";
    console.error("User in not logged in:", error);
  });
