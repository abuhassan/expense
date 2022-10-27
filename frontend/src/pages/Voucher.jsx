import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {
  getVoucher,
  reset,
  closeVoucher,
} from '../features/vouchers/voucherSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Voucher() {
  const { voucher, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.vouchers
  )

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { voucherId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getVoucher(voucherId))
    // eslint-disable-next-line
  }, [isError, message, voucherId])

  // Close voucher
  const onVoucherClose = () => {
    dispatch(closeVoucher(voucherId))
    toast.success('Voucher Closed')
    navigate('/vouchers')
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something went wrong</h3>
  }

  return (
    <div className='voucher-page'>
      <header className='voucher-header'>
        <BackButton url='/vouchers' />
        <h2>
          Voucher ID: {voucherId}
          <span className={`status status-${voucher.status}`}>
            {voucher.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(voucher.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Voucher Type: {voucher.voucherType}</h3>
        <hr />
        <div className='voucher-desc'>
          <h3>Description of voucher purpose</h3>
          <p>{voucher.description}</p>
        </div>
      </header>

      {voucher.status !== 'closed' && (
        <button onClick={onVoucherClose} className='btn btn-block btn-danger'>
          Close Voucher
        </button>
      )}
    </div>
  )
}

export default Voucher
