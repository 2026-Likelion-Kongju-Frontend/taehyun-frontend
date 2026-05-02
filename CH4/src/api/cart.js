import client from "./client";

export const addCartItem = ({ productId, size, quantity }) => {
  return client.post("/cart/items", {
    productId,
    size,
    quantity,
  });
};
