// src/services/searchService.js
import api from './api'

export const searchService = {
  search: (query) => api.get('/search', { params: query }),
  getSuggestions: (query) => api.get('/search/suggestions', { params: { q: query } }),
  getTrendingSearches: () => api.get('/search/trending'),
  saveSearchHistory: (query) => api.post('/search/history', { query }),
  getSearchHistory: () => api.get('/search/history'),
  clearSearchHistory: () => api.delete('/search/history'),
}

export default searchService