import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "../js/checkoutprocess.mjs";

const checkout = new CheckoutProcess(
  "so-cart",
  ".order-summary"
);

checkout.init();

const form = document.querySelector("#checkoutForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const result = await checkout.checkout(form);

  console.log(result);
});

loadHeaderFooter();
