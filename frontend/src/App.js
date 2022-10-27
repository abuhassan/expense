import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewVoucher from './pages/NewVoucher'
import Vouchers from './pages/Vouchers'
import Voucher from './pages/Voucher'

import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-voucher' element={<PrivateRoute />}>
              <Route path='/new-voucher' element={<NewVoucher />} />
            </Route>
            <Route path='/vouchers' element={<PrivateRoute />}>
              <Route path='/vouchers' element={<Vouchers />} />
            </Route>
            <Route path='/voucher/:voucherId' element={<PrivateRoute />}>
              <Route path='/voucher/:voucherId' element={<Voucher />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
