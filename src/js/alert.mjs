export default class Alert {
  constructor(message) {
    this.message = message;
  }

  render() {
    const alert = document.createElement("section");
    alert.classList.add("alert");
    alert.innerHTML = `
      <p>${this.message}</p>
    `;

    const main = document.querySelector("main");
    main.prepend(alert);
  }
}