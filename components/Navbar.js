import React, { useRef, useState } from "react";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

const Navbar = ({logout,user,cart, addToCart, clearCart, removeFromCart, subTotal}) => {
  const [dropdown, setDropdown] = useState(false)

  const toggleCart =()=>{
    if (ref.current.classList.contains("translate-x-full")){
      ref.current.classList.remove("translate-x-full")
      ref.current.classList.add("translate-x-0")
    }
    else if(!ref.current.classList.contains("translate-x-full")){
      ref.current.classList.remove("translate-x-0")
      ref.current.classList.add("translate-x-full")
    }

  }
  const ref = useRef();
  
  return (
    
    <div className="flex flex-col bg-gray-100 md:flex-row md:justify-start justify-center py-3 items-center shadow-xl sticky top-0 z-20">
      <div className="logo font-bold text-xl mx-4 mt-3 md:mt-0">
        <Link href={"/"}>Logo</Link>
      </div>
      <div className="nav mx-6 mt-6 md:mt-0">
        <ul className="flex  items-center space-x-6 font-bold md:text-md ">
          <Link href={"/tshirts"} className= "hover:text-gray-500">
            <li>Tshirts</li>
          </Link>
          <Link href={"/hoodies"}  className= "hover:text-gray-500">
            <li>Hoodies</li>
          </Link>
          <Link href={"/jackets"}   className= "hover:text-gray-500" >
            <li>Jackets</li>
          </Link>
          <Link href={"/watches"}  className= "hover:text-gray-500">
            <li>Watches</li>
          </Link>
        </ul>
      </div>
      <div  className="cart absolute right-2 flex md:top-3 mx-5 cursor-pointer items-center">
        <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}  >
       {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute mt-4 md:right-14 right-10 w-32  bg-gray-100 rounded-lg px-4 py-2  text-sm font-semibold shadow-lg border">
          <ul>
           <Link href={"/myaccount"}> <li className="py-1 hover:text-purple-900">My account</li></Link>
            <Link href={"/orders"}> <li className="py-1 hover:text-purple-900">Orders</li></Link>
            <li onClick={logout} className="py-1 hover:text-purple-900">Logout</li>
          </ul>
        </div>}
      {user.value && <MdOutlineAccountCircle className="text-2xl md:text-3xl md:mx-4 mx-2" />}
      </span>
      {!user.value && <Link href={"/login"}>
      <button className="bg-purple-300 px-2 py-1 text-sm rounded-md md:mx-4 mx-2">Login</button>
      </Link>}
        <IoCartOutline onClick={toggleCart}  className="text-2xl md:text-3xl " />
      </div>
      <div ref={ref} className="sideCart absolute overflow-y-scroll top-0 right-0 w-72 h-[100vh] bg-gray-100 px-8 py-10 transform transition-transform translate-x-full ">
        <h2 className="font-bold  text-xl text-center">Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute right-3 top-3 text-2xl cursor-pointer text-red-500">
          <IoMdClose />
        </span>
        <ol className="list-decimal font-semibold">
         {Object.keys(cart).length==0 && <div className="mt-3 font-thin">No items in the cart</div>}
       { Object.keys(cart).map((k)=>{ return <li key={k}>
            <div className="item my-4 flex">
            
              <div className="font-semibold   w-2/3">
             {cart[k].name}({cart[k].variant}/{cart[k].size})
              </div>
              
             
              <div className="font-semibold flex justify-center items-center  text-lg w-1/3 ">
                <CiCircleMinus onClick={()=>{removeFromCart(k,1, cart[k].price,cart[k].name, cart[k].size, cart[k].variant )}} className="cursor-pointer" /><span className="m-2  ">{cart[k].qty}</span>
                <CiCirclePlus onClick={()=>{addToCart(k,1, cart[k].price,cart[k].name, cart[k].size, cart[k].variant )}}  className="cursor-pointer" />
              </div>
            </div>
          </li>
}
)}
<div className="font-bold mt-6">Subtotal= ৳ {subTotal}</div>
  
          <div className="flex">
          <Link href={"/checkout"}><button disabled={Object.keys(cart).length === 0} className="flex  mt-4 text-white bg-purple-700 border-0 py-2 px-2 focus:outline-none hover:bg-purple-600 rounded disabled:bg-purple-400"> <IoBagCheckOutline className="mt-1 mr-1"/>Checkout</button></Link>
          <button onClick={clearCart} disabled={Object.keys(cart).length === 0} className="flex mt-4 mx-2 text-white bg-purple-700 border-0 py-2 px-3 focus:outline-none hover:bg-purple-600 rounded disabled:bg-purple-400 ">ClearCart</button>
         </div>
        </ol>
      </div>
    </div>
  );
};

export default Navbar;
