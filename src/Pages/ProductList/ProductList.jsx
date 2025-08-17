import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingContext from '../../ContextProvider/ShoppingProvider';

const ProductList = () => {
  const { data, setdata, loading, setloading, error, seterror } = useContext(ShoppingContext);
  const navigate = useNavigate();

  async function fetchProducts() {
    setloading(true);
    try {
      const res = await fetch('https://dummyjson.com/products');
      const result = await res.json();
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
    if (!data || data.length === 0) fetchProducts();
  }, []);

  if (loading) return <h1 className="text-center mt-10 text-2xl">Loading...</h1>;
  if (error) return <h1 className="text-center mt-10 text-2xl text-red-500">Error!</h1>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-2xl transition transform hover:scale-105">
            <img src={product.thumbnail} alt={product.title} className="w-full h-64 object-contain rounded-t-lg" />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-gray-800">{product.title}</h3>
              <p className="text-gray-600 font-medium">${product.price}</p>
              <button
                onClick={() => navigate(`/ProductDetails/${product.id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
