import React, { useState } from 'react';
import ReceiptModal from './ReceiptModal';
import CameraIcon from './icons/CameraIcon';

const initialRegistrations = [
    {
        id: 1,
        registrationDate: '2024-10-25',
        customer: {
            name: 'John Smith',
            email: 'john@aquapools.com',
            address: '123 Main St, Anytown, CA, 12345',
        },
        receiptUrl: 'https://i.imgur.com/8a1nH4x.jpeg', // Placeholder image URL
        warrantyType: 'Standard 3-Year',
    },
    {
        id: 2,
        registrationDate: '2024-09-15',
        customer: {
            name: 'Emily White',
            email: 'emily.white@example.com',
            address: '555 Pine Rd, Someville, FL, 54321',
        },
        receiptUrl: 'https://i.imgur.com/TAn2wY1.jpeg',
        warrantyType: 'Premium 5-Year',
    },
];

const WarrantyRegistrations: React.FC = () => {
    const [registrations, setRegistrations] = useState(initialRegistrations);
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

    const viewReceipt = (url: string) => {
        setSelectedReceipt(url);
        setIsReceiptModalOpen(true);
    };

    const closeReceiptModal = () => {
        setIsReceiptModalOpen(false);
        setSelectedReceipt(null);
    };
    
    return (
        <>
            <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Warranty Registrations</h1>
                    <p className="mt-1 text-gray-500">View and manage all submitted customer warranty registrations.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Customer</th>
                                <th scope="col" className="px-6 py-3">Registration Date</th>
                                <th scope="col" className="px-6 py-3">Warranty Type</th>
                                <th scope="col" className="px-6 py-3">Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map(reg => (
                                <tr key={reg.id} className="bg-white border-b hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{reg.customer.name}</p>
                                        <p className="text-xs text-gray-500">{reg.customer.email}</p>
                                        <p className="text-xs text-gray-500">{reg.customer.address}</p>
                                    </td>
                                    <td className="px-6 py-4">{reg.registrationDate}</td>
                                    <td className="px-6 py-4">{reg.warrantyType}</td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => viewReceipt(reg.receiptUrl)}
                                            className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                        >
                                            <CameraIcon className="h-4 w-4" />
                                            <span>View Receipt</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isReceiptModalOpen && selectedReceipt && (
                <ReceiptModal imageUrl={selectedReceipt} onClose={closeReceiptModal} />
            )}
        </>
    );
};

export default WarrantyRegistrations;