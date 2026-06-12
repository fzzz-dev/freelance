// src/context/FilterContext.jsx
import React, { createContext, useState, useContext } from 'react'

const FilterContext = createContext()

export const useFilters = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider')
  }
  return context
}

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: null,
    priceRange: [0, 1000],
    rating: 0,
    sortBy: 'relevance',
    inStock: false,
    searchQuery: ''
  })

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: null,
      priceRange: [0, 1000],
      rating: 0,
      sortBy: 'relevance',
      inStock: false,
      searchQuery: ''
    })
  }

  return (
    <FilterContext.Provider value={{ filters, updateFilter, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}