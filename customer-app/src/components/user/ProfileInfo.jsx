// src/components/user/ProfileInfo.jsx
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../context/AuthContext'
import { FiEdit2, FiSave, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

const ProfileInfo = () => {
  const { user, updateProfile } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || ''
    }
  })

  const onSubmit = async (data) => {
    try {
      await updateProfile(data)
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  if (!isEditing) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
          >
            <FiEdit2 />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <p className="text-lg font-medium text-gray-800">{user?.name || 'Not set'}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Email Address</label>
            <p className="text-lg font-medium text-gray-800">{user?.email || 'Not set'}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Phone Number</label>
            <p className="text-lg font-medium text-gray-800">{user?.phone || 'Not set'}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Bio</label>
            <p className="text-gray-600">{user?.bio || 'No bio added yet'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Profile</h2>
        <button
          onClick={() => setIsEditing(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            {...register('phone')}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            {...register('bio')}
            rows="4"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <FiSave />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileInfo