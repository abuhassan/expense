import axios from 'axios'

const API_URL = '/api/vouchers/'

// Get voucher notes
const getNotes = async (voucherId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + voucherId + '/notes', config)

  return response.data
}

// Create voucher note
const createNote = async (noteText, voucherId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    API_URL + voucherId + '/notes',
    {
      text: noteText,
    },
    config
  )

  return response.data
}

const noteService = {
  getNotes,
  createNote,
}
export default noteService
