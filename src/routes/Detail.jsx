import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useProductDetail from '../hooks/useProductDetail';
import { addToCart } from '../services';
import Cookies from 'js-cookie';

const Detail = () => {
  const { id } = useParams();
  const product = useProductDetail(id);
  const [draft, setDraft] = useState({
    colorCode: '',
    storageCode: '',
  });

  const cookie = Cookies.get('cart_count');
  const date = new Date();
  const expirationDate = new Date(date.getTime() + 60 * 60000);

  const camera1 = Array(product?.primaryCamera)?.map((x) => <span>{x}</span>);
  const camera2 = Array(product?.secondaryCmera)?.map((x) => <span>{x}</span>);

  const handleAddToCart = async () => {
    try {
      const cart = await addToCart(
        product?.id,
        draft.colorCode,
        draft.colorCode,
      );

      if (cookie) {
        Cookies.set('cart_count', Number(cookie) + cart.count, {
          expires: expirationDate,
        });
      } else {
        Cookies.set('cart_count', cart.count, {
          expires: expirationDate,
        });
      }

      return cart;
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <section className='flex justify-center items-center bg-white'>
        <img
          src={product?.imgUrl}
          alt={`${product?.brand} ${product?.model}`}
        />
      </section>
      <section>
        <div>
          <h3 className='font-secondary text-lg text-slate-900'>
            {product?.brand} - {product?.model}
          </h3>
          <ul>
            <li>
              <p>{product?.cpu}</p>
            </li>
            <li>
              <p>{product?.ram}</p>
            </li>
            <li>
              <p>{product?.os}</p>
            </li>
            <li>
              <p>{product?.displayResolution}</p>
            </li>
            <li>
              <p>{product?.battery}</p>
            </li>
            <li>
              <ul>
                <li>Primary camera: {camera1} </li>
                <li>Secondary camera: {camera2} </li>
              </ul>
            </li>
            <li>Dimentions: {product?.dimentions}</li>
            <li>Weight: {product?.weight}</li>
            <li>{product?.price} EUR</li>
          </ul>
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
          className='py-2 px-4 bg-slate-900 text-white font-medium hover:bg-slate-800'
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </section>
    </div>
  );
};

export default Detail;
