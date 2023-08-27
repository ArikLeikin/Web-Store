$(document).ready(function () {
  // Function to handle sorting
  function sortProducts() {
    var $productGrid = $(".product-grid");
    var selectedSortValue = $("#Sortby-filter").val();

    var $productItems = $productGrid.find(".product-item");

    // Sort the product items based on the selected value
    if (selectedSortValue === "best-selling") {
      // Implement your best-selling sorting logic here
    } else if (selectedSortValue === "price-high-to-low") {
      $productItems.sort(function (a, b) {
        var priceA = parseFloat($(a).data("price"));
        var priceB = parseFloat($(b).data("price"));
        return priceB - priceA;
      });
    } else if (selectedSortValue === "price-low-to-high") {
      $productItems.sort(function (a, b) {
        var priceA = parseFloat($(a).data("price"));
        var priceB = parseFloat($(b).data("price"));
        return priceA - priceB;
      });
    }

    // Empty the grid and append sorted product items back to it
    $productGrid.empty();
    $productItems.appendTo($productGrid);
  }

  // Attach event handler to the dropdown change event
  $("#Sortby-filter").on("change", function () {
    sortProducts();
  });
});

// get product api
$(document).ready(function () {
  $(document).ready(function () {
    const productGrid = $("#productGrid");

    function createProductHTML(product) {
      const productItem = $("<div>").addClass("product-item");
      productItem.attr({
        "data-age-range": product.age_range,
        "data-game-type": product.category,
        "data-price": product.price.toFixed(2), // Format price to two decimal places
        "filter-by": "",
      });

      const imgContainer = $("<div>").addClass("img-container");
      const productLink = $("<a>").addClass("product-img").attr("href", "#");

      if (product.image && product.image.length > 0) {
        // Replace backslashes with forward slashes in image paths
        const imagePath = product.image[0].replace(/\\/g, "/");
        const productImage = $("<img>")
          .attr("src", imagePath)
          .attr("alt", "item");
        productLink.append(productImage);
        imgContainer.append(productLink);
        productItem.append(imgContainer);
      }

      const productTitleSection = $("<section>").addClass("product-title");
      const productTitleDesc = $("<span>")
        .addClass("product-title-desc")
        .append($("<a>").attr("href", "#").text(product.title));
      productTitleSection.append(productTitleDesc);
      productItem.append(productTitleSection);

      const productPriceSection = $("<section>").addClass("product-price");
      const productTitlePrice = $("<span>")
        .addClass("product-title-price center")
        .text(`$${product.price.toFixed(2)}`); // Format price to two decimal places
      productPriceSection.append(productTitlePrice);
      productItem.append(productPriceSection);

      return productItem;
    }

    function displayProducts(products) {
      productGrid.empty(); // Clear existing products
      products.forEach((product) => {
        const productHTML = createProductHTML(product);
        productGrid.append(productHTML);
      });
    }

    // Fetch products from the API
    const apiUrl = "http://127.0.0.1:8080/api/products";
    $.get(apiUrl)
      .done(function (data) {
        displayProducts(data); // Display the fetched products
      })
      .fail(function () {
        console.error("Error fetching products");
      });
  });
});
