
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar'


export default function App({ Component, pageProps }) {
  const [cart,setCart] = useState({})
  const [subTotal,setSubTotal] = useState(0)
  const [user, setUser]= useState({value:null})
  const [key, setKey]= useState(0)
  const [progress, setProgress] = useState(0)
  const router =useRouter()

  useEffect(()=>{
    router.events.on('routeChangeStart',()=>{
      setProgress(60)
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    })
    try {
       if(localStorage.getItem('cart'))
    {
      setCart(JSON.parse(localStorage.getItem("cart")))}
      saveCart(JSON.parse(localStorage.getItem("cart")))
    } 
    catch (error) {
     console.error(error) 
     localStorage.clear();
    }
    // const myuser =JSON.parse(localStorage.getItem("myuser")) 
    // if(myuser){
    //   setUser({value:myuser.token, email:myuser.email })
    //   setKey(Math.random)
    // }
    
   


  },[router.query])
  const logout=()=>{
    localStorage.removeItem("myuser")
    setUser({value:null})
    setKey(Math.random)
    router.push("/")
  }

  const saveCart=(mycart)=>{
    localStorage.setItem("cart", JSON.stringify(mycart))
    let keys = Object.keys(mycart);
    let subtotal = 0;
    for(let i=0; i<keys.length;i++){
      subtotal += mycart[keys[i]]["price"] * mycart[keys[i]]["qty"]
    }
    setSubTotal(subtotal)

  }
 

  const addToCart=(itemCode, qty, price, name,img,  size, variant)=>{
    let newcart = cart;
    if(itemCode in cart){
      newcart[itemCode]["qty"] =   newcart[itemCode]["qty"] + qty;
    }
    else{
        newcart[itemCode]={qty:1,price , name,img, size, variant}
      }
      setCart(newcart)
      saveCart(newcart)
  }

  const buyNow=(itemCode, qty, price, name,img,size, variant)=>{
    let newcart = {}
     newcart[itemCode] = {qty:1,price , name,img, size, variant};
   
    setCart(newcart)
    saveCart(newcart)
  
   router.push("/checkout")
  }

  const removeFromCart=(itemCode, qty, price, name, size, variant)=>{
    let newcart = cart;
    if(itemCode in cart){
      newcart[itemCode]["qty"] =   newcart[itemCode]["qty"] - qty;
    }
    if(newcart[itemCode]["qty"] <= 0){
      delete newcart[itemCode];
    }
  
    setCart(newcart)
    saveCart(newcart)
  }
  const clearCart=()=>{
    setCart({})
    saveCart({})
  }

  
  
  
  
 return <>
 <LoadingBar
        color='purple'
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
 <Navbar logout={logout} key={key} user={user} cart={cart} subTotal={subTotal} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart}  /><Component buyNow={buyNow} cart={cart} subTotal={subTotal} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} {...pageProps} />;<Footer/></>

  
}