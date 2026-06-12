// src/components/user/AddressForm.jsx
import React from 'react'
import { useForm } from 'react-hook-form'

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      fullName: '',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      isDefault: false
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            {...register('fullName', { required: 'Full name is required' })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number *</label>
          <input
            {...register('phone', { required: 'Phone number is required' })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Address Line 1 *</label>
        <input
          {...register('address', { required: 'Address is required' })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          placeholder="Street address, P.O. box"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Apartment, Suite, etc. (Optional)</label>
        <input
          {...register('apartment')}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2">City *</label>
          <input
            {...register('city', { required: 'City is required' })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">State *</label>
          <input
            {...register('state', { required: 'State is required' })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ZIP Code *</label>
          <input
            {...register('zipCode', { required: 'ZIP code is required' })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Country</label>
        <select
          {...register('country')}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="UK">United Kingdom</option>
          <option value="AU">Australia</option>
        </select>
      </div>

      <label className="flex items-center space-x-2">
        <input type="checkbox" {...register('isDefault')} />
        <span className="text-sm text-gray-700">Set as default address</span>
      </label>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Save Address
        </button>
      </div>
    </form>
  )
}

export default AddressForm