import { useState } from 'react';
import { cartContextValues } from '../context/CartContext';

const useCart = () => {
  const [value, setValue] = useState(cartContextValues);

  const setCount = (state) => {
    setValue(state);
  };

  return { count: value, setCount };
};

export default useCart;
