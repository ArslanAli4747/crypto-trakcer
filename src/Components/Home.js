
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import { CryptoUseContext } from '../store/Store';


const Home = () => {
  
const formateCurrency = (amount)=>{
  return amount.toLocaleString('en-US',{style:'currency',currency:currency.toString().toUpperCase()})
}


  const { currency } = CryptoUseContext();
  const [tranding, setTranding] = useState([]);
  const [exchange,setExchange] = useState(null)
  
  const getTranding = async () => {
    const { data }  = await axios.get("https://api.coingecko.com/api/v3/search/trending")
    
    setTranding(data.coins)
    // console.log(tranding)
  }
  const getExchange=async ()=>{
    const {data} = await axios.get("https://api.coingecko.com/api/v3/exchange_rates")
    setExchange(data.rates[currency])
    }
  
  useEffect(() => {
    getTranding()
  }, [currency])

  useEffect(()=>{
    getExchange()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[0])


  const responsive = {
    0: {
        items: 1,
        itemsFit: 'contain',
      },
      512:{
          items: 3, // Corrected typo here
          itemsFit: 'contain',
      },
      1024: {
        items: 5,
        itemsFit: 'contain',
      }
  }
//   let items = null
//    if(tranding)
//   { 
   const items =tranding ? tranding.map((data, index) => {
    // console.log(data);
    return (
      <Link key={index} className='flex justify-center items-center ' to={`/coin/${data.item?.id}`}>
        <div className='flex flex-col justify-center items-center min-h-20 gap-4 ' >
          <img className='h-20 object-cover'  src={data.item?.large} alt={data.item?.id} />
          <p  className='text-white text-sm'>{data.item.symbol} &nbsp; &nbsp; <span>Rank : {data.item?.market_cap_rank}</span></p>
        
          <p  className='text-white font-bold text-sm'>{formateCurrency(data.item?.price_btc*exchange?.value)}</p>
        </div>
      </Link>
    )
  }):null


  return (
    
    <div className="bg-zinc-800 w-full">
    {
      tranding?(
        <div>
        <div className="flex flex-col w-full h-[520px] relative bg-neutral-700 justify-center items-center gap-20">
      <div>
        <p className="text-white sm:text-xl lg:text-2xl xl:text-3xl text-2xl font-bold mb-8 text-center">
          Crypto Tracker
        </p>
        <p className="text-gray-300 text-md lg:text-lg xl:text-xl text-center mt-6 ">Get All the info regarding your favourite crypto currency</p>
      </div>
      {tranding.length > 0 && (
        <div className='w-full flex justify-center items-center'>
          <AliceCarousel
            mouseTracking 
            infinite
            autoPlayInterval={1000}
            animationDuration={2000}
            disableButtonsControls
            disableDotsControls
            autoPlay
            responsive={responsive}
             items={items}
          />
        </div>
      )}
      
      </div>
      <div className="container mx-auto py-8 px-5 ">
     
          
      <p className="text-center text-md sm:text-lg lg:text-2xl text-white font-serif">Crypto Prices by Market Cap</p>
    
      </div>
      </div>

      ):(
        <div>loading......</div>
      )
    }
        </div>
  )
}

export default Home;
