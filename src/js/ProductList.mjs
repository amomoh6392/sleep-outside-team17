import { addImageFallback, renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const image = product.Images?.PrimaryMedium ?? product.Images?.PrimaryLarge;
  return `<li class="product-card">
      <a href="/product_pages/index.html?product=${encodeURIComponent(product.Id)}">
        <img src="${image}" alt="Image of ${product.NameWithoutBrand}">
        <h2 class="card__brand">${product.Brand?.Name ?? ""}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        <p class="product-card__price">$${Number(product.FinalPrice).toFixed(2)}</p>
      </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      if (list.length === 0) {
        this.showMessage("No products found.");
        return;
      }
      this.renderList(list);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      this.showMessage(`Products could not be loaded: ${reason}`);
    }
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "beforeend",
      true,
    );
    addImageFallback(this.listElement);
  }

  showMessage(message) {
    this.listElement.innerHTML = "";
    const messageElement = document.createElement("li");
    messageElement.className = "product-list__message";
    messageElement.textContent = message;
    this.listElement.append(messageElement);
  }
}
