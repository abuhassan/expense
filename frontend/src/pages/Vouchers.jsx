import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getVouchers, reset } from '../features/vouchers/voucherSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import VoucherItem from '../components/VoucherItem'

function Vouchers() {
  const { vouchers, isLoading, isSuccess } = useSelector(
    (state) => state.vouchers
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getVouchers())
  }, [dispatch])

  if (isLoading) {
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
