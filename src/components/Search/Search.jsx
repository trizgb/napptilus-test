const Search = ({ className, placeholder, value, onChange }) => {
  return (
    <div className={className}>
      <div className='relative w-max'>
        <input
          className='py-2 pl-2 pr-8 bg-transparent border-b-2 border-b-slate-900'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <span className='material-symbols-outlined absolute right-2 top-1/4 text-slate-900'>
          search
        </span>
      </div>
    </div>
  );
};

export default Search;
