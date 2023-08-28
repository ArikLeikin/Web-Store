var max = 0;

$(document).ready(function () {
  const productGrid = $("#productGrid");
  $("#category-title").text("All Games");
  // Function to create the product HTML structure
  function createProductHTML(product) {
    const productItem = document.createElement("div");
    productItem.className = "product-item";
    productItem.setAttribute("data-age-range", product.ageRange);
    productItem.setAttribute("data-game-type", product.gameType);
    productItem.setAttribute("data-price", product.price);
    productItem.setAttribute("filter-by", "");

    // Creating the image container div
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";

    // Creating the product image link
    const productLink = document.createElement("a");
    productLink.className = "product-img";
    productLink.href = "/product-details?id=" + product._id;

    // Creating the product image element
    if (product.image && product.image.length > 0) {
      const imagePath = product.image[0];
      const productImage = document.createElement("img");
      productImage.src = imagePath;
      productImage.alt = "item";
      productLink.appendChild(productImage);
      imgContainer.appendChild(productLink);
      productItem.appendChild(imgContainer);
    }

    // Creating the product title section
    const productTitleSection = document.createElement("section");
    productTitleSection.className = "product-title";

    // Creating the product title description
    const productTitleDesc = document.createElement("span");
    productTitleDesc.className = "product-title-desc";

    // Creating the product title link
    const productTitleLink = document.createElement("a");
    productTitleLink.href = "#";
    productTitleLink.textContent = product.title;

    // Adding the title link to the title description
    productTitleDesc.appendChild(productTitleLink);

    // Adding the title description to the title section
    productTitleSection.appendChild(productTitleDesc);

    // Appending the title section to the product item
    productItem.appendChild(productTitleSection);

    // Creating the product price section
    const productPriceSection = document.createElement("section");
    productPriceSection.className = "product-price";

    // Creating the product title price
    const productTitlePrice = document.createElement("span");
    productTitlePrice.className = "product-title-price center"; // Adding 'center' class
    productTitlePrice.textContent = `$${product.price}`;

    // Adding the price to the price section
    productPriceSection.appendChild(productTitlePrice);

    // Appending the price section to the product item
    productItem.appendChild(productPriceSection);

    if (max < product.price) {
      max = product.price;
      updatemaxprices();
    }

    return productItem;
  }

  // Add an event listener to the min input field
  $("#min-price-input").on("input", function () {
    var minValue = parseFloat($(this).val()) || 0;
    var currentMaxValue =
      parseFloat($("#max-price-input").val()) || initialMaxValue;

    // Update the max attribute of the max input field
    $("#max-price-input").attr(
      "min",
      currentMaxValue < minValue ? currentMaxValue : minValue
    );
  });

  // Add an event listener to the max input field
  $("#max-price-input").on("input", function () {
    var maxValue = parseFloat($(this).val()) || initialMaxValue;
    var currentMinValue = parseFloat($("#min-price-input").val()) || 0;

    // Update the max attribute of the min input field
    $("#min-price-input").attr(
      "max",
      maxValue > currentMinValue ? maxValue : currentMinValue
    );
  });

  function updatemaxprices() {
    $("#max-price-input").attr("max", max + 1);
    $("#max-price-input").val(parseInt(max + 1));
    $("#min-price-input").attr(
      "max",
      parseInt($("#max-price-input").val()) - 1
    );
  }

  function applyFilters(products) {
    const selectedGameType = $("#game-type-filter").val();
    const selectedAge = $("#age-filter").val().toLowerCase(); // Convert to lowercase
    const minPrice = parseFloat($("#min-price-input").val());
    const maxPrice = parseFloat($("#max-price-input").val());
    const selectedSorting = $("#Sortbyfilter").val();

    const filteredProducts = products.filter((product) => {
      const filterCategory = selectedGameType;
      const filterAge = product.age_range.toLowerCase(); // Convert to lowercase
      const isGameTypeMatch =
        !filterCategory ||
        product.category.toLowerCase() === filterCategory.toLowerCase();
      const isAgeRangeMatch = !selectedAge || filterAge === selectedAge;
      const isPriceInRange =
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice);
      return isGameTypeMatch && isAgeRangeMatch && isPriceInRange;
    });

    sortProductsByPrice(filteredProducts, selectedSorting);

    productGrid.empty();
    filteredProducts.forEach((product) => {
      const productHTML = createProductHTML(product);
      productGrid.append(productHTML);
    });
  }

  function sortProductsByPrice(products, sortOrder) {
    products.sort((a, b) => {
      const priceDifference = a.price - b.price;
      return sortOrder === "highToLow" ? -priceDifference : priceDifference;
    });
  }

  function fetchAndDisplayProducts() {
    const apiUrl = "http://127.0.0.1:8080/api/products";

    $.get(apiUrl, function (data, status) {
      if (status === "success") {
        applyFilters(data);
      } else {
        console.error("Error fetching products:", status);
      }
    }).fail(function () {
      console.error("Network error occurred");
    });
  }

  // Function to extract URL parameters
  function getUrlParameter(name) {
    const results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
      window.location.href
    );
    if (results == null) {
      return null;
    } else {
      return decodeURI(results[1]) || 0;
    }
  }

  // Extract 'category' parameter from the URL
  const urlCategory = getUrlParameter("category");
  if (urlCategory) {
    const optionValues = [
      { value: "", label: "All" },
      { value: "boardgames", label: "Board Games" },
      { value: "ridingtoys", label: "Riding Toys" },
      { value: "books", label: "Books" },
      { value: "science", label: "Sience" },
      { value: "puzzles", label: "Puzzle Games" },
      { value: "lego", label: "Lego" },
      { value: "games", label: "Games" },
      { value: "musickaroke", label: "Music & Karaoke" },
      { value: "dolls", label: "Dolls" },
      { value: "outdoor", label: "Outdoor" },
      { value: "yad2", label: "Yad 2" },
    ];
    const selectedOption = optionValues.find(
      (option) => option.value.toLowerCase() === urlCategory.toLowerCase()
    );

    $("#game-type-filter").val(selectedOption.value);
    // $("#game-type-filter").prop("disabled", true);
    $("#category-title").text(selectedOption.label);

    fetchAndDisplayProducts();
  }

  // Extract 'category' parameter from the URL
  const urlAge = getUrlParameter("age");
  if (urlAge) {
    const optionValues = [
      { value: "", label: "All" },
      { value: "0-12", label: "0-12 months" },
      { value: "12-24", label: "12-24 months" },
      { value: "2-4", label: "2-4 Years" },
      { value: "5-7", label: "5-7 Years" },
      { value: "8-99", label: "8-99 Years" },
    ];
    const selectedOption = optionValues.find(
      (option) => option.value.toLowerCase() === urlAge.toLowerCase()
    );

    $("#age-filter").val(selectedOption.value);
    // $("#age-filter").prop("disabled", true);

    fetchAndDisplayProducts();
  }
  fetchAndDisplayProducts(); // Initial fetch and display

  $("#filter-button").click(function () {
    fetchAndDisplayProducts();
  });

  $("#Sortbyfilter").change(function () {
    fetchAndDisplayProducts();
  });
  const urlSearch = getUrlParameter("search_query");
  if (urlSearch) {
    console.log(urlSearch.toLowerCase());
    const apiUrl =
      "http://127.0.0.1:8080/api/search/" + urlSearch.toLowerCase();

    $.get(apiUrl, function (data, status) {
      if (status === "success") {
        applyFilters(data);
      } else {
        console.error("Error fetching products:", status);
      }
    }).fail(function () {
      console.error("Network error occurred");
    });
  }
});
