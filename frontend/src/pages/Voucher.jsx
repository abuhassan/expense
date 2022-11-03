import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {
  getVoucher,
  reset,
  closeVoucher,
} from '../features/vouchers/voucherSlice'
import {
  getNotes,
  createNote,
  reset as notesReset,
} from '../features/notes/noteSlice'
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

  const { voucher, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.vouchers
  )

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
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
    dispatch(getNotes(voucherId))
    // eslint-disable-next-line
  }, [isError, message, voucherId])

  // Close voucher
  const onVoucherClose = () => {
    dispatch(closeVoucher(voucherId))
    toast.success('Voucher Closed')
    navigate('/vouchers')
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, voucherId }))
    closeModal()
  }

  // Open/Close Modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (isLoading || notesIsLoading) {
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

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {voucher.status !== 'closed' && (
        <button onClick={onVoucherClose} className='btn btn-block btn-danger'>
          Close Voucher
        </button>
      )}
    </div>
  )
}

export default Voucher
