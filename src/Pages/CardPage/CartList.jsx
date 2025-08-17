import React, { useContext } from 'react';
import ShoppingProvider from '../../ContextProvider/ShoppingProvider';
import CartTile from './CartTile';
import { useNavigate } from 'react-router-dom';

const CartList = () => {
  const { loading, cartItem, error } = useContext(ShoppingProvider);
  const navigate = useNavigate();

  if (loading) return <h1 className="text-center text-2xl mt-10">Loading...</h1>;
  if (error) return <h1 className="text-center text-2xl mt-10 text-red-500">Error!!!</h1>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Cart</h1>
      {cartItem.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItem.map(item => <CartTile key={item.id} singleitem={item} />)}
          </div>
          <div className="mt-6 bg-gray-100 p-4 rounded">
            <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
            <p>Total: ${cartItem.reduce((acc, curr) => acc + curr.totalPrice, 0).toFixed(2)}</p>
            <p>Items: {cartItem.reduce((acc, curr) => acc + curr.quantity, 0)}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-3 py-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Continue Shopping
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-center text-xl">No items in cart</h1>
      )}
    </div>
  );
};

export default CartList;
