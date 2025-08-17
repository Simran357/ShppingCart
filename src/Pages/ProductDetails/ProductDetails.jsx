import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShoppingContext from '../../ContextProvider/ShoppingProvider';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, setSelectedProduct, handleCart, cartItem, loading, setloading, error, seterror } = useContext(ShoppingContext);

  async function fetchProduct() {
    setloading(true);
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const result = await res.json();
      if (result) {
        setSelectedProduct(result);
        seterror(false);
      } else seterror(true);
    } catch {
      seterror(true);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => { fetchProduct() }, [id]);

  if (loading) return <h1 className="text-center mt-10 text-2xl">Loading...</h1>;
  if (error) return <h1 className="text-center mt-10 text-2xl text-red-500">Error!</h1>;

  if (!selectedProduct) return null;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">{selectedProduct.title}</h1>
      <img className="w-full h-64 object-contain mb-4 rounded" src={selectedProduct.thumbnail} alt={selectedProduct.title} />
      <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
      <h2 className="text-xl font-semibold mb-2">${selectedProduct.price}</h2>
      <p className="text-gray-500 mb-4">Discount: {selectedProduct.discountPercentage}%</p>
      <button
        disabled={cartItem.findIndex(item => item.id === selectedProduct.id) > -1}
        onClick={() => handleCart(selectedProduct)}
        className={`w-full py-2 rounded text-white ${cartItem.findIndex(item => item.id === selectedProduct.id) > -1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
      >
        {cartItem.findIndex(item => item.id === selectedProduct.id) > -1 ? 'Added to Cart' : 'Add to Cart'}
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
