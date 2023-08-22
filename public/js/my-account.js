$(document).ready(function () {
  // Update email form submission
  $("#updateEmailForm").submit(function (event) {
    event.preventDefault();
    const newEmail = $("#newEmail").val();
    // Logic to update email goes here
  });

  // Generate accordion cards for order history
  for (let i = 1; i <= 3; i++) {
    $("#orderHistoryAccordion").append(`
            <div class="card">
                <div class="card-header" data-toggle="collapse" data-target="#order${i}">
                    Order ${i}
                </div>
                <div class="card-content collapse" id="order${i}">
                    <!-- Order ${i} details go here -->
                </div>
            </div>
        `);
  }
});

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

// $(document).ready(function () {
//   function show(showPage) {
//     var order_history = document.getElementById("order-history");
//     var personal_details = document.getElementById("personal-details");
//     var change_password = document.getElementById("change-password");
//     var addresses = document.getElementById("addresses");
//     var payment_methods = document.getElementById("payment-methods");
//     var wish_list = document.getElementById("wish-list");
//     var yad2_list = document.getElementById("yad2-list");

//     order_history.style.display = "none";
//     personal_details.style.display = "none";
//     change_password.style.display = "none";
//     addresses.style.display = "none";
//     payment_methods.style.display = "none";
//     wish_list.style.display = "none";
//     yad2_list.style.display = "none";

//     switch (showPage) {
//       case "order_history":
//         order_history.style.display = "block";
//         break;
//       case "personal_details":
//         personal_details.style.display = "block";
//         break;
//       case "change_password":
//         change_password.style.display = "block";
//         break;
//       case "addresses":
//         addresses.style.display = "block";
//         break;
//       case "payment_methods":
//         payment_methods.style.display = "block";
//         break;
//       case "wish_list":
//         wish_list.style.display = "block";
//         break;
//       case "yad2_list":
//         yad2_list.style.display = "block";
//         break;
//       default:
//         order_history.style.display = "block";
//         break;
//     }
//   }
// });
// Define the show function in the global scope
function show(showPage) {
  $(".page-section").hide();
  $("#" + showPage).show();
}

$(document).ready(function () {
  show("order-history"); /*default tab*/

  $("#order-history-link").click(function () {
    show("order-history");
  });

  $("#personal-details-link").click(function () {
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
