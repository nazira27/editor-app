import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://localhost:3000/pages'

export default new Vuex.Store({
  state: {
    pages: [],
    currentPage: null
  },
  mutations: {
    SET_PAGES(state, pages) {
      state.pages = pages
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page
    },
    ADD_PAGE(state, page) {
      state.pages.push(page)
    },
    UPDATE_PAGE(state, updatedPage) {
      const index = state.pages.findIndex(p => p.id === updatedPage.id)
      if (index !== -1) {
        state.pages.splice(index, 1, updatedPage)
      }
    },
    DELETE_PAGE(state, pageId) {
      state.pages = state.pages.filter(p => p.id !== pageId)
    }
  },
  actions: {
    async fetchPages({ commit }) {
      try {
        const response = await axios.get(API_URL)
        commit('SET_PAGES', response.data)
      } catch (error) {
        console.error('Error fetching pages:', error)
        throw error
      }
    },
    async fetchPageById({ state, commit }, id) {
      try {
        // First check in our store
        let page = state.pages.find(p => p.id === id)
        if (page) {
          commit('SET_CURRENT_PAGE', page)
          return page
        }

        // If not found in store, fetch from API
        const response = await axios.get(`${API_URL}/${id}`)
        page = response.data
        if (page) {
          commit('SET_CURRENT_PAGE', page)
        }
        return page
      } catch (error) {
        console.error('Error fetching page:', error)
        throw error
      }
    },
    async fetchPageBySlug({ state, commit }, slug) {
      try {
        // First check in our store
        let page = state.pages.find(p => p.slug === slug)
        if (page) {
          commit('SET_CURRENT_PAGE', page)
          return page
        }

        // If not found in store, fetch from API
        const response = await axios.get(`${API_URL}?slug=${slug}`)
        page = response.data[0]
        if (page) {
          commit('SET_CURRENT_PAGE', page)
        }
        return page
      } catch (error) {
        console.error('Error fetching page:', error)
        throw error
      }
    },
    async createPage({ commit }, pageData) {
      try {
        const data = {
          ...pageData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        const response = await axios.post(API_URL, data)
        commit('ADD_PAGE', response.data)
        return response.data
      } catch (error) {
        console.error('Error creating page:', error)
        throw error
      }
    },
    async updatePage({ commit }, { id, pageData }) {
      try {
        const data = {
          ...pageData,
          updatedAt: new Date().toISOString()
        }
        const response = await axios.put(`${API_URL}/${id}`, data)
        commit('UPDATE_PAGE', response.data)
        return response.data
      } catch (error) {
        console.error('Error updating page:', error)
        throw error
      }
    },
    async deletePage({ commit }, id) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        commit('DELETE_PAGE', id)
      } catch (error) {
        console.error('Error deleting page:', error)
        throw error
      }
    }
  },
  getters: {
    getPageBySlug: (state) => (slug) => {
      return state.pages.find(page => page.slug === slug)
    },
    getHomePage: (state) => {
      return state.pages.find(page => !page.slug || page.slug === '')
    }
  }
}) 