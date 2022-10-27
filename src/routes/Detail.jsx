import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useProductDetail from '../hooks/useProductDetail';
import { addToCart } from '../services';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useProductDetail(id);
  const { setCount } = useContext(CartContext);

  const [draft, setDraft] = useState({
    colorCode: '',
    storageCode: '',
  });

  const cookie = Cookies.get('cart_count');
  const date = new Date();
  const expirationDate = new Date(date.getTime() + 60 * 60000);

  const handleAddToCart = async () => {
    try {
      if (draft.storageCode !== '' && draft.colorCode !== '') {
        const cart = await addToCart(
          product?.id,
          draft.colorCode,
          draft.storageCode,
        );

        if (cookie) {
          const total = Number(cookie) + cart.count;
          Cookies.set('cart_count', total, {
            expires: expirationDate,
          });
          setCount(total);
        } else {
          Cookies.set('cart_count', cart.count, {
            expires: expirationDate,
          });
          setCount(cart.count);
        }

        if (cart.message) {
          Cookies.remove('cart_count');
          setCount(0);
        }

        return cart;
      } else {
        window.alert('Please, select a color and storage 🤗');
      }
    } catch (error) {
      console.log('Error', error);
      Cookies.remove('cart_count');
      setCount(0);
    }
  };

  const handleSelect = (e) => {
    const target = e.target;

    if (target.name === 'colorCode') {
      setDraft({ ...draft, colorCode: target.value });
    }

    if (target.name === 'storageCode') {
      setDraft({ ...draft, storageCode: target.value });
    }
  };

  const colorSelector = product?.options?.colors.map((color, index) => (
    <label
      key={index}
      className='flex space-x-2 p-3 cursor-pointer border border-gray-200 rounded-lg'
      htmlFor={color.code}
    >
      <input
        name='colorCode'
        type='radio'
        id={color.code}
        value={color.code}
        onChange={handleSelect}
      />
      <span>{color.name}</span>
    </label>
  ));

  const storageSelector = product?.options?.storages.map((storage, index) => (
    <label
      key={index}
      className='flex space-x-2 p-3 cursor-pointer border border-gray-200 rounded-lg'
      htmlFor={storage.code}
    >
      <input
        name='storageCode'
        type='radio'
        id={storage.code}
        value={storage.code}
        onChange={handleSelect}
      />
      <span>{storage.name}</span>
    </label>
  ));

  return (
    <section className='bg-white max-w-8xl mx-auto h-full p-4 lg:p-6'>
      <button
        type='button'
        className='flex items-center hover:font-medium'
        onClick={() => navigate(-1)}
      >
        <span className='material-symbols-outlined'>arrow_back</span>
        <span className='text-sm'>Go back</span>
      </button>
      <div className='grid grid-cols-1 md:grid-cols-2 '>
        <div className='flex justify-center items-center md:items-start'>
          <img
            className='max-h-56'
            src={product?.imgUrl}
            alt={`${product?.brand} ${product?.model}`}
          />
        </div>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col space-y-3'>
            <h3 className='font-secondary text-xl text-slate-900'>
              {product?.brand} - {product?.model}
            </h3>
            <ul className='flex flex-col space-y-1 text-xs'>
              <li>
                <p>CPU: {product?.cpu}</p>
              </li>
              <li>
                <p>RAM: {product?.ram}</p>
              </li>
              <li>
                <p>OS: {product?.os}</p>
              </li>
              <li>
                <p>Display resolution: {product?.displayResolution}</p>
              </li>
              <li>
                <p>Battery: {product?.battery}</p>
              </li>
              <li>
                <p>
                  Primary camera:{' '}
                  {product?.primaryCamera.toString().replaceAll(',', ', ')}
                </p>
              </li>
              <li>
                <p>
                  Secondary camera:{' '}
                  {product?.secondaryCmera.toString().replaceAll(',', ', ')}
                </p>
              </li>
              <li>
                <p>Dimentions: {product?.dimentions}</p>
              </li>
              <li>
                <p>Weight: {product?.weight || '-'}</p>
              </li>
            </ul>
            <div className='text-sm'>
              <p className='mb-2'>Select a color</p>
              <div className='flex space-x-4'>{colorSelector}</div>
            </div>
            <div className='text-sm'>
              <p className='mb-2'>Select a storage</p>
              <div className='flex space-x-4'>{storageSelector}</div>
            </div>
            <p className='text-sm'>{product?.price} EUR</p>
          </div>
          <button
            type='button'
            className='w-full py-3 px-6 bg-slate-900 text-white font-medium hover:bg-slate-800 md:w-max'
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Detail;
