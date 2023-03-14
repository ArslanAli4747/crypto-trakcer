
import  React from 'react';
import { Link } from 'react-router-dom'
import "../styles/header.css"

import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';

import { CryptoUseContext } from '../store/Store';

const Header = () => {

    const {currency, setCurrency} = CryptoUseContext(); // initialize value to empty string

    const handleChange = (event) => {
        const newValue = event.target.value;
  // console.log(newValue); // log the new value
  setCurrency(newValue);
    };
   
  

  return (
    <div className="w-full bg-slate-700 h-20 sm:h-20 flex justify-between sm:px-16 px-5 items-center">
    <Link to="/">
    <p className="text-white text-xl sm:text-xl font-bold font-serif hover:text-yellow-300 cursor-pointer">Crypto Tracker</p>
    </Link>
    <FormControl sx={{ minWidth: 120,
    height:50,
    
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
          border: "2px solid white",
          borderRadius: "10px",
        },
        "&:hover fieldset": {
          borderColor: "gray",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
          border: "2px solid white",
          borderRadius: "10px",
          color: "white",
        },
        "& .MuiSelect-icon": {
          color: "white",
        },
        "& .MuiSelect-select": {
          color: "gray",
        },
        "& .MuiSelect-select:focus": {
          color: "white",
        },
      
      },
    }}>
        <InputLabel sx={{color:"white",fontSize:"14px",
      '&.Mui-focused': {
        color: 'white', // change label text color when focused
      }
    }} id="demo-simple-select-autowidth-label">currency</InputLabel>
        <Select
             value={currency}
             onChange={handleChange}
             autoWidth
             label="currency"
             MenuProps={{ disablePortal: true }}
        >
       <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="pkr">PKR</MenuItem>
        <MenuItem value="usd">US</MenuItem>
        </Select>
      </FormControl>

    </div>
  )
}

export default Header




