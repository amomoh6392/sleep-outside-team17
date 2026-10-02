import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      return;
    }

    this.renderProductDetails();

    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    const cartItems = Array.isArray(getLocalStorage("so-cart")) ? getLocalStorage("so-cart") : [];
    const existingProductIndex = cartItems.findIndex((item) => String(item.Id) === String(this.product.Id));

    if (existingProductIndex >= 0) {
      cartItems[existingProductIndex].quantity = (cartItems[existingProductIndex].quantity || 1) + 1;
    } else {
      cartItems.push({ ...this.product, quantity: 1 });
    }

    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  const brandName = product.Brand?.Name || "Brand unavailable";
  const productName = product.NameWithoutBrand || product.Name || "Product name unavailable";

  const subheading = document.querySelector("h3");
  if (subheading) {
    subheading.textContent = brandName;
  }

  const heading = document.querySelector("h2");
  if (heading) {
    heading.textContent = productName;
  }

  const productImage = document.getElementById("productImage");
  if (productImage) {
    productImage.src = product.Image;
    productImage.alt = productName;
  }

  const productPrice = document.getElementById("productPrice");
  if (productPrice) {
    productPrice.textContent = `$${Number(product.FinalPrice).toFixed(2)}`;
  }

  const productColor = document.getElementById("productColor");
  if (productColor) {
    const colorName = product.Colors?.[0]?.ColorName || "Color unavailable";
    productColor.textContent = colorName;
  }

  const productDesc = document.getElementById("productDesc");
  if (productDesc) {
    productDesc.innerHTML = product.DescriptionHtmlSimple || "";
  }

  const addToCartButton = document.getElementById("addToCart");
  if (addToCartButton) {
    addToCartButton.dataset.id = product.Id;
  }
}





