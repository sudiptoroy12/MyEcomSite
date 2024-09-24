import Head from "next/head";

import {  Inter } from "next/font/google";
import Content from "@/components/Content"







const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>MyEcomSite</title>
        <meta name="description" content="MyEcomSite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
     
      <img src="/home.jpg/"  alt="homepage" width={1550} />  
      <Content/>
    
    </>
  );
}
