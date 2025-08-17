import React, { useContext } from 'react';
import ShoppingProvider from '../../ContextProvider/ShoppingProvider';

const CartTile = ({ singleitem }) => {
  const { RemoveFromCart, handleCart } = useContext(ShoppingProvider);

  return (
    <div className="flex items-center justify-between bg-white shadow rounded p-4">
      <img className="w-20 h-20 object-cover rounded" src={singleitem.thumbnail} alt={singleitem.title} />
      <div className="flex-1 px-4">
        <h3 className="font-semibold">{singleitem.title}</h3>
        <p className="text-gray-600">${singleitem.totalPrice?.toFixed(2)}</p>
        <p>Qty: {singleitem.quantity}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => RemoveFromCart(singleitem, true)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Remove
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => RemoveFromCart(singleitem, false)}
            disabled={singleitem.quantity === 1}
            className="bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded disabled:opacity-50"
          >
            -
          </button>
          <button
            onClick={() => handleCart(singleitem)}
            className="bg-green-500 hover:bg-green-600 py-1 px-2 rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTile;
