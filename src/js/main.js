import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import Alert from "./alert.mjs";

const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);

productList.init();

const alert = new Alert("Weekend Sale! Get 20% off all tents.");

alert.render();
