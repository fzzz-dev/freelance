// src/components/common/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiMic, FiX, FiClock, FiTrendingUp } from 'react-icons/fi'
import { searchService } from '../../services/api'
import useDebounce from '../../hooks/useDebounce'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [trending, setTrending] = useState([])
  const [recent, setRecent] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadTrending()
    loadRecent()
  }, [])

  useEffect(() => {
    if (debouncedQuery) {
      fetchSuggestions()
    } else {
      setSuggestions([])
    }
  }, [debouncedQuery])

  const fetchSuggestions = async () => {
    setIsLoading(true)
    try {
      const response = await searchService.getSuggestions(debouncedQuery)
      setSuggestions(response.data)
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadTrending = async () => {
    try {
      const response = await searchService.getTrendingSearches()
      setTrending(response.data)
    } catch (error) {
      console.error('Failed to load trending:', error)
    }
  }

  const loadRecent = async () => {
    try {
      const response = await searchService.getSearchHistory()
      setRecent(response.data)
    } catch (error) {
      console.error('Failed to load recent:', error)
    }
  }

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return
    await searchService.saveSearchHistory(searchQuery)
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    setShowSuggestions(false)
    setQuery('')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for products, brands, and more..."
          className="w-full px-5 py-3 pr-24 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 outline-none"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
            <FiMic className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleSearch(query)}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSuggestions && (query || trending.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-soft-lg overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : (
              <>
                {suggestions.length > 0 ? (
                  <div>
                    <div className="p-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-500">Suggestions</h3>
                    </div>
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSearch(suggestion.name)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <FiSearch className="w-4 h-4 text-gray-400" />
                        <span>{suggestion.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  query && (
                    <div className="p-4 text-center text-gray-500">
                      No results found for "{query}"
                    </div>
                  )
                )}

                {recent.length > 0 && !query && (
                  <div>
                    <div className="p-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-500 flex items-center space-x-2">
                        <FiClock className="w-4 h-4" />
                        <span>Recent Searches</span>
                      </h3>
                    </div>
                    {recent.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSearch(item.query)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span>{item.query}</span>
                        <FiX className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                )}

                {trending.length > 0 && !query && (
                  <div>
                    <div className="p-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-500 flex items-center space-x-2">
                        <FiTrendingUp className="w-4 h-4" />
                        <span>Trending Now</span>
                      </h3>
                    </div>
                    <div className="p-3">
                      <div className="flex flex-wrap gap-2">
                        {trending.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSearch(item.query)}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-primary-100 hover:text-primary-600 transition-colors"
                          >
                            {item.query}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar