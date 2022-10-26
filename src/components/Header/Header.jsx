import Cookies from 'js-cookie';

const Header = () => {
  const cookie = Cookies.get('cart_count');

  return (
    <header className='w-full p-4 bg-white'>
      <div className='flex justify-between items-center'>
        <div>
          <a href='/'>Logo</a>
        </div>
        <div>Breadcrumbs</div>
        <div className='relative flex'>
          <span className='material-symbols-outlined text-4xl'>
            shopping_bag
          </span>
          <span className='absolute top-4 h-full w-full right-0 text-xs font-bold text-center'>
            {cookie || 0}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
