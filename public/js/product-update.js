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
        icon: "warning",
        title: "Validation Error",
        text: "Quantity should only contain digits.",
      });
      isValid = false;
    }

    if (!validateLettersDigitsAndSpaces2(description)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Descriptionn should be at leat 5 characters.",
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
    deleteProduct(productId);
  });

  function deleteProduct(id) {
    fetch(`http://127.0.0.1:8080/delete/product/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
         window.location.href = "http://127.0.0.1:8080/products";
        

      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        
      });
  }
});


// document.addEventListener("DOMContentLoaded", function () {
//   const updateForm = document.getElementById("product-update-form");
//   const productId = window.location.search.split("=")[1];
//   console.log(productId);

//   updateForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     var category = $("#category").val();
//     var age_range = $("#age").val();
//     var title = $("#productName").val();
//     var price = $("#price").val();
//     var condition = $("#condition").val();
//     var quantity = $("#quantity").val();
//     var description = $("#description").val();
//     var image = $("#productPhotos")[0].files;

//     var formData = new FormData();
   
//     formData.append("category", category);
//     formData.append("age_range", age_range);
//     formData.append("title", title);
//     formData.append("price", price);
//     formData.append("condition", condition);
//     formData.append("quantity", quantity);
//     formData.append("description", description);
//     for (var i = 0; i < image.length; i++) {
//       formData.append("image[]", image[i]);
//     }

//     for (const [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }


//     updateProduct(productId, formData);
//   });

//   function updateProduct(id, updatedProduct) {
//     $.ajax({
//       url: `http://127.0.0.1:8080/update/product/${id}`,
//       type: "POST",
//       contentType: "application/json",
//       data: updatedProduct,
//       contentType: false,
//       processData: false,
//       success: function(data) {
//         if (data.success) {
//           window.location.href = "http://127.0.0.1:8080/products";
//         }
//       },
//       error: function(error) {
//         console.error("Error updating product:", error);
//       }
//     });
//   }
  
// });


// document.addEventListener('DOMContentLoaded', () => {
//   const productId = window.location.search.split("=")[1];
//   const productUpdateForm = document.getElementById('product-update-form');
//   fetchProductData(productId);
//   productUpdateForm.addEventListener('submit', event => {
//     event.preventDefault();
//     updateProduct(productId);
//   });

//   function fetchProductData(productId) {
//     $.ajax({
//       url: `http://127.0.0.1:8080/api/product/${productId}`,
//       method: 'GET',
//       success: productData => {
//         $('#productName').val(productData.title);
//         $('#condition').val(productData.condition);
//         $('#price').val(productData.price);
//         $('#age').val(productData.age_range);
//         $('#quantity').val(productData.quantity);
//         $('#category').val(productData.category);
//         $('#description').val(productData.description);
//         // const imageUrls = productData.image; 
//         // if (imageUrls && Array.isArray(imageUrls)) {
//         //   const imageContainer = document.getElementById('image-container');
//         //   imageUrls.forEach(imageUrl => {
//         //     const imageElement = document.createElement('img');
//         //     imageElement.src = imageUrl;
//         //     imageElement.alt = 'Product Image';
//         //     imageContainer.appendChild(imageElement);
//         //   });
//         // }
//       },
//       error: error => {
//         console.error('Error fetching product data:', error);
//       }
//     });
//   }

//   // function updateProduct(productId) {
//   //   var category = $("#category").val();
//   //   var age_range = $("#age").val();
//   //   var title = $("#productName").val();
//   //   var price = $("#price").val();
//   //   var condition = $("#condition").val();
//   //   var quantity = $("#quantity").val();
//   //   var description = $("#description").val();
//   //   var image = $("#productPhotos")[0].files;

//   //   var formData = new FormData();
   
//   //   formData.append("category", category);
//   //   formData.append("age_range", age_range);
//   //   formData.append("title", title);
//   //   formData.append("price", price);
//   //   formData.append("condition", condition);
//   //   formData.append("quantity", quantity);
//   //   formData.append("description", description);
//   //   for (var i = 0; i < image.length; i++) {
//   //     formData.append("image[]", image[i]);
//   //   }

//   //   $.ajax({
//   //     url: `http://127.0.0.1:8080/api/product/${productId}`,
//   //     method: 'POST', 
//   //     contentType: 'application/json',
//   //     // data: JSON.stringify(formData),
//   //     data: updatedProduct,
//   //     contentType: false,
//   //     processData: false,
//   //     success: updatedProduct => {
//   //       console.log('Product updated:', updatedProduct);
//   //     },
//   //     error: error => {
//   //       console.error('Error updating product:', error);
       
//   //     }
//   //   });
//   // }
// });




$(document).ready(function() {
  const productId = window.location.search.split("=")[1];
  console.log(productId);
  const productUpdateForm = document.getElementById('product-update-form');

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
    formData.append("quantity", quantity);
    formData.append("description", description);
    for (var i = 0; i < image.length; i++) {
      formData.append("image[]", image[i]);
    }
    console.log(image);

    $.ajax({
            url: `http://127.0.0.1:8080/update/product/${productId}`,
            type: "POST",
            // contentType: "application/json",
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
              window.location.href = "http://127.0.0.1:8080/products";
              
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
      $('#quantity').val(data.data.quantity);
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

      // const fileInput = $('input[name="image[]"]');
      // console.log(fileInput[0].files);
      // // Set initial values of the file input
      // data.data.image.forEach(path => {
      //   const parts = path.split('/');
      //   const fileName = parts[parts.length - 1];
      //   const file = new File([path], fileName);
      //   fileInput[0].files.push(file);
      // });

        //  const imageUrls = data.data.image; 
        // if (imageUrls && Array.isArray(imageUrls)) {
        //   const imageContainer = document.getElementById('image-container');
        //   imageUrls.forEach(imageUrl => {
        //     const imageElement = document.createElement('img');
        //     imageElement.src = imageUrl;
        //     imageElement.alt = 'Product Image';
        //     imageContainer.appendChild(imageElement);
        //   });
        // }
    },
    error: function(error) {
      console.error('Error fetching product data:', error);
    }
  });


});
