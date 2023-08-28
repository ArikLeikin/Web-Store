$(document).ready(function () {
  $("#UpdateYad2-form").submit(function (event) {
    event.preventDefault();
    clearErrorMessages();

    let isValid = true;
    var price = $("#price").val();
    //var bankAccount = $("#bankAccount").val();
    var productName = $("#productName").val();

    if (!validateLettersDigitsAndSpaces(productName)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Product name should be only letters or digits, and at least 4 characters.',
      });
      // $("#productName-error").text("Product name should be only letters or digits.");
      isValid= false; 
    }


    if (!containsOnlyNumbers(price)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter a valid price (numbers only and greater than zero).',
      });
      // showError(
      //   "#price-error",
      //   "Please enter a valid price (numbers only and greater than zero)."
      // );
      isValid = false;
    }

    // if (!ValidBankAccount(bankAccount)) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Validation Error',
    //     text: 'Please enter a valid bank account (14 digits).',
    //   });
    //   // showError(
    //   //   "#bankAccount-error",
    //   //   "Please enter a valid bank account (14 digits)."
    //   // );
    //   isValid = false;
    // }

    var productPhotos = $("#productPhotos")[0].files;
    if (productPhotos.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please upload at least 1 photo.',
      });
      isValid = false;
    } else if (productPhotos.length > 4) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'You can upload a maximum of 4 photos.',
      });
      isValid = false;

    }
  });
});

function validateLettersDigitsAndSpaces(str) {
  return /^[a-zA-Z0-9 ]{4,}$/.test(str);
}
function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}
function ValidBankAccount(str) {
  return str.length === 14 && /^[0-9]{14}$/.test(str);
}


function showError(element, message) {
  $(element).text(message).css("color", "red");
}

function clearErrorMessages() {
  $(".error-message").text("");
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
           console.log("success");
            window.location.href = "http://127.0.0.1:8080/products?category=yad2";

      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        
      });
  }
});




$(document).ready(function() {
  const productId = window.location.search.split("=")[1];
  console.log(productId);
  const productUpdateForm = document.getElementById('UpdateYad2-form');

  productUpdateForm.addEventListener('submit', event => {
    event.preventDefault();
    var category = $("#category").val();
    var age_range = $("#age").val();
    var title = $("#productName").val();
    var price = $("#price").val();
    var condition = $("#condition").val();
    var quantity = $("#quantity").val();
    var description = $("#description").val();
    var image = $("#productPhotos")[0].files;

    var formData = new FormData();
   
    formData.append("category", category);
    formData.append("age_range", age_range);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("condition", condition);
    //formData.append("bankAccount", bankAccount);
    formData.append("description", description);
    for (var i = 0; i < image.length; i++) {
      formData.append("image[]", image[i]);
    }

    $.ajax({
            url: `http://127.0.0.1:8080/Yad2Update/${productId}`,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                console.log("success");
                window.location.href = "http://127.0.0.1:8080/products?category=yad2";
            },
            error: function(error) {
              console.error("Error updating product:", error);
            }
          });

  });

  $.ajax({
    url: `http://127.0.0.1:8080/api/product/${productId}`,
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log(data.data);

      $('#productName').val(data.data.title);
      $('#condition').val(data.data.condition);
      $('#price').val(data.data.price);
      $('#age').val(data.data.age_range);
      //$('#bankAccount').val(data.data.bankAccount);
      $('#category').val(data.data.category);
      $('#description').val(data.data.description);

      const files = data.data.image.map(path => {
        const parts = path.split('/');
        const fileName = parts[parts.length - 1];
        return new File([path], fileName);
      });
    
      const fileList = new DataTransfer();
      files.forEach(file => {
        fileList.items.add(file);
      });
      const fileInput = $('input[name="image[]"]');
      fileInput[0].files = fileList.files;

    },
    error: function(error) {
      console.error('Error fetching product data:', error);
    }
  });


});