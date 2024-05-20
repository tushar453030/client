import axios from 'axios'

const BASE_URL =
  'https://server-vercel-psk6-tzzq-99lx87x6b-tushar453030s-projects.vercel.app/api/'

const userStorageData = JSON.parse(localStorage.getItem('persist:root'))
const TOKEN =
  userStorageData && userStorageData.user && userStorageData.user.currentUser
    ? userStorageData.user.currentUser.accessToken
    : ''

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
})
