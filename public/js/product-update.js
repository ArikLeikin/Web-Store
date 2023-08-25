$(document).ready(function () {
  $("#product-update-form").submit(function (event) {
    event.preventDefault();
    let isValid = true;
    var price = $("#price").val();
    var productName = $("#productName").val();
    var quantity = $("#quantity").val();
    var description = $("#description").val();

    if (!validateLettersDigitsAndSpaces(productName)) {
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
    if (productPhotos.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please upload at least 1 photo.",
      });
      isValid = false;
    } else if (productPhotos.length > 4) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "You can upload a maximum of 4 photos.",
      });
      isValid = false;
    }
    
    if (!validateNumber(quantity)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Quantity should only contain digits.',
      });
      isValid = false;
    }

    if (!validateLettersDigitsAndSpaces2(description)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Descriptionn should be at leat 5 characters.',
      });
      isValid = false;
    }
    if (!isValid) {

      return false;
    }

  });
});

function validateLettersDigitsAndSpaces(str) {
  return /^[a-zA-Z0-9 ]{4,}$/.test(str);
}
function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

function validateNumber(str) {
  return /^\d+$/.test(str);
}

function validateLettersDigitsAndSpaces2(str) {
  return /^[a-zA-Z0-9 ]{5,}$/.test(str);
}


document.addEventListener("DOMContentLoaded", function () {
  const deleteButton = document.querySelector(".delete-btn");
  const productId = window.location.search.split("=")[1];

  deleteButton.addEventListener("click", function () {
    swal({
      title: "Are you sure?",
      text: "Once deleted, the product cannot be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteProduct(productId);
      }
    });
  });

  function deleteProduct(id) {
    fetch(`http://127.0.0.1:8080/delete/product/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          swal("Product has been deleted!", {
            icon: "success",
          }).then(() => {

            window.location.href = "http://127.0.0.1:8080/products";
          });
        } else {
          swal("Oops! Something went wrong.", {
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        swal("Oops! Something went wrong.", {
          icon: "error",
        });
      });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const updateForm = document.getElementById("product-update-form");
  const productId = window.location.search.split("=")[1];

  updateForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(updateForm);

    const updatedProduct = {
      productName: formData.get("productName"),
      condition: formData.get("condition"),
      price: formData.get("price"),
      age_range: formData.get("age"),
      quantity: formData.get("quantity"),
      category: formData.get("category"),
      description: formData.get("description"),
      image: formData.get("productPhotos"),
      
    };
    updateProduct(productId, updatedProduct);
  });

  function updateProduct(id, updatedProduct) {
    fetch(`http://127.0.0.1:8080/update/product/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          swal("Product has been updated!", {
            icon: "success",
          }).then(() => {
          
            window.location.href = "http://127.0.0.1:8080/products";
          });
        } else {
          swal("Oops! Something went wrong.", {
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        swal("Oops! Something went wrong.", {
          icon: "error",
        });
      });
  }
});
