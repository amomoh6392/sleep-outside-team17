import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const productList = new ProductList(
  "tents",
  new ExternalServices(),
  document.querySelector(".product-list"),
);
productList.init();
