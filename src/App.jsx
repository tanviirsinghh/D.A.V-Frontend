
import './App.css'
import Login from './Authentication/Login'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage';
import Otp from './Authentication/Otp';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/otp' element={<Otp/>}/>

        
        </Routes>
        </BrowserRouter>
    

   </>
  )
}

export default App
