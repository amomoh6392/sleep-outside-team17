import productData from "./externalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const title = document.querySelector("#product-list-title");
title.textContent = `Top Products: ${category}`;

const dataSource = new productData();

const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);
productList.init();
