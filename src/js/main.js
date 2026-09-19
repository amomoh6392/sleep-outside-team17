import ProductData from "./ProductData.mjs"
import ProductList from "./productList.mjs";

const dataSource = new ProductData("tents");

const productList = new ProductList(
  "tents",
  dataSource,
  listElement
);
productList.init();