$(document).ready(function () {
  // Update email form submission
  $("#updateEmailForm").submit(function (event) {
    event.preventDefault();
    const newEmail = $("#newEmail").val();
    // Logic to update email goes here
  });

  // Generate accordion cards for order history
  for (let i = 1; i <= 3; i++) {
    $("#orderHistoryAccordion").append(`
            <div class="card">
                <div class="card-header" data-toggle="collapse" data-target="#order${i}">
                    Order ${i}
                </div>
                <div class="card-content collapse" id="order${i}">
                    <!-- Order ${i} details go here -->
                </div>
            </div>
        `);
  }
});

/*collapsible-div for address button*/
$(document).ready(function () {
  var coll = document.getElementsByClassName("collapsible-div");
  var i;
  for (i = 0; i < coll.length; i++) {
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

function show(showPage) {
  $(".page-section").hide();
  $("#" + showPage).show();
}

$(document).ready(function () {
  show("order-history"); /*default tab*/

  $("#order-history-link").click(function () {
    show("order-history");
  });

  $("#personal-details-link").click(function (e) {
    show("personal-details");
  });

  $("#change-password-link").click(function () {
    show("change-password");
  });

  $("#addresses-link").click(function () {
    show("addresses");
  });

  $("#payment_methods-link").click(function () {
    show("payment-methods");
  });

  $("#wish_list-link").click(function () {
    show("wish-list");
  });

  $("#yad2_list-link").click(function () {
    show("yad2-list");
  });
});

$(document).ready(function () {
  $("#update-details-form").submit(function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the input values
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var phoneNumber = $("#phoneNumber").val();
    var email = $("#email").val();

    let isValid = true;

    if (!validateOnlyLetters(firstName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "First name should be only letters.",
      });
      isValid = false;
    }

    if (!validateOnlyLetters(lastName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Last name should be only letters.",
      });
      isValid = false;
    }
    function validateOnlyLetters(str) {
      return /^[a-zA-Z]+$/.test(str);
    }

    if (!validateTenDigits(phoneNumber)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone number can be only 10 digits",
      });
      isValid = false;
    }

    function validateTenDigits(str) {
      return /^\d{10}$/.test(str);
    }

    if (!validateContainsAtSymbol(email)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Email address should contain @.",
      });
      isValid = false;
    }

    function validateContainsAtSymbol(str) {
      return /@/.test(str);
    }

    if (!isValid) {
      return false;
    }
  });
});

$(".btn-account-page").click(function () {
  // event.preventDefault();
  // clearErrorMessages();

  let isValid = true;

  const FirstName = $("#firstname").val();
  if (!validateName(FirstName)) {
    Swal.fire({
      icon: "warning",
      title: "Validation Error",
      text: "First name should be only letters.",
    });
    // showError("#firstname-error", "First name can only contain letters.");
    isValid = false;
  }

  const LastName = $("#lastname").val();
  if (!validateName(LastName)) {
    Swal.fire({
      icon: "warning",
      title: "Validation Error",
      text: "Last name should be only letters.",
    });
    // showError("#lastname-error", "Last name can only contain letters.");
    isValid = false;
  }

  const phone = $("#phone").val();
  if (!validatePhoneNumber(phone)) {
    Swal.fire({
      icon: "warning",
      title: "Validation Error",
      text: "Phone number can be only 10 digits",
    });
    // showError("#phone-error", "Phone number can only contain only 10 digits.");
    isValid = false;
  }

  const country = $("#country").val();
  if (!validateName(country)) {
    Swal.fire({
      icon: "warning",
      title: "Validation Error",
      text: "Country name can only contain letters.",
    });
    // showError("#country-error", "Country name can only contain letters.");
    isValid = false;
  }

  const zipcode = $("#zipcode").val();
  if (!validateZipCode(zipcode)) {
    Swal.fire({
      icon: "warning",
      title: "Validation Error",
      text: "Zipcode can only contain only 5 digits.",
    });
    // showError("#zipcode-error", "Zipcode can only contain only 5 digits.");
    isValid = false;
  }

  const city = $("#city").val();
  if (!validateCity(city)) {
    Swal.fire({
      icon: "warning",
      title: "Validation Error",
      text: "City name can only contain letters.",
    });
    // showError("#city-error", "City name can only contain letters.");
    isValid = false;
  }

  const street = $("#street").val();
  if (!validateStreet(street)) {
    Swal.fire({
      icon: "warning",
      title: "Validation Error",
      text: "Street name can only contain letters.",
    });
    // showError("#street-error", "Street name can only contain letters.");
    isValid = false;
  }

  const streetNumber = $("#street_number").val();
  if (!validateStreetNumber(streetNumber)) {
    Swal.fire({
      icon: "warning",
      title: "Validation Error",
      text: "Street number must be digits",
    });
    // showError("#street-number-error", "Street number must be digits.");
    isValid = false;
  }

  if (!isValid) {
    return false;
  }
});

// });

function validateName(city) {
  return /^[A-Za-z\s]+$/.test(city);
}

function validatePhoneNumber(phone) {
  return /^\d{10}$/.test(phone);
}

function validateZipCode(phone) {
  return /^\d{5}$/.test(phone);
}

function validateCity(city) {
  return /^[A-Za-z\s]+$/.test(city);
}

function validateStreet(street) {
  return /^[A-Za-z\s]+$/.test(street);
}

function validateStreetNumber(streetNumber) {
  return /^\d+$/.test(streetNumber);
}

$(document).ready(function () {
  $("#update-details-form").submit(function (e) {
    var newpassword = $("#newpassword").val();

    var passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordPattern.test(newpassword)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.",
      });
      return; // Exit the function if password is invalid
    }
  });
});

$(document).ready(function () {
  $("#new-address-form").submit(function (e) {
    let isValid = true;

    const FirstName = $("#firstname").val();
    if (!validateName(FirstName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "First name can only contain letters.",
      });
      // showError("#firstname-error", "First name can only contain letters.");
      isValid = false;
    }

    const LastName = $("#lastname").val();
    if (!validateName(LastName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Last name can only contain letters.",
      });
      // showError("#lastname-error", "Last name can only contain letters.");
      isValid = false;
    }

    const phone = $("#phoneNumber").val();
    if (!validatePhoneNumber(phone)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone number can only contain only 10 digits.",
      });
      // showError("#phoneNumber-error", "Phone number can only contain only 10 digits.");
      isValid = false;
    }

    const country = $("#country").val();
    if (!validateName(country)) {
      // showError("#country-error", "Country name can only contain letters.");
      isValid = false;
    }

    const city = $("#city").val();
    if (!validateCity(city)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "ZCity name can only contain letters.",
      });
      // showError("#city-error", "City name can only contain letters.");
      isValid = false;
    }

    const street = $("#street").val();
    if (!validateStreet(street)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Street name can only contain letters.",
      });
      // showError("#street-error", "Street name can only contain letters.");
      isValid = false;
    }

    const streetNumber = $("#streetno").val();
    if (!validateStreetNumber(streetNumber)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Street number must be digits.",
      });
      // showError("#streetnoerror", "Street number must be digits.");
      isValid = false;
    }

    const zipcode = $("#zipcode").val();
    if (!validateZipCode(zipcode)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Zipcode can only contain only 5 digits.",
      });
      // showError("#zipcode-error", "Zipcode can only contain only 5 digits.");
      isValid = false;
    }

    if (!isValid) {
      return false;
    }
  });
});
function validateName(city) {
  return /^[A-Za-z\s]+$/.test(city);
}

function validatePhoneNumber(phone) {
  return /^\d{10}$/.test(phone);
}

function validateZipCode(phone) {
  return /^\d{5}$/.test(phone);
}

function validateCity(city) {
  return /^[A-Za-z\s]+$/.test(city);
}

function validateStreet(street) {
  return /^[A-Za-z\s]+$/.test(street);
}

function validateStreetNumber(streetNumber) {
  return /^\d+$/.test(streetNumber);
}

$(document).ready(function () {
  $("#new-payment-form").submit(function (event) {
    event.preventDefault();
    clearErrorMessages();

    let isValid = true;
    const cardNumber = $("#card-number").val();
    const cardNumber1 = $("#card-number-1").val();
    const cardNumber2 = $("#card-number-2").val();
    const cardNumber3 = $("#card-number-3").val();

    if (
      !validateCardNumber(cardNumber) ||
      !validateCardNumber(cardNumber1) ||
      !validateCardNumber(cardNumber2) ||
      !validateCardNumber(cardNumber3)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "ZCard number must have 4 digits each.",
      });
      // showError("#card-number-error", "Card number must have 4 digits each.");
      isValid = false;
    }

    const cardHolder = $("#card-holder").val();
    if (!validateCardHolder(cardHolder)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Card holder name must have 9 digits.",
      });
      // showError("#card-holder-error", "Card holder name must have 9 digits.");
      isValid = false;
    }

    const expirationMonth = $("#card-expiration-month").val();
    const expirationYear = $("#card-expiration-year").val();
    if (!validateExpirationDate(expirationMonth, expirationYear)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Invalid expiration date.",
      });
      // showError("#expiration-month-error", "Invalid expiration date.");
      isValid = false;
    }

    const cvv = $("#card-ccv").val();
    if (!validateCVV(cvv)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "CCV must be 3 digits.",
      });
      // showError("#cvv-number-error", "CCV must be 3 digits.");
      isValid = false;
    }
    if (!isValid) {
      return false;
    }
  });
});

function validateCardNumber(cardNumber) {
  return /^\d{4}$/.test(cardNumber);
}

function validateCardHolder(cardHolder) {
  return cardHolder.length === 9 && /^[0-9]+$/.test(cardHolder);
}

function validateExpirationDate(expirationMonth, expirationYear) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const enteredYear = parseInt(expirationYear, 10);
  const enteredMonth = parseInt(expirationMonth, 10);

  if (enteredYear < currentYear) {
    return false;
  } else if (enteredYear === currentYear && enteredMonth < currentMonth) {
    return false;
  }
  return true;
}

function validateCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}

document.addEventListener("DOMContentLoaded", function () {
  const deleteIcon = document.getElementById("address");

  if (deleteIcon) {
    deleteIcon.addEventListener("click", function (event) {
      // const confirmDelete = confirm("Are you sure you want to delete this address?");
      Swal.fire({
        icon: "warning",
        title: "Confirmation",
        text: "Are you sure you want to delete this address?",
      });

      event.preventDefault(); // Prevents the default action (e.g., navigation or form submission)
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const deleteIcon = document.getElementById("payment");

  if (deleteIcon) {
    deleteIcon.addEventListener("click", function (event) {
      // const confirmDelete = confirm("Are you sure you want to delete this payment method?");
      Swal.fire({
        icon: "warning",
        title: "Confirmation",
        text: "Are you sure you want to delete this payment method?",
      });

      event.preventDefault(); // Prevents the default action (e.g., navigation or form submission)
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const deleteIcon = document.getElementById("wish");

  if (deleteIcon) {
    deleteIcon.addEventListener("click", function (event) {
      // const confirmDelete = confirm("Are you sure you want to delete this product from your wishlist?");
      Swal.fire({
        icon: "warning",
        title: "Confirmation",
        text: "Are you sure you want to delete this product from your wishlist?",
      });

      event.preventDefault(); // Prevents the default action (e.g., navigation or form submission)
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const deleteIcon = document.getElementById("yad2");

  if (deleteIcon) {
    deleteIcon.addEventListener("click", function (event) {
      // const confirmDelete = confirm("Are you sure you want to delete this product from the website?");
      Swal.fire({
        icon: "warning",
        title: "Confirmation",
        text: "Are you sure you want to delete this product from the website?",
      });

      event.preventDefault(); // Prevents the default action (e.g., navigation or form submission)
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtn = document.getElementById("addToCartBtn");
  const cartModal = document.getElementById("cartModal");

  addToCartBtn.addEventListener("click", function () {
    cartModal.style.display = "block"; // Show the modal

    setTimeout(function () {
      cartModal.style.display = "none"; // Hide the modal after 1 second
    }, 1000);
  });
});

// address details
fetch("http://127.0.0.1:8080/api/current-user")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    // Check if address data exists
    if (data) {
      // Fill the form fields with the retrieved data
      document.getElementById("add-firstName").value = data.address.firstName;
      document.getElementById("add-lastName").value = data.address.lastName;
      document.getElementById("add-phoneNumber").value =
        data.address.phoneNumber;
      document.getElementById("country").value = data.address.country;
      document.getElementById("city").value = data.address.city;
      document.getElementById("street").value = data.address.street;
      document.getElementById("streetno").value = data.address.streetno;
      document.getElementById("zipcode").value = data.address.postalCode;
    }
  })
  .catch((error) => {
    console.error("Error fetching address user details:", error);
  });

//user pesonal details
fetch("http://127.0.0.1:8080/api/current-user")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    var alertBox = document.getElementById("address-alert-box");
    if (Object.keys(data.address).length === 0) {
      alertBox.style.display = "block";
    } else {
      alertBox.style.display = "none";
      document.getElementById("full-user-name").textContent =
        data.name.firstName + " " + data.name.lastName;
      document.getElementById("firstName").value = data.name.firstName;
      document.getElementById("lastName").value = data.name.lastName;
      document.getElementById("phoneNumber").value = data.phoneNumber;
      document.getElementById("email").value = data.email;
    }
  })
  .catch((error) => {
    console.error("Error fetching user details:", error);
  });

//user order list
fetch("http://127.0.0.1:8080/api/current-user")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    var alertBox = document.getElementById("orders-alert-box");
    const orderHistoryContainer = document.getElementById("order-history");
    if (data.orderHistory.length == 0) {
      alertBox.style.display = "block";
    } else {
      alertBox.style.display = "none";
      orders.forEach((order) => {
        const orderElement = createOrderElement(order);
        orderHistoryContainer.appendChild(orderElement);
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching user details:", error);
  });

function createOrderElement(order) {
  const orderDiv = document.createElement("div");
  orderDiv.classList.add("box");

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("my-card-header");
  cardHeader.setAttribute("data-target", "#order" + order._id);

  const orderStatus = document.createElement("h4");
  orderStatus.classList.add("order-sub-title");
  orderStatus.textContent = "ORDER STATUS: ";

  const orderInfo = document.createElement("h4");
  orderInfo.classList.add("order-info");
  orderInfo.textContent = order.status;

  const orderDate = document.createElement("h5");
  orderDate.classList.add("order-sub-info");
  orderDate.innerHTML = `Order Date <span>${order.order_date}</span>`;

  const cartProducts = document.createElement("div");
  cartProducts.classList.add("cart-products");

  order.products.forEach((product) => {
    const productItem = createProductItem(product.imageSrc);
    cartProducts.appendChild(productItem);
  });

  const orderFooter = document.createElement("div");
  orderFooter.classList.add("order-footer");

  const orderSummary = document.createElement("div");
  orderSummary.classList.add("order-sammary");

  const orderNumber = document.createElement("h4");
  orderNumber.classList.add("order-sub-title");
  orderNumber.innerHTML = `ORDER NO. : <span class="order-sub-info">${order._id}</span>`;

  const totalPrice = document.createElement("h4");
  totalPrice.classList.add("order-sub-title");
  totalPrice.innerHTML = `TOTAL PRICE: <span class="order-sub-info">${order.total_price}$</span>`;

  orderSummary.appendChild(orderNumber);
  orderSummary.appendChild(totalPrice);

  const viewOrderBtn = document.createElement("button");
  viewOrderBtn.classList.add("btn-account-page");
  viewOrderBtn.textContent = "View Order";

  orderFooter.appendChild(orderSummary);
  orderFooter.appendChild(viewOrderBtn);

  cardHeader.appendChild(orderStatus);
  cardHeader.appendChild(orderInfo);
  cardHeader.appendChild(orderDate);
  cardHeader.appendChild(cartProducts);
  cardHeader.appendChild(orderFooter);

  orderDiv.appendChild(cardHeader);

  return orderDiv;
}
function createProductItem(imageSrc) {
  const item = document.createElement("div");
  item.classList.add("item");

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "item";

  item.appendChild(img);
  return item;
}

fetch("http://127.0.0.1:8080/api/current-user")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    var alertBox = document.getElementById("payment-alert-box");

    if (!data.creditCard) {
      alertBox.style.display = "block";
    } else {
      alertBox.style.display = "none";

      const creditCardTemplate = `
        <div class="box">
          <div aria-label="Edit" class="address-edit">
            <a href="http://127.0.0.1:8080/creditCardUpdate" class="inside-link">
              <span>Edit</span>
              <i class="fa fa-pencil-square-o"></i>
            </a>
          </div>
          <h4 class="payment-label" id="payment-name">Credit Card</h4>
          <span class="payment-label sub" id="payment-number">
            ••••-••••-••••-
          </span>
          <span class="payment-label sub" id="payment-4number">
            ${data.creditCard ? data.creditCard.card_number.slice(-4) : ""}
          </span>
          <div aria-label="Delete" class="payment-delete">
            <i class="fa fa-trash" id="payment"></i>
          </div>
        </div>
      `;

      // Inject the template into a container on your page
      const paymentMethodsContainer =
        document.getElementById("payment-methods");
      paymentMethodsContainer.innerHTML = creditCardTemplate;
    }
  })
  .catch((error) => {
    console.error("Error fetching user details:", error);
  });

// Fetch user data including wishlist
fetch("http://127.0.0.1:8080/api/current-user")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    var alertBox = document.getElementById("wishlist-alert-box");
    var wishItemsContainer = document.getElementById("wish-items");

    if (data.wishlist.length === 0) {
      alertBox.style.display = "block";
    } else {
      alertBox.style.display = "none";
      // Wishlist is not empty, create and populate the template
      data.wishlist.forEach((item) => {
        var wishItemTemplate = `
        <div class="wish-item">
          <div aria-label="wish-delete" class="wish-delete">
            <i class="fa fa-trash" id="wish"></i>
          </div>
          <img src="${item.product.image}" alt="item" />
          <section class="title">
            <span class="title-desc center">
              <a href="#">${item.product.title}</a>
            </span>
            <br />
            <span class="title-price center">$${item.product.price}</span>
          </section>
          <button class="add-to-cart" id="addToCartBtn" type="button">
            Add to cart
          </button>
          <div class="modal" id="cartModal">
            <div class="modal-content">
              <p class="centered-text">
                Product added to cart! &#10003;
              </p>
            </div>
          </div>
        </div>
      `;

        var wishItemDiv = document.createElement("div");
        wishItemDiv.innerHTML = wishItemTemplate;
        wishItemsContainer.appendChild(wishItemDiv);
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching user details:", error);
  });

//user yad2 list
fetch("http://127.0.0.1:8080/api/current-user")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    var alertBox = document.getElementById("yad2-alert-box");
    var yad2ItemsContainer = document.getElementById("yad2-items");

    if (data.usedProducts.length === 0) {
      alertBox.style.display = "block";
    } else {
      alertBox.style.display = "none";
      // usedProducts list is not empty, create and populate the template
      data.usedProducts.forEach((item) => {
        var usedProductTemplate = `
          <div class="wish-item">
            <div class="wish-option">
              <div aria-label="wish-delete left" class="wish-delete">
                <i class="fa fa-trash" id="yad2"></i>
              </div>
              <div aria-label="wish-edit right" class="wish-edit">
                <i class="fa fa-edit"></i>
              </div>
            </div>
            <img src="${item.image}" alt="item" />
            <section class="title">
              <span class="title-desc center">
                <a href="#">${item.title}</a>
              </span>
              <br />
              <span class="title-price center">$${item.price}</span>
            </section>
          </div>
        `;

        var usedProductDiv = document.createElement("div");
        usedProductDiv.innerHTML = usedProductTemplate;
        yad2ItemsContainer.appendChild(usedProductDiv);
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching user details:", error);
  });

/*~~~~~~~~~~~~~~~~~~~~~~~post request~~~~~~~~~~~~~~~~~~~~~~~*/

document.addEventListener("DOMContentLoaded", function () {
  // const saveAddressBtn = document.getElementById("save-address-btn");
  // const addressForm = document.getElementById("address-form");
  $("#address-form").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const formData = $(this).serialize(); // Serialize form data

    $.ajax({
      url: "http://127.0.0.1:8080/address", // Replace with your actual URL
      type: "POST",
      data: formData,
      success: function (response) {
        // Handle the response data here
        console.log(response);
      },
      error: function (error) {
        // Handle errors here
        console.error("Error:", error);
      },
    });
  });
  // saveAddressBtn.addEventListener("click", function (event) {
  //   event.preventDefault(); // Prevent default form submission

  //   var firstName = $("#add-firstName").val();
  //   var lastName = $("#add-lastName").val();
  //   var phoneNumber = $("#add-phoneNumber").val();
  //   var country = $("#country").val();
  //   var city = $("#city").val();
  //   var street = $("#street").val();
  //   var streetNumber = $("#streetno").val();
  //   var postalCode = $("#zipcode").val();
  //   console.log(firstName);
  //   console.log(lastName);
  //   console.log(phoneNumber);
  //   console.log(country);
  //   console.log(city);
  //   console.log(street);
  //   console.log(streetNumber);
  //   console.log(postalCode);

  //   var formData = new FormData();
  //   formData.append("firstName", firstName);
  //   formData.append("lastName", lastName);
  //   formData.append("phoneNumber", phoneNumber);
  //   formData.append("country", country);
  //   formData.append("city", city);
  //   formData.append("street", street);
  //   formData.append("streetNumber", streetNumber);
  //   formData.append("postalCode", postalCode);

  //   console.log(formData);
  //   // Send a POST request to your API with form data
  //   $.ajax({
  //     url: "http://127.0.0.1:8080/address",
  //     type: "POST",
  //     data: formData,
  //     contentType: false,
  //     processData: false,
  //     success: function (response) {
  //       console.log("addrress update successfully:", response);
  //     },
  //     error: function (xhr, status, error) {
  //       console.error("Error update addrress:", error);
  //     },
  //   });
});
