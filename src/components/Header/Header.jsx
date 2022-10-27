import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Cookies from 'js-cookie';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { count } = useContext(CartContext);
  const cookie = Cookies.get('cart_count');
  const { pathname } = useLocation();

  const paths = pathname.split('/').slice(1);

  const breadcrumb = (
    <nav className='flex space-x-2 text-xs'>
      <Link to='/'>
        <span className='hover:underline'>Home</span>
      </Link>
      {paths.length > 1 ? (
        <>
          <span>/</span>
          <Link to={pathname}>
            <span className='hover:underline'>{paths[1]}</span>
          </Link>
        </>
      ) : null}
    </nav>
  );

  return (
    <header className='w-full p-4 bg-white'>
      <div className='w-full flex justify-between items-center max-w-8xl mx-auto'>
        <div>
          <a href='/'>
            <h1 className='font-logo text-lg lg:text-3xl'>MobVice</h1>
          </a>
        </div>
        <div>{breadcrumb}</div>
        <div className='relative flex'>
          <span className='material-symbols-outlined text-4xl'>
            shopping_bag
          </span>
          <span className='absolute top-4 h-full w-full right-0 text-xs font-bold text-center'>
            {!isNaN(count) ? count : cookie}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
