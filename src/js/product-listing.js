import ProductData from "./ProductData.mjs";
import ProductList from "./productlist.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const title = document.querySelector("#product-list-title");
title.textContent = `Top Products: ${category}`;

const dataSource = new ProductData();

const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);
productList.init();
