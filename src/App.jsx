import React, { useContext } from 'react'
// import { ShoppingProvider } from './ContextProvider/ShoppingProvider'
import { Route, Router, Routes } from 'react-router-dom'
import ProductList from './Pages/ProductList/ProductList'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import CartList  from './Pages/CardPage/CartList'

const App = () => {
  return (
   <>
  <Routes>
    <Route path='/' element={<ProductList/>}/>
    <Route path='/ProductDetails/:id' element={<ProductDetails/>}/>
    <Route path='/CartList' element={<CartList/>}/>
  </Routes>
    
     </>
  )
}

export default App