import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaMoneyBillAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>Record Income or Expense?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to='/new-voucher' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Voucher
      </Link>

      <Link to='/vouchers' className='btn btn-block'>
        <FaMoneyBillAlt /> View My Vouchers
      </Link>
    </>
  )
}

export default Home
