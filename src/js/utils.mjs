// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function addImageFallback(parentElement) {
  parentElement.querySelectorAll("img").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.src = "/images/noun_Tent_2517.svg";
      },
      { once: true },
    );
  });
}

export function animateCartIcon() {
  const cartIcon = document.querySelector(".cart svg");
  if (
    !cartIcon ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  cartIcon.animate(
    [
      { transform: "translateY(0) scale(1) rotate(0deg)" },
      {
        offset: 0.35,
        transform: "translateY(-5px) scale(1.2) rotate(-8deg)",
      },
      { offset: 0.7, transform: "translateY(1px) scale(0.95) rotate(5deg)" },
      { transform: "translateY(0) scale(1) rotate(0deg)" },
    ],
    { duration: 600, easing: "ease-in-out" },
  );
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Unable to load template "${path}" (${res.status}).`);
  }
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  if (!headerElement || !footerElement) {
    throw new Error("The page is missing its header or footer placeholder.");
  }

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");

  alert.classList.add("alert");

  alert.innerHTML = `
    <span>${message}</span>
    <button class="alert-close" type="button">X</button>
  `;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      this.remove();
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}
