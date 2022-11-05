import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewVoucher from './pages/NewVoucher'
import Vouchers from './pages/Vouchers'
import Voucher from './pages/Voucher'

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
            <Route
              path='/new-voucher'
              element={
                <PrivateRoute>
                  <NewVoucher />
                </PrivateRoute>
              }
            />
            <Route
              path='/vouchers'
              element={
                <PrivateRoute>
                  <Vouchers />
                </PrivateRoute>
              }
            />
            <Route
              path='/voucher/:voucherId'
              element={
                <PrivateRoute>
                  <Voucher />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
