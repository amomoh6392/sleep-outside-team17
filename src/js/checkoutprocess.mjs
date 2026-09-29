import { getLocalStorage } from "./utils.mjs";
import  ExternalServices  from "./externalServices.mjs";

const dataSource = new ExternalServices();

function packageItems(items) {
return items.map((item) => ({
id: item.Id,
name: item.Name,
price: item.FinalPrice,
quantity: 1,
}));
}

function formDataToJSON(formElement) {
const formData = new FormData(formElement);
const convertedJSON = {};

formData.forEach((value, key) => {
convertedJSON[key] = value;
});

return convertedJSON;
}


export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];

    this.calculateItemSubTotal();

    const zip = document.querySelector("#zip");

    zip?.addEventListener("blur", () => {
      this.calculateOrderTotal();
    });
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + Number(item.FinalPrice),
      0
    );

    const subtotal = document.querySelector(
      `${this.outputSelector} #subtotal`
    );

    subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    const itemCount = this.list.length;

    this.tax = this.itemTotal * 0.06;

    this.shipping = itemCount > 0
      ? 10 + (itemCount - 1) * 2
      : 0;

    this.orderTotal =
      this.itemTotal +
      this.tax +
      this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(
      `${this.outputSelector} #tax`
    );

    const shipping = document.querySelector(
      `${this.outputSelector} #shipping`
    );

    const total = document.querySelector(
      `${this.outputSelector} #orderTotal`
    );

    tax.innerText = `$${this.tax.toFixed(2)}`;

    shipping.innerText = `$${this.shipping.toFixed(2)}`;

    total.innerText = `$${this.orderTotal.toFixed(2)}`;
    }
    
    async checkout(form) {
  const order = formDataToJSON(form);

  order.orderDate = new Date().toISOString();
  order.orderTotal = this.orderTotal;
  order.tax = this.tax;
  order.shipping = this.shipping;
  order.items = packageItems(this.list);

  const result = await dataSource.checkout(order);

  console.log(result);

  return result;
 }
}