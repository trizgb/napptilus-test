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
    <section className='px-4 max-w-8xl mx-auto lg:px-6'>
      <Search
        className='mb-6 flex justify-end'
        placeholder='Search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {productsList?.length > 0 ? (
        <ul className='grid grid-cols-auto-fill-256 gap-6'>{productsList}</ul>
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <img
            className='w-[500px] max-w-[90vw]'
            src='/assets/empy-states/list-search.svg'
            alt='Results not found'
          />
          <p className='text-2xl text-center font-bold text-slate-900 mb-2 sm:text-4xl'>
            Ups!... no results found
          </p>
          <p className='text-xl'>Please try another search</p>
        </div>
      )}
    </section>
  );
};

export default Home;
