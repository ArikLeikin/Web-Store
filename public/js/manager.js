// $(document).ready(function () {
//     $("#add-user-form").submit(function (event) {
//       event.preventDefault();
//       let isValid = true;
  
//       const FirstName = $("#firstname").val();
//       if (!validateName(FirstName)) {
//         // Swal.fire({
//         //   icon: "warning",
//         //   title: "Validation Error",
//         //   text: "First name can only contain letters.",
//         // });
//          showError("#firstname-error", "First name can only contain letters.");
//         isValid = false;
//       }
  
//       const LastName = $("#lastname").val();
//       if (!validateName(LastName)) {
//         // Swal.fire({
//         //   icon: "warning",
//         //   title: "Validation Error",
//         //   text: "Last name can only contain letters.",
//         // });
//         showError("#lastname-error", "Last name can only contain letters.");
//         isValid = false;
//       }
  
//       const phone = $("#phoneNumber").val();
//       if (!validatePhoneNumber(phone)) {
//         // Swal.fire({
//         //   icon: "warning",
//         //   title: "Validation Error",
//         //   text: "Phone number must be 10 digits.",
//         // });
//         showError("#phoneNumber-error", "Phone number must be 10 digits.");
//         isValid = false;
//       }

//       const password = $("#password").val();
//       var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
//     if (!passwordPattern.test(password)) {
//       // Swal.fire({
//       //   icon: "error",
//       //   title: "Invalid Password",
//       //   text: "Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.",
//       // });
//       showError("#password-error", "Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.");
//       isValid = false;
//     }

//     // if (!isValid) {
//     //   event.returnValue = false; 
//     //   }

//     });
// });

// function showError(element, message) {
//   $(element).text(message).css("color", "red");
// }

// function clearErrorMessages() {
//   $(".error-message").text("");
// }
// function validatePhoneNumber(phone) {
//     return /^\d{10}$/.test(phone);
//   }

//   function validateName(str) {
//     return /^[A-Za-z\s]+$/.test(str);
//   }

//   function containsAtSymbol(inputString) {
//     const pattern = /@/;
//     return pattern.test(inputString);
//   }




$(document).ready(function () {
    const baseUrl = "http://127.0.0.1:8080"; // Base URL
    const tableBody = $("#data-table tbody");

    // Function to fetch users from the server
    function fetchUsers() {
      $.ajax({
        url: `${baseUrl}/api/users`,
        method: "GET",
        dataType: "json",
        success: function (data) {
          const users = data; // Assuming the array is directly in the response
          tableBody.empty(); // Clear the table body before adding new rows

          users.forEach(function (user) {
            const row = createTableRow(user);
            tableBody.append(row);
          });
        },
        error: function (error) {
          console.error("Error:", error);
        },
      });
    }

    // Initial fetching of users
    fetchUsers();

    // Function to create a table row
    function createTableRow(data) {
      const row = $("<tr>");
      row.append($("<td>").text(data.name.firstName));
      row.append($("<td>").text(data.name.lastName));
      row.append($("<td>").text(data.email || "-"));
      row.append($("<td>").text(data.phoneNumber || "-"));;

        const editButton = $("<button>")
        .addClass("edit-button")
        .text("Edit User");
        editButton.data("userid", data._id);

      const deleteButton = $("<button>")
        .addClass("delete-button")
        .text("Delete User");
      deleteButton.data("userid", data._id);

      const actionCell = $("<td>").append(editButton, " ", deleteButton);
      row.append(actionCell);
      return row;
    }

    // Function to add a new user
    function addUser(newUser) {
      $.ajax({
        url: `${baseUrl}/create/user`,
        method: "POST",
        data: newUser,
        dataType: "json",
        success: function () {
          fetchUsers(); // Refresh the user list after adding
        },
        error: function (error) {
          console.error("Error:", error);
        },
      });
    }

      $(document).ready(function () {
    $("#add-user-form").submit(function (event) {
      event.preventDefault();
      clearErrorMessages();
      let isValid = true;
  
      const FirstName = $("#firstName").val();
      if (!validateName(FirstName)) {
           Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "First name can only contain letters.",
        });
        //showError("#firstName-error", "First name can only contain letters.");
        isValid = false;
      }
  
      const LastName = $("#lastName").val();
      if (!validateName(LastName)) {
         Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Last name can only contain letters.",
      });
        //showError("#lastName-error", "Last name can only contain letters.");
        isValid = false;
      }
  
      const phone = $("#phoneNumber").val();
      if (!validatePhoneNumber(phone)) {
         Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Phone number must be 10 digits.",
         });
       // showError("#phoneNumber-error", "Phone number must be 10 digits.");
        isValid = false;
      }

      const password = $("#password").val();
      var passwordPattern = /^(?=.{4,})/;
    if (!passwordPattern.test(password)) {
            Swal.fire({
              icon: "error",
              title: "Invalid Password",
              text: "Password must contain at least 4 characters.",
            });
      //showError("#password-error", "Password must contain at least 4 characters.");
      isValid = false;
    }

    if (isValid) {
      const newUser = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      email: $("#email").val(),
      phoneNumber: $("#phoneNumber").val(),
      password: $("#password").val(),
    };

    addUser(newUser);

    // Clear the form fields after submission
    $(this).trigger("reset");
          
          }

    });
});

function showError(element, message) {
  $(element).text(message).css("color", "red");
}
function clearErrorMessages() {
  $(".error-message").text("");
}

function validatePhoneNumber(phone) {
    return /^\d{10}$/.test(phone);
  }

  function validateName(str) {
    return /^[A-Za-z\s]+$/.test(str);
  }



    // // Add User Form submission event
    // $("#add-user-form").submit(function (event) {
    //   event.preventDefault();

    //   const newUser = {
    //     firstName: $("#firstName").val(),
    //     lastName: $("#lastName").val(),
    //     email: $("#email").val(),
    //     phoneNumber: $("#phoneNumber").val(),
    //     password: $("#password").val(),
    //   };

    //   addUser(newUser);

    //   // Clear the form fields after submission
    //   $(this).trigger("reset");
    // });

    // Function to delete a user
    function deleteUser(userId) {
      $.ajax({
        url: `${baseUrl}/delete/user/${userId}`, 
        method: "POST",
        success: function () {
          fetchUsers(); // Refresh the user list after deletion
        },
        error: function (error) {
          console.error("Error:", error);
        },
      });
    }

    tableBody.on("click", ".edit-button", function () {
        const userId = $(this).data("userid");
        window.location.href = "http://127.0.0.1:8080/edit-user?id=" + userId;   
      });

  
    tableBody.on("click", ".delete-button", function () {
      const userId = $(this).data("userid");
      if (confirm("Are you sure you want to delete this user?")) {
        deleteUser(userId);
      }
    });
  });






  $(document).ready(function () {
    $.ajax({
      url: "http://127.0.0.1:8080/api/products",
      type: "GET",
      dataType: "json",
      success: function (data) {
        populateTable(data);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });

    function populateTable(products) {
      var table = document.getElementById("productTable");

      products.forEach(function (product) {
        var row = table.insertRow();

        var fields = [
          "title",
          "price",
          "description",
          "image",
          "condition",
          "category",
          "added_date",
          "quantity",
          "age_range",
        ];

        fields.forEach(function (field) {
          var cell = row.insertCell();
          

          if (field === "image") {
            cell.innerHTML = 
              '<img src="' +  product[field] + '" width="100">';
          } else {
            cell.innerHTML = product[field];
          }
        });
        var actionCell = row.insertCell();
        var editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.setAttribute("data-id", product._id);
        editButton.textContent = "Edit Product";
        editButton.addEventListener("click", function () {
          var productId = this.getAttribute("data-id");
          window.location.href =
            "http://127.0.0.1:8080/product-update?id=" + productId;
        });
        actionCell.appendChild(editButton);

      });
     }

     $("#addProductsButton").on("click", function () {
        window.location.href = "http://127.0.0.1:8080/supplier";
      });





        
        
        $.ajax({
          url: "http://127.0.0.1:8080/api/orders",
          type: "GET",
          dataType: "json",
          success: function (data) {
            populateOrderTable(data);
          },
          error: function (xhr, status, error) {
            console.error("Error:", error);
          },
        });
    
        function populateOrderTable(orders) {
          var table = document.getElementById("orderTable");
    
          orders.forEach(function (order) {
            var row = table.insertRow();
    
            var fields = ["user_info","products", "total_price", "order_date", "status"];
    
            fields.forEach(function (field) {
              var cell = row.insertCell();
              if(field==="products")
              {
                cell.textContent = order.products.length;
              }
              else{
                cell.textContent = order[field];
              }
              
            });

            var OrderId=order._id;
    
            var actionCell = row.insertCell();
            var viewDetailsButton = document.createElement("button");
            viewDetailsButton.className = "view-details-button";
            viewDetailsButton.textContent = "View Details";
            viewDetailsButton.addEventListener("click", function () {
                window.location.href = "http://127.0.0.1:8080/order-update?id=" + OrderId;
              });
            actionCell.appendChild(viewDetailsButton);

            
            var deleteOrderButton = document.createElement("button");
            deleteOrderButton.className = "delete-order-button";
            deleteOrderButton.textContent = "Delete Order";
            deleteOrderButton.addEventListener("click", function () {
              if (confirm("Are you sure you want to delete this order?")) {
                deleteOrder(OrderId);
              }
           });
           actionCell.appendChild(deleteOrderButton);



            function deleteOrder(orderId) {
              $.ajax({
                url: `http://127.0.0.1:8080/delete/order/${orderId}` ,
                type: "POST",
                success: function () {
                  console.log("delete");
                  location.reload();
                },
                error: function (xhr, status, error) {
                  console.error("Error:", error);
                },
              });
            }
          });
        }
     


 });
