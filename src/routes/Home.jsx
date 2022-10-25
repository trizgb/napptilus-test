import useProducts from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const products = useProducts();

  const handleClickProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const productsList = products?.map((p) => (
    <li key={p.id} onClick={() => handleClickProduct(p.id)}>
      <div>
        <img src={p.imgUrl} alt={`${p.brand} ${p.model}`} />
      </div>
      <div>
        <h3 className='font-secondary text-lg'>
          {p.brand} - {p.model}
        </h3>
        <p>{p.price}€</p>
      </div>
    </li>
  ));
  return (
    <div>
      <div>
        <input className='border border-black' />
      </div>
      <ul className='grid grid-cols-auto-fill-250 gap-4'>{productsList}</ul>
    </div>
  );
};

export default Home;
