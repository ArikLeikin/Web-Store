/*$(document).ready(function () {
  $("form").on("submit", function (event) {
    var price = $("#price").val();
    var bankAccount = $("#supplierID").val();

    var isPriceValid = containsOnlyNumbers(price) && parseFloat(price) > 0;
    var isBankAccountValid = containsOnlyNumbers(bankAccount);

    if (!isPriceValid) {
      event.preventDefault();
      $("#price-error")
        .addClass("error-message")
        .text(
          "Please enter a valid price (numbers only and greater than zero)."
        );
    } else {
      $("#price-error").removeClass("error-message").text("");
    }

    if (!isBankAccountValid) {
      event.preventDefault();
      $("#supplierID-error")
        .addClass("error-message")
        .text("Please enter a valid ID number (numbers only).");
    } else {
      $("#supplierID-error").removeClass("error-message").text("");
    }
  });
});
*/
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

  $(".next").click(function () {
    var $form = $(this).parentsUntil("msform");
    if (validate($form)) {
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
    }
  });

  $(".previous").click(function () {
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
function validate($form) {
  // Set valid to true
  var valid = true;

  // Any invalid element will set valid to false
  $.each($form.find("input:not(:button)"), function (index, input) {
    // Utilizing HTML5 validation
    if (input == null) {
      valid = false;
    }
  });

  return valid;
}
