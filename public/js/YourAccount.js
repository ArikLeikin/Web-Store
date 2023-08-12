$(document).ready(function () {
    // Update email form submission
    $('#updateEmailForm').submit(function (event) {
        event.preventDefault();
        const newEmail = $('#newEmail').val();
        // Logic to update email goes here
    });

    // Generate accordion cards for order history
    for (let i = 1; i <= 3; i++) {
        $('#orderHistoryAccordion').append(`
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

    // Generate accordion cards for Yad2 uploads history
    for (let i = 1; i <= 3; i++) {
        $('#yad2HistoryAccordion').append(`
            <div class="card">
                <div class="card-header" data-toggle="collapse" data-target="#yad2Upload${i}">
                    Yad2 Upload ${i}
                </div>
                <div class="card-content collapse" id="yad2Upload${i}">
                    <!-- Yad2 Upload ${i} details go here -->
                </div>
            </div>
        `);
    }

    // Toggle card content visibility on click
    $('.card-header').click(function () {
        $(this).next('.card-content').slideToggle();
    });
});
