import { useEffect, useState } from 'react';
import { getProducts } from '../services';

const useProducts = () => {
  const [values, setValues] = useState();

  useEffect(() => {
    const get = async () => {
      try {
        const data = await getProducts();
        setValues(data);
      } catch (error) {
        setValues(null);
        console.error(error);
      }
    };

    get();
  }, []);

  return values;
};

export default useProducts;
