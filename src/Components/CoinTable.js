
import { Pagination, PaginationItem } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CryptoUseContext } from '../store/Store'
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
const StyledPagination = styled(Pagination)(({ theme }) => ({
    padding: 20,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    '& .MuiPaginationItem-icon': {
        fontSize: '2rem',
      },
  
    '& .MuiPaginationItem-root': {
      fontSize: "1.5rem",
      color: "gold",
      borderRadius: "50%",
  
      '&.Mui-selected': {
        color: "white",
        backgroundColor: "black",
        borderRadius: "50%",
      },
  
      '&.MuiPaginationItem-ellipsis': {
        fontSize: "2rem",
        color: "gold",
        
  
    
      },
    },
  }));
    
const CoinTable = () => {
    const [coins,setCoins] = useState([])
    const {currency} = CryptoUseContext();
    const [search,setSeach]=useState('');
    const [page,setPage] = useState(1);
    
    const formateCurrency = (amount)=>{
        // return amount.toFixed(3).replace(currencyPattern,amount)
        return amount.toLocaleString('en-US',{style:'currency',currency:currency.toString().toUpperCase()})
      }
      const fetchCoins = async () => {
       
        const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        setCoins(data);
        console.log(data);
    };
   
     

    useEffect(()=>{
        fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency])

 
    
    
    if(!coins){
        return(
          <div>wait.... </div>
        )
      }
    const filteredCoins = coins.filter((c)=>c.name.toLowerCase().includes(search.toLowerCase()) ||c.symbol.toLowerCase().includes(search.toLowerCase()));

    const header = ["Coin","Price","24 Change","Market Cap"]

    
  return (
    <div className="w-full sm:px-10 lg:px-20 xl:px-40  py-8 px-5 bg-neutral-800 ">
    <div className='container mx-auto flex flex-col  py-6 flex-nowrap'>
        
        <input value={search} onKeyDown={(e)=>{
           if(e.key==="Enter"){
            setSeach("")
          }  
        }} onChange={(e)=>{setSeach(e.target.value)
     
     
      }} style={{
          borderRadius:"10px",
        }} type="text" className="bg-transparent outline-none border-2 border-white w-full py-4 text-white placeholder-gray-500 px-2  mb-8" placeholder='Search for a crypto currency...'  />
        
        <div className='flex justify-between bg-yellow-600 py-5 rounded'>
            {
                header.map((data,index)=>(
                    <div key={index} style={{
                        flex:"1",
                        display:"flex",
                        justifyContent:"flex-start",
                        alignContent:"center"

                    }} className='text-white px-5 font-bold sm:text-sm' >{data}</div>
                ))
            }
        </div>
        <div className='flex flex-col justify-between overflow-x-auto'>
            {filteredCoins && filteredCoins.slice((page - 1)*10,(page - 1)*10 + 10).map((c,index)=>{
                return(
             <Link key={index} to={`/coin/${c.id}`}>
                    <div  className='flex justify-center items-center w-full '>
                        <div style={{
                            display:"flex",
                            borderBottom:"2px solid gray"
                        }}
                        className="py-5 gap-6 hover:bg-gray-200 rounded  w-full text-white hover:text-gray-700"
                        >
                        
                            <img  className='w-10 h-10 object-contain' src={c.image} alt={c.name}/>
                            <div style={{flex:"1"}} className="flex justify-center items-center  sm:text-sm   ">{formateCurrency(c.current_price)}</div>
                            <div style={{flex:"1"}} className="flex justify-center items-center  sm:text-sm   ">{formateCurrency(c.price_change_24h)}</div>
                            <div style={{flex:"1"}} className="flex justify-center items-center  sm:text-sm  ">{formateCurrency(c.market_cap)}</div>
                       
                        </div>

                    </div>
             </Link>
                    )
               
})}

        </div>
        <StyledPagination
        onChange={(_,value)=>{
            setPage(value)
            window.scroll(0,450)
        }}
      
      count={Number((filteredCoins?.length / 10).toFixed(0))}
      renderItem={(item) => (
        <PaginationItem
          title="More pages"
          {...item}
        />
      )}
      
    />
    </div>
    </div>
  )
}

export default CoinTable