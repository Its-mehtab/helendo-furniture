"use strict";

$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 200) {
    $(".navbar").addClass("fixed-nav");
  } else {
    $(".navbar").removeClass("fixed-nav");
  }
});

$("#main-slider").owlCarousel({
  loop: true,
  margin: 15,
  nav: false,
  items: 1,
  smartSpeed: 450,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  // responsive: {
  //     0: {
  //         items: 1
  //     },
  //     600: {
  //         items: 1
  //     },
  //     1000: {
  //         items: 1
  //     }
  // }
});
$("#shopping-items").owlCarousel({
  loop: true,
  margin: 30,
  dots: false,
  items: 4,
  smartSpeed: 450,
  nav: true,
  navText: [
    "<span class='lnr lnr-arrow-left'></span>",
    "<span class='lnr lnr-arrow-right'></span>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    500: {
      items: 2,
    },
    800: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});
function makeTimer() {
  //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");
  var endTime = new Date("20 September 2023 12:00:00 GMT+01:00");
  endTime = Date.parse(endTime) / 1000;

  var now = new Date();
  now = Date.parse(now) / 1000;

  var timeLeft = endTime - now;

  var days = Math.floor(timeLeft / 86400);
  var hours = Math.floor((timeLeft - days * 86400) / 3600);
  var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
  var seconds = Math.floor(
    timeLeft - days * 86400 - hours * 3600 - minutes * 60
  );

  if (hours < "10") {
    hours = "0" + hours;
  }
  if (minutes < "10") {
    minutes = "0" + minutes;
  }
  if (seconds < "10") {
    seconds = "0" + seconds;
  }
  $("#days").html(days);
  $("#hours").html(hours);
  $("#minutes").html(minutes);
  $("#seconds").html(seconds);
}
setInterval(function () {
  makeTimer();
}, 1000);

$(document).ready(function () {
  "use strict";
  var offSetTop = 200;
  var $scrollToTopButton = $(".scrolltotop");

  $(window).scroll(function () {
    if ($(this).scrollTop() > offSetTop) {
      // $scrollToTopButton.fadeIn();
      $(".scrolltotop").addClass("show");
    } else {
      // $scrollToTopButton.fadeOut();
      $(".scrolltotop").removeClass("show");
    }
  });

  $scrollToTopButton.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});

// Cart functionality starts here
const miniCart = document.querySelector(".minicart");
const productsWrap = document.querySelector(".best-selling");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("sub-total");

// Retrieve cart data from localStorage or initialize an empty array
const productAll = JSON.parse(localStorage.getItem("cartItems")) || [];

// Helper function to save the cart data to localStorage
const saveCartToLocalStorage = () => {
  localStorage.setItem("cartItems", JSON.stringify(productAll));
};

// Helper function to update the cart count in the UI
const updateCartCount = () => {
  cartCount.textContent = productAll.length.toString();
};

// Function to create the mini cart item UI
function miniCartItem(productData) {
  const cartItem = document.createElement("li");
  cartItem.classList.add("minicart-list", "mt-4", "mb-4");
  cartItem.dataset.name = productData.name; // Add data attribute to identify the product

  cartItem.innerHTML = `
    <div class="row">
      <div class="col-md-3 col-sm-3 col-4">
        <a href="#">
          <img src="${productData.image}" alt="${
    productData.name
  }" width="85px">
        </a>
      </div>
      <div class="col-md-9 col-sm-9 col-8">
        <div class="cart-items">
          <a href="#" class="pb-2 hover-effect">${productData.name}</a>
          <label class="mb-1 mc-qty">Qty: <span class="mc-qty-span">${
            productData.qty
          }</span></label>
          <label class="mb-1 mc-price">Price: £<span class="mc-price-span">${(
            productData.price * productData.qty
          ).toFixed(2)}</span></label>
          <a href="#" class="remove-cart-btn" data-name="${productData.name}">
            <span class="lnr lnr-cross mc-remove"></span>
          </a>
        </div>
      </div>
    </div>`;

  miniCart.appendChild(cartItem);
}

// Function to find an existing product by name
const findProductByName = (productName) => {
  return productAll.find((product) => product.name === productName);
};

// Function to store product data or increase quantity if the product already exists
function storeProductData(productElement) {
  const productName = productElement.dataset.name;
  const existingProduct = findProductByName(productName);

  if (existingProduct) {
    // If product exists, increase quantity
    existingProduct.qty += 1;
  } else {
    // If not, create and add a new product
    const productData = {
      name: productElement.dataset.name,
      price: parseFloat(productElement.dataset.price),
      image: productElement.dataset.img,
      qty: 1, // Default quantity
    };
    productAll.push(productData);
  }

  saveCartToLocalStorage(); // Save the cart to localStorage
  return existingProduct || productAll[productAll.length - 1]; // Return updated product
}

// Function to calculate and update the total price of items in the cart
function updateCartTotal() {
  const total = productAll.reduce(
    (acc, product) => acc + product.price * product.qty,
    0
  );
  cartTotalPrice.textContent = `£${total.toFixed(2)}`; // Update total in UI
}

// Function to load cart items from localStorage when the page loads
function loadCartFromLocalStorage() {
  miniCart.innerHTML = ""; // Clear existing mini cart items

  productAll.forEach((product) => {
    miniCartItem(product); // Add each product to the mini cart UI
  });

  updateCartTotal(); // Update the total price
  updateCartCount(); // Update the cart count
}

// Add event listener for adding items to the cart
productsWrap.addEventListener("click", (e) => {
  const addCartBtn = e.target.closest(".add-cart-btn");
  if (!addCartBtn) return; // Guard clause

  e.preventDefault();

  const productElement = addCartBtn.closest(".shop-item");
  const productData = storeProductData(productElement);

  // Check if product is already in the cart UI
  const existingCartItem = miniCart.querySelector(
    `li[data-name="${productData.name}"]`
  );
  if (!existingCartItem) {
    miniCartItem(productData); // Add the product to the UI if it doesn't exist
  } else {
    // Update the existing UI item
    const qtySpan = existingCartItem.querySelector(".mc-qty-span");
    const priceSpan = existingCartItem.querySelector(".mc-price-span");

    qtySpan.textContent = productData.qty; // Update quantity in UI
    priceSpan.textContent = `£${(productData.price * productData.qty).toFixed(
      2
    )}`; // Update price in UI
  }

  updateCartTotal(); // Update the cart total
  updateCartCount(); // Update the cart count
});

// Add event listener for removing items from the cart
miniCart.addEventListener("click", (e) => {
  const removeCartBtn = e.target.closest(".remove-cart-btn");
  if (!removeCartBtn) return; // Guard clause

  e.preventDefault();

  const productName = removeCartBtn.dataset.name;

  // Remove the product from the cart array
  const productIndex = productAll.findIndex(
    (product) => product.name === productName
  );
  if (productIndex > -1) {
    productAll.splice(productIndex, 1); // Remove product from the array
    saveCartToLocalStorage(); // Update localStorage
  }

  // Remove the product from the UI
  const cartItemElement = removeCartBtn.closest(".minicart-list");
  cartItemElement.remove();

  updateCartTotal(); // Update the cart total
  updateCartCount(); // Update the cart count
});

// Load cart items when the page is loaded
window.addEventListener("load", loadCartFromLocalStorage);
