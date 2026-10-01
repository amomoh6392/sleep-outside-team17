import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutprocess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");

order.init();

document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  order.checkout();
});
