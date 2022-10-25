import useProducts from '../hooks/useProducts';

const Home = () => {
  const products = useProducts();
  console.log(products);
  return <div>Home</div>;
};

export default Home;
