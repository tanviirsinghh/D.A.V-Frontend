"use client"

import { useState } from "react"
import { Calendar, Truck, Hash, MapPin, DollarSign, CheckCircle, Clock } from "lucide-react"

export default function AyurvedicMedicineOrders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      clientName: "Wellness Ayurveda Center",
      orderDate: "2023-05-25",
      dueDate: "2023-06-10",
      batchNumber: "BATCH-789",
      address: "123 Herbal Lane, Green City, Nature State 54321",
      totalAmount: 2750.00,
      status: "pending",
      pendingReason: "",
      medicines: [
        { id: 1, name: "Ashwagandha Powder", units: 100, unitType: "bottles", pricePerUnit: 15.00 },
        { id: 2, name: "Triphala Tablets", units: 200, unitType: "boxes", pricePerUnit: 8.50 },
      ]
    },
    {
      id: "ORD-67890",
      clientName: "Holistic Herbs Ltd.",
      orderDate: "2023-05-26",
      dueDate: "2023-06-15",
      batchNumber: "BATCH-101",
      address: "456 Ayurveda Street, Healing Town, Wellness County 98765",
      totalAmount: 3200.00,
      status: "completed",
      pendingReason: "",
      medicines: [
        { id: 3, name: "Brahmi Syrup", units: 150, unitType: "bottles", pricePerUnit: 12.00 },
        { id: 4, name: "Chyawanprash", units: 100, unitType: "jars", pricePerUnit: 20.00 },
      ]
    },
    {
      id: "ORD-24680",
      clientName: "Natural Remedies Co.",
      orderDate: "2023-05-27",
      dueDate: "2023-06-20",
      batchNumber: "BATCH-202",
      address: "789 Herbal Avenue, Greenleaf City, Botanical State 13579",
      totalAmount: 1800.00,
      status: "pending",
      pendingReason: "",
      medicines: [
        { id: 5, name: "Tulsi Capsules", units: 300, unitType: "bottles", pricePerUnit: 6.00 },
      ]
    }
  ])

  const [filter, setFilter] = useState("pending")

  const handleComplete = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "completed" } : order
    ))
  }

  const handlePendingReasonChange = (orderId, reason) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, pendingReason: reason } : order
    ))
  }

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true
    return order.status === filter
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ayurvedic Medicine Orders</h1>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          All Orders
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-md ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Completed Orders
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-md ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Pending Orders
        </button>
      </div>
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h2 className="text-xl text-left font-semibold mb-2">{order.clientName}</h2>
                  <p className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {order.address}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p className="flex items-center text-gray-600 md:justify-end">
                    <Calendar className="h-4 w-4 mr-2" />
                    Order Date: {order.orderDate}
                  </p>
                  <p className="flex items-center text-gray-600 md:justify-end">
                    <Truck className="h-4 w-4 mr-2" />
                    Due Date: {order.dueDate}
                  </p>
                  <p className="flex items-center text-gray-600 md:justify-end">
                    <Hash className="h-4 w-4 mr-2" />
                    Batch Number: {order.batchNumber}
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price per Unit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.medicines.map((medicine) => (
                      <tr key={medicine.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{medicine.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.units}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.unitType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${medicine.pricePerUnit.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(medicine.units * medicine.pricePerUnit).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-lg font-semibold mr-4">
                    Status: 
                    <span className={`ml-2 ${order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </p>
                  {order.status === 'pending' && (
                    <select
                      className="form-select mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={order.pendingReason}
                      onChange={(e) => handlePendingReasonChange(order.id, e.target.value)}
                    >
                      <option value="">Select reason</option>
                      <option value="less_quantity">Less Quantity</option>
                      <option value="quality_issue">Quality Issue</option>
                      <option value="shipping_delay">Shipping Delay</option>
                    </select>
                  )}
                </div>
                <div className="flex items-center">
                  <p className="text-xl font-semibold flex items-center mr-4">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Total: ${order.totalAmount.toFixed(2)}
                  </p>
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleComplete(order.id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}