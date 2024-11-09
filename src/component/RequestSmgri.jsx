import { useState, useEffect } from 'react';

// Sample data
const medicineList = [
  { id: 1, name: 'Aspirin', price: 5.99 },
  { id: 2, name: 'Ibuprofen', price: 7.99 },
  { id: 3, name: 'Paracetamol', price: 4.99 },
  { id: 4, name: 'Amoxicillin', price: 12.99 },
  { id: 5, name: 'Omeprazole', price: 15.99 },
  { id: 6, name: 'Lisinopril', price: 9.99 },
  { id: 7, name: 'Metformin', price: 8.99 },
  { id: 8, name: 'Amlodipine', price: 11.99 },
  { id: 9, name: 'Simvastatin', price: 13.99 },
  { id: 10, name: 'Levothyroxine', price: 10.99 },
];

const clientList = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 4, name: 'Bob Williams', email: 'bob@example.com' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com' },
];

export default function RequestSmgri() {
  const [BatchNumber, setBatchNumber] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [products, setProducts] = useState([]);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState(medicineList);

  useEffect(() => {
    const results = medicineList.filter(medicine =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedicines(results);
  }, [searchTerm]);

  useEffect(() => {
    setOrderDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleAddProducts = () => {
    setShowMedicineModal(true);
  };

  const handleProductSelection = (product) => {
    setSelectedProducts(prev => 
      prev.includes(product) 
        ? prev.filter(p => p !== product) 
        : [...prev, product]
    );
  };

  const handleConfirmSelection = () => {
    const newProducts = selectedProducts.map(product => ({
      ...product,
      quantity: 1,
      unit: 'kg'
    }));
    setProducts([...products, ...newProducts]);
    setSelectedProducts([]);
    setShowMedicineModal(false);
    setSearchTerm('');
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

//   const handleSelectClient = () => {
//     setShowClientModal(true);
//   };

  const handleClientSelection = (client) => {
    setBatchNumber(client.name);
    setClientEmail(client.email);
    setShowClientModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ BatchNumber, clientEmail, orderDate, products });
    alert('Order submitted successfully!');
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto p-6  shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Request SMGRI</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="BatchNumber" className="block text-sm font-medium text-gray-700">Batch Number</label>
            <div className="flex items-center">
              <input
                type="text"
                id="BatchNumber"
                value={BatchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className="flex-grow outline-4 h-10 mt-1 block w-full rounded-md bg-gray-100 shadow-xl focus:border-indigo-900 focus:ring focus:ring-indigo-900 focus:ring-opacity-50"
                required
              />
              {/* <button
                type="button"
                onClick={handleSelectClient}
                className="ml-2 px-8 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Select Client
              </button> */}
            </div>
          </div>
         
          <div className="space-y-2">
            <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
            <input
              type="date"
              id="orderDate"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          
        </div>

        {products.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
                          className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          min="1"
                          required
                        />
                        <select
                          value={product.unit}
                          onChange={(e) => handleProductChange(index, 'unit', e.target.value)}
                          className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="kg">kg</option>
                          <option value="litre">litre</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${(product.price * product.quantity).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Products button moved below the products table and above the total */}
        <div className="mt-6 flex ml-9">
          <button
            type="button"
            onClick={handleAddProducts}
            className="w-22 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Products
          </button>
        </div>

        {products.length > 0 && (
          <div className="mt-6 text-right">
            <span className="text-xl font-semibold">Total: ${calculateTotal()}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Request SMGRI
          </button>
        </div>
      </form>

      {showMedicineModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="medicine-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Select Products</h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="mt-4 max-h-60 overflow-y-auto">
                  {filteredMedicines.map(medicine => (
                    <div key={medicine.id} className="flex items-center justify-between mb-2 p-2 hover:bg-gray-100 rounded">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`medicine-${medicine.id}`}
                          checked={selectedProducts.includes(medicine)}
                          onChange={() => handleProductSelection(medicine)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`medicine-${medicine.id}`} className="ml-2 block text-sm text-gray-900">
                          {medicine.name}
                        </label>
                      </div>
                      <span className="text-sm text-gray-600">${medicine.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleConfirmSelection}
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showClientModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="client-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Select Client</h3>
              <div className="mt-2 px-7 py-3">
                <div className="max-h-60 overflow-y-auto">
                  {clientList.map(client => (
                    <div key={client.id} className="mb-2">
                      <button
                        onClick={() => handleClientSelection(client)}
                        className="w-full text-left px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







// import  { useState, useEffect } from 'react';

// // Sample data
// const medicineList = [
//   { id: 1, name: 'Aspirin', price: 5.99 },
//   { id: 2, name: 'Ibuprofen', price: 7.99 },
//   { id: 3, name: 'Paracetamol', price: 4.99 },
//   { id: 4, name: 'Amoxicillin', price: 12.99 },
//   { id: 5, name: 'Omeprazole', price: 15.99 },
//   { id: 6, name: 'Lisinopril', price: 9.99 },
//   { id: 7, name: 'Metformin', price: 8.99 },
//   { id: 8, name: 'Amlodipine', price: 11.99 },
//   { id: 9, name: 'Simvastatin', price: 13.99 },
//   { id: 10, name: 'Levothyroxine', price: 10.99 },
// ];

// const clientList = [
//   { id: 1, name: 'John Doe', email: 'john@example.com' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
//   { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
//   { id: 4, name: 'Bob Williams', email: 'bob@example.com' },
//   { id: 5, name: 'Charlie Brown', email: 'charlie@example.com' },
// ];

// export default function GenerateOrder(){
//   const [BatchNumber, setBatchNumber] = useState('');
//   const [clientEmail, setClientEmail] = useState('');
//   const [orderDate, setOrderDate] = useState('');
//   const [orderNumber, setOrderNumber] = useState('');
//   const [products, setProducts] = useState([]);
//   const [showMedicineModal, setShowMedicineModal] = useState(false);
//   const [showClientModal, setShowClientModal] = useState(false);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredMedicines, setFilteredMedicines] = useState(medicineList);

//   useEffect(() => {
//     const results = medicineList.filter(medicine =>
//       medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredMedicines(results);
//   }, [searchTerm]);

//   useEffect(() => {
//     // Generate a random order number
//     // setOrderNumber(`ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
//     // Set the current date
//     setOrderDate(new Date().toISOString().split('T')[0]);
//   }, []);

//   const handleAddProducts = () => {
//     setShowMedicineModal(true);
//   };

//   const handleProductSelection = (product) => {
//     setSelectedProducts(prev => 
//       prev.includes(product) 
//         ? prev.filter(p => p !== product) 
//         : [...prev, product]
//     );
//   };

//   const handleConfirmSelection = () => {
//     const newProducts = selectedProducts.map(product => ({
//       ...product,
//       quantity: 1,
//       unit: 'kg'
//     }));
//     setProducts([...products, ...newProducts]);
//     setSelectedProducts([]);
//     setShowMedicineModal(false);
//     setSearchTerm('');
//   };

//   const handleProductChange = (index, field, value) => {
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;
//     setProducts(updatedProducts);
//   };

//   const handleDeleteProduct = (index) => {
//     const updatedProducts = products.filter((_, i) => i !== index);
//     setProducts(updatedProducts);
//   };

//   const handleSelectClient = () => {
//     setShowClientModal(true);
//   };

//   const handleClientSelection = (client) => {
//     setBatchNumber(client.name);
//     setClientEmail(client.email);
//     setShowClientModal(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ BatchNumber, clientEmail, orderDate, orderNumber, products });
//     // Here you would typically send this data to your backend
//     alert('Order submitted successfully!');
//   };

//   const calculateTotal = () => {
//     return products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">New Order Form</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label htmlFor="BatchNumber" className="block text-sm font-medium text-gray-700">Client Name</label>
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 id="BatchNumber"
//                 value={BatchNumber}
//                 onChange={(e) => setBatchNumber(e.target.value)}
//                 className="flex-grow outline-4 mt-1 block w-full rounded-md bg-gray-100  shadow-xl focus:border-indigo-900 focus:ring focus:ring-indigo-900 focus:ring-opacity-50"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={handleSelectClient}
//                 className="ml-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Select Client
//               </button>
//             </div>
//           </div>
//           <div className="space-y-6">
//             <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">Client Email</label>
//             <input
//               type="email"
//               id="clientEmail"
//               value={clientEmail}
//               onChange={(e) => setClientEmail(e.target.value)}
//               className="flex-grow outline-4 mt-1 block w-full rounded-md bg-gray-100  shadow-xl focus:border-indigo-900 focus:ring focus:ring-indigo-900 focus:ring-opacity-50"
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
//             <input
//               type="date"
//               id="orderDate"
//               value={orderDate}
//               onChange={(e) => setOrderDate(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">Order Number</label>
//             <input
//               type="text"
//               id="orderNumber"
//               value={orderNumber}
//               onChange={(e) => setOrderNumber(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               required
//             />
              
//           </div>
//         </div>

//         <div className="mt-6">
//           <button
//             type="button"
//             onClick={handleAddProducts}
//             className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Add Products
//           </button>
//         </div>

//         {products.length > 0 && (
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {products.map((product, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center space-x-2">
//                         <input
//                           type="number"
//                           value={product.quantity}
//                           onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
//                           className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                           min="1"
//                           required
//                         />
//                         <select
//                           value={product.unit}
//                           onChange={(e) => handleProductChange(index, 'unit', e.target.value)}
//                           className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                         >
//                           <option value="kg">kg</option>
//                           <option value="litre">litre</option>
//                         </select>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">${(product.price * product.quantity).toFixed(2)}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         type="button"
//                         onClick={() => handleDeleteProduct(index)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td colSpan="3" className="px-6 py-4 text-right font-bold">Total:</td>
//                   <td className="px-6 py-4 font-bold">${calculateTotal()}</td>
//                   <td></td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         )}

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Submit Order
//           </button>
//         </div>
//       </form>

//       {showMedicineModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="medicine-modal">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Select Products</h3>
//               <div className="mt-2 px-7 py-3">
//                 <input
//                   type="text"
//                   placeholder="Search medicines..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <div className="mt-4 max-h-60 overflow-y-auto">
//                   {filteredMedicines.map(medicine => (
//                     <div key={medicine.id} className="flex items-center justify-between mb-2 p-2 hover:bg-gray-100 rounded">
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`medicine-${medicine.id}`}
//                           checked={selectedProducts.includes(medicine)}
//                           onChange={() => handleProductSelection(medicine)}
//                           className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                         />
//                         <label htmlFor={`medicine-${medicine.id}`} className="ml-2 block text-sm text-gray-900">
//                           {medicine.name}
//                         </label>
//                       </div>
//                       <span className="text-sm text-gray-600">${medicine.price.toFixed(2)}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="items-center px-4 py-3">
//                 <button
//                   onClick={handleConfirmSelection}
//                   className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
//                 >
//                   Confirm Selection
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showClientModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="client-modal">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Select Client</h3>
//               <div className="mt-2 px-7 py-3">
//                 <div className="max-h-60 overflow-y-auto">
//                   {clientList.map(client => (
//                     <div key={client.id} className="mb-2">
//                       <button
//                         onClick={() => handleClientSelection(client)}
//                         className="w-full text-left px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       >
//                         <div className="font-medium">{client.name}</div>
//                         <div className="text-sm text-gray-500">{client.email}</div>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

