
    document.addEventListener("DOMContentLoaded", function () {
        let slideIndex = 1;
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides((slideIndex += n));
        }

        function showSlides(n) {
            const slides = document.querySelectorAll(".slideshow img");
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            slides.forEach((slide) => (slide.style.display = "none"));
            slides[slideIndex - 1].style.display = "block";
        }

        document.querySelector(".left-arrow").addEventListener("click", function () {
            plusSlides(-1);
        });

        document.querySelector(".right-arrow").addEventListener("click", function () {
            plusSlides(1);
        });
    });

    

