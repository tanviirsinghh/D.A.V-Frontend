
import './App.css'
import Login from './Authentication/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage';
import Otp from './Authentication/Otp';
import RegistrationPage from './Authentication/registration';
import MedicineProductListing from './Pages/product';
import UserListing from './Pages/userlisting';
import TrackOrder from './Pages/trackOrder';
import UserApprovalList from './Pages/approval';
import OrderHistory from './Pages/History/outer';

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
          <Route path='/userlisting' element={<UserListing />} />
          <Route path='/trackorder' element={<TrackOrder />} />
          <Route path='/userapprovallist' element={<UserApprovalList />} />
          <Route path='/history' element={<OrderHistory />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
