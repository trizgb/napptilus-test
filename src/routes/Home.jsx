import useProducts from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import Item from '../components/Item/Item';
import Search from '../components/Search/Search';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const products = useProducts();
  const [query, setQuery] = useState('');
  const [searchParam] = useState(['brand', 'model']);

  const handleClickProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const search = (items) => {
    return items?.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
        );
      });
    });
  };

  const productsList = search(products)?.map((p) => (
    <Item
      key={p.id}
      image={p.imgUrl}
      brand={p.brand}
      model={p.model}
      price={p.price}
      onClick={() => handleClickProduct(p.id)}
    />
  ));

  return (
    <div className='px-4 lg:px-6'>
      <Search
        className='mb-6 flex justify-end'
        placeholder='Search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <section>
        <ul className='grid grid-cols-auto-fill-250 gap-4'>{productsList}</ul>
      </section>
    </div>
  );
};

export default Home;
