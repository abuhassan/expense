import { Link } from 'react-router-dom'

function VoucherItem({ voucher }) {
  return (
    <div className='voucher'>
      <div>{new Date(voucher.createdAt).toLocaleString('en-US')}</div>
      <div>{voucher.voucherType}</div>
      <div className={`status status-${voucher.status}`}>{voucher.status}</div>
      <Link to={`/voucher/${voucher._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default VoucherItem
