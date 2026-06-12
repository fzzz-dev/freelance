// src/components/checkout/AddressStep.jsx
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../context/AuthContext'

const AddressStep = ({ onSubmit }) => {
  const { user } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  })

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            {...register('phone', { required: 'Phone number is required' })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <input
            {...register('address', { required: 'Address is required' })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              {...register('city', { required: 'City is required' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">State</label>
            <input
              {...register('state', { required: 'State is required' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ZIP Code</label>
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
          </select>
        </div>

        <button type="submit" className="btn-primary w-full">
          Continue to Payment
        </button>
      </form>
    </div>
  )
}

export default AddressStep