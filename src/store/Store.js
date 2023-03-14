
const { createContext, useContext, useState } = require("react");


const CryptoContext = createContext();



const CryptoProvider = ({children})=>{
const [currency,setCurrency] = useState("pkr");



return(
    <CryptoContext.Provider 
    value={{
        currency,setCurrency
    }}
    >
        {children}
    </CryptoContext.Provider>
)
}


export default CryptoProvider;
export const CryptoUseContext = ()=>{
    return useContext(CryptoContext)
}