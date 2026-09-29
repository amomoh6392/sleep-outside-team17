import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "../js/checkoutprocess.mjs";

const checkout = new CheckoutProcess(
"so-cart",
".order-summary"
);
 
checkout.init();

loadHeaderFooter();
