/*nofar*/

//jQuery time
$(document).ready(function () {
  // Your jQuery code here
  var category = $("#category").val();
  var current_fs, next_fs, previous_fs; //fieldsets
  var left, opacity, scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches

  $(".next1").click(function () {
    var currentSubtitle = $(this)
      .parentsUntil(".msform")
      .find(".fs-subtitle")
      .text()
      .trim();
    if (currentSubtitle !== "step 1") {
      return false; // Prevent proceeding to the next step
    }

    // Check if the required fields are filled correctly
    // var companyName = $("#companyName").val().trim();
    var category = $("#category").val();
    var ages = $("#ages").val();

    // if (!/^[a-zA-Z\s]+$/.test(companyName)) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Validation Error',
    //     text: "Company's name should only contain letters",
    //   });
    //   return false; // Prevent proceeding to the next step
    // }

    // $("#companyName-error").text("");

    var $form = $(this).parentsUntil("msform");
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Step 1 completed successfully!",
    });

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = now * 50 + "%";
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({
            transform: "scale(" + scale + ")",
            position: "absolute",
          });
          next_fs.css({ left: left, opacity: opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: "easeInOutBack",
      }
    );
  });

  $(".next2").click(function () {
    $("#price-error").text("");
    $("#productName-error").text("");
    $("#productPhoto-error").text("");

    var price = $("#price").val();
    var productName = $("#productName").val();
    var productPhoto = $("#productPhoto").val();
    var quantity = $("#quantity").val();
    var description = $("#description").val();
    let isValid = true;

    if (!validateNumber(price)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Price should only contain digits.",
      });
      isValid = false;
    }
    if (price === "0") {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Price should be greater than 0.",
      });
      isValid = false;
    }

    if (!validateLettersDigitsAndSpaces(productName)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Product name should be only letters or digits, and at least 4 characters.",
      });
      isValid = false;
    }

    var productPhotos = $("#productPhotos")[0].files;
    if (productPhotos.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please upload at least 1 photo.",
      });
      isValid = false;
    } else if (productPhotos.length > 4) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "You can upload a maximum of 4 photos.",
      });
      isValid = false;
    }

    if (!validateNumber(quantity)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Quantity should only contain digits.",
      });
      isValid = false;
    }

    if (!validateLettersDigitsAndSpaces2(description)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Descriptionn should be at leat 5 characters.",
      });
      isValid = false;
    }

    function validateNumber(str) {
      return /^\d+$/.test(str);
    }
    function validateLettersDigitsAndSpaces(str) {
      return /^[a-zA-Z0-9 ]{4,}$/.test(str);
    }

    function validateLettersDigitsAndSpaces2(str) {
      return /^[a-zA-Z0-9 ]{5,}$/.test(str);
    }

    if (!isValid) {
      return false;
    }

    var $form = $(this).parentsUntil("msform");
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Step 2 completed successfully!",
    });

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = now * 50 + "%";
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({
            transform: "scale(" + scale + ")",
            position: "absolute",
          });
          next_fs.css({ left: left, opacity: opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: "easeInOutBack",
      }
    );
  });
  $(".previous2").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale previous_fs from 80% to 100%
          scale = 0.8 + (1 - now) * 0.2;
          //2. take current_fs to the right(50%) - from 0%
          left = (1 - now) * 50 + "%";
          //3. increase opacity of previous_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({ left: left });
          previous_fs.css({
            transform: "scale(" + scale + ")",
            opacity: opacity,
          });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: "easeInOutBack",
      }
    );
  });

  $(".previous3").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale previous_fs from 80% to 100%
          scale = 0.8 + (1 - now) * 0.2;
          //2. take current_fs to the right(50%) - from 0%
          left = (1 - now) * 50 + "%";
          //3. increase opacity of previous_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({ left: left });
          previous_fs.css({
            transform: "scale(" + scale + ")",
            opacity: opacity,
          });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: "easeInOutBack",
      }
    );
  });
});
