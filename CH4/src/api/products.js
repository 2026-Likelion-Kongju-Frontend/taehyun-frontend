import client from "./client";

export const getProducts = () => {
  return client.get("/products");
};

export const getProductById = (productId) => {
  return client.get(`/products/${productId}`);
};
