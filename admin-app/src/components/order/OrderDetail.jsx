import React from 'react'
import { FiPackage, FiTruck, FiCheckCircle, FiMapPin, FiCreditCard, FiUser } from 'react-icons/fi'

const OrderDetail = ({ order }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <FiCheckCircle className="w-5 h-5 text-green-600" />
      case 'shipped': return <FiTruck className="w-5 h-5 text-blue-600" />
      default: return <FiPackage className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Order Info */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">Order #{order.id}</h3>
            <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {getStatusIcon(order.status)}
            <span className="capitalize">{order.status?.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2 flex items-center"><FiUser className="mr-2" /> Customer Information</h4>
            <p className="text-sm">{order.customer?.name}</p>
            <p className="text-sm text-gray-500">{order.customer?.email}</p>
            <p className="text-sm text-gray-500">{order.customer?.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center"><FiMapPin className="mr-2" /> Shipping Address</h4>
            <p className="text-sm">{order.shippingAddress?.fullName}</p>
            <p className="text-sm text-gray-500">{order.shippingAddress?.address}</p>
            <p className="text-sm text-gray-500">{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
          </div>
        </div>

        {/* Order Items */}
        <h4 className="font-semibold mb-3">Order Items</h4>
        <div className="space-y-3">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${order.subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'Free' : `$${order.shipping?.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${order.tax?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span className="text-primary-600">${order.total?.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="font-semibold mb-2 flex items-center"><FiCreditCard className="mr-2" /> Payment Method</h4>
          <p className="text-sm capitalize">{order.paymentMethod?.method}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
