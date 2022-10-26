const baseUrl = 'https://front-test-api.herokuapp.com/api';

export const getProducts = () =>
  fetch(`${baseUrl}/product`, { method: 'GET' }).then((response) =>
    response.json(),
  );

export const getProductById = (id) =>
  fetch(`${baseUrl}/product/${id}`, { method: 'GET' }).then((response) =>
    response.json(),
  );

export const addToCart = (id, colorCode, storageCode) =>
  fetch(`${baseUrl}/cart`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      colorCode,
      storageCode,
    }),
  }).then((response) => response.json());
