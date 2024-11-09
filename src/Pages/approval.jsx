"use client"

import { useState } from "react"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function UserApprovalList() {
    const [users, setUsers] = useState([
        { id: 1, name: "Rahul", date: "2023-05-15", occupation: "Manager", status: "pending" },
        { id: 1, name: "Nisha", date: "2023-05-15", occupation: "Pharmacy Manager", status: "pending" },
        { id: 2, name: "Dinesh", date: "2023-05-16", occupation: "Block Incharge", status: "pending" },
        { id: 3, name: "Shami", date: "2023-05-17", occupation: "Prduct Incharge", status: "pending" },
        { id: 4, name: "Girls", date: "2023-05-18", occupation: "Manufacturing Department", status: "pending" },
    ])

    const [confirmDeny, setConfirmDeny] = useState(null)

    const handleApprove = (id) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, status: "approved" } : user
        ))
    }

    const handleDeny = (id) => {
        setConfirmDeny(id)
    }

    const confirmDenyAction = () => {
        setUsers(users.map(user =>
            user.id === confirmDeny ? { ...user, status: "denied" } : user
        ))
        setConfirmDeny(null)
    }

    const cancelDeny = () => {
        setConfirmDeny(null)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Approval List</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.occupation}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === "approved" ? "bg-green-100 text-green-800" :
                                        user.status === "denied" ? "bg-red-100 text-red-800" :
                                            "bg-yellow-100 text-yellow-800"
                                        }`}>
                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {user.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(user.id)}
                                                className="text-green-600 hover:text-green-900 mr-2"
                                            >
                                                <CheckCircle className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeny(user.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <XCircle className="h-5 w-5" />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {confirmDeny && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Confirm Denial</h2>
                        <p className="mb-4">Are you sure you want to deny this request?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={cancelDeny}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDenyAction}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirm Deny
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}