import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return`<li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
                <h2 class="card__brand">${product.Brand.Name}</h2>
                <h3 class="card__name">${product.NameWithoutBrand}</h3>
                <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
        </li>`
}

export default class ProductList{
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        //store all products after they are loaded so that i can search through them later.
        this.products = []
        
    }
    async init() {
        //change 'const list' to 'this.products' so that the products are stored in the class
        this.products = await this.dataSource.getData(this.category);
        this.renderList(this.products);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

 filterProducts(searchTerm) {
    const filteredProducts = this.products.filter((product) =>
        product.NameWithoutBrand
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || product.Brand.Name.toLowerCase().includes(searchTerm.toLowerCase())
     );
    this.renderList(filteredProducts);
 }
}
