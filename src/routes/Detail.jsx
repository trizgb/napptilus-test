import useProductDetail from '../hooks/useProductDetail';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const product = useProductDetail(id);

  console.log(product);

  return <div>Detail</div>;
};

export default Detail;
