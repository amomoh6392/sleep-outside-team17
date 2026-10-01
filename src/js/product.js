import ExternalServices from "./externalServices.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

product.init();

loadHeaderFooter();


