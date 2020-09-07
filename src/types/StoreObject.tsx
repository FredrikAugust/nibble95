export interface StoreObject {
  pk: number;
  name: string;
  price: number;
  image: {
    sm: string;
  };
  category: {
    pk: number
    name: string
  };
}

export type CartItem = {
  object_id: number
  quantity: number
}

export const createCartItem = (id: number): CartItem => ({
    object_id: id,
    quantity: 1,
});

export const incrementCartItem = (item: CartItem): CartItem => ({
    ...item,
    quantity: item.quantity + 1,
});

export const decrementCartItem = (item: CartItem): CartItem => ({
    ...item,
    quantity: item.quantity - 1,
});
