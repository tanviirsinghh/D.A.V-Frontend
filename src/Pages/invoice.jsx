import React from 'react';

const Invoice = ({ closeModal }) => {
    const clientName = "Rahul";
    const date = "2024-11-07";
    const batchNo = "12345";
    const status = "Approved";
    const paymentMethod = "Credit Card";
    const medicines = [
        { serialNo: 1, name: "Ashwagandha", unitPrice: 50, quantity: 10 },
        { serialNo: 2, name: "Triphala", unitPrice: 60, quantity: 15 },
        { serialNo: 3, name: "Brahmi", unitPrice: 40, quantity: 20 }
    ];

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([document.getElementById('invoice').outerHTML], { type: 'text/html' });
        element.href = URL.createObjectURL(file);
        element.download = "invoice.html";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const calculateTotal = () => {
        return medicines.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white w-full max-w-lg mx-auto p-8 rounded-lg shadow-lg" id="invoice">
                
                {/* Close Button */}
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    &times;
                </button>

                {/* Header */}
                <h1 className="text-2xl font-bold text-center mb-6">D.A.V Ayurvedic Pharmacy</h1>

                {/* Client Details */}
                <div className="flex justify-between text-sm text-gray-700 mb-4">
                    <div>
                        <p><span className="font-semibold">Client Name:</span> {clientName}</p>
                        <p><span className="font-semibold">Date:</span> {date}</p>
                        <p><span className="font-semibold">Batch No:</span> {batchNo}</p>
                    </div>
                    <div className="text-right">
                        <p><span className="font-semibold">Status:</span> {status}</p>
                        <p><span className="font-semibold">Payment Method:</span> {paymentMethod}</p>
                    </div>
                </div>

                {/* Table Header */}
                <div className="flex justify-between font-semibold bg-gray-100 py-2 px-4 border-t border-b border-gray-300">
                    <p className="w-1/5">Serial No.</p>
                    <p className="w-2/5">Description</p>
                    <p className="w-1/5 text-right">Unit Price</p>
                    <p className="w-1/5 text-right">Total</p>
                </div>

                {/* Medicine List */}
                {medicines.map((medicine, index) => (
                    <div key={index} className="flex justify-between py-2 px-4 text-sm text-gray-600 border-b border-gray-300">
                        <p className="w-1/5">{medicine.serialNo}</p>
                        <p className="w-2/5">{medicine.name}</p>
                        <p className="w-1/5 text-right">{medicine.unitPrice}</p>
                        <p className="w-1/5 text-right">{medicine.unitPrice * medicine.quantity}</p>
                    </div>
                ))}

                {/* Total */}
                <div className="flex justify-between py-2 px-4 font-semibold text-gray-800 border-t border-gray-300 mt-4">
                    <p>Total</p>
                    <p className="text-right">{calculateTotal()}</p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={handlePrint}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Print
                    </button>
                    <button
                        onClick={handleDownload}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
