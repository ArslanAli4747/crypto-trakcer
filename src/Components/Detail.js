import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoUseContext } from '../store/Store';
import axios from 'axios';
import "./detail.css"
import CoinInfo from './CoinInfo';
const Detail = () => {
  const data= useParams();
  let [singlecoindata,setsinglecoin]  =useState() 
  const {currency} =CryptoUseContext();
  const  getSingleCoin= async()=>{
    const res = await axios.get( `https://api.coingecko.com/api/v3/coins/${data.id}`)
     setsinglecoin(res.data)
    //  console.log(res.data);
 }
console.log(data.id);
  useEffect(()=>{
    getSingleCoin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currency])
  const formateCurrency = (amount)=>{
    return amount.toLocaleString('en-US',{style:'currency',currency:currency.toString().toUpperCase()})
  }

  return (
    <div className="w-full m-h-screen bg-stone-800 relative px-6 py-8 lg:px-16 flex flex-col lg:flex-row gap-10  items-center justify-center">
    <div style={{
      flex:"1",
    }} className='w-full flex flex-col gap-4'>
     <div className='flex justify-center items-center flex-col gap-4 mt-6'>
     <img className='h-32 w-32 object-contain' src={singlecoindata?.image.large} alt={singlecoindata?.name}/>
    <p className='text-white text-xl font-bold'>Name : {singlecoindata?.name}</p>
     
     </div>
     <div className='mt-10 flex flex-col gap-2'>
        <p className='text-gray-400 text-md sm:text-sm'><span className='font-bold text-white'>Rank </span>:&nbsp;&nbsp;&nbsp; {formateCurrency(Number(singlecoindata?.market_cap_rank))}</p>

    
        <p className='text-gray-400 text-md sm:text-sm'><span className='font-bold text-white'>Current Price</span>:&nbsp;&nbsp;&nbsp; {formateCurrency(Number(singlecoindata?.market_data.current_price[currency]))}</p>
        <p className='text-gray-400 text-md sm:text-sm'><span className='font-bold text-white'>Market Cap</span>: &nbsp;&nbsp;&nbsp;{formateCurrency(Number(singlecoindata?.market_data.market_cap[currency]))}</p>

      </div>
    </div>
    <div style={{
      flex:"2",
      
    }}>
    <CoinInfo/>
    </div>
    </div>
  )
}

export default Detail