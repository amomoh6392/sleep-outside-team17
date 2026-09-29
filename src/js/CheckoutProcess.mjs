import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

export default class CheckoutProcess {
  constructor(key,outputSelector ) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
  }
  calculateItemSubtotal() {
    const cartItems = getLocalStorage(this.key) || [];
    this.list = cartItems
    this.itemTotal = 0;
    for (let i = 0; i < this.list.length; i++){
      const item = this.list[i];
      this.itemTotal = this.itemTotal + item.FinalPrice;
    }
    const subTotal = document.querySelector(`${this.outputSelector} #subTotal`)
    subTotal.innerText = `$${this.itemTotal.toFixed(2)}`;
  }
  
  calculateOrderTotal() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    this.tax = this.itemTotal * 0.06;
    tax.innerText = `$${this.tax.toFixed(2)}`;
    const shipping = document.querySelector(`${this.outputSelector} #shippingFee`);
    if (this.list.length > 1) {
      this.shipping = 10 + ((this.list.length - 1) * 2);
    } else {
      this.shipping = 10;
    }
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    const total = document.querySelector(`${this.outputSelector} #total`);
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    total.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}

const process = new CheckoutProcess("so-cart", ".order-summary");
process.calculateItemSubtotal();
const zip = document.querySelector("#zip");
zip.addEventListener("change", () => {
  process.calculateOrderTotal();
});
 