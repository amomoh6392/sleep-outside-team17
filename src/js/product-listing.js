import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const title = document.querySelector("#product-list-title");
title.textContent = `Top Products: ${category}`;

const dataSource = new ExternalServices();

const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);
await productList.init();

const searchInput = document.querySelector("#product-search");
searchInput.addEventListener("input", (event) => {
productList.filterProducts(event.target.value);
});
