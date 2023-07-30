class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <link rel="stylesheet" href="items.css">
        <title>Store Name</title>
      
</head>

<footer class="footer">
        <div class="container text-center">
          <a href="https://www.facebook.com" class="btn btn-social-icon btn-facebook" target="_blank">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com" class="btn btn-social-icon btn-twitter" target="_blank">
                <i class="fab fa-twitter"></i>
            </a>
          <a href="https://www.instagram.com" class="btn btn-social-icon btn-instagram" target="_blank">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://youtu.be/dQw4w9WgXcQ" class="btn btn-social-icon btn-youtube" target="_blank">
            <i class="fab fa-youtube"></i>
          </a>
          <a href="https://www.tiktok.com" class="btn btn-social-icon btn-tiktok" target="_blank">
            <i class="fab fa-tiktok"></i>
          </a>

          <!-- Card section with only Amex, Diners, Visa, Mastercard, and Paypal -->
          <i class="fab fa-cc-amex"></i>
          <i class="fab fa-cc-diners-club"></i>
          <i class="fab fa-cc-visa"></i>
          <i class="fab fa-cc-mastercard"></i>
          <i class="fab fa-cc-paypal"></i>
          
         
        </div>
      </footer>
      `;
    }
  }
  
  customElements.define('footer-component', Footer);