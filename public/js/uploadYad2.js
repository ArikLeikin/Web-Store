// $(document).ready(function () {
//   $("form").on("submit", function (event) {
//     var price = $("#price").val();
//     var bankAccount = $("#bankAccount").val();

//     var isPriceValid = containsOnlyNumbers(price) && parseFloat(price) > 0;
//     var isBankAccountValid = containsOnlyNumbers(bankAccount);

//     if (!isPriceValid) {
//       event.preventDefault();
//       $("#price-error")
//         .addClass("error-message")
//         .text(
//           "Please enter a valid price (numbers only and greater than zero)."
//         );
//     } else {
//       $("#price-error").removeClass("error-message").text("");
//     }

//     if (!isBankAccountValid) {
//       event.preventDefault();
//       $("#bankAccount-error")
//         .addClass("error-message")
//         .text("Please enter a valid bank account (numbers only).");
//     } else {
//       $("#bankAccount-error").removeClass("error-message").text("");
//     }
//   });
// });

function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

$(document).ready(function () {
  // Your jQuery code here
  var category = $("#category").val();
  var current_fs, next_fs, previous_fs; //fieldsets
  var left, opacity, scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches

  $(".next1").click(function () {
    $("#productName-error").text("");
    $("#price-error").text("");

    var productName = $("#productName").val();
    var price = $("#price").val();
   
    let isValid = true;
    
    // if (!validateNumber(price)) {
    //   $("#price-error").text("Price name should only contain digits.");
    //   isValid= false; // Prevent proceeding to the next step
    // }
    // if ( price==='0') {
    //   $("#price-error").text("Price should be greater than +0 and only digits.");
    //   isValid= false; // Prevent proceeding to the next step
    // }

    if (!validateNumber(price)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Price should only contain digits.',
      });
      isValid = false;
    }
    if (price === '0') {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Price should be greater than 0.',
      });
      isValid = false;    
    }


    if (!validateLettersDigitsAndSpaces(productName)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Product name should be only letters or digits, and at least 4 characters.",
      });
      isValid = false;
    }

    //  if (!validateLettersDigitsAndSpaces(productName)) {
    //   $("#productName-error").text("Product name should be only letters or digits, and at least 4 characters.");
    //   isValid= false; // Prevent proceeding to the next step
    // }

    function validateNumber(str) {
      return /^\d+$/.test(str);
    }
    function validateLettersDigitsAndSpaces(str) {
      return /^[a-zA-Z0-9 ]{4,}$/.test(str);
    }
    
    if(!isValid)
    {
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
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Step 1 completed successfully!'
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
    $("#bankAccount-error").text("");
    $("#productPhoto-error").text("");
    
    
    var bankAccount = $("#bankAccount").val();
  
   
    let isValid = true;
    
    // if (!validateBankAccount(bankAccount)) {
    //   $("#bankAccount-error").text("Bank Account name should contain 14 digits.");
    //   isValid= false; // Prevent proceeding to the next step
    // }

    if (!validateBankAccount(bankAccount)) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: "Bank Account name should contain 14 digits.",
      });
      isValid = false;
    }


    var productPhotos = $("#productPhotos")[0].files;
    if (productPhotos.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please upload at least 1 photo.',
      });
      isValid = false;
    } else if (productPhotos.length > 4) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'You can upload a maximum of 4 photos.',
      });
      isValid = false;

    }


    function validateBankAccount(str) {
      return /^\d{14}$/.test(str);
    }

    

    if(!isValid)
    {
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
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Step 2 completed successfully!'
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
