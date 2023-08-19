
// document.addEventListener("DOMContentLoaded", () => {
//     createEmployeeList();
//     const userManagementSection = document.getElementById("user-management");
//     const supplierManagementSection = document.getElementById("supplier-management");
//     const contentManagementSection = document.getElementById("content-management");

//     userManagementSection.addEventListener("click", handleUserManagement);
//     supplierManagementSection.addEventListener("click", handleSupplierManagement);
//     contentManagementSection.addEventListener("click", handleContentManagement);
// });

// document.addEventListener("DOMContentLoaded", function () {
// // Sample user data
// const users = [
//     { email: "user1@example.com", password: "password1" },
//     { email: "user2@example.com", password: "password2" },
//     { email: "user3@example.com", password: "password3" }
// ];

// const userTable = document.querySelector("#user-table tbody");


// function createUserTable() {
//     users.forEach((user, index) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${user.email}</td>
//             <td>${user.password}</td>
//             <td><button onclick="deleteUser(${index})">Delete</button></td>
//         `;
//         userTable.appendChild(row);
//     });
// }


// function addUser() {
//     const newUser = {
//         email: "newuser@example.com",
//         password: "newpassword"
//     };

//     users.push(newUser);
//     const newRow = document.createElement("tr");
//     newRow.innerHTML = `
//         <td>${newUser.email}</td>
//         <td>${newUser.password}</td>
//         <td><button onclick="deleteUser(${users.length - 1})">Delete</button></td>
//     `;
//     userTable.appendChild(newRow);
// }


// function deleteUser(index) {
//     users.splice(index, 1);
//     userTable.innerHTML = ""; 
//     createUserTable(); 
// }


// document.addEventListener("DOMContentLoaded", () => {
//     createEmployeeList();
//     createUserTable();

//     const addUserButton = document.getElementById("add-user-btn");
//     addUserButton.addEventListener("click", addUser);

// });



   
//   });

document.addEventListener("DOMContentLoaded", function() {
    const userTable = document.getElementById("userTable");
    const addUserBtn = document.getElementById("addUserBtn");
    const newEmailInput = document.getElementById("newEmail");
    const newPasswordInput = document.getElementById("newPassword");
  
    // Sample initial user data
    const initialUsers = [
      { email: "user1@example.com", password: "password123" },
      { email: "user2@example.com", password: "securepass" },
      // Add more initial users as needed
    ];
  
    // Populate the table with initial user data
    initialUsers.forEach(user => {
      addUserToTable(user.email, user.password);
    });
  
    // Function to add a user to the table
    function addUserToTable(email, password) {
      const newRow = userTable.insertRow();
      newRow.innerHTML = `
        <td>${email}</td>
        <td>${password}</td>
        <td><button class="deleteBtn">Delete</button></td>
      `;
  
      const deleteBtn = newRow.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", function() {
        userTable.deleteRow(newRow.rowIndex);
      });
    }
  
    // Add user button click event
    addUserBtn.addEventListener("click", function() {
      const newEmail = newEmailInput.value;
      const newPassword = newPasswordInput.value;
      if (newEmail && newPassword) {
        addUserToTable(newEmail, newPassword);
        newEmailInput.value = "";
        newPasswordInput.value = "";
      }
    });
  });

  


document.addEventListener("DOMContentLoaded", function() {
    const SupplierTable = document.getElementById("supplierTable");
    const addSupplierBtn = document.getElementById("addSupplierBtn");
    const newEmailInput = document.getElementById("newEmail");
    const newPasswordInput = document.getElementById("newPassword");
  
    // Sample initial user data
    const initialUsers = [
      { email: "supplier@example.com", password: "password123" },
      { email: "supplier2@example.com", password: "securepass" },
      // Add more initial users as needed
    ];
  
    // Populate the table with initial user data
    initialUsers.forEach(user => {
        addSupplierToTable(user.email, user.password);
    });
  
    // Function to add a user to the table
    function addSupplierToTable(email, password) {
      const newRow = SupplierTable.insertRow();
      newRow.innerHTML = `
        <td>${email}</td>
        <td>${password}</td>
        <td><button class="deleteBtn">Delete</button></td>
      `;
  
      const deleteBtn = newRow.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", function() {
        SupplierTable.deleteRow(newRow.rowIndex);
      });
    }
  
    // Add user button click event
    addSupplierBtn.addEventListener("click", function() {
      const newEmail = newEmailInput.value;
      const newPassword = newPasswordInput.value;
      if (newEmail && newPassword) {
        addSupplierToTable(newEmail, newPassword);
        newEmailInput.value = "";
        newPasswordInput.value = "";
      }
    });
  });


