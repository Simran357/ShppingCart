import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShoppingProvider from '../../ContextProvider/ShoppingProvider';

const ProductDetails = () => {
  const { data, loading, setloading, setdata, cartItem, seterror, error, handleCart } = useContext(ShoppingProvider);
  const { id } = useParams();
  const navigate = useNavigate();

  async function Api() {
    setloading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const result = await response.json();
      if (result) {
        setdata(result);
        seterror(false);
      } else seterror(true);
    } catch {
      seterror(true);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => { Api() }, []);

  if (loading) return <h1 className="text-center text-2xl mt-10">Loading...</h1>;
  if (error) return <h1 className="text-center text-2xl mt-10 text-red-500">Error!!!</h1>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">{data?.title}</h1>
      <img className="w-full h-64 object-cover mb-4 rounded" src={data?.thumbnail} alt={data?.title} />
      <p className="text-gray-700 mb-2">{data?.description}</p>
      <h2 className="text-xl font-semibold mb-2">${data?.price}</h2>
      <p className="text-gray-500 mb-4">Discount: {data?.discountPercentage}%</p>
      <button
        disabled={cartItem.findIndex(item => item.id === data.id) > -1}
        onClick={() => handleCart(data)}
        className={`w-full py-2 rounded text-white ${cartItem.findIndex(item => item.id === data.id) > -1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
      >
        {cartItem.findIndex(item => item.id === data.id) > -1 ? 'Added to Cart' : 'Add to Cart'}
      </button>
      <button
        onClick={() => navigate('/')}
        className="mt-3 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Back to Products
      </button>
    </div>
  );
};

export default ProductDetails;
