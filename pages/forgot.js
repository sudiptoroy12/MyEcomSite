import React, { useEffect,useState} from "react";
import Link from 'next/link'
import {useRouter} from "next/router";
import { baseUrl } from "@/middleware/baseUrl";

const Forgot = () => {
    const router = useRouter()
    const[email,setEamil]=useState('')
    const[token,setToken]=useState('')
    const[npassword,setNpassword]=useState('')
    const[cpassword,setCpassword]=useState('')
    useEffect(()=>{
        const token = localStorage.getItem("myuser")
  if(token){
    router.push("/")
  }
  
      },[])

      const sendemail=async()=>{
        const data = {email,token,sendMail:true}
        const res = await fetch(baseUrl+"/api/forgot", {
          method: "POST",
         
          headers: {
            "Content-Type": "application/json",
          },
           body: JSON.stringify(data),
        })
        let response = await res.json()
        console.log(response)
        if(response.success){
            console.log("email send")
        }
        else{console.log("error")} 
      }

      const resetpassword=async()=>{

        if(npassword === cpassword){
             const data = {npassword,sendMail:false}
        const res = await fetch(baseUrl+"/api/forgot", {
          method: "POST",
         
          headers: {
            "Content-Type": "application/json",
          },
           body: JSON.stringify(data),
        })
        let response = await res.json()
        console.log(response)
        if(response.success){
            console.log("password change")
        }
        else{console.log("error")} 
        }
       else{
        console.log("error")
       }
      }
    


      const handleChange=(e)=>{
        if(e.target.name=="email"){
          setEamil( e.target.value)
       }
       else if(e.target.name=="npassword"){
          setNpassword (e.target.value)
       }
       else if(e.target.name=="cpassword"){
          setCpassword (e.target.value)
       }
      
      }
      
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col py-24 sm:px-6 lg:px-8 px-6">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow"/>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
            Or <Link href="/login"
                className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                Login
            </Link>
        </p>
    </div>


    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {router.query.email && 
            <form>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-5  text-gray-700">New password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input  onChange={handleChange} id="password" name="npassword"  type="password" required="" value={npassword} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>
               
                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-5  text-gray-700">Confirm password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input onChange={handleChange} id="cpassword" name="cpassword"  type="password" required="" value={cpassword} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>

              
                {npassword !== cpassword && 'Not match password'}
              

                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
            <button onClick={resetpassword} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              Continue
            </button>
          </span>
                </div>
            </form>}
        {!router.query.email &&
            <form>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Email address</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input  onChange={handleChange} id="email" name="email" placeholder="user@example.com" type="email" required value={email} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>

              

              

                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
            <button onClick={sendemail} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              Continue
            </button>
          </span>
                </div>
            </form>}

        </div>
    </div>
</div>
    </div>
  )
}

export default Forgot
