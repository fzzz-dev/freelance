import React from 'react'
import { Link } from 'react-router-dom'
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'

const ProductList = ({ products, onDelete, onStatusChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <img src={product.images?.[0] || '/api/placeholder/40/40'} alt={product.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div>
                  <span className="font-medium">${product.price}</span>
                  {product.discount && <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onStatusChange(product.id, product.status === 'published' ? 'draft' : 'published')}
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {product.status === 'published' ? 'Published' : 'Draft'}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  <Link to={`/products/${product.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <FiEdit2 />
                  </Link>
                  <button onClick={() => onDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <FiTrash2 />
                  </button>
                  <Link to={`/product/${product.id}`} target="_blank" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <FiEye />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
