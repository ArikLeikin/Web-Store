$(document).ready(function () {
  //Quantity minus and plus buttons
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
    quantity++;
    input.val(quantity);
  });

  // Image click handler
  $(".productView-imageSlick").click(function () {
    $(".productView-imageSlick").removeClass("active");
    $(this).addClass("active");
    const imageSource = $(this).find("img").attr("src");
    $(".productView-image").attr("src", imageSource);
  });

  // Favorite button click handler
  $(".favorite-button").click(function () {
    const heartIcon = $(this).find("i");
    if (heartIcon.hasClass("far")) {
      heartIcon.removeClass("far").addClass("fas");
      $(this).attr("aria-label", "Remove from favorites");
    } else {
      heartIcon.removeClass("fas").addClass("far");
      $(this).attr("aria-label", "Add to favorites");
    }
  });
});
