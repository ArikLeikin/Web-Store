/*collapsible-div for address button*/
$(document).ready(function () {
  console.log("inside");
  var coll = document.getElementsByClassName("collapsible-div");
  var i;
  for (i = 0; i < coll.length; i++) {
    console.log(coll[i]);

    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");

      var content = this.nextElementSibling;
      content.classList.toggle("slideout");

      if (content.style.display === "block") {
        content.style.display = "none";
        content.classList.toggle("slidein");
        content.classList.toggle("slideout");
      } else {
        content.style.display = "block";
        content.classList.toggle("slidein");
        content.classList.toggle("slideout");
      }
    });
  }
});

//Users
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

  // Function to filter table rows based on user input
  function filterTable(searchQuery) {
    const rows = tableBody.find("tr");
    rows.hide();

    rows.each(function () {
      const row = $(this);
      const columns = row.find("td");

      columns.each(function () {
        const cellText = $(this).text();
        if (cellText.toLowerCase().includes(searchQuery.toLowerCase())) {
          row.show();
          return false;
        }
      });
    });
  }
  $("#search-input").on("input", function () {
    const searchQuery = $(this).val();
    filterTable(searchQuery);
  });

  // Function to create a table row
  function createTableRow(data) {
    const row = $("<tr>");
    row.append($("<td>").text(data.name.firstName));
    row.append($("<td>").text(data.name.lastName));
    row.append($("<td>").text(data.email || "-"));
    row.append($("<td>").text(data.phoneNumber || "-"));

    const editButton = $("<button>").addClass("edit-button").text("Edit User");
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
          text: "Phone number must be 10 digits and need to be start in '05'.",
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

  function validatePhoneNumber(str) {
    return /^05\d{8}$/.test(str);
  }

 

  function validateName(str) {
    return /^[A-Za-z\s]+$/.test(str);
  }

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
    $.ajax({
      url: "http://127.0.0.1:8080/api/current-user",
      method: "GET",
      dataType: "json",
      success: function (userData) {
        const LogedinId = userData._id;
        if(LogedinId ===userId)
        {
          if (confirm("Are you sure you want to delete YOUR USER?")) {
            deleteUser(userId);
            window.location.href = "http://127.0.0.1:8080/logout"
          }
        }
        else{
          if (confirm("Are you sure you want to delete this user?")) {
            deleteUser(userId);
          }
        }

      },
      error: function (error) {
        console.error("Error fetching user data:", error);
      },
    });
    
    
  });
});

//products

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
          cell.innerHTML = '<img src="' + product[field] + '" width="100">';
        } else if (field === "added_date") {
          cell.innerHTML = product[field].split("T")[0];
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

  function filterTable(searchQuery) {
    const rows = document.querySelectorAll("#productTable tr"); // Get all rows in the table

    rows.forEach(function (row, index) {
      if (index === 0) return; // Skip the header row

      const cells = row.querySelectorAll("td"); // Get all cells in the row
      let shouldShowRow = false;

      cells.forEach(function (cell) {
        const cellText = cell.textContent || cell.innerText;
        if (cellText.toLowerCase().includes(searchQuery.toLowerCase())) {
          shouldShowRow = true;
        }
      });

      row.style.display = shouldShowRow ? "table-row" : "none";
    });
  }

  // Event listener for the search input
  const searchInput = document.getElementById("search-product-input");
  searchInput.addEventListener("input", function () {
    const searchQuery = this.value;
    filterTable(searchQuery);
  });

  //orders

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

      var fields = ["products", "total_price", "order_date", "status"];

      fields.forEach(function (field) {
        var cell = row.insertCell();
        if (field === "products") {
          cell.textContent = order.products.length;
        } else if (field === "order_date") {
          cell.textContent = order[field].split("T")[0];
        } else {
          cell.textContent = order[field];
        }
      });

      var OrderId = order._id;

      var actionCell = row.insertCell();
      var viewDetailsButton = document.createElement("button");
      viewDetailsButton.className = "edit-button";
      viewDetailsButton.textContent = "View Details";
      viewDetailsButton.addEventListener("click", function () {
        window.location.href =
          "http://127.0.0.1:8080/order-update?id=" + OrderId;
      });
      actionCell.appendChild(viewDetailsButton);

      var deleteOrderButton = document.createElement("button");
      deleteOrderButton.className = "delete-button";
      deleteOrderButton.textContent = "Delete Order";
      deleteOrderButton.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this order?")) {
          console.log("confirmation before order delete");
          deleteOrder(OrderId);
        }
      });
      actionCell.appendChild(deleteOrderButton);

      // Function to filter order table rows based on user input
      function filterOrderTable(searchQuery) {
        const rows = document.querySelectorAll("#orderTable tr"); // Get all rows in the table

        rows.forEach(function (row, index) {
          if (index === 0) return; // Skip the header row

          const cells = row.querySelectorAll("td"); // Get all cells in the row
          let shouldShowRow = false;

          cells.forEach(function (cell) {
            const cellText = cell.textContent || cell.innerText;
            if (cellText.toLowerCase().includes(searchQuery.toLowerCase())) {
              shouldShowRow = true;
            }
          });

          row.style.display = shouldShowRow ? "table-row" : "none";
        });
      }

      // Event listener for the order search input
      const orderSearchInput = document.getElementById("search-orders-input");
      orderSearchInput.addEventListener("input", function () {
        const searchQuery = this.value;
        filterOrderTable(searchQuery);
      });

      function deleteOrder(orderId) {
        console.log("start delete order process");
        $.ajax({
          url: `http://127.0.0.1:8080/delete/order/${orderId}`,
          method: "POST",
          success: function (response) {
            console.log(response);
            location.reload();
          },
          error: function (error) {
            console.error("order delete Error:", error);
            console.log("Error response:", error.responseText); // Print the error response text
          },
        });
      }
    });
  }
});

//Store Locations
$(document).ready(function () {
  // Function to fetch data from the API endpoint
  async function fetchData() {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/store-locations");
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Function to populate the table with data
  async function populateTable() {
    const tableBody = document.querySelector("#store-table tbody");
    const data = await fetchData();

    data.forEach((item) => {
      var ID = item._id;
      const row = tableBody.insertRow();
      const addressCell = row.insertCell();
      const phoneNumberCell = row.insertCell();
      const phoneAreaCodeCell = row.insertCell();
      const longitudeCell = row.insertCell();
      const latitudeCell = row.insertCell();
      const actionCell = row.insertCell(); // New Action cell

      addressCell.textContent = item.address;
      phoneNumberCell.textContent = item.phone_number;
      phoneAreaCodeCell.textContent = item.phone_area_code;
      longitudeCell.textContent = item.longitude;
      latitudeCell.textContent = item.latitude;

      var editButton = document.createElement("button");
      editButton.className = "edit-button";
      editButton.setAttribute("data-id", item._id);
      editButton.textContent = "Edit Address";
      editButton.addEventListener("click", function () {
        var storagetId = this.getAttribute("data-id");
        window.location.href =
          "http://127.0.0.1:8080/store-location-edit?id=" + storagetId;
      });


      var deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.setAttribute("data-id", item._id);
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
      var storeId = this.getAttribute("data-id");
      if(confirm("Are you sure you want to delete this store location?"))
      {
        deleteStoreLocation(ID); 
      }
      
    });
       actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
      /*actionCell.appendChild(editButton);
      // Create an Edit Address button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit Address";
      editButton.addEventListener("click", () => {
        // Redirect to the specified URL
        window.location.href =
          "http://127.0.0.1:8080/store-location-edit?id=" + ID;
      });*/
      actionCell.appendChild(editButton);
    });
  }

  // Call the populateTable function to populate the table
  populateTable();

  function updateTableWithSearch(query) {
    const tableBody = document.querySelector("#store-table tbody");
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row) => {
      const addressCell = row.cells[0];
      const phoneNumberCell = row.cells[1];
      const phoneAreaCodeCell = row.cells[2];
      const longitudeCell = row.cells[3];
      const latitudeCell = row.cells[4];

      const addressText = addressCell.textContent.toLowerCase();
      const phoneNumberText = phoneNumberCell.textContent.toLowerCase();
      const phoneAreaCodeText = phoneAreaCodeCell.textContent.toLowerCase();
      const longitudeText = longitudeCell.textContent.toLowerCase();
      const latitudeText = latitudeCell.textContent.toLowerCase();

      // const deleteButton = row.querySelector(".delete-button");
      // if (deleteButton) {
      //   deleteButton.addEventListener("click", function () {
      //     var storeId = this.getAttribute("data-id");
      //     deleteStoreLocation(storeId);
      //   });
      // }



      if (
        addressText.includes(query) ||
        phoneNumberText.includes(query) ||
        phoneAreaCodeText.includes(query) ||
        longitudeText.includes(query) ||
        latitudeText.includes(query)
      ) {
        row.style.display = ""; // Show the row
      } else {
        row.style.display = "none"; // Hide the row
      }
    });
  }

  // Attach event listener to the search input
  const searchInput = document.getElementById("search-locations-input");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    updateTableWithSearch(query);
  });


  $("#add-location-form").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    // Get the input values
  
    var phoneNumber = $("#phonenumber").val();
    var phoneareacode = $("#phoneareacode").val();
    var longitude = $("#longitude").val();
    var latitude = $("#latitude").val();
    let isValid = true;
  
    if (!validatePhoneNumber1(phoneNumber)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone number can be only 9 or 10 digits and must begin with 0",
      });
      isValid = false;
    }
  
    if (!containsDigits(phoneareacode)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone Area Code should be only digits.",
      });
      isValid = false;
    }
  
    if (!containsDigitsAndDot(longitude)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Longitude should be only digits and a dot.",
      });
      isValid = false;
    }
  
    if (!containsDigitsAndDot(latitude)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Latitude should be only digits and a dot.",
      });
      isValid = false;
    }
  
    if (isValid) {
      var formData = {
          address:$("#address").val(),
          phone_number: $("#phonenumber").val(),
          phone_area_code:$("#phoneareacode").val(),
          latitude:$("#latitude").val(),
          longitude: $("#longitude").val() 
      };
      console.log(formData);
      addLocation(formData)
      addRowToTable(formData);
      
    }
  });

  function addLocation(formData)
{
  $.ajax({
    url: `http://127.0.0.1:8080/create/store-locations`,
    type: "POST",
    data: formData,
    success: function (response) {
      // Handle the response data here
      console.log(response);
      alert("The new store location is successfully added");
      //addRowToTable(response);
      
    },
    error: function (error) {
      // Handle errors here
      console.error("Error:", error);
    },
  });

}


});


async function deleteStoreLocation(storeId) {
  try {
    const response = await fetch(`http://127.0.0.1:8080/delete/store-locations/${storeId}`, {
      method: "POST",
    });

    if (response.ok) {
      // If successful response, remove the corresponding row from the table
      const rowToDelete = document.querySelector(`[data-id="${storeId}"]`).parentNode.parentNode;
      rowToDelete.parentNode.removeChild(rowToDelete);
    } else {
      console.error("Error deleting store location");
    }
  } catch (error) {
    console.error("Error deleting store location:", error);
  }
}






function validatePhoneNumber1(str) {
  return /^(05\d{8}|0\d{8})$/.test(str);
}


function containsDigits(input) {
return /\d+/.test(input);
}

function containsDigitsAndDot(input) {
return /^[\d.]+$/.test(input);
}


function addRowToTable(item) {
  console.log("new row" + item);
  const tableBody = document.querySelector("#store-table tbody");
  const row = tableBody.insertRow();
  const addressCell = row.insertCell();
  const phoneNumberCell = row.insertCell();
  const phoneAreaCodeCell = row.insertCell();
  const longitudeCell = row.insertCell();
  const latitudeCell = row.insertCell();
  const actionCell = row.insertCell(); 

  addressCell.textContent = item.address;
  phoneNumberCell.textContent = item.phone_number;
  phoneAreaCodeCell.textContent = item.phone_area_code;
  longitudeCell.textContent = item.longitude;
  latitudeCell.textContent = item.latitude;

  var editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.setAttribute("data-id", item._id);
  editButton.textContent = "Edit Address";
  editButton.addEventListener("click", function () {
    var storagetId = this.getAttribute("data-id");
    window.location.href =
      "http://127.0.0.1:8080/store-location-edit?id=" + item._id;
  });

  var deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.setAttribute("data-id", item._id);
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    var storeId = this.getAttribute("data-id");
    if (confirm("Are you sure you want to delete this store location?")) {
      deleteStoreLocation(item._id);
    }
  });
  actionCell.appendChild(deleteButton);
  actionCell.appendChild(editButton);
 
  
  window.location.href = "http://127.0.0.1:8080/manager"
}