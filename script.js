document.addEventListener("DOMContentLoaded", () => {
  // Step 1: Define a list of products with id, name, and price
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 79.99 },
  ];

  // Step 2: Create an empty cart to store added products
  const cart = [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Step 3: Loop through each product and show it on the page
  products.forEach((product) => {
    const productDiv = document.createElement("div"); // Creating a new div for the product
    productDiv.classList.add("product"); // Adding a class name to style later

    // Adding product name, price, and a button to add to cart
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add To Cart </button>
    `;
    productList.appendChild(productDiv);
  });

  // Step 4: Handle "Add to Cart" using Event Bubbling
  //Event Bubbling - Event bubbling is how events in the browser move from the inner element (where the event happened) up to the outer elements.
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // Check if the clicked element was a button
      const productId = parseInt(e.target.getAttribute("data-id")); // Get the product id from the button's data-id attribute
      const product = products.find((p) => p.id === productId); // Find the product in the products array using its id
      addToCart(product);
    }
  });

  // Step 5: Function to add selected product to the cart
  function addToCart(product) {
    cart.push(product); // Add the selected product to the cart array
    renderCart(); // Call render function to update the cart display
  }

  // Step 6: Function to update and show cart content on the page
  function renderCart() {
    cartItems.innerHTML = ""; // Clear the cart section before updating
    let totalPrice = 0; // Initialize total price to 0

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden"); // Hide "empty cart" message
      cartTotalMessage.classList.remove("hidden"); // Show the total section
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}    
        `;
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
      // If cart is empty, show message and hide total section
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `0.00`;
    }
  }

//  Step 7: Handle checkout button click
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout Successfully");
    renderCart();
  });
});
