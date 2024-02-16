import axios from 'axios'

const url = '/rank'

export const getRankById = async (setRank, setFormData, id) => {
  const rank = await axios.get(`${url}/${id}`)

  if (rank.status === 200) {
    setRank(rank.data.data)
    setFormData(rank.data.data)
  } else {
    alert('Unable to get rank')
    setRank(undefined)
  }
}

export const deleteRank = async (navigate, id) => {
  const rank = await axios.delete(`${url}/${id}`)

  if (rank.status === 200) {
    navigate('/')
  } else {
    alert('Unable to delete rank')
  }
}

export const editRank = async (setRank, id, formData, setFormData) => {
  const updatedRank = await axios.put(`${url}/${id}`, formData)

  if (updatedRank.status === 200) {
    setRank(updatedRank.data.data)
  } else {
    alert('Unable to update rank')
  }
}

export const createRank = async (navigate, formData) => {
  const rank = await axios.post(`${url}`, formData)

  if (rank.status === 200) {
    navigate('/')
  } else {
    alert('Unable to create rank')
  }
}
