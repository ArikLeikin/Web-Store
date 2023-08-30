$(document).ready(function () {
  $("#product-update-form").submit(function (event) {
    event.preventDefault();
    let isValid = true;
    var price = $("#price").val();
    var productName = $("#productName").val();
    var quantity = $("#quantity").val();
    var description = $("#description").val();

    if (!validateDesc(productName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Product name should be only letters or digits, and at least 4 characters.",
      });
      isValid = false;
    }

    if (!containsOnlyNumbers(price)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter a valid price (numbers only and greater than zero).",
      });
      isValid = false;
    }

    var productPhotos = $("#productPhotos")[0].files;
    // if (productPhotos.length === 0) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Validation Error",
    //     text: "Please upload at least 1 photo.",
    //   });
    //   isValid = false;
    // } else if (productPhotos.length > 4) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Validation Error",
    //     text: "You can upload a maximum of 4 photos.",
    //   });
    //   isValid = false;
    // }

    if (!validateNumber(quantity)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Quantity should only contain digits.",
      });
      isValid = false;
    }

    if (!validateDesc(description)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Descriptionn should be at leat 5 characters.",
      });
      isValid = false;
    }
    if (isValid) {
      var category = $("#category").val();
      var age_range = $("#age").val();
      var title = $("#productName").val();
      var price = $("#price").val();
      // var condition = $("#condition").val();
      var quantity = $("#quantity").val();
      var description = $("#description").val();
      var image = $("#productPhotos")[0].files;

      var formData = new FormData();

      formData.append("category", category);
      formData.append("age_range", age_range);
      formData.append("title", title);
      formData.append("price", price);
      // formData.append("condition", condition);
      formData.append("quantity", quantity);
      formData.append("description", description);
      for (var i = 0; i < image.length; i++) {
        formData.append("image[]", image[i]);
      }
      console.log(image);
      const productId = window.location.search.split("=")[1];
      $.ajax({
        url: `http://127.0.0.1:8080/update/product/${productId}`,
        type: "POST",
        // contentType: "application/json",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
          window.location.href = "http://127.0.0.1:8080/manager";
        },
        error: function (error) {
          console.error("Error updating product:", error);
        },
      });
    }
  });
});

function validateLettersDigitsAndSpaces(str) {
  //return /^[a-zA-Z0-9 ]{4,}$/.test(str);
  return /^[a-zA-Z0-9\s\S]{5,}$/.test(str);
}
function containsOnlyNumbers(str) {
  return /^(?!0)\d+$/.test(str);
}
function validateNumber(str) {
  return /^\d+$/.test(str);
}
function validateDesc(str) {
  return /^[a-zA-Z0-9\s\S]{4,}$/.test(str);
}
function validateLettersDigitsAndSpaces2(str) {
  // return /^[a-zA-Z0-9 ]{5,}$/.test(str);
  return /^[a-zA-Z0-9\s\S]{5,}$/.test(str);
}

document.addEventListener("DOMContentLoaded", function () {
  const deleteButton = document.querySelector(".delete-btn");
  const productId = window.location.search.split("=")[1];

  deleteButton.addEventListener("click", function () {
    deleteProduct(productId);
  });

  function deleteProduct(id) {
    fetch(`http://127.0.0.1:8080/delete/product/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "http://127.0.0.1:8080/manager";
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }
});

$(document).ready(function () {
  const productId = window.location.search.split("=")[1];
  console.log(productId);
  const productUpdateForm = document.getElementById("product-update-form");

  $.ajax({
    url: `http://127.0.0.1:8080/api/product/${productId}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data.data);

      $("#productName").val(data.data.title);
      // $("#condition").val(data.data.condition);
      $("#price").val(data.data.price);
      $("#age").val(data.data.age_range);
      $("#quantity").val(data.data.quantity);
      $("#category").val(data.data.category);
      $("#description").val(data.data.description);
    },
    error: function (error) {
      console.error("Error fetching product data:", error);
    },
  });
});
