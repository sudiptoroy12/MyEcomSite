
import React from 'react'
import Product from "@/models/Product";
import mongoose from "mongoose";




const Tshirts = ({products}) => {
  return (
    <div>
     <section className="text-gray-600 body-font">
  <div className="container px-5 py-10 ">
    <div className="flex flex-wrap justify-center">

    {Object.keys(products).length === 0 && <p>No tshirts available</p> }
     {Object.keys(products).map((item)=>{ return <div key={products[item]._id} className="lg:w-1/5 md:w-1/3 p-4 w-full m-6  shadow-2xl cursor-pointer">
        <a href={`/product/${products[item].slug}`} className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className=" m-auto  h-[33vh] block" src={(products[item]).img}/>
        </a>
        <div className="mt-4 text-center ">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Tshirts</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{(products[item]).title }</h2>
          <p className="mt-1">৳{(products[item]).price}</p>
          <div className="mt-1">
            {products[item].size.includes ("S") && <span className='border border-gray-400 my-1 mx-1 px-1 '>S</span>}
            {products[item].size.includes ("M") && <span className='border border-gray-400 my-1 mx-1 px-1  '>M</span>}
            {products[item].size.includes ("L") && <span className='border border-gray-400 my-1 mx-1  px-1 '>L</span>}
            {products[item].size.includes ("XL") && <span className='border border-gray-400 my-1 mx-1 px-1 '>XL</span>}
            {products[item].size.includes ("XXL") && <span className='border border-gray-400 my-1 mx-1 px-1 '>XXL</span>}
           
          </div>
          <div className="mt-2">
          {products[item].color.includes("red") &&   <button className="  mx-1 border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes("blue") &&   <button className="  mx-1 border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes("yellow") &&   <button className="  mx-1 border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes("purple") &&   <button className=" mx-1 border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes("black") &&   <button className="  mx-1 border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes("white") &&   <button className="  mx-1 border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes("green") &&   <button className="  mx-1 border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
          </div>
        </div>
      </div>})}
   
   
    
     
      
    </div>
  </div>
</section>
    </div>
  )
}
 
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  
 let products = await Product.find({category:"tshirt"});
 let tshirts = {}
 for(let item of products)
   if(item.title in tshirts){
     if(!tshirts[item.title].color.includes(item.color) && item.avaiableQty > 0){
       tshirts[item.title].color.push(item.color)
     }
     if(!tshirts[item.title].size.includes(item.size) && item.avaiableQty > 0){
       tshirts[item.title].size.push(item.size)
     }

   }
   else{
     tshirts[item.title]= JSON.parse(JSON.stringify(item))
     if(item.avaiableQty > 0){
     tshirts[item.title].color = [item.color]
     tshirts[item.title].size = [item.size]
     }
     else{
      tshirts[item.title].color = []
      tshirts[item.title].size = []
     }
   }
return {
props: {products:JSON.parse(JSON.stringify(tshirts)) },
}
}


export default Tshirts
