import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { baseUrl } from "@/middleware/baseUrl";

const Orders = () => {
  const router = useRouter();
  const [orders , setOrders]= useState([])
  useEffect(() => {
    const fetchToken =async()=>{
      const res = await fetch(baseUrl+"/api/myorders", {
        method: "POST",
       
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({token:JSON.parse(localStorage.getItem("myuser")).token }),
      })
      let response = await res.json()
      setOrders(response.orders)
    }

    
    const token = localStorage.getItem("myuser");
    if (!token) {
      router.push("/");
    }
    else{
      fetchToken()
    }
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="font-semibold text-center text-2xl p-10">My Orders</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Price 
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item)=>{
              return <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
               {item.orderId}
              </th>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{item.amount}</td>
              <td className="px-6 py-4">
                <Link href={"/order"} >details</Link>
                </td>
            </tr>})}
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;