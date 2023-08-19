function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

/*nofar*/
/*nofar*/

//jQuery time
$(document).ready(function () {
  // Your jQuery code here
  var category = $("#category").val();
  var current_fs, next_fs, previous_fs; //fieldsets
  var left, opacity, scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches

  $(".next1").click(function () {
    var $form = $(this).parentsUntil("msform");
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

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
    var $form = $(this).parentsUntil("msform");
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

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
// Michal

// function validate($form) {
//   // Reset previous error messages
//   $form.find(".error-message").text("");

//   // Validate Company Name (only letters)
//   var companyNameInput = $form.find("#companyName");
//   if (!/^[a-zA-Z\s]+$/.test(companyNameInput.val())) {
//     companyNameInput.siblings(".error-message").text("Only letters allowed.");

//     return false;
//   }

//         // Validate Product Name (only letters)
//     var productNameInput = $form.find("#productName");
//     if (!/^[a-zA-Z\s]+$/.test(productNameInput.val())) {
//       productNameInput.siblings(".error-message").text("Only letters allowed.");
//       return false;
//     }

//     // Validate Price (only numbers)
//     var priceInput = $form.find("#price");
//     if (!/^\d+$/.test(priceInput.val())) {
//       priceInput.siblings(".error-message").text("Only numbers allowed.");
//       return false;
//     }

//   // Other validation checks if needed...

//   return true; // All validation checks passed
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const companyNameInput = document.getElementById("companyName");
//   const productNameInput = document.getElementById("productName");
//   const priceInput = document.getElementById("price");
//   const nextButton = document.querySelector(".next");

//   companyNameInput.addEventListener("input", validateCompanyName);
//   productNameInput.addEventListener("input", validateProductName);
//   priceInput.addEventListener("input", validatePrice);

//   function validateCompanyName() {
//     const companyName = companyNameInput.value.trim();
//     const regex = /^[A-Za-z\s]+$/;
//     const companyNameError = document.getElementById("companyName-error");

//     if (regex.test(companyName)) {
//       companyNameInput.classList.remove("error");
//       companyNameError.textContent = "";
//       enableNextButtonIfValid();
//       return true;
//     } else {
//       companyNameInput.classList.add("error");
//       companyNameError.textContent = "Company name must contain only letters.";
//       disableNextButton();
//       return false;
//     }
//   }

//   function validateProductName() {
//     const productName = productNameInput.value.trim();
//     const regex = /^[A-Za-z\s]+$/;
//     const productNameError = document.getElementById("productName-error");

//     if (regex.test(productName)) {
//       productNameInput.classList.remove("error");
//       productNameError.textContent = "";
//       enableNextButtonIfValid();
//       return true;
//     } else {
//       productNameInput.classList.add("error");
//       productNameError.textContent = "Product name must contain only letters.";
//       disableNextButton();
//       return false;
//     }
//   }

//   function validatePrice() {
//     const price = priceInput.value.trim();
//     const regex = /^\d+$/;
//     const priceError = document.getElementById("price-error");

//     if (regex.test(price)) {
//       priceInput.classList.remove("error");
//       priceError.textContent = "";
//       enableNextButtonIfValid();
//       return true;
//     } else {
//       priceInput.classList.add("error");
//       priceError.textContent = "Price must contain only numbers.";
//       disableNextButton();
//       return false;
//     }
//   }

//   function enableNextButtonIfValid() {
//     if (validateCompanyName() && validateProductName() && validatePrice()) {
//       nextButton.disabled = false;
//     } else {
//       nextButton.disabled = true;
//     }
//   }

//   function disableNextButton() {
//     nextButton.disabled = true;
//   }

//   nextButton.addEventListener("click", function (event) {
//     if (nextButton.disabled) {
//       // Revalidate inputs if the button was previously disabled
//       validateCompanyName();
//       validateProductName();
//       validatePrice();
//       if (!nextButton.disabled) {
//         // Allow the button to proceed when inputs are now valid
//         return;
//       }
//       event.preventDefault();
//     }
//   });
// });
