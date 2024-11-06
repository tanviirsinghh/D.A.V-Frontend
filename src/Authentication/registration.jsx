import React, { useState } from 'react';

const InputField = ({ label, type, id, value, onChange, required }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

const SelectField = ({ label, id, value, onChange, required, options }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="">Select an occupation</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        occupation: '',
        date: '',
        address: '',
        password: '',
        conformPassword: ''
    });

    const occupations = [
        'Student',
        'Teacher',
        'Doctor',
        'Engineer',
        'Businessman',
        'Pharmacist',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({
            username: '',
            email: '',
            address: '',
            phoneNumber: '',
            occupation: '',
            date: '',
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create new account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <InputField
                            label="Username"
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                        <InputField
                            label="Email address"
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <InputField
                            label="Phone Number"
                            type="tel"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />

                        <InputField
                            label="Address"
                            type="text"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                        <SelectField
                            label="Occupation"
                            id="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            required
                            options={occupations}
                        />

                        <InputField
                            label="Date"
                            type="date"
                            id="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />

                        <InputField
                            label="Password"
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Conform Password"
                            type="conformpassword"
                            id="password"
                            value={formData.conformPassword}
                            onChange={handleChange}
                            required
                        />

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}