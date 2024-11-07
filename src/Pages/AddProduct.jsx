import  { useState, useRef } from 'react';

export default function AddProductForm() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
    brand: '',
    measurement: {
      type: 'kg', // default to kg
      value: '',
    },
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleMeasurementChange = (e) => {
    const { value } = e.target;
    setProduct((prev) => ({
      ...prev,
      measurement: {
        ...prev.measurement,
        value: value,
      },
    }));
  };

  const handleMeasurementTypeChange = (e) => {
    const { value } = e.target;
    setProduct((prev) => ({
      ...prev,
      measurement: {
        type: value,
        value: '',
      },
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validFiles = files.filter(file =>
      allowedTypes.includes(file.type) && file.size <= maxSize
    );

    if (validFiles.length !== files.length) {
      alert('Some files were not added. Please ensure all files are images (JPEG, PNG, GIF) and under 5MB.');
    }

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));

    const newPreviewImages = validFiles.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));
    setPreviewImages((prev) => [...prev, ...newPreviewImages]);
  };

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product data:', product);
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>

      {/* Product Images */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Product Images</h2>
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Click to upload images</span>
            <span className="text-sm text-gray-500 mt-1">JPEG, PNG, GIF up to 5MB</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            name="images"
            onChange={handleImageUpload}
            multiple
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
          />
        </div>
        {previewImages.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Uploaded Images:</h3>
            <div className="grid grid-cols-2 gap-4">
              {previewImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="mt-1 text-sm text-gray-500">
                    {image.name} ({(image.size / 1024).toFixed(2)} KB)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Product Category"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Product Brand"
          className="w-full p-2 border rounded"
        />

        {/* Measurement Type Dropdown and Input */}
        <div className="flex items-center space-x-4">
          <select
            value={product.measurement.type}
            onChange={handleMeasurementTypeChange}
            className="p-2 border rounded"
          >
            <option value="kg">Weight (kg)</option>
            <option value="litre">Volume (L)</option>
          </select>
          <input
            type="number"
            name="measurementValue"
            value={product.measurement.value}
            onChange={handleMeasurementChange}
            placeholder={product.measurement.type === 'kg' ? 'Weight in kg' : 'Volume in L'}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add Product
      </button>
    </form>
  );
}




// import  { useState, useRef } from 'react';

// export default function AddProductForm() {
//   const [product, setProduct] = useState({
//     title: '',
//     description: '',
//     category: '',
//     brand: '',
//     measurement: {
//       type: 'weight',
//       value: '',
//     },
//     images: [],
//   });

//   const [previewImages, setPreviewImages] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMeasurementChange = (e) => {
//     const { value } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       measurement: {
//         ...prev.measurement,
//         value: value,
//       },
//     }));
//   };

//   const toggleMeasurementType = () => {
//     setProduct((prev) => ({
//       ...prev,
//       measurement: {
//         type: prev.measurement.type === 'weight' ? 'volume' : 'weight',
//         value: '',
//       },
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     const maxSize = 5 * 1024 * 1024; // 5MB

//     const validFiles = files.filter(file => 
//       allowedTypes.includes(file.type) && file.size <= maxSize
//     );

//     if (validFiles.length !== files.length) {
//       alert('Some files were not added. Please ensure all files are images (JPEG, PNG, GIF) and under 5MB.');
//     }

//     setProduct((prev) => ({
//       ...prev,
//       images: [...prev.images, ...validFiles],
//     }));

//     // Create preview URLs for the uploaded images
//     const newPreviewImages = validFiles.map(file => ({
//       url: URL.createObjectURL(file),
//       name: file.name,
//       size: file.size
//     }));
//     setPreviewImages((prev) => [...prev, ...newPreviewImages]);
//   };

//   const removeImage = (index) => {
//     setProduct((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//     setPreviewImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Product data:', product);
//     // Here you would typically send the data to your backend
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>

//       {/* Product Images */}
//       <div className="space-y-4">
//         <h2 className="text-lg font-semibold">Product Images</h2>
//         <div className="flex flex-col items-center">
//           <button
//             type="button"
//             onClick={() => fileInputRef.current.click()}
//             className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-8 h-8 mb-2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 4v16m8-8H4"
//               />
//             </svg>
//             <span>Click to upload images</span>
//             <span className="text-sm text-gray-500 mt-1">JPEG, PNG, GIF up to 5MB</span>
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             name="images"
//             onChange={handleImageUpload}
//             multiple
//             accept="image/jpeg,image/png,image/gif"
//             className="hidden"
//           />
//         </div>
//         {previewImages.length > 0 && (
//           <div className="space-y-2">
//             <h3 className="font-medium">Uploaded Images:</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {previewImages.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={image.url}
//                     alt={`Preview ${index + 1}`}
//                     className="w-full h-32 object-cover rounded-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                   <div className="mt-1 text-sm text-gray-500">
//                     {image.name} ({(image.size / 1024).toFixed(2)} KB)
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Product Information */}
//       <div className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           value={product.title}
//           onChange={handleChange}
//           placeholder="Product Title"
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           name="description"
//           value={product.description}
//           onChange={handleChange}
//           placeholder="Product Description"
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="category"
//           value={product.category}
//           onChange={handleChange}
//           placeholder="Product Category"
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="brand"
//           value={product.brand}
//           onChange={handleChange}
//           placeholder="Product Brand"
//           className="w-full p-2 border rounded"
//         />
        
//         {/* Weight/Volume Toggle and Input */}
//         <div className="flex items-center space-x-4">
//           <label className="flex items-center cursor-pointer">
//             <div className="relative">
//               <input 
//                 type="checkbox" 
//                 className="sr-only" 
//                 checked={product.measurement.type === 'volume'}
//                 onChange={toggleMeasurementType}
//               />
//               <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
//               <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${product.measurement.type === 'volume' ? 'transform translate-x-full bg-blue-500' : ''}`}></div>
//             </div>
//             <div className="ml-3 text-gray-700 font-medium">
//               {product.measurement.type === 'weight' ? 'Weight (kg)' : 'Volume (L)'}
//             </div>
//           </label>
//           <input
//             type="number"
//             name="measurementValue"
//             value={product.measurement.value}
//             onChange={handleMeasurementChange}
//             placeholder={product.measurement.type === 'weight' ? 'Weight in kg' : 'Volume in L'}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
//       >
//         Add Product
//       </button>
//     </form>
//   );
// }