import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { productService, categoryService } from '../services/api'
import ImageUpload from '../components/product/ImageUpload'
import VariantForm from '../components/product/VariantForm'

const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState([])
  const [variants, setVariants] = useState([])
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  useEffect(() => {
    fetchCategories()
    if (id) fetchProduct()
  }, [id])

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories()
      setCategories(response.data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const fetchProduct = async () => {
    try {
      const response = await productService.getProduct(id)
      const product = response.data
      setValue('title', product.title)
      setValue('description', product.description)
      setValue('brand', product.brand)
      setValue('sku', product.sku)
      setValue('price', product.price)
      setValue('discount', product.discount)
      setValue('stock', product.stock)
      setValue('categoryId', product.categoryId)
      setImages(product.images || [])
      setVariants(product.variants || [])
    } catch (error) {
      toast.error('Failed to load product')
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const productData = { ...data, images, variants }
      if (id) {
        await productService.updateProduct(id, productData)
        toast.success('Product updated successfully')
      } else {
        await productService.createProduct(productData)
        toast.success('Product created successfully')
      }
      navigate('/products')
    } catch (error) {
      toast.error('Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDraft = async () => {
    setLoading(true)
    try {
      const formData = { title: '', description: '', price: 0, stock: 0, ...Object.fromEntries(new FormData(document.querySelector('form'))) }
      const productData = { ...formData, images, variants, status: 'draft' }
      await productService.createProduct(productData)
      toast.success('Draft saved successfully')
      navigate('/products')
    } catch (error) {
      toast.error('Failed to save draft')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Title *</label>
              <input {...register('title', { required: 'Title is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea {...register('description')} rows="5" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-2">Brand</label><input {...register('brand')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" /></div>
              <div><label className="block text-sm font-medium mb-2">SKU *</label><input {...register('sku', { required: 'SKU is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" /></div>
            </div>
            <div><label className="block text-sm font-medium mb-2">Category</label><select {...register('categoryId')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"><option value="">Select Category</option>{categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}</select></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6"><h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2><div className="grid grid-cols-3 gap-4"><div><label className="block text-sm font-medium mb-2">Price ($)</label><input type="number" step="0.01" {...register('price', { required: 'Price is required', min: 0 })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" /></div><div><label className="block text-sm font-medium mb-2">Discount ($)</label><input type="number" step="0.01" {...register('discount')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" /></div><div><label className="block text-sm font-medium mb-2">Stock Quantity</label><input type="number" {...register('stock', { required: 'Stock is required', min: 0 })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" /></div></div></div>
        <div className="bg-white rounded-xl shadow-soft p-6"><h2 className="text-lg font-semibold mb-4">Product Images</h2><ImageUpload images={images} onImagesChange={setImages} /></div>
        <div className="bg-white rounded-xl shadow-soft p-6"><h2 className="text-lg font-semibold mb-4">Product Variants</h2><VariantForm variants={variants} onVariantsChange={setVariants} /></div>
        <div className="flex justify-end space-x-4"><button type="button" onClick={handleSaveDraft} disabled={loading} className="px-6 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50">Save Draft</button><button type="submit" disabled={loading} className="btn-primary">{loading ? 'Saving...' : id ? 'Update Product' : 'Publish Product'}</button></div>
      </form>
    </motion.div>
  )
}

export default ProductForm
