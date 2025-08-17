import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingProvider from '../../ContextProvider/ShoppingProvider';

const ProductList = () => {
  const { data, loading, cartItem, setloading, setdata, seterror, error, handleCart } = useContext(ShoppingProvider);
  const navigate = useNavigate();

  async function Api() {
    setloading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products`);
      const result = await response.json();
      if (result?.products) {
        setdata(result.products);
        seterror(false);
      } else seterror(true);
    } catch {
      seterror(true);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    if (!data || data.length === 0) {
      Api();
    }
  }, []);


  if (loading) return <h1 className="text-center text-2xl mt-10">Loading...</h1>;
  if (error) return <h1 className="text-center text-2xl mt-10 text-red-500">Error!!!</h1>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              {product.discountPercentage > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
              <p className="text-gray-600 font-medium mb-2">${product.price}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/ProductDetails/${product.id}`)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleCart(product)}
                  disabled={cartItem.findIndex(item => item.id === product.id) > -1}
                  className={`flex-1 py-2 rounded font-medium text-white ${
                    cartItem.findIndex(item => item.id === product.id) > -1
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {cartItem.findIndex(item => item.id === product.id) > -1 ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
