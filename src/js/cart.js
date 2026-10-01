import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = Array.isArray(getLocalStorage("so-cart")) ? getLocalStorage("so-cart") : [];
  const productList = document.querySelector(".product-list");

  if (productList) {
    productList.innerHTML = cartItems.map((item) => cartItemTemplate(item)).join("");
  }

  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length > 0 && cartFooter) {
    cartFooter.classList.remove("hide");
    const total = cartItems.reduce((sum, item) => {
      const price = Number(item.FinalPrice) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + price * quantity;
    }, 0);
    const cartTotal = document.querySelector(".cart-total");
    if (cartTotal) {
      cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    }
  } else if (cartFooter) {
    cartFooter.classList.add("hide");
  }

  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemId = event.target.getAttribute("data-id");
      removeFromCart(itemId);
    });
  });
}

function cartItemTemplate(item) {
  const itemName = item.Name || item.NameWithoutBrand || "Product";
  const colorName = item.Colors?.[0]?.ColorName || "Color unavailable";
  const quantity = Number(item.quantity) || 1;
  const price = Number(item.FinalPrice) || 0;

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${itemName}" />
    </a>
    <a href="#">
      <h2 class="card__name">${itemName}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${price.toFixed(2)}</p>
    <span class="cart-card__remove" data-id="${item.Id}">&times;</span>
  </li>`;
}

function removeFromCart(id) {
  let cartItems = Array.isArray(getLocalStorage("so-cart")) ? getLocalStorage("so-cart") : [];
  const itemIndex = cartItems.findIndex((item) => item.Id === id);

  if (itemIndex > -1) {
    cartItems.splice(itemIndex, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}

renderCartContents();
