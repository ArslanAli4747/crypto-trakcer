import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoUseContext } from '../store/Store';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import {faker} from "@faker-js/faker"
 
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
 
export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  


const CoinInfo = () => {
    const [day,setDay] = useState(1);
    const [prices,setPrices] = useState();
    const {currency} = CryptoUseContext()
    const fetchdata = async()=>{
        const resp = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=${currency}&days=${day}`
        )
        setPrices(resp.data.prices)
        console.log(resp.data.prices);
    }
    useEffect(()=>{
        fetchdata()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[day])

    const labels = prices ? prices.map((p)=>{
        let date = new Date(p[0]);
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return day === 1 ? time : date.toLocaleDateString();
    }):null
  
    const data = {
      labels,
      datasets: [
        {
            label: `Price ( Past ${day} Days ) in ${currency}`,
          data:prices? prices.map((coin) => coin[1]):null,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  return (
    <div className='w-full flex justify-center items-center overflow-x-auto'>
      {
        !prices ?(
            <div>loading...</div>
        ):
        (
<Line options={options} data={data} />
        )
      }

        
    </div>
  )
}

export default CoinInfo