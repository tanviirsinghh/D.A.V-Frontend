"use client"

import { useState } from "react"
import { Calendar, CreditCard, Package } from "lucide-react"
const IconFileText = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;

export default function OrderHistory() {
    const [orders, setOrders] = useState([
        {
            id: 1,
            clientName: "Alice Johnson",
            completionDate: "2023-05-20",
            orderDate: "2023-05-15",
            paymentMethod: "Cash",
            paidAmount: 1500.00,
            ordersDelivered: 5
        },
        {
            id: 2,
            clientName: "Bob Smith",
            completionDate: "2023-05-18",
            orderDate: "2023-05-10",
            paymentMethod: "UPI",
            paidAmount: 2200.50,
            ordersDelivered: 8
        },
        {
            id: 3,
            clientName: "Charlie Brown",
            completionDate: "2023-05-22",
            orderDate: "2023-05-17",
            paymentMethod: "Bank Transfer",
            paidAmount: 1800.75,
            ordersDelivered: 3
        }
    ])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order History</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Placed</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Completed</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                <th className="px-6 py-3 text-center  text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders Delivered</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{order.clientName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                            <div className="text-sm text-gray-900">{order.orderDate}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                            <div className="text-sm text-gray-900">{order.completionDate}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                                            <div className="text-sm text-gray-900">{order.paymentMethod}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">₹{order.paidAmount.toFixed(2)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        <div className="">
                                            <IconFileText />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Package className="h-5 w-5 text-gray-400 mr-2" />
                                            <div className="text-sm text-gray-900">{order.ordersDelivered}</div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}