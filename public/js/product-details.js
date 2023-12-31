$(document).ready(function () {
  const socket = io();

  //Image click handler
  $(".productView-imageSlick").click(function () {
    $(".productView-imageSlick").removeClass("active");
    $(this).addClass("active");
    const imageSource = $(this).find("img").attr("src");
    $(".productView-image").attr("src", imageSource);
  });

  var wishlistExists = null;

  /*get request*/
  const productId = window.location.search.split("=")[1];
  const url = `http://127.0.0.1:8080/api/product/${productId}`;
  const productDetailsDiv = $("#product-details");
  var userId = null;
  var isYad2 = null;

  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function (data) {
      const { title, price, description, quantity, image } = data.data;
      const productCategory = data.data.category;
      const productId = data.data._id;
      const Quantity = data.data.quantity;
      isYad2 = productCategory;
      const Condition=data.data.condition;

      $.ajax({
        url: "http://127.0.0.1:8080/api/current-user",
        method: "GET",
        dataType: "json",
        success: function (userData) {
          const userPermission = userData.permission;
          const userid = userData._id;
          userId = userid;

          if (userPermission === "admin") {
            const editIcon = document.createElement("i");
            editIcon.className = "fas fa-pencil-alt edit-icon";
            editIcon.style.display = "inline";
            editIcon.style.position = "absolute";
            editIcon.style.cursor = "pointer";
            editIcon.style.fontSize = "20px";

            editIcon.style.top = "200px";
            editIcon.style.right = "110px";
            editIcon.addEventListener("click", function () {
              if (productCategory === "yad2") {
                window.location.href =
                  "http://127.0.0.1:8080/Yad2Update?id=" + productId;
              } else {
                window.location.href =
                  "http://127.0.0.1:8080/product-update?id=" + productId;
              }
            });
            productInfoDiv.appendChild(editIcon);
          }
          productView.appendChild(productInfoDiv);

          const userWishlist = userData.wishlist;
          const productExistsInWishlist = userWishlist.some(
            (wishlistItem) => wishlistItem.product._id.toString() === productId
          );

          if (productExistsInWishlist) {
            wishlistExists = true;
            console.log("the product is on wish list");
            const heartIcon = document.getElementById("heartIcon");
            heartIcon.className = "fas fa-heart";
          } else {
            wishlistExists = false;
            console.log("the product is not on wish list");
          }
        },
        error: function (error) {
          console.error("Error fetching user data:", error);
        },
      });

      const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

      const productView = document.createElement("div");
      productView.className = "productView";

      //Product images
      const productImagesDiv = document.createElement("div");
      productImagesDiv.className = "productView-images";

      const productImage = document.createElement("img");
      productImage.src = image;
      productImage.alt = capitalizeFirstLetter(title);
      productImage.title = capitalizeFirstLetter(title);
      productImage.dataset.sizes = "auto";
      productImage.className = "productView-image";

      productImagesDiv.appendChild(productImage);

      const slickSlider = document.createElement("ul");
      slickSlider.className = "productView-slick-slider";
      const slickTrack = document.createElement("div");
      slickTrack.className = "slick-track";

      slickSlider.appendChild(slickTrack);
      productImagesDiv.appendChild(slickSlider);

      productView.appendChild(productImagesDiv);
      // productView.appendChild(productImagesDiv);

      // Product information
      const productInfoDiv = document.createElement("div");
      productInfoDiv.className = "productView-info";

      const productTitle = document.createElement("h4");
      productTitle.className = "productView-name";
      productTitle.textContent = capitalizeFirstLetter(title);

      const priceSpan = document.createElement("span");
      priceSpan.className = "productView-price";
      priceSpan.textContent = `${price}$`;

      // Quantity section
      const productQtySection = document.createElement("section");
      productQtySection.className = "productView-qty";

      const quantityInputDiv = document.createElement("div");
      quantityInputDiv.className = "quantity-input";

      const minusButton = document.createElement("input");
      minusButton.className = "minus btn";
      minusButton.type = "button";
      minusButton.value = "-";

      const quantityInput = document.createElement("input");
      quantityInput.id = "quantity";
      quantityInput.className = "input-text qty text";
      quantityInput.size = "4";
      quantityInput.value = "1";
      quantityInput.readOnly = true;

      const plusButton = document.createElement("input");
      plusButton.className = "plus btn";
      plusButton.type = "button";
      plusButton.value = "+";

      if (Quantity > 0) {
        quantityInputDiv.appendChild(minusButton);
        quantityInputDiv.appendChild(quantityInput);
        quantityInputDiv.appendChild(plusButton);
        productQtySection.appendChild(quantityInputDiv);
      }

      if (isYad2 === "yad2") {
        quantityInputDiv.style.display = "none";
      }

      // Add to cart section

      const addToCartSection = document.createElement("section");
      addToCartSection.className = "add-to-cart-section";

      const addToCartButton = document.createElement("button");
      addToCartButton.className = "btn-ns-hot";
      const addToCartLink = document.createElement("a");
      addToCartLink.href = "#";
      addToCartLink.textContent = "ADD TO CART";
      addToCartButton.appendChild(addToCartLink);

      const notifyMe = document.createElement("button");
      notifyMe.className = "notify-button";
      const notifyMeLink = document.createElement("a");
      notifyMeLink.href = "#";
      notifyMeLink.textContent = "Notify me when the product is back in stock";
      notifyMe.appendChild(notifyMeLink);

      notifyMe.addEventListener("click", function () {
        if (userId === null) {
          window.location.href = "http://127.0.0.1:8080/login";
          return;
        }
        notifyServer(userId, productId);
      });
      function notifyServer(userId, productId) {
        console.log(userId);
        console.log(productId);

        const data = { userId, productId };
        socket.emit("notify", data);
        alert("we will notify you when the product will be back to stock");
      }

      if (Quantity === 0 && isYad2 !== "yad2") {
        addToCartButton.style.display = "none";
        notifyMe.style.display = "block";
      } else {
        notifyMe.style.display = "none";
      }

      const favoriteButton = document.createElement("button");
      favoriteButton.className = "favorite-button";
      favoriteButton.setAttribute("aria-label", "Add to favorites");
      const heartIcon = document.createElement("i");
      heartIcon.id = "heartIcon";
      heartIcon.className = "far fa-heart";

      favoriteButton.appendChild(heartIcon);

      addToCartSection.appendChild(addToCartButton);
      addToCartSection.appendChild(notifyMe);
      addToCartSection.appendChild(favoriteButton);

      if (Quantity < 1 && isYad2 === "yad2") {
        addToCartButton.style.display = "none";
        favoriteButton.style.display = "none";
        var outOfStockMessage = document.createElement("p");
        outOfStockMessage.textContent = "This product is out of stock.";
        outOfStockMessage.style.color = "red";
        outOfStockMessage.style.padding = "20x";
        outOfStockMessage.style.fontWeight = "bold";
      }

      var productConditionSection=null;
      if(isYad2 === "yad2")
      {
        productConditionSection = document.createElement("section");
        productConditionSection.className = "productView-details";
        const productConditionTitle = document.createElement("span");
        productConditionTitle.className = "productView-details-title";
        productConditionTitle.textContent = "Product Condition  \n \n";
        const productCondition = document.createElement("span");
        productCondition.className = "productView-details-condition";
        productCondition.textContent = Condition;
        productConditionSection.appendChild(productConditionTitle);
        productConditionSection.appendChild(productCondition);
      }

      // Product description section
      const productDescriptionSection = document.createElement("section");
      productDescriptionSection.className = "productView-details";

      const productDescriptionTitle = document.createElement("span");
      productDescriptionTitle.className = "productView-details-title";
      productDescriptionTitle.textContent = "Product Description  \n \n";

      const productDescription = document.createElement("span");
      productDescription.className = "productView-details-description";
      productDescription.textContent = description;

      productDescriptionSection.appendChild(productDescriptionTitle);
      productDescriptionSection.appendChild(productDescription);

      // Append all sections to the product info div
      productInfoDiv.appendChild(productTitle);
      productInfoDiv.appendChild(priceSpan);
      if (Quantity < 1 && isYad2 === "yad2") {
        productInfoDiv.appendChild(outOfStockMessage);
      }
      productInfoDiv.appendChild(productQtySection);
      productInfoDiv.appendChild(addToCartSection);
      if(isYad2  === "yad2")
      {
        productInfoDiv.appendChild(productConditionSection);
      }
      productInfoDiv.appendChild(productDescriptionSection);

      productView.appendChild(productInfoDiv);

      productDetailsDiv.append(productView);

      /*add to cart button */
      // Add a click event listener to the button

      addToCartButton.addEventListener("click", function (event) {
        event.preventDefault();

        const productId = window.location.search.split("=")[1];
        const quantity = $("#quantity").val();

        addToCart(productId, quantity);
      });

      /* post api add to cart */
      // Your addToCart function now includes the AJAX request
      function addToCart(productId, quantity) {
        $.ajax({
          url: "http://127.0.0.1:8080/cart/add",
          method: "POST",
          data: {
            productId: productId,
            quantity: quantity,
          },
          success: function (response) {
            if (isHTML(response)) {
              window.location.href = "http://127.0.0.1:8080/login";
              return;
            }
            alert("Product added to cart!");
            console.log("Product added to cart:", response);
          },
          error: function (error) {
            console.error("Error adding product to cart:", error);
          },
        });

        function isHTML(str) {
          var doc = new DOMParser().parseFromString(str, "text/html");
          return Array.from(doc.body.childNodes).some(
            (node) => node.nodeType === 1
          );
        }
      }

      $(".minus").click(function () {
        const input = $(this).next();
        let quantity = parseInt(input.val());
        if (quantity > 1) {
          quantity--;
          input.val(quantity);
        }
      });

      $(".plus").click(function () {
        const input = $(this).prev();
        let quantity = parseInt(input.val());
        console.log(quantity);

        if (quantity === Quantity) {
          alert(
            "The maximum quantity of this product on our stock is:" + Quantity
          );
        } else if (quantity < Quantity) {
          quantity++;
          input.val(quantity);
        }
      });

      // Favorite button click handler
      $(".favorite-button").click(function () {
        console.log("favorite heart has clicked");
        const productId = window.location.search.split("=")[1];
        const heartIcon = $(this).find("i");

        if (heartIcon.hasClass("far")) {
          // need to add to wish list
          heartIcon.toggleClass("fas far");
          addToWishlist(productId);
          $(this).attr("aria-label", "Remove from favorites");
        } else {
          heartIcon.toggleClass("fas far");
          RemoveFromWishlist(productId);
          $(this).attr("aria-label", "add from favorites");
        }
      });

      function addToWishlist(productId) {
        $.ajax({
          url: "http://127.0.0.1:8080/wishlist/add",
          method: "POST",
          data: {
            productId: productId,
          },
          success: function (response) {
            if (isHTML(response)) {
              window.location.href = "http://127.0.0.1:8080/login";
              return;
            }
            console.log("Product added to wishlist:", response);
            alert("The item has been added to your favorites list");
          },
          error: function (error) {
            console.error("Error adding product to wishlist:", error);
          },
        });

        function isHTML(str) {
          var doc = new DOMParser().parseFromString(str, "text/html");
          return Array.from(doc.body.childNodes).some(
            (node) => node.nodeType === 1
          );
        }
      }

      function RemoveFromWishlist(productId) {
        $.ajax({
          url: "http://127.0.0.1:8080/wishlist/delete",
          method: "POST",
          data: {
            productId: productId,
          },
          success: function (response) {
            console.log("Product deleted from wishlist:", response);
            alert("The item has been deleted from your favorites list");
          },
          error: function (error) {
            console.error("Error deleting product to wishlist:", error);
          },
        });
      }
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });
});
