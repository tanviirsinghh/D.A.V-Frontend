import  { useState } from 'react';
import { Pencil, Check, X, Camera } from 'lucide-react';

export default function UserInfo(){
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        role: 'Software Developer',
        department: 'Engineering',
        location: 'New York, NY',
        photo: '/placeholder-user.jpg'
      });
    
      const [editingField, setEditingField] = useState(null);
      const [tempValue, setTempValue] = useState('');
    
      const handleEdit = (field) => {
        setEditingField(field);
        setTempValue(userData[field]);
      };
    
      const handleCancel = () => {
        setEditingField(null);
        setTempValue('');
      };
    
      const handleSave = (field) => {
        setUserData({ ...userData, [field]: tempValue });
        setEditingField(null);
        setTempValue('');
      };
    
      const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUserData({ ...userData, photo: reader.result });
          };
          reader.readAsDataURL(file);
        }
      };
    
      return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            <div className="relative w-40 h-40 mb-4 md:mb-0 md:mr-8">
              <img
                src={userData.photo}
                alt="Profile photo"
                className="w-full h-full object-cover rounded-full"
              />
              <label htmlFor="photo" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition duration-300">
                <Camera size={20} />
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{userData.name}</h1>
              <p className="text-xl text-gray-600 mb-2">{userData.role}</p>
              <p className="text-md text-gray-500 mb-4">{userData.department} • {userData.location}</p>
              <label htmlFor="photo" className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition duration-300 inline-flex items-center">
                <Camera size={20} className="mr-2" />
                Upload New Photo
              </label>
            </div>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(userData).map(([key, value]) => {
              if (key === 'photo' || key === 'role') return null;
              return (
                <div key={key} className="bg-gray-50 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize">{key}</h2>
                    {editingField !== key && (
                      <button
                        onClick={() => handleEdit(key)}
                        className="text-indigo-600 hover:text-indigo-800 transition duration-300"
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                  </div>
                  {editingField === key ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-grow mr-2 p-2 border rounded"
                      />
                      <button
                        onClick={() => handleSave(key)}
                        className="text-green-600 hover:text-green-800 mr-2"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-600">{value}</p>
                  )}
                </div>
              );
            })}
          </div>
    
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Role Information</h2>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Current Role:</span> {userData.role}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Department:</span> {userData.department}</p>
            <p className="text-gray-600"><span className="font-semibold">Location:</span> {userData.location}</p>
          </div>
    
          <div className="mt-8 text-center">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">
              Save All Changes
            </button>
          </div>
        </div>
      );
};

