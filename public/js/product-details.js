

// $(document).ready(function() {
//   const productId = "64d0a26b2e852944de35e012"; // Replace with your product ID
//   const url = `http://127.0.0.1:8080/api/product/${productId}`;
//   ;

//   $.ajax({
//     url: url,
//     method: "GET",
//     dataType: "json",
//     success: function (data) {
//       const productDetailsDiv = $("#product-details");

//       const {
//         title,
//         price,
//         description,
//         category,
//         condition,
//         manufacture_date,
//         supplier,
//         quantity,
//         image,
//       } = data.data;

//       const productHTML = `

//                     <div class="productView">
//                     <div class="productView-images">
//                       <img
//                         src="${image}"
//                         alt=" Oxford IMEX Tiger I Tank Building Blocks Set 689 Pieces"
//                         title=" Oxford IMEX Tiger I Tank Building Blocks Set 689 Pieces"
//                         data-sizes="auto"
//                         class="productView-image"
//                       />
//                       <ul class="productView-slick-slider">
//                         <div class="slick-track">
//                           <li
//                             class="productView-imageSlick active"
//                             data-slick-index="0"
//                             aria-hidden="false"
//                             tabindex="0"
//                           >
//                             <img
//                               src="${image}"
//                               alt=" LEGO DUPLO 10840 BIG FAIR"
//                               title=" LEGO DUPLO 10840 BIG FAIR"
//                               data-sizes="auto"
//                               class="productView-image-option"
//                             />
//                           </li>
//                           <li
//                             class="productView-imageSlick"
//                             data-slick-index="1"
//                             aria-hidden="false"
//                             tabindex="0"
//                           >
//                             <img
//                               src="https://cdn11.bigcommerce.com/s-2ap7o05kzl/images/stencil/100x100/products/2813/6783/10840__44648.1684056186.jpg?c=2"
//                               alt=" LEGO DUPLO 10840 BIG FAIR"
//                               title=" LEGO DUPLO 10840 BIG FAIR"
//                               data-sizes="auto"
//                               class="productView-image-option"
//                             />
//                           </li>
//                           <li
//                             class="productView-imageSlick"
//                             data-slick-index="2"
//                             aria-hidden="false"
//                             tabindex="0"
//                           >
//                             <img
//                               src="https://cdn11.bigcommerce.com/s-2ap7o05kzl/images/stencil/100x100/products/2813/6784/10840_alt2__86991.1684056189.jpg?c=2"
//                               alt=" LEGO DUPLO 10840 BIG FAIR"
//                               title=" LEGO DUPLO 10840 BIG FAIR"
//                               data-sizes="auto"
//                               class="productView-image-option"
//                             />
//                           </li>
//                           <li
//                             class="productView-imageSlick"
//                             data-slick-index="3"
//                             aria-hidden="false"
//                             tabindex="0"
//                           >
//                             <img
//                               src="https://cdn11.bigcommerce.com/s-2ap7o05kzl/images/stencil/100x100/products/2813/6785/10840_alt16__63979.1684056193.jpg?c=2"
//                               alt=" LEGO DUPLO 10840 BIG FAIR"
//                               title=" LEGO DUPLO 10840 BIG FAIR"
//                               data-sizes="auto"
//                               class="productView-image-option"
//                             />
//                           </li>
//                         </div>
//                       </ul>
//                     </div>
//                     <div class="productView-info">
//                       <section class="productView-title">
//                         <h4 class="productView-name">
//                         ${title}
//                         </h4>
//                         <p><strong>Category:</strong> ${category}</p>
//                         <p><strong>Condition:</strong> ${condition}</p>
//                         <span class="productView-price">${price}$</span>
//                         <p><strong>Manufacturer Date:</strong> ${manufacture_date}</p>
//                         <p><strong>Supplier:</strong> ${supplier}</p>
//                         <p><strong>Quantity:</strong> ${quantity}</p>
//                       </section>
//                       <section class="productView-qty">
//                         <div class="quantity-input">
//                           <input class="minus btn" type="button" value="-" />
//                           <input
//                             id="text_tribulus"
//                             value="1"
//                             class="input-text qty text"
//                             size="4"
//                             id="quantity"
//                           />
//                           <input class="plus btn" type="button" value="+" />
//                         </div>
//                       </section>
//                       <section class="add-to-cart-section">
//                         <button class="btn-ns-hot">
//                           <a href="#">ADD TO CART</a>
//                         </button>
//                           <button class="favorite-button" aria-label="Add to favorites">
//                             <i class="far fa-heart"></i>
//                           </button>
//                       </section>
//                       <section class="productView-details">
//                         <span class="productView-details-title">Product Description</span>
//                         <span class="productView-details-description">
//                         ${description}
//                         </span>
//                       </section>
//                     </div>
//                   </div>
//                   <div class="suggested-products">
//                     <section><h1>Customers Also Viewed</h1></section>
//                     <div class="item">
//                       <img
//                         src="http://img1.exportersindia.com/product_images/bc-small/dir_55/1620613/cannondale-jekyll-1-2011-mountain-bike-309779.jpg"
//                         alt="item"
//                       />
//                       <section class="title">
//                         <span class="title-desc"
//                           ><a href="#">Cannondale Jekyll 3 - Mountain</a></span
//                         >

//                         <span class="title-price"> $130</span>
//                       </section>
//                       <button class="add-to-cart" type="button">Add to cart</button>
//                     </div>
//                   </div>

//                 `;

//       productDetailsDiv.html(productHTML);
//     },
//     error: function (error) {
//       console.error("Error fetching data:", error);
//     },
//   });

//   document.addEventListener("DOMContentLoaded", function () {
//     const minusButtons = document.querySelectorAll(".minus");
//     const plusButtons = document.querySelectorAll(".plus");
//     const quantityInputs = document.querySelectorAll(".input-text.qty");
  
//     minusButtons.forEach((minusButton) => {
//       minusButton.addEventListener("click", function () {
//         const input = minusButton.nextElementSibling;
//         let quantity = parseInt(input.value);
//         if (quantity > 1) {
//           quantity--;
//           input.value = quantity;
//         }
//       });
//     });
  
//     plusButtons.forEach((plusButton) => {
//       plusButton.addEventListener("click", function () {
//         const input = plusButton.previousElementSibling;
//         let quantity = parseInt(input.value);
//         quantity++;
//         input.value = quantity;
//       });
//     });
//   });
  
//   document.addEventListener("DOMContentLoaded", function () {
//     const imageSlickItems = document.querySelectorAll(".productView-imageSlick");
//     const mainImage = document.querySelector(".productView-image");
  
//     imageSlickItems.forEach(function (imageSlickItem, index) {
//       imageSlickItem.addEventListener("click", function () {
//         // Remove active class from all images
//         imageSlickItems.forEach(function (item) {
//           item.classList.remove("active");
//         });
  
//         // Add active class to the clicked image
//         imageSlickItem.classList.add("active");
  
//         // Update the main image source
//         const imageSource = imageSlickItem.querySelector("img").src;
//         mainImage.src = imageSource;
//       });
//     });
//   });
  
//   document.addEventListener("DOMContentLoaded", function () {
//     const favoriteButton = document.querySelector(".favorite-button");
//     favoriteButton.addEventListener("click", function () {
//       const heartIcon = favoriteButton.querySelector("i");
  
//       if (heartIcon.classList.contains("far")) {
//         heartIcon.classList.remove("far");
//         heartIcon.classList.add("fas"); // Change to filled heart icon
//         favoriteButton.setAttribute("aria-label", "Remove from favorites");
//       } else {
//         heartIcon.classList.remove("fas");
//         heartIcon.classList.add("far"); // Change back to empty heart icon
//         favoriteButton.setAttribute("aria-label", "Add to favorites");
//       }
//     });
//   });

// });