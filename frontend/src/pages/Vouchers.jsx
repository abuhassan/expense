import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getVouchers } from '../features/vouchers/voucherSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import VoucherItem from '../components/VoucherItem'

function Vouchers() {
  const { vouchers } = useSelector((state) => state.vouchers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVouchers())
  }, [dispatch])

  if (!vouchers) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Vouchers</h1>
      <div className='vouchers'>
        <div className='voucher-headings'>
          <div>Date</div>
          <div>VoucherType</div>
          <div>Status</div>
          <div></div>
        </div>
        {vouchers.map((voucher) => (
          <VoucherItem key={voucher._id} voucher={voucher} />
        ))}
      </div>
    </>
  )
}

export default Vouchers
