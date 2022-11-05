import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getVoucher, closeVoucher } from '../features/vouchers/voucherSlice'
import { getNotes, createNote } from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Voucher() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { voucher } = useSelector((state) => state.vouchers)

  const { notes } = useSelector((state) => state.notes)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { voucherId } = useParams()

  useEffect(() => {
    dispatch(getVoucher(voucherId)).unwrap().catch(toast.error)

    dispatch(getNotes(voucherId)).unwrap().catch(toast.error)
    // eslint-disable-next-line
  }, [voucherId, dispatch])

  // Close voucher
  const onVoucherClose = () => {
    dispatch(closeVoucher(voucherId))
      .unwrap()
      .then(() => {
        toast.success('Voucher Closed')
        navigate('/vouchers')
      })
      .catch(toast.error)
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, voucherId }))
      .unwrap()
      .then(() => {
        setNoteText('')
        closeModal()
      })
      .catch(toast.error)
  }

  // Open/Close Modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (!voucher) {
    return <Spinner />
  }

  return (
    <div className='voucher-page'>
      <header className='voucher-header'>
        <BackButton url='/vouchers' />
        <h2>
          Voucher ID: {voucher._Id}
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
        <h2>Notes</h2>
      </header>

      {voucher.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {voucher.status !== 'closed' && (
        <button onClick={onVoucherClose} className='btn btn-block btn-danger'>
          Close Voucher
        </button>
      )}
    </div>
  )
}

export default Voucher
