$(document).ready(function () {
  $("#contactForm").on("submit", function (event) {
    var name = $("#name").val();
    var isNameValid = /^[a-zA-Z\s]+$/.test(name); // Validate only letters and spaces

    if (!isNameValid) {
      event.preventDefault();
      $("#name-error")
        .addClass("error-message")
        .text("Please enter a valid name (letters only).");
    } else {
      $("#name-error").removeClass("error-message").text("");
    }
  });

  function initMap() {
    // var apiKey = "Aqz-TxrGvUdOSD7cnyI5P2ic19CAV1RJo4MhsKRP0us6CJhf0gyTaBJrZJzL2OHY";
    var apiKey = "AIzaSyAc--L5B2_74eqSZrsum00Dc4fYJ1XdSmY";

    var map = new Microsoft.Maps.Map(document.getElementById("mapContainer"), {
      credentials: apiKey,
    });

    const locationDetailsContainer =
      document.querySelector(".address-container");
    /*get api*/
    fetch("http://127.0.0.1:8080/api/store-locations")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Fetch error: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        const addressContainer = $(".address-container");
        for (let i = 0; i < data.data.length; i++) {
          let location = data.data[i];
          var latitude = location.latitude; // Replace with the actual latitude property
          var longitude = location.longitude; // Replace with the actual longitude property

          var locationCoords = new Microsoft.Maps.Location(longitude, latitude);

          var pin = new Microsoft.Maps.Pushpin(locationCoords, {
            title: location.name, // Replace with the actual name property
            subTitle: location.description, // Replace with the actual description property
          });
          // Add the pin to the map
          map.entities.push(pin);
        }
        for (let i = 0; i < data.data.length; i++) {
          const addressBox = $("<div>").addClass("address-box");
          const addressParagraph = $("<p>");

          const addressSpan = $("<span>")
            .addClass("address")
            .text(data.data[i].address);

          const phoneNumberSpan = $("<span>")
            .addClass("phone_number")
            .text(data.data[i].phone_number);

          addressParagraph.append(addressSpan).append("<br />");
          addressParagraph.append("Phone number: ").append(phoneNumberSpan);

          addressBox.append(addressParagraph);
          addressContainer.append(addressBox);
        }
      });

    // Times Square coordinates
    var latitude = 40.758896; // Times Square latitude
    var longitude = -73.98513; // Times Square longitude

    var locationCoords = new Microsoft.Maps.Location(latitude, longitude);

    var pin = new Microsoft.Maps.Pushpin(locationCoords, {
      title: "Times Square",
      subTitle: "New York City, USA",
    });

    // Add the pin to the map
    map.entities.push(pin);
  }
  window.onload = function () {
    initMap();
  };
});
