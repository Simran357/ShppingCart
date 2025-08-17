import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const ShoppingContext = createContext(null)
export const ShoppingProvider = ({children}) => {
  const [data, setdata] = useState([])
  const [loading,setloading] = useState(false)
  const [error, seterror] = useState(false)
const [cartItem,setcart] = useState([])
const navigate = useNavigate()
function handleCart(data){
const CopyExistingCart = [...cartItem]
const findIndex = CopyExistingCart.findIndex(
  (cartItem) => cartItem.id === data.id)
  if(findIndex === -1){
 CopyExistingCart.push({
  ...data,
  quantity : 1,
  totalPrice : data?.price
 })
  }else{

CopyExistingCart[findIndex] = {
  ...CopyExistingCart[findIndex],
quantity:CopyExistingCart[findIndex].quantity + 1,
totalPrice:(CopyExistingCart[findIndex].quantity + 1) * CopyExistingCart[findIndex].price
}

  }
setcart(CopyExistingCart)
localStorage.setItem('cartItem',JSON.stringify(CopyExistingCart))
navigate('/CartList')
}
useEffect(()=>{
  setcart(JSON.parse(localStorage.getItem('cartItem'))|| [])
},[])


function RemoveFromCart(data,isFullyRemovefromCart){
  let CopyExistingCart = [...cartItem]
  const findIndex = CopyExistingCart.findIndex
    (cartItem => cartItem.id === data.id)
    if(isFullyRemovefromCart){
      CopyExistingCart.splice(findIndex,1)
    }else{
      CopyExistingCart[findIndex] = {
        ...CopyExistingCart[findIndex],
        quantity : CopyExistingCart[findIndex].quantity - 1,
        totalPrice : (CopyExistingCart[findIndex].quantity - 1) * CopyExistingCart[findIndex].price
      }
    }
 localStorage.setItem('cartItem',JSON.stringify(CopyExistingCart))
 setcart(CopyExistingCart)
}

  return (
    <>
  <ShoppingContext.Provider value={{
data,
   setdata,
   loading,
  setloading,
  error, 
  seterror,
    cartItem,
    setcart,
    handleCart,
    RemoveFromCart}}>
    {children}
   </ShoppingContext.Provider>
  </>
  )
}
export default ShoppingContext