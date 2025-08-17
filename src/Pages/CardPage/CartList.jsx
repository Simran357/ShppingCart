import React, { useContext } from 'react'
// import FetchApi from '../../Components/CommonFetchApi'
 import ShoppingProvider  from '../../ContextProvider/ShoppingProvider'
import CartTile from './CartTile'
import { useNavigate } from 'react-router-dom'

const CartList = () => {
  const {loading,cartItem,error,singleitem} = useContext(ShoppingProvider)
const navigate = useNavigate()
  if(loading) return <h1>loading</h1>
  if(error) return <h1>Error!!!!</h1>
console.log(cartItem);

  return (
    <><div className='bg-red-700'>
    <h1>MY CART PAGE</h1>
  <div>
    <div>
    <div>
      {
        cartItem?.length > 0  ? cartItem.map(singleitem => <CartTile singleitem={singleitem}/>) : <h>no item available</h>
      }
      </div>
      <div>
        <h3>Order summery</h3>
        <ul>
      
       <h3>Total : <span>${cartItem?.reduce((acc,curr) => acc + curr.totalPrice,0).toFixed(2)}</span></h3>
       <p> No of Items Added to Cart : <span>{cartItem?.reduce((acc,curr) => acc + curr.quantity,0).toFixed(0)}</span></p>
        </ul>
        <div>
{/*           
          <button   
          style={{ padding:'10px',
      backgroundColor:'black',
      color:'white' ,
    borderRadius:'9px', 
     margin:'10px'
    }}>CHECKOUT</button> */}
        <button
          style={{
            padding:'10px',
            backgroundColor:'black',
            color:'white' ,
          borderRadius:'9px',
          margin:'10px' 
          }}
        onClick={()=>navigate('/ProductList')} >COUNTINUE SHOPPING</button></div></div></div>
    </div>
    </div>
  
  </>
  )
}

export default CartList