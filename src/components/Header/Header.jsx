const Header = () => {
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
          <span className='text-xs absolute top-4 left-3'>10</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
