import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createVoucher, reset } from '../features/vouchers/voucherSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewVoucher() {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.vouchers
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [voucherType, setVoucherType] = useState('')
  const [description, setDescription] = useState('')
  const [account, setAccount] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/vouchers')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createVoucher({ voucherType, description, account }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Voucher</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='voucherType'>Voucher type</label>
            <select
              name='voucherType'
              id='voucherType'
              value={voucherType}
              onChange={(e) => setVoucherType(e.target.value)}>
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the voucher</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <label htmlFor='account'>Account to be recorded under</label>
            <textarea
              name='account'
              id='account'
              className='form-control'
              placeholder='Account'
              value={account}
              onChange={(e) => setAccount(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewVoucher
