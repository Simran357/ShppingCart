import React, { useContext, useEffect } from 'react'
 import { useNavigate } from 'react-router-dom'
import  ShoppingProvider  from '../../ContextProvider/ShoppingProvider'

const ProductList = () => {
let {data,loading,cartItem,setloading,setdata,seterror,error} = useContext(ShoppingProvider)
const navigate = useNavigate()
  async function  Api(){
    setloading(true)
    const response = await fetch(`https://dummyjson.com/products`)
    const result = await response.json()
    console.log(result?.products);
    if(result?.products){
      setdata(result?.products)
      setloading(false)
      seterror(false)

    }else{
      seterror(true)
      setloading(true)
    }
  }
  console.log(data,'data');
  
  useEffect(()=>{
    Api()
  },[])
  if(loading) return <h1>loading</h1>
  if(error) return <h1>Error!!!!</h1>

  return (
  <>
      <h1 className='bg-red-700'>product list</h1>
  <div className='bg-red-700'>
  {data?.length > 0 ? 
  <div className=''
  style={{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    gap:'10px',
    padding:'38px',
    marginTop:'50px',
    backgroundColor:'red'

  }}>
    {data?.map(products => 
  <div >
  <div className=''>
  <img  className=''
  style={{marginleft:'50px'}}
   src={products.thumbnail} alt={products.title}/> </div>
  <div>
    <h3>{products.title}</h3>
    <h3>{products?.price}</h3>
    <button
     style={{disabled:'opacity-65', padding:'10px',
      backgroundColor:'black',
      color:'white' ,
    borderRadius:'9px',
  display:'inline',
margin:'5px' }}
     onClick={()=>navigate(`/ProductDetails/${products?.id}`)}>View Details</button>
    {/* <button
    disabled={cartItem.findIndex(item=> item.id === data.id) >-1 }
    style={{disabled:'opacity-65', padding:'10px',
      backgroundColor:'black',
      color:'white' ,
    borderRadius:'9px' ,
      marginBottom:'50px'
    }}
     onClick={()=>navigate(`/CartList`)}>Add to Cart</button> */}

  </div>
  </div>)} </div> : 
  <h1>No product available</h1>}
</div>
  </>
  )
}

export default ProductList