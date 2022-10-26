import { createContext } from 'react';

export const cartContextValues = {
  count: 0,
};

export const CartContext = createContext({
  count: cartContextValues,
  setCount: () => {},
});
