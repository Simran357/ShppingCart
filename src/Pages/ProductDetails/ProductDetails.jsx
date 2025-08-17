import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
 import  ShoppingProvider from '../../ContextProvider/ShoppingProvider';
const ProductDetails = ()=>{
  const Navigate = useNavigate()
  let {data,loading,setloading,setdata,cartItem,seterror,error,handleCart} = useContext(ShoppingProvider)
  const {id} = useParams()
 async function  Api(){
  setloading(true)
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  const result = await response.json()
  if(result){
    setdata(result)
    setloading(false)
    seterror(false)
  }else{
    seterror(true)
    setloading(true)
  }
}
useEffect(()=>{
  Api()
},[])

   if(loading) return <h1>loading</h1>
   if(error) return <h1>Error!!!!</h1>
  return (
<>
      <div className='bg-red-700'>
  <h1>{data?.title} {id}</h1>
  <div>  
    <img src={data?.thumbnail} alt={data?.title}/></div>
   <div>{ data?.images?.length > 0 ? data?.images.map(img=><div>    
    <img style={{width:'50px', height:'50px', display:'inline-flex'}} src={img?.images} alt={img?.title}/></div>
) : <h1>No Images</h1>}</div>
    <p>{ data?.availabilityStatus}</p>
   <h2>{ data?.price}</h2>
 <h2> { data?.discountPercentage}</h2>
   <p>{data?.description}</p>

<button 

disabled={cartItem.findIndex(item=> item.id === data.id) >-1 }
 onClick={()=>handleCart(data)}
 style={{
  disabled:'opacity-65', 
  padding:'10px',
  backgroundColor:'black',
  color:'white' ,
borderRadius:'9px' }}
 >ADD to Cart</button>
  </div>
</>

)
}

export default ProductDetails