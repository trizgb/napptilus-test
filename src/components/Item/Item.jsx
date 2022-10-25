const Item = ({ className = '', image, brand, model, price, onClick }) => {
  return (
    <li
      className={`p-4 bg-white cursor-pointer hover:shadow-md ${className}`}
      onClick={onClick}
    >
      <div className='flex justify-center'>
        <img className='h-52' src={image} alt={`${brand} ${model}`} />
      </div>
      <div className='mt-4'>
        <h3 className='font-secondary text-lg text-slate-900'>
          {brand} - {model}
        </h3>
        <p className='text-sm text-slate-800'>{price ? `${price}€` : ''}</p>
      </div>
    </li>
  );
};

export default Item;
