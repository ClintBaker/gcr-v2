import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

// create axios instance
const userAxios = axios.create()
userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    ranks: [],
    err: '',
  }

  // userState
  const [userState, setUserState] = useState(initState)
  const [rank, setRank] = useState('loading')
  const [courses, setCourses] = useState([])

  //   functions
  async function signup(credentials) {
    try {
      // sign up via api
      const res = await axios.post('/app/auth/signup', credentials)
      //   store user data and token in context
      const { user, token } = res.data
      setUserState((prevUserState) => ({ ...prevUserState, token, user }))
      //   store user and token in localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.log(e)
      alert('ERROR WITH SIGNUP')
    }
  }

  async function signin(credentials) {
    try {
      const res = await axios.post('/app/auth/signin', credentials)
      // store user data and token in context
      const { user, token } = res.data
      setUserState((prevUserState) => ({ ...prevUserState, token, user }))
      //   store user and token in local storage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.log(e)
      alert('ERROR WITH SIGNIN')
    }
  }

  async function logout() {
    // reset user state
    setUserState({
      user: {},
      token: '',
      ranks: [],
    })
    // reset localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  async function getRanks() {
    const ranks = await userAxios.get('/app/api/rank')
    setUserState((prevUserState) => ({
      ...prevUserState,
      ranks: ranks.data.ranks,
    }))
  }

  async function getOneRank(rankId) {
    // get rank
    const rank = await userAxios.get(`/app/api/rank/${rankId}`)
    // set state
    setRank(rank.data.rank)
  }

  async function getCourses() {
    const courses = await userAxios.get(`/app/api/course`)
    setCourses(courses.data.courses)
  }

  async function createRank(formData) {
    const rank = await userAxios.post(`/app/api/rank`, formData)

    if (rank.status !== 200) {
      console.log('ERROR')
    }
  }

  async function editRank(rankId, formData) {
    const data = {
      greenQuality: formData.greenQuality,
      proShop: formData.proShop,
      weather: formData.weather,
      difficulty: formData.difficulty,
      views: formData.views,
      service: formData.service,
    }
    const editedRank = await userAxios.put(`/app/api/rank/${rankId}`, data)
    setRank(editedRank.data.rank)
  }

  async function deleteRank(rankId) {
    const deletedRank = await userAxios.delete(`app/api/rank/${rankId}`)
    console.log('DELETED RANK')
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        signin,
        logout,
        getRanks,
        getOneRank,
        rank,
        getCourses,
        courses,
        createRank,
        editRank,
        deleteRank,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
