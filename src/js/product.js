import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();

//function addProductToCart(product) {
// setLocalStorage("so-cart", product);
//}
// add to cart button event handler

// add listener to Add to Cart button
