import React, { useState,useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useRouter} from "next/router";
import { baseUrl } from "@/middleware/baseUrl";





const Signup = () => {

  const[name,setName]=useState('')
const[email,setEamil]=useState('')
const[password,setPassword]=useState('')
const router = useRouter()
useEffect(()=>{
  const token = localStorage.getItem("myuser")
  if(token){
    router.push("/")
  }

  },[])

const handleChange=(e)=>{
  if(e.target.name == "name"){
    setName(e.target.value)
  }
 else if(e.target.name=="email"){
    setEamil( e.target.value)
 }
 else if(e.target.name=="password"){
    setPassword (e.target.value)
 }

}

const handleSubmit= async (e)=>{
  e.preventDefault()
  const data = {name,email,password}
  const res = await fetch(baseUrl+"/api/signup", {
    method: "POST",
   
    headers: {
      "Content-Type": "application/json",
    },
     body: JSON.stringify(data),
  })
  let response = await res.json()
  console.log(response)

  setName("")
  setEamil("")
  setPassword("")

  toast.success('Your account has been created!!', {
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
      <div className="min-h-screen bg-gray-50 flex flex-col  py-24 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign up to your account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
            Or{" "}
            <Link
              href="/login"
              className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
            <div className="mt-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input onChange={handleChange} value={name}
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input onChange={handleChange} value={email}
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

             
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password 
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input onChange={handleChange} value={password}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Sign up
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
