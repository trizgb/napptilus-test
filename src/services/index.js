const baseUrl = 'https://front-test-api.herokuapp.com';

export const getProducts = () =>
  fetch(`${baseUrl}/api/product`, { method: 'GET' }).then((response) =>
    response.json(),
  );

export const getProductById = (id) =>
  fetch(`${baseUrl}/api/product/${id}`, { method: 'GET' }).then((response) =>
    response.json(),
  );
