class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <header>
        <div class="container">
        <nav class="navUser">
          <ul class="navUser-section">
            <li class="item__account">
              <a aria-label="Account" href=""
                ><img
                  src="images/white-icons/account-icon.png"
                  alt="account"
                  width="30"
                />
              </a>
            </li>
            <li class="item__wishlist">
              <a aria-label="Wishlist" href="">
                <img
                  src="images/white-icons/wishlist-icon.png"
                  alt="Cart"
                  width="30"
                />
              </a>
            </li>
            <li class="item__cart">
              <a href="" aria-label="Cart">
                <img
                  src="images/white-icons/cart-icon.png"
                  alt="Cart"
                  width="30"
                />
              </a>
            </li>
          </ul>
        </nav>

        <div class="header-logo">
          <a href="#" data-instantload='{"page":"home"}'>
            <div class="header-logo-image-container">
              <img
                class="header-logo-image"
                src="images/logo.png"
                width="180"
                height="auto"
              />
            </div>
          </a>
        </div>

        <div class="quickSearch">
          <form class="form">
            <div class="form-container">
              <input
                class="form-input"
                data-search-quick
                name="search_query"
                id="search_query"
                data-error-message="Search field cannot be empty."
                placeholder="Search the store"
                autocomplete="off"
              />
              <button
                type="submit"
                class="button search-button"
                id="searchButton"
              >
                <img
                  src="images/white-icons/search-icon.png"
                  alt="Search"
                  width="25"
                  height="auto"
                />
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Start Navigation Bar -->
      <nav class="navbar">
        <ul class="menu">
          <li>
            <a class="hasDropdown" href="#"
              >Categories <i class="fa fa-angle-down"></i
            ></a>

            <ul class="nav_container">
              <div class="container__list">
                <div class="container__listItem">
                  <div class="container__listItem_title">Board Games</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">Science</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">Games</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">Riding Toys</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">Puzzles</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">Music&Karaoke</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">Books</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">Lego</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">Dolls</div>
                </div>
                <div class="container__listItem"></div>
                <div class="container__listItem"></div>

                <div class="container__listItem">
                  <div class="container__listItem_title bold no-underline">
                    $10 & Below
                  </div>
                </div>
              </div>
            </ul>
          </li>
          <li>
            <a class="hasDropdown" href="#"
              >Ages<i class="fa fa-angle-down"></i
            ></a>
            <ul class="nav_container">
              <div class="container__list">
                <div class="container__listItem">
                  <div class="container__listItem_title">0-12 MONTHS</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">12-24 MONTHS</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">2-4 YEARS</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">5-7 YEARS</div>
                </div>
                <div class="container__listItem">
                  <div class="container__listItem_title">8-99 YEARS</div>
                </div>
              </div>
            </ul>
          </li>
          <li>
            <a href="#">Outdoor</a>
          </li>
          <li>
            <a href="#">Yad2</a>
          </li>
          <li>
            <a href="#">Gift Finder</a>
          </li>
        </ul>
      </nav>
      <!-- End Navigation Bar -->
        </header>
      `;
    }
  }
  
  customElements.define('header-component', Header);