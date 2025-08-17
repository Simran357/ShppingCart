import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShoppingContext = createContext(null);

export const ShoppingProvider = ({ children }) => {
  const [data, setdata] = useState([]);               // stores product list only
  const [selectedProduct, setSelectedProduct] = useState(null); // single product
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [cartItem, setcart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItem')) || [];
    setcart(savedCart);
  }, []);

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (savedProducts.length > 0) setdata(savedProducts);
  }, []);

  // Save product list to localStorage whenever it changes
  useEffect(() => {
    if (data.length > 0) localStorage.setItem('products', JSON.stringify(data));
  }, [data]);

  const handleCart = (product) => {
    const copyCart = [...cartItem];
    const index = copyCart.findIndex(item => item.id === product.id);

    if (index === -1) {
      copyCart.push({ ...product, quantity: 1, totalPrice: product.price });
    } else {
      copyCart[index] = {
        ...copyCart[index],
        quantity: copyCart[index].quantity + 1,
        totalPrice: (copyCart[index].quantity + 1) * copyCart[index].price
      };
    }

    setcart(copyCart);
    localStorage.setItem('cartItem', JSON.stringify(copyCart));
    navigate('/CartList');
  };

  const RemoveFromCart = (product, isFullRemove) => {
    const copyCart = [...cartItem];
    const index = copyCart.findIndex(item => item.id === product.id);
    if (index === -1) return;

    if (isFullRemove || copyCart[index].quantity === 1) {
      copyCart.splice(index, 1);
    } else {
      copyCart[index] = {
        ...copyCart[index],
        quantity: copyCart[index].quantity - 1,
        totalPrice: (copyCart[index].quantity - 1) * copyCart[index].price
      };
    }

    setcart(copyCart);
    localStorage.setItem('cartItem', JSON.stringify(copyCart));
  };

  return (
    <ShoppingContext.Provider
      value={{
        data,
        setdata,
        selectedProduct,
        setSelectedProduct,
        loading,
        setloading,
        error,
        seterror,
        cartItem,
        setcart,
        handleCart,
        RemoveFromCart
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
