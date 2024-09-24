import {React,useEffect, useState} from 'react'
import {useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const myaccount = () => {
  const [name, setName] = useState("");
  const [email, setEamil] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [user, setUser]= useState({value:null})
 

  
 
  const router = useRouter()


  useEffect(()=>{
    const myuser = JSON.parse(localStorage.getItem("myuser"))
if(myuser){
setUser(myuser)
setEamil(myuser.email)
fetchdata(myuser.token)
}

  },[])

    const fetchdata=async(token)=>{
     
      const data = {token:token}
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
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
    const handleSubmit=async()=>{
     
      const data = {token:user.token,name, address, district, thana, phone,gender}
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
        method: "POST",
       
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify(data),
      })
      let response = await res.json()
      console.log(response)
      toast.success('Successfully Updated', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       
        });

    }
    const handlePasswordSubmit=async()=>{
      let response;
     if(npassword==cpassword){ 
      const data = {token:user.token,password,npassword,cpassword}
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: "POST",
       
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify(data),
      })
       response = await res.json()
      console.log(response)

    
    
    
    if(response.success){
      toast.success('Successfully Update Password', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       
        });
      }
      
      else{
        toast.success(response.error, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
           
            });
          }
    }
   
        
      else{
        toast.success('Invalid Password', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
           
            });
          }
  
   
    setPassword("")
    setNpassword("")
    setCpassword("")
  
     
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
    else if(e.target.name == "password"){
      setPassword(e.target.value)  
      }
    else if(e.target.name == "npassword"){
      setNpassword(e.target.value)  
      }
    else if(e.target.name == "cpassword"){
      setCpassword(e.target.value)  
      }

  

     

  }
  
  return (
    <div>
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
          <h1 className=" mt-4 text-center text-2xl font-semibold">Update Account</h1>
      <h2 className=" m-4 mt-7 font-bold">1. Personal details</h2>
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
              <input
               onChange={handleChange}
               value={email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
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
      <button
            onClick={ handleSubmit}
            className="flex  mt-3 text-white bg-purple-700 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 mx-4 rounded-md"
          >
            Submit
          </button>

          <h2 className="m-4 mt-8 font-bold">2. Change Password</h2>
          <div className="flex flex-col px-4  mx-auto ">
          <div className="  w-1/2">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
              onChange={handleChange}
              value={password}
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className=" w-1/2">
            <div className="mb-4">
              <label
                htmlFor="npassword"
                className="leading-7 text-sm text-gray-600"
              >
                New Password
              </label>
              <input
               onChange={handleChange}
               value={npassword}
                type="password"
                id="npassword"
                name="npassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className=" w-1/2">
            <div className="mb-4">
              <label
                htmlFor="cpassword"
                className="leading-7 text-sm text-gray-600"
              >
                Confirm Password
              </label>
              <input
               onChange={handleChange}
               value={cpassword}
                type="password"
                id="cpassword"
                name="cpassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <button
            onClick={handlePasswordSubmit}
            className="flex  mt-3 text-white bg-purple-700 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 mx-4 rounded-md"
          >
            Submit
          </button>
    </div>
  )
}

export default myaccount
