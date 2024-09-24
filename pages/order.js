import React from "react";
import Order from "@/models/Order";
import mongoose from "mongoose";

const MyOrder =({order})=> {
  const product = order.products;
  console.log(product)
  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <div className="text-center">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  My Ecommerce Website
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                  Order ID:
                  {order.orderId}{" "}
                </h1>
                <div className="leading-relaxed mb-4">
                  Your order has been successfully placed and the status is :{' '}
                  <span className="font-semibold text-red-500">{order.status}</span>{' '}
                 
                </div>
                <div className="leading-relaxed mb-4">
                  Order placed on :{' '}
                  <span className="font-semibold text-gray-500">{order.createdAt}</span>{' '}
                 
                </div>
              </div>
              <table className="w-full text-l text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-x text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Item Name
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                    Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Price
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Object.keys(product).map((item) => {
                    return (
                      <tr
                        key={item}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          {product[item].name}
                        </th>
                        <td className="px-6 py-4">{product[item].qty}</td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          ৳{product[item].price} X {product[item].qty} = {product[item].price * product[item].qty}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex flex-col mt-2 text-center">
                <span className="title-font  font-medium text-2xl text-gray-900 mt-4">
                  Subtotal: ৳{order.amount}
                </span>
                <div>
                  <button className=" text-white  mt-4 bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded">
                    TrackOrder
                  </button>
                </div>
              </div>
            </div>
            {Object.keys(product).map((item) => {
              return (
                <img
                  key={item}
                  alt="ecommerce"
                  className=" m-auto w-58 h-[45vh] block"
                  src={product[item].img}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findOne(context.query.id);

  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}

export default MyOrder;
