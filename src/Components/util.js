const currencyPattern = /(\d)(?=(\d{3})+(?!\d))/g;
  // const cValue = 123456.78;
  // const fValue = currencyValue.toFixed(2).replace(currencyPattern, '$1,');

  // const formattedValue = currencyValue.toLocaleString('en-US', {
  // style: 'currency',
  // currency: 'PKR'
  // });


    // return amount.toFixed(3).replace(currencyPattern,amount)

    export const formateCurrency = (amount)=>{
         return amount.toFixed(2).replace(currencyPattern,amount)
      }