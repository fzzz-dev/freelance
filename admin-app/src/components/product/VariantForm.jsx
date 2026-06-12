// src/components/product/VariantForm.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'

const VariantForm = ({ variants = [], onVariantsChange }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [newVariant, setNewVariant] = useState({
    type: '',
    values: []
  })
  const [valueInput, setValueInput] = useState('')

  const addVariant = () => {
    if (newVariant.type && newVariant.values.length > 0) {
      onVariantsChange([...variants, newVariant])
      setNewVariant({ type: '', values: [] })
      setShowAddModal(false)
    }
  }

  const removeVariant = (index) => {
    const newVariants = [...variants]
    newVariants.splice(index, 1)
    onVariantsChange(newVariants)
  }

  const addValue = () => {
    if (valueInput && !newVariant.values.includes(valueInput)) {
      setNewVariant({
        ...newVariant,
        values: [...newVariant.values, valueInput]
      })
      setValueInput('')
    }
  }

  const removeValue = (value) => {
    setNewVariant({
      ...newVariant,
      values: newVariant.values.filter(v => v !== value)
    })
  }

  return (
    <div className="space-y-4">
      {/* Existing Variants */}
      {variants.map((variant, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-semibold text-gray-800">{variant.type}</h4>
            <button
              onClick={() => removeVariant(index)}
              className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {variant.values.map((value, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Add Variant Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors flex items-center justify-center space-x-2"
      >
        <FiPlus />
        <span>Add Variant</span>
      </button>

      {/* Add Variant Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add Variant</h3>
                <button onClick={() => setShowAddModal(false)}>
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Variant Type</label>
                  <input
                    type="text"
                    value={newVariant.type}
                    onChange={(e) => setNewVariant({ ...newVariant, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="e.g., Color, Size, Material"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Variant Values</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={valueInput}
                      onChange={(e) => setValueInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addValue()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="e.g., Red, XL, Cotton"
                    />
                    <button
                      onClick={addValue}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newVariant.values.map((value, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center space-x-1"
                      >
                        <span>{value}</span>
                        <button onClick={() => removeValue(value)}>
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addVariant}
                    disabled={!newVariant.type || newVariant.values.length === 0}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                  >
                    Add Variant
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VariantForm