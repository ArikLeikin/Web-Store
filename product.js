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
        min: 50,
        max: 300,
        values: [50, 300],
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
