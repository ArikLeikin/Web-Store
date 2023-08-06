$(document).ready(function() {
    $('#toggle-filter').on('click', function() {
        $('#filter-sidebar').toggle();
        var buttonText = $(this).text();
        $(this).text(buttonText === "Hide Filter" ? "Filter your products" : "Hide Filter");
    });
});

$(function() {
    // Price range slider initialization
    $("#price-range-slider").slider({
        range: true,
        min: 1,
        max: 300,
        values: [1, 300],
        slide: function(event, ui) {
            $("#price-range-values").html("$" + ui.values[0] + " - $" + ui.values[1]);
            
            // Calculate the position of the dot
            var sliderWidth = $("#price-range-slider").width();
            var minValue = $("#price-range-slider").slider("option", "min");
            var maxValue = $("#price-range-slider").slider("option", "max");
            var leftPosition1 = ((ui.values[0] - minValue) / (maxValue - minValue)) * sliderWidth;
            var leftPosition2 = ((ui.values[1] - minValue) / (maxValue - minValue)) * sliderWidth;
            
            // Update the position of the dots
            $("#price-dot-min").css("left", leftPosition1 + "px");
            $("#price-dot-max").css("left", leftPosition2 + "px");
        }
    });
    
    // Update the price range values container
    $("#price-range-values").html("$" + $("#price-range-slider").slider("values", 0) + " - $" + $("#price-range-slider").slider("values", 1));
});





function filterProducts() {
    const selectedAgeRange = $('#age-filter').val();
    const selectedGameType = $('#game-type-filter').val();
    const priceMin = $("#price-range-slider").slider("values", 0);
    const priceMax = $("#price-range-slider").slider("values", 1);

    // Loop through each product item
    $(".product-item").each(function() {
        const productAgeRange = $(this).data('age-range');
        const productGameType = $(this).data('game-type');
        const productPrice = parseFloat($(this).data('price'));

        // Check if the product matches all selected filters
        const ageMatch = selectedAgeRange === "" || productAgeRange === selectedAgeRange;
        const gameTypeMatch = selectedGameType === "" || productGameType === selectedGameType;
        const priceMatch = isNaN(productPrice) || (productPrice >= priceMin && productPrice <= priceMax);

        // Show or hide the product item based on the filter criteria
        if (ageMatch && gameTypeMatch && priceMatch) {
            $(this).show(); // Product matches all selected filters, show the item
        } else {
            $(this).hide(); // Product does not match all selected filters, hide the item
        }
    });
}

$(function() {
    // Price range slider initialization and event handler
    $("#price-range-slider").slider({
        range: true,
        min: 1,
        max: 300,
        values: [1, 300],
        slide: function(event, ui) {
            $("#price-range-values").html("$" + ui.values[0] + " - $" + ui.values[1]);
            
            // Calculate the position of the dot
            var sliderWidth = $("#price-range-slider").width();
            var minValue = $("#price-range-slider").slider("option", "min");
            var maxValue = $("#price-range-slider").slider("option", "max");
            var leftPosition1 = ((ui.values[0] - minValue) / (maxValue - minValue)) * sliderWidth;
            var leftPosition2 = ((ui.values[1] - minValue) / (maxValue - minValue)) * sliderWidth;
            
            // Update the position of the dots
            $("#price-dot-min").css("left", leftPosition1 + "px");
            $("#price-dot-max").css("left", leftPosition2 + "px");

            filterProducts(); // Call the filter function on slider change
        }
    });

    // Add event listeners for age and game type filters
    $('#age-filter, #game-type-filter').on('change', function() {
        filterProducts(); // Call the filter function when age or game type filters change
    });

    // Update the price range values container
    $("#price-range-values").html("$" + $("#price-range-slider").slider("values", 0) + " - $" + $("#price-range-slider").slider("values", 1));
});
