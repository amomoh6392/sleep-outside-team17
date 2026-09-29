import externalServices from "./externalServices.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new externalServices("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

product.init();

loadHeaderFooter();

//function addProductToCart(product) {
// setLocalStorage("so-cart", product);
//}
// add to cart button event handler

// add listener to Add to Cart button
