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

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

$(document).ready(function () {
  const urlPar = getUrlParameter("show");
  if (urlPar && urlPar.toLowerCase() === "wishlist") {
    $(".page-section").hide();
    $("#wish-list").show();
    console.log("inside");
    //fetchAndDisplayProducts();
  }
});

function createProductItem(imageSrc) {
  const item = document.createElement("div");
  item.classList.add("item");

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "item";

  item.appendChild(img);
  return item;
}
/* ~~~~~~~~~~~~ validation section ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function validateOnlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}
function validateTenDigits(str) {
  return /^\d{10}$/.test(str);
}
function validateContainsAtSymbol(str) {
  return /@/.test(str);
}
function validateName(str) {
  return /^[A-Za-z\s]+$/.test(str);
}
function validateZipCode(num) {
  return /^\d{5}$/.test(num);
}
function validateCardNumber(cardNumber) {
  return /^\d{4}$/.test(cardNumber);
}
function validateStreetNumber(streetNumber) {
  return /^\d+$/.test(streetNumber);
}

function validateCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}
function validateCardHolder(cardHolder) {
  return cardHolder.length === 9 && /^[0-9]+$/.test(cardHolder);
}
function validatePassword(pass) {
  return /^[^\s\t]{4,}$/.test(pass);
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

  // addToCartBtn.addEventListener("click", function () {
  //   cartModal.style.display = "block"; // Show the modal

  //   setTimeout(function () {
  //     cartModal.style.display = "none"; // Hide the modal after 1 second
  //   }, 1000);
  // });
});
/* ~~~~~~~~~~~~ get api ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// address details
fetch("http://127.0.0.1:8080/api/current-user")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    var alertBox = document.getElementById("address-alert-box");
    // Check if address data exists
    if (data) {
      if (data && data.address) {
        alertBox.style.display = "none";
        // Fill the form fields with the retrieved data
        document.getElementById("add-firstName").value =
          data.address.firstName || "";
        document.getElementById("add-lastName").value =
          data.address.lastName || "";
        document.getElementById("add-phoneNumber").value =
          data.address.phoneNumber || "";
        document.getElementById("country").value = data.address.country || "";
        document.getElementById("city").value = data.address.city || "";
        document.getElementById("street").value = data.address.street;
        document.getElementById("streetno").value =
          data.address.streetNumber || "";
        document.getElementById("zipcode").value =
          data.address.postalCode || "";
      } else {
        alertBox.style.display = "block";
        // document.getElementById("add-firstName").value = "";
        // document.getElementById("add-lastName").value = "";
        // document.getElementById("add-phoneNumber").value = "";
        // document.getElementById("country").value = "";
        // document.getElementById("city").value = "";
        // document.getElementById("street").value = "";
        // document.getElementById("streetno").value = "";
        // document.getElementById("zipcode").value = "";
      }
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
    document.getElementById("full-user-name").textContent =
      data.name.firstName + " " + data.name.lastName;
    document.getElementById("points-number").textContent = data.points;
    document.getElementById("firstName").value = data.name.firstName;
    document.getElementById("lastName").value = data.name.lastName;
    document.getElementById("phoneNumber").value = data.phoneNumber;
    document.getElementById("email").value = data.email;

    var adminLink = document.getElementById("only-admin");

    if (data.permission === "admin") {
      adminLink.style.display = "block";
    } else adminLink.style.display = "none";
  })
  .catch((error) => {
    console.error("Error fetching user details:", error);
  });

//user order list
fetch("http://127.0.0.1:8080/api/orders/history")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    var alertBox = document.getElementById("orders-alert-box");
    const orderHistoryContainer = document.getElementById("order-history");
    if (data.length == 0) {
      alertBox.style.display = "block";
    } else {
      alertBox.style.display = "none";

      data.forEach((order) => {
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
  orderDate.innerHTML = `Order Date <span>${
    order.order_date.split("T")[0]
  }</span>`;

  const cartProducts = document.createElement("div");
  cartProducts.classList.add("cart-products");

  for (let i = 0; i < order.products.length; i++) {
    let product = order.products[i].item;
    console.log(product.image);
    const productItem = createProductItem(product.image[0], product._id);
    cartProducts.appendChild(productItem);
  }
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

  // const viewOrderBtn = document.createElement("button");
  // viewOrderBtn.classList.add("btn-account-page");
  // viewOrderBtn.textContent = "View Order";
  const viewOrderBtn = document.createElement("a");
  viewOrderBtn.classList.add("btn-account-page");
  viewOrderBtn.textContent = "View Order";
  viewOrderBtn.href = "http://127.0.0.1:8080/order-update?id=" + order._id;
  console.log(order);
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
function createProductItem(imageSrc, productId) {
  const item = document.createElement("div");
  item.classList.add("item");

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "item";
  img.addEventListener("click", function () {
    console.log("Clicked");
    const url = "http://127.0.0.1:8080/product-details?id=" + productId;
    window.location.href = url; // Redirect when image is clicked
  });

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
    var dataBox = document.getElementById("payment-box");
    if (data && data.creditCard.card_number.slice(-4) != "") {
      alertBox.style.display = "none";
      const creditCardTemplate = `
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
            ${data.creditCard.card_number.slice(-4)}
          </span>
          
      `;
      // Inject the template into a container on your page
      const paymentMethodsContainer = document.getElementById("payment-box");
      paymentMethodsContainer.innerHTML = creditCardTemplate;
    } else {
      alertBox.style.display = "block";
      dataBox.style.display = "none";
    }
  })
  .catch((error) => {
    console.error("Error fetching user details:", error);
  });

//Fetch user data including wishlist
fetch("http://127.0.0.1:8080/api/current-user")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    var alertBox = document.getElementById("wishlist-alert-box");
    var wishItemsContainer = document.getElementById("wish-items-container");
    console.log(wishItemsContainer);
    if (data.wishlist.length === 0) {
      alertBox.style.display = "block";
    } else {
      alertBox.style.display = "none";
      // Wishlist is not empty, create and populate the template
    }
    for (let i = 0; i < data.wishlist.length; i++) {
      const item = data.wishlist[i];
      console.log("product = " + item);
      var wishItemDiv = document.createElement("div");
      wishItemDiv.classList.add("wish-item");

      var wishDeleteDiv = document.createElement("div");
      wishDeleteDiv.classList.add("wish-delete");
      wishDeleteDiv.setAttribute("aria-label", "wish-delete");

      var wishDeleteIcon = document.createElement("i");
      wishDeleteIcon.classList.add("fa", "fa-trash");
      wishDeleteIcon.id = "wish";
      wishDeleteDiv.appendChild(wishDeleteIcon);

      wishDeleteIcon.addEventListener("click", function () {
        let formData = {
          productId: item.product._id,
        };
        // console.log(item.product._id);
        // formData.append("productId", item.product._id);
        $.ajax({
          url: `http://127.0.0.1:8080/wishlist/delete`,
          method: "POST",
          data: formData,
          // processData: false,
          // contentType: false,
          success: function (response) {
            alert("Product removed successfully from wishlist!");
            window.location.href =
              "http://127.0.0.1:8080/my-account?show=wishlist";
          },
          error: function (xhr, status, error) {
            console.error("Error: " + error);
          },
        });
      });

      var wishItemImage = document.createElement("img");
      wishItemImage.src = item.product.image[0];
      wishItemImage.alt = "item";

      wishItemImage.addEventListener("click", function () {
        window.location.href =
          "http://127.0.0.1:8080/product-details?id=" + item.product._id;
      });

      var titleSection = document.createElement("section");
      titleSection.classList.add("title");

      var titleDescSpan = document.createElement("span");
      titleDescSpan.classList.add("title-desc", "center");
      var titleLink = document.createElement("a");
      titleLink.href =
        "http://127.0.0.1:8080/product-details?id=" + item.product._id;
      titleLink.textContent = item.product.title;
      titleDescSpan.appendChild(titleLink);

      var priceSpan = document.createElement("span");
      priceSpan.classList.add("title-price", "center");
      priceSpan.textContent = "$" + item.product.price;

      titleSection.appendChild(titleDescSpan);
      titleSection.appendChild(document.createElement("br"));
      titleSection.appendChild(priceSpan);

      var addToCartBtn = document.createElement("button");
      addToCartBtn.classList.add("add-to-cart");
      addToCartBtn.id = "addToCartBtn";
      addToCartBtn.type = "button";
      addToCartBtn.textContent = "Add to cart";
      addToCartBtn.addEventListener("click", function () {
        // let formData = new FormData();
        // formData.append("productId", item.product._id);
        // formData.append("quantity", "1");
        let formData = {
          productId: item.product._id,
          quantity: "1",
        };
        $.ajax({
          url: `http://127.0.0.1:8080/cart/add`,
          method: "POST",
          data: formData,
          success: function (response) {
            alert("product added successfully to cart!");
            window.location.href =
              "http://127.0.0.1:8080/my-account?show=wishlist";
          },
          error: function (xhr, status, error) {
            console.error("Error: " + error);
          },
        });
      });

      var cartModalDiv = document.createElement("div");
      cartModalDiv.classList.add("modal");
      cartModalDiv.id = "cartModal";

      var modalContentDiv = document.createElement("div");
      modalContentDiv.classList.add("modal-content");
      var modalText = document.createElement("p");
      modalText.classList.add("centered-text");
      modalText.textContent = "Product added to cart! \u2713";

      modalContentDiv.appendChild(modalText);
      cartModalDiv.appendChild(modalContentDiv);

      wishItemDiv.appendChild(wishDeleteDiv);
      wishItemDiv.appendChild(wishItemImage);
      wishItemDiv.appendChild(titleSection);
      wishItemDiv.appendChild(addToCartBtn);
      wishItemDiv.appendChild(cartModalDiv);
      console.log(wishItemsContainer);
      wishItemsContainer.appendChild(wishItemDiv);
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
    var yad2Box = document.getElementById("yad2-box");
    if (data.usedProducts.length === 0) {
      alertBox.style.display = "block";
      yad2Box.style.display = "none";
    } else {
      alertBox.style.display = "none";
      // usedProducts list is not empty, create and populate the template
      // populate - userProducts
      console.log(data);
      for (let i = 0; i < data.usedProducts.length; i++) {
        const item = data.usedProducts[i];
        console.log(item);
        var usedProductDiv = document.createElement("div");
        usedProductDiv.className = "wish-item";

        var wishOptionDiv = document.createElement("div");
        wishOptionDiv.className = "wish-option";

        var wishDeleteDiv = document.createElement("div");
        wishDeleteDiv.setAttribute("aria-label", "wish-delete left");
        wishDeleteDiv.className = "wish-delete";

        var trashIcon = document.createElement("i");
        trashIcon.className = "fa fa-trash";
        trashIcon.id = "yad2";
        wishDeleteDiv.appendChild(trashIcon);
        trashIcon.addEventListener("click", function () {
          $.ajax({
            url: `http://127.0.0.1:8080/api/yad2/delete/${item._id}`,
            method: "POST",
            success: function (response) {
              alert("product removed successfully!");
              window.location.href = "http://127.0.0.1:8080/my-account";
            },
            error: function (xhr, status, error) {
              console.error("Error: " + error);
            },
          });
        });

        var wishEditDiv = document.createElement("div");
        wishEditDiv.setAttribute("aria-label", "wish-edit right");
        wishEditDiv.className = "wish-edit";

        var editIcon = document.createElement("i");
        editIcon.className = "fa fa-edit";
        wishEditDiv.appendChild(editIcon);
        editIcon.addEventListener("click", function () {
          window.location.href = `http://127.0.0.1:8080/Yad2Update?id=${item._id}`;
        });

        wishOptionDiv.appendChild(wishDeleteDiv);
        wishOptionDiv.appendChild(wishEditDiv);

        var imgElement = document.createElement("img");
        imgElement.src = item.image;
        imgElement.alt = "item";

        var titleSection = document.createElement("section");
        titleSection.className = "title";

        var titleDescSpan = document.createElement("span");
        titleDescSpan.className = "title-desc center";

        var titleLink = document.createElement("a");
        titleLink.href = "http://127.0.0.1:8080/product-details?id=" + item._id;
        titleLink.textContent = item.title;
        titleDescSpan.appendChild(titleLink);

        var brElement = document.createElement("br");

        var titlePriceSpan = document.createElement("span");
        titlePriceSpan.className = "title-price center";
        titlePriceSpan.textContent = "$" + item.price;

        titleSection.appendChild(titleDescSpan);
        titleSection.appendChild(brElement);
        titleSection.appendChild(titlePriceSpan);

        usedProductDiv.appendChild(wishOptionDiv);
        usedProductDiv.appendChild(imgElement);
        usedProductDiv.appendChild(titleSection);

        yad2ItemsContainer.appendChild(usedProductDiv);
        // var usedProductTemplate = `
        //   <div class="wish-item">
        //     <div class="wish-option">
        //       <div aria-label="wish-delete left" class="wish-delete">
        //         <i class="fa fa-trash" id="yad2"></i>
        //       </div>
        //       <div aria-label="wish-edit right" class="wish-edit">
        //         <i class="fa fa-edit"></i>
        //       </div>
        //     </div>
        //     <img src="${item.image}" alt="item" />
        //     <section class="title">
        //       <span class="title-desc center">
        //         <a href="#">${item.title}</a>
        //       </span>
        //       <br />
        //       <span class="title-price center">$${item.price}</span>
        //     </section>
        //   </div>
        // `;

        // var usedProductDiv = document.createElement("div");
        // usedProductDiv.innerHTML = usedProductTemplate;
        // yad2ItemsContainer.appendChild(usedProductDiv);
      }
    }
  })
  .catch((error) => {
    console.error("Error fetching user details:", error);
  });

/*~~~~~~~~~~~~~~~~~~~~~~~post request~~~~~~~~~~~~~~~~~~~~~~~*/
/*address*/

document.addEventListener("DOMContentLoaded", function () {
  $("#address-form").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    let isValid = true;

    const FirstName = $("#add-firstName").val();
    if (!validateName(FirstName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "First name should be only letters.",
      });
      // showError("#firstname-error", "First name can only contain letters.");
      isValid = false;
    }

    const LastName = $("#add-lastName").val();
    if (!validateName(LastName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Last name should be only letters.",
      });
      // showError("#lastname-error", "Last name can only contain letters.");
      isValid = false;
    }

    const phone = $("#add-phoneNumber").val();
    if (!validateTenDigits(phone)) {
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
    if (!validateName(city)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "City name can only contain letters.",
      });
      // showError("#city-error", "City name can only contain letters.");
      isValid = false;
    }

    const street = $("#street").val();
    if (!validateName(street)) {
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
        text: "Street number must be digits",
      });
      // showError("#street-number-error", "Street number must be digits.");
      isValid = false;
    }

    if (isValid) {
      const formData = $(this).serialize(); // Serialize form data
      $.ajax({
        url: "http://127.0.0.1:8080/address", // Replace with your actual URL
        type: "POST",
        data: formData,
        success: function (response) {
          console.log(response);
          alert("Address updated successfully");
        },
        error: function (error) {
          // Handle errors here
          console.error("Error:", error);
        },
      });
    }
  });
});
// if the trash button is clicked :
$(document).ready(function () {
  // Listener for the delete address button
  const deleteAddressButton = document.getElementById("delete-address-btn");
  deleteAddressButton.addEventListener("click", function () {
    const confirmed = confirm("Are you sure you want to delete this address?");
    if (confirmed) {
      clearAddressFields();
      submitAddressForm();
    }
  });

  // Function to clear address form fields
  function clearAddressFields() {
    document.getElementById("add-firstName").value = "";
    document.getElementById("add-lastName").value = "";
    document.getElementById("add-phoneNumber").value = "";
    document.getElementById("country").value = "";
    document.getElementById("city").value = "";
    document.getElementById("street").value = "";
    document.getElementById("streetno").value = "";
    document.getElementById("zipcode").value = "";
  }

  // Function to submit the address form
  function submitAddressForm() {
    const formData = $("#address-form").serialize();
    $.ajax({
      url: "http://127.0.0.1:8080/address",
      type: "POST",
      data: formData,
      success: function (response) {
        console.log(response);
        alert("Address deleted successfully");
      },
      error: function (error) {
        console.error("Error:", error);
        // Handle error
      },
    });
  }
});
/*personal details*/
document.addEventListener("DOMContentLoaded", function () {
  $("#personal-details-form").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
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

    if (!validateTenDigits(phoneNumber)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone number can be only 10 digits",
      });
      isValid = false;
    }

    if (!validateContainsAtSymbol(email)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Email address should contain @.",
      });
      isValid = false;
    }

    if (isValid) {
      const formData = $(this).serialize(); // Serialize form data
      $.ajax({
        url: "http://127.0.0.1:8080/personal-details", // Replace with your actual URL
        type: "POST",
        data: formData,
        success: function (response) {
          // Handle the response data here
          console.log(response);
          alert("Your personal details have been successfully updated");
        },
        error: function (error) {
          // Handle errors here
          console.error("Error:", error);
        },
      });
    }
  });
});

/*card update*/
document.addEventListener("DOMContentLoaded", function () {
  $("#new-payment-form").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission
    let isValid = true;
    const cardNumber = $("#new-card-number-1").val();
    const cardNumber1 = $("#new-card-number-2").val();
    const cardNumber2 = $("#new-card-number-3").val();
    const cardNumber3 = $("#new-card-number-4").val();

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

    const cardHolder = $("#new-card-holder").val();
    if (!validateCardHolder(cardHolder)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Card holder name must have 9 digits.",
      });
      // showError("#card-holder-error", "Card holder name must have 9 digits.");
      isValid = false;
    }

    const expirationMonth = $("#new-card-expiration-month").val();
    const expirationYear = $("#new-card-expiration-year").val();
    if (!validateExpirationDate(expirationMonth, expirationYear)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Invalid expiration date.",
      });
      // showError("#expiration-month-error", "Invalid expiration date.");
      isValid = false;
    }

    const cvv = $("#new-card-ccv").val();
    if (!validateCVV(cvv)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "CCV must be 3 digits.",
      });
      // showError("#cvv-number-error", "CCV must be 3 digits.");
      isValid = false;
    }
    if (isValid) {
      // Collect form data
      var card_expiration_year = document.getElementById(
        "new-card-expiration-year"
      ).value;
      var card_expiration_month = document.getElementById(
        "new-card-expiration-month"
      ).value;
      var card_expiration = card_expiration_month + "/" + card_expiration_year;
      var card_number =
        document.getElementById("new-card-number-1").value +
        document.getElementById("new-card-number-2").value +
        document.getElementById("new-card-number-3").value +
        document.getElementById("new-card-number-4").value;
      var formData = {
        card_number: card_number,
        holder_name: $("#new-card-holder").val(),
        expiration_date: card_expiration,
        ccv: $("#new-card-ccv").val(),
      };

      // Send AJAX POST request
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8080/creditcard",
        data: formData,
        success: function (response) {
          // Handle success response
          console.log("Success:", response);
          alert("card details updated successfully");
        },
        error: function (error) {
          // Handle error response
          console.log("Error:", error);
        },
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  $("#password-form").submit(function (event) {
    event.preventDefault();
    var newPassword = $("#newpassword").val();
    var currentPassword = $("#currpassword").val();
    let isValid = true;

    if (!validatePassword(newPassword)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Password must contain at least 4 characters.",
      });
      // showError("#card-holder-error", "Card holder name must have 9 digits.");
      isValid = false;
    }
    if (newPassword === currentPassword) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "your current Password and your new one are the same.",
      });
      // showError("#card-holder-error", "Card holder name must have 9 digits.");
      isValid = false;
    }
    if (isValid) {
      var formData = {
        newPassword: newPassword,
        currentPassword: currentPassword,
      };

      console.log(formData);
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8080/passwordUpdate",
        data: formData,
        success: function (response) {
          // Handle success response
          console.log("Success:", response);
          alert("password updated successfully");
        },
        error: function (error) {
          // Handle error response
          console.log("Error:", error);
          alert(
            "Please check that you are entering your current password correctly"
          );
        },
      });
    }
  });
});
