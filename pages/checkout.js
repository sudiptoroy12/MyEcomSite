import React, { useState } from "react";

import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useEffect} from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from "@/middleware/baseUrl";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEamil] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [gender, setGender] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [user, setUser]= useState({value:null})
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("myuser"))
if(user){
setUser(user)
setEamil(user.email)
fetchdata(user.token)
}

  },[])
  useEffect(()=>{
    
      if(name.length>2 && email.length>2 && address.length>3 && phone.length>2 && district.length>2 && thana.length>2 && gender.length>2){
        setDisabled(false)
      }
      else{
        setDisabled(true)
      }
  

  },[name,email,address,phone, district, thana, gender])
  const fetchdata=async(token)=>{
     
    const data = {token:token}
    
    const res = await fetch(baseUrl+"/api/getuser", {
      method: "POST",
     
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify(data),
    })
    let response = await res.json()
    console.log(response)
    setAddress(response.address)
    setName(response.name)
    setPhone(response.phone)
    setDistrict(response.district)
    setThana(response.thana)
    setGender(response.gender)
    setPhone(response.phone)
  
  }

  const handleChange=(e)=>{
    if(e.target.name=="name"){
      setName(e.target.value)
    }
    else if(e.target.name == "email"){
      setEamil(e.target.value)  
      }
    else if(e.target.name == "address"){
      setAddress(e.target.value)  
      }
    else if(e.target.name == "phone"){
      setPhone(e.target.value)  
      }
    else if(e.target.name == "district"){
      setDistrict(e.target.value)  
      }
    else if(e.target.name == "thana"){
      setThana(e.target.value)  
      }
    else if(e.target.name == "gender"){
      setGender(e.target.value)  
      }


  }
  const initiatePayment= async ()=>{
   let oid = Math.floor(Math.random() * Date.now())
    const data = {cart,subTotal,oid , name,email,address , phone,district,thana,gender}
    const res = await fetch(baseUrl+"/api/pretransaction", {
      method: "POST",
     
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify(data),
    })
    let response = await res.json()
    console.log(response)
    toast.success('You are successfully paid!!', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
     
      });
  }

  return (
  
    <div className=" container m-auto max-w-[80rem] ">
        <ToastContainer
 position="top-left"
 autoClose={5000}
 hideProgressBar={false}
 newestOnTop={false}
 closeOnClick
 rtl={false}
 pauseOnFocusLoss
 draggable
 pauseOnHover
 />
      <h1 className="mt-4 text-center text-2xl font-semibold">Checkout</h1>
      <h2 className="mt-7 font-bold">1. Delivary details</h2>
      <div>
        <div className="details flex px-4  mx-auto ">
          <div className="  w-1/2">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Name
              </label>
              <input
              onChange={handleChange}
              value={name}
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className=" w-1/2">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              {user.value ?  <input
               
               value={user.email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly
              /> :  <input
              onChange={handleChange}
              value={email}
               type="email"
               id="email"
               name="email"
               className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             />}
             
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="mb-4">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Address
            </label>
            <textarea
               onChange={handleChange}
               value={address}
              id="address"
              name="address"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="details flex px-4  mx-auto ">
          <div className="  w-1/2">
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>
              <input
                 onChange={handleChange}
                 value={phone}
                type="phone"
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className=" w-1/2">
            <div className="mb-4">
              <label
                htmlFor="district"
                className="leading-7 text-sm text-gray-600"
              >
                District
              </label>
              <input
                 onChange={handleChange}
                 value={district}
                type="text"
                id="district"
                name="district"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="details flex px-4  mx-auto ">
          <div className="  w-1/2">
            <div className="mb-4">
              <label
                htmlFor="thana"
                className="leading-7 text-sm text-gray-600"
              >
                Thana
              </label>
              <input
                 onChange={handleChange}
                 value={thana}
                type="text"
                id="thana"
                name="thana"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className=" w-1/2">
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="leading-7 text-sm text-gray-600"
              >
                Gender
              </label>
              <input
                 onChange={handleChange}
                 value={gender}
                type="gender"
                id="gender"
                name="gender"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-8 font-bold">2. Review Cart Items & Pay</h2>
      <div className="sidecart   bg-gray-100 px-8 py-6  mt-4">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="mt-3 font-thin">No items in the cart</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item py-4 flex justify-between">
                  <div className="font-semibold">
                    {cart[k].name} ({cart[k].variant}/{cart[k].size})
                  </div>
                  <div className="font-semibold flex   text-lg  ">
                    <CiCircleMinus
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer mt-[.5vh]"
                    />
                    <div
                      className="m-2 mt-[-.2vh]
                 "
                    >
                      {cart[k].qty}
                    </div>
                    <CiCirclePlus
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer mt-[.5vh]"
                    />
                  </div>
                </div>
              </li>
            );
          })}
          <div className="font-bold mt-6">Subtotal= ৳ {subTotal}</div>
          <button
            disabled={disabled} onClick={initiatePayment}
            className="flex  mt-6 text-white bg-purple-700 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded disabled:bg-purple-400"
          >
            Pay
          </button>
        </ol>
      </div>
    </div>
  );
};

export default Checkout;
