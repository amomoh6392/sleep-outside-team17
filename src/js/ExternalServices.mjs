const baseURL = (import.meta.env.VITE_SERVER_URL || "").replace(/\/+$/, "");
const localCategories = ["tents", "backpacks", "sleeping-bags"];

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw new Error(
      `Product service request failed (${res.status}): ${JSON.stringify(jsonResponse)}`,
    );
  }
}

function normalizeProduct(product) {
  if (product.Images || !product.Image) {
    return product;
  }

  return {
    ...product,
    Images: {
      PrimarySmall: product.Image,
      PrimaryMedium: product.Image,
      PrimaryLarge: product.Image,
      PrimaryExtraLarge: product.Image,
    },
  };
}

function productsFromResponse(data) {
  const products = Array.isArray(data) ? data : data.Result;
  if (!Array.isArray(products)) {
    throw new Error("The product service returned an invalid product list.");
  }

  return products.map(normalizeProduct);
}

async function getLocalProducts(category) {
  if (!localCategories.includes(category)) {
    return null;
  }

  const response = await fetch(
    `${import.meta.env.BASE_URL}json/${encodeURIComponent(category)}.json`,
  );
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(
      `Unable to load the local ${category} catalog (${response.status}).`,
    );
  }

  return productsFromResponse(await response.json());
}

function getApiUrl(path) {
  if (!baseURL) {
    throw new Error(
      `No local catalog is available for this request and VITE_SERVER_URL is not configured.`,
    );
  }

  return `${baseURL}/${path}`;
}

export default class ExternalServices {
  async getData(category) {
    if (!category) {
      throw new Error("A product category is required.");
    }

    const localProducts = await getLocalProducts(category);
    if (localProducts) {
      return localProducts;
    }

    const response = await fetch(
      getApiUrl(`products/search/${encodeURIComponent(category)}`),
    );
    const data = await convertToJson(response);
    return productsFromResponse(data);
  }

  async findProductById(id) {
    if (!id) {
      throw new Error("A product ID is required.");
    }

    for (const category of localCategories) {
      const products = await getLocalProducts(category);
      const product = products?.find(
        (item) => item.Id.toLowerCase() === id.toLowerCase(),
      );
      if (product) {
        return product;
      }
    }

    const response = await fetch(
      getApiUrl(`product/${encodeURIComponent(id)}`),
    );
    const data = await convertToJson(response);
    if (!data.Result) {
      throw new Error(`Product ${id} was not found.`);
    }
    return normalizeProduct(data.Result);
  }

  async checkout(orderData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    };
    const response = await fetch(getApiUrl("checkout"), options);
    return convertToJson(response);
  }
}
