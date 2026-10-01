describe("Sleep Outside product app", () => {
  test("Product details render the correct brand and name for each product", async () => {
    const { default: ProductDetails } = await import("../js/ProductDetails.mjs");

    const product = {
      Id: "344YJ",
      NameWithoutBrand: "Rimrock Tent - 2-Person, 3-Season",
      Name: "Cedar Ridge Rimrock Tent - 2-Person, 3-Season",
      Image: "../images/tents/test.jpg",
      DescriptionHtmlSimple: "A tent",
      FinalPrice: 69.99,
      Brand: { Name: "Cedar Ridge" },
      Colors: [{ ColorName: "Rust/Clay" }],
    };

    const selectors = {};
    const makeElement = () => ({
      textContent: "",
      innerHTML: "",
      dataset: {},
      src: "",
      alt: "",
      addEventListener: jest.fn(),
    });

    global.document = {
      querySelector: (selector) => {
        if (!selectors[selector]) {
          selectors[selector] = makeElement();
        }
        return selectors[selector];
      },
      getElementById: (id) => {
        if (!selectors[id]) {
          selectors[id] = makeElement();
        }
        return selectors[id];
      },
    };

    const dataSource = {
      findProductById: async () => product,
    };

    const details = new ProductDetails(product.Id, dataSource);
    await details.init();

    expect(selectors["h3"].textContent).toBe("Cedar Ridge");
    expect(selectors["h2"].textContent).toBe("Rimrock Tent - 2-Person, 3-Season");
    expect(selectors["productPrice"].textContent).toBe("$69.99");
    expect(selectors["productColor"].textContent).toBe("Rust/Clay");
  });
});
