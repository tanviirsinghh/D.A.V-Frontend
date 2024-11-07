import React, { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';

// Sample user data
const initialUsers = [
    { id: 1, name: 'Rahul', occupation: 'Manager' },
    { id: 2, name: 'Manish', occupation: 'Admin' },
    { id: 3, name: 'Tanvir', occupation: 'Block Incharge' },
    { id: 4, name: 'Vishal', occupation: 'Manufacturing Department' },
];

export default function UserListing() {
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleUpdate = (user) => {
        setEditingUser(user);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
        setEditingUser(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingUser({ ...editingUser, [name]: value });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">User Management</h1>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {editingUser && editingUser.id === user.id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editingUser.name}
                                                onChange={handleChange}
                                                className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            user.name
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {editingUser && editingUser.id === user.id ? (
                                            <select
                                                name="occupation"
                                                value={editingUser.occupation}
                                                onChange={handleChange}
                                                className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="Manager">Manager</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Block Incharge">Block Incharge</option>
                                                <option value="Manufacturing Department">Manufacturing Department</option>
                                            </select>
                                        ) : (
                                            user.occupation
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {editingUser && editingUser.id === user.id ? (
                                            <button onClick={handleSave} className="text-green-600 hover:text-green-900 mr-4">
                                                Save
                                            </button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleUpdate(user)} className="text-blue-600 hover:text-blue-900 mr-4">
                                                    <Edit2 className="h-5 w-5" />
                                                </button>
                                                <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}