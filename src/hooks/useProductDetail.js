import { useEffect, useState } from 'react';
import { getProductById } from '../services';

const useProductDetail = (id) => {
  const [values, setValues] = useState();

  useEffect(() => {
    const get = async () => {
      try {
        const data = await getProductById(id);
        setValues(data);
      } catch (error) {
        setValues(null);
        console.error(error);
      }
    };

    get();
  }, [id]);

  return values;
};

export default useProductDetail;
