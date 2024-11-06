
import './App.css'
import Login from './Authentication/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage';
import Otp from './Authentication/Otp';
import RegistrationPage from './Authentication/registration';
import MedicineProductListing from './Pages/product';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/product' element={<MedicineProductListing />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
