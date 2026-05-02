import client, { buildImageUrl } from "./client";

const unwrapData = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  if (payload && payload.data && typeof payload.data === "object") return payload.data;
  return payload;
};

const normalizeProduct = (product) => ({
  ...product,
  image: buildImageUrl(product.image),
  descriptionImage: buildImageUrl(product.descriptionImage),
});

export const getProducts = () => {
  return client.get("/products").then((response) => {
    const items = unwrapData(response.data);
    if (!Array.isArray(items)) return [];
    return items.map((product) => normalizeProduct(product));
  });
};

export const getProductById = (productId) => {
  return client.get(`/products/${productId}`).then((response) => {
    const product = unwrapData(response.data);
    return normalizeProduct(product);
  });
};

export const toggleProductLike = (productId) => {
  return client.patch(`/products/${productId}/like`).then((response) => {
    const data = unwrapData(response.data);
    return data;
  });
};
