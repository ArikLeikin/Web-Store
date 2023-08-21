$(document).ready(function () {
  const userIsLoggedIn = false; // Change this to true if the user is logged in

  $("#wishlist-link").on("click", function (event) {
    event.preventDefault(); // Prevent default link behavior

    if (userIsLoggedIn) {
      // Redirect to the proper wishlist page
      window.location.href = "path-to-wishlist-page.html";
    } else {
      // Show SweetAlert alert
      Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "You must be logged in to view the wishlist.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      });
    }
  });
});