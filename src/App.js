import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from './Components/Header';
import Home from './Components/Home';
import Detail from './Components/Detail';
import Main from './Components/Pages/Main';

function App() {
  return (
<BrowserRouter>
    <div className='App m-h-screen w-full  bg-zinc-800'>
      <Header/>
      <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/coin/:id' element={<Detail/>}/>
      </Routes>
    </div>
</BrowserRouter>
  );
}

export default App;
