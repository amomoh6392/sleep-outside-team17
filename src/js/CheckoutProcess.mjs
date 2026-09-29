import { formDataToJSON, getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"
loadHeaderFooter();
function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key,outputSelector,services ) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
    this.services = services;
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
  async checkout(form) {
    const formData = formDataToJSON(form);
    formData.orderDate = new Date().toISOString();
    formData.items = packageItems(this.list);
    formData.orderTotal = this.orderTotal;
    formData.tax = this.tax;
    formData.shipping = this.shipping;
    console.log(formData);
    await this.services.checkout(formData);
  }
}
const services = new ExternalServices();
const process = new CheckoutProcess("so-cart", ".order-summary", services);
process.calculateItemSubtotal();
process.calculateOrderTotal();
const zip = document.querySelector("#zip");
zip.addEventListener("change", () => {
  process.calculateOrderTotal();
});
const form = document.querySelector("#checkout")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  process.checkout(form);
});
