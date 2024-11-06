import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Sample data for medicines
const medicines = [
    { id: 1, name: 'Ashwagandha', image: '/placeholder.svg?height=200&width=200', units: '60 capsules', description: 'Helps reduce stress and anxiety' },
    { id: 2, name: 'Triphala', image: '/placeholder.svg?height=200&width=200', units: '100 tablets', description: 'Supports digestive health' },
    { id: 3, name: 'Brahmi', image: '/placeholder.svg?height=200&width=200', units: '50 ml', description: 'Enhances memory and cognitive function' },
    { id: 4, name: 'Turmeric', image: '/placeholder.svg?height=200&width=200', units: '90 capsules', description: 'Powerful anti-inflammatory and antioxidant' },
    { id: 5, name: 'Amla', image: '/placeholder.svg?height=200&width=200', units: '120 tablets', description: 'Rich in Vitamin C, boosts immunity' },
    { id: 6, name: 'Shatavari', image: '/placeholder.svg?height=200&width=200', units: '60 capsules', description: 'Supports female reproductive health' },
];

const MedicineCard = ({ medicine }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={medicine.image} alt={medicine.name} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{medicine.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Units: {medicine.units}</p>
            <p className="text-sm text-gray-700">{medicine.description}</p>
        </div>
    </div>
);

export default function MedicineProductListing() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Ayurvedic Medicines</h1>

                {/* Search Bar */}
                <div className="mb-8 max-w-md mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search medicines..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Medicine Listing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMedicines.map(medicine => (
                        <MedicineCard key={medicine.id} medicine={medicine} />
                    ))}
                </div>

                {filteredMedicines.length === 0 && (
                    <p className="text-center text-gray-600 mt-8">No medicines found matching your search.</p>
                )}
            </div>
        </div>
    );
}