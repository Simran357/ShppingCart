import React, { useContext } from 'react'
import ShoppingContext from '../../ContextProvider/ShoppingProvider'

const CartTile = ({singleitem}) => {
    const {loading,error,RemoveFromCart, handleCart} = useContext(ShoppingContext)
    if(loading) return <h1>loading</h1>
    if(error) return <h1>Error!!!!</h1>
 
  return (
   <><div>{
         singleitem?.length > 0 ? <h1>no item added</h1> :
        <div>
        <div><img src={singleitem?.thumbnail} 
        className='' style={{width:'80px'}}/></div>
        <div style={{display:'flex' , gap:'10px'}}><h3>{singleitem?.title}</h3>
        <button
          style={{
            disabled:'opacity-65', padding:'10px',
            backgroundColor:'black',
            color:'white' ,
          borderRadius:'9px' ,
          margin:'20px'
          }} 
        
        onClick={()=>RemoveFromCart(singleitem,true)}>Remove</button></div>
        <div>
        { singleitem.totalPrice ? (
       <h3>${singleitem.totalPrice.toFixed(2)}</h3>
   ) : (
       <h3>Loading...</h3> 
   )}

   {singleitem.quantity ? (
       <p>{singleitem.quantity}</p>
   ) : (
       <p>Quantity not available</p>
   )}

            <button 
              style={{disabled:'opacity-65',
                 padding:'10px',
                backgroundColor:'black',
                color:'white' ,
              borderRadius:'9px' ,
              marginLeft:'8px'
              }}
            disabled={singleitem?.quantity === 1} onClick={()=>RemoveFromCart(singleitem,false)}
              >-</button>
            <button 
              style={{disabled:'opacity-65',
                 padding:'10px',
                backgroundColor:'black',
                color:'white' ,
              borderRadius:'9px' ,
               marginLeft:'8px',

              }}
            onClick={()=> handleCart(singleitem)}>+</button></div> 

        <hr/>
        </div>
          }</div>
          </>
  )
}

export default CartTile