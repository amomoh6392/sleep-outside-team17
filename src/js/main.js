import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
const dataSource = new ExternalServices("tents");


const productId = getParam("product");
const productList = new ProductList(productId, dataSource);
productList.init();

loadHeaderFooter();
