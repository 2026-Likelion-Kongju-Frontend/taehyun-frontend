import client from "./client";

export const getProducts = (params) => {
  return client.get("/products", { params });
};
