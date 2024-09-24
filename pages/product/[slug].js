import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Error from 'next/error'

const Slug = ({addToCart,buyNow,products,variants,error}) => {

  const router = useRouter();
  const { slug } = router.query;
  const[color,setColor] =useState()
  const[size,setSize] =useState()

  useEffect(()=>{
    if(!error){
    setColor(products.color)
    setSize(products.size)
  }

  },[router.query])

  const refreshVariants=(newcolor,newsize)=>{
    let url= `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['slug']}`
    router.push(url)

  }
  if (error == 404) {
    return <Error statusCode={404} />
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className=" m-auto h-[60vh] object-cover object-top  "
              src={products.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                MyEcomSite
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
               {products.title}({products.color}/{products.size})
              </h1>color && 
              
              <p className="leading-relaxed mt-2">
                {products.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                
                 {size && Object.keys(variants).includes("red") && Object.keys(variants["red"]).includes(size) &&   <button onClick={()=>{refreshVariants("red",size)}} className={` mx-1 border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === "red" ? "border-black" : "border-gray-300" }`}></button>}
                {size && Object.keys(variants).includes("blue") && Object.keys(variants["blue"]).includes(size)&&   <button onClick={()=>{refreshVariants("blue",size)}} className={` mx-1 border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === "blue" ? "border-black" : "border-gray-300" }`}></button>}
                {size && Object.keys(variants).includes("yellow")&& Object.keys(variants["yellow"]).includes(size) &&   <button onClick={()=>{refreshVariants("yellow",size)}} className={` mx-1 border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === "yellow" ? "border-black" : "border-gray-300" }`}></button>}
                 {size && Object.keys(variants).includes("purple") && Object.keys(variants["purple"]).includes(size)&&   <button onClick={()=>{refreshVariants("purple",size)}} className={` mx-1 border-2 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${color === "purple" ? "border-black" : "border-gray-300" }`}></button>}
                {size && Object.keys(variants).includes("black") && Object.keys(variants["black"]).includes(size)&&   <button onClick={()=>{refreshVariants("black",size)}} className={` mx-1 border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === "black" ? "border-black" : "border-gray-300" }`}></button>}
                {size && Object.keys(variants).includes("white") && Object.keys(variants["white"]).includes(size)&&   <button onClick={()=>{refreshVariants("white",size)}} className={` mx-1 border-2 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none ${color === "white" ? "border-black" : "border-gray-300" }`}></button>}
                 {size && Object.keys(variants).includes("green")&& Object.keys(variants["green"]).includes(size) &&   <button onClick={()=>{refreshVariants("green",size)}} className={` mx-1 border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === "green" ? "border-black" : "border-gray-300" }`}></button>}
                 </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size}  onChange={(e)=>{refreshVariants(color,e.target.value)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      {color && Object.keys(variants[color]).includes("S") && <option value={"S"}>S</option>}
                      {color && Object.keys(variants[color]).includes("M") && <option value={"M"}>M</option>}
                      {color && Object.keys(variants[color]).includes("L") && <option value={"L"}>L</option>}
                      {color && Object.keys(variants[color]).includes("XL") && <option value={"XL"}>XL</option>}
                      {color && Object.keys(variants[color]).includes("XXL") && <option value={"XXL"}>XXL</option>}
                    
                     
                     
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                { products.avaiableQty >0 && <span className="title-font font-medium text-2xl text-gray-900">
                  ৳{products.price}
                </span>}
                {products.avaiableQty <=0 && <span className="title-font font-medium text-2xl text-gray-900">
                  Out Of Stock!!!!
                </span>}
                <button disabled={products.avaiableQty <=0} onClick={()=>{buyNow(slug,1,products.price,products.title,products.img, size,color)}} className="flex ml-12  mx-2 text-white bg-purple-700 border-0 py-2 px-3 focus:outline-none hover:bg-purple-600 rounded  disabled:bg-purple-400">
                  BuyNow
                </button>
                <button  disabled={products.avaiableQty <=0}  onClick={()=>{addToCart(slug,1, products.price,products.title,products.img, size,color)}} className="flex   mx-2 text-white bg-purple-700 border-0 py-2 px-3 focus:outline-none hover:bg-purple-600 rounded disabled:bg-purple-400 ">
                  AddTocart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
 
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let error = null;
 let products = await Product.findOne({slug: context.query.slug});
 if (products==null){
  return {
    props: {error:404},
    }
 }
 let variants = await Product.find({title: products.title})
 let colorSizeSlug={}

 
 for(let item of variants){
   
     if(Object.keys(colorSizeSlug).includes(item.color)){
       colorSizeSlug[item.color][item.size]= {slug: item.slug}
     }
     else{
      colorSizeSlug[item.color]={}
      colorSizeSlug[item.color][item.size]= {slug: item.slug}
     }
   

   }
  
   
return {
props: {error:error ,products:JSON.parse(JSON.stringify(products)),variants:JSON.parse(JSON.stringify(colorSizeSlug)) },
}
}



export default Slug;
