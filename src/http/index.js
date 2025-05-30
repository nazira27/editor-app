import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const pageAPI = {
  getAll() {
    return axiosInstance.get('/pages')
  },

  getById(id) {
    return axiosInstance.get(`/pages/${id}`)
  },

  getBySlug(slug) {
    return axiosInstance.get('/pages', { params: { slug } })
  },

  create(data) {
    return axiosInstance.post('/pages', data)
  },

  update(id, data) {
    return axiosInstance.put(`/pages/${id}`, data)
  },

  delete(id) {
    return axiosInstance.delete(`/pages/${id}`)
  }
}

export default axiosInstance 