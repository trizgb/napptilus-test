import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useProductDetail from '../hooks/useProductDetail';
import { addToCart } from '../services';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Detail = () => {
  const { id } = useParams();
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

        return cart;
      } else {
        window.alert('Selecciona un color y un almacenamiento');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <section className='bg-white grid grid-cols-1 max-w-8xl mx-auto p-4 md:grid-cols-2 lg:px-6'>
      <div className='flex justify-center'>
        <img
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
          <p className='text-sm'>{product?.price} EUR</p>
        </div>
        <div>
          <select
            name='colorCode'
            defaultValue={draft.colorCode}
            onChange={(e) => setDraft({ ...draft, colorCode: e.target.value })}
          >
            <option value=''>Color</option>
            {product?.options.colors.map((c) => (
              <option value={c.code}>{c.name}</option>
            ))}
          </select>
          <select
            name='storageCode'
            onChange={(e) =>
              setDraft({ ...draft, storageCode: e.target.value })
            }
          >
            <option value=''>Storage</option>
            {product?.options.storages.map((s) => (
              <option value={s.code}>{s.name}</option>
            ))}
          </select>
        </div>
        <button
          type='button'
          className='w-full py-3 px-6 bg-slate-900 text-white font-medium hover:bg-slate-800 md:w-max'
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default Detail;
