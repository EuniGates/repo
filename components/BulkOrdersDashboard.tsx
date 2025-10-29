import React, { useState, useMemo } from 'react';
import CubeTransparentIcon from './icons/CubeTransparentIcon';
import PlusIcon from './icons/PlusIcon';
import BulkOrderDetail from './BulkOrderDetail';
import BulkOrderCreationModal from './BulkOrderCreationModal';
import { initialModels } from './MakeModelDashboard';
import { ordersData } from './OrdersDashboard';

const initialBulkOrders = [
    {
        id: 'FTL-2024-001',
        customer: 'Aqua Pools Inc.',
        poNumber: 'FTL-PO-9001',
        totalCovers: 70,
        status: 'Partially Completed',
        orderDate: '2024-11-05',
        lineItems: [
            { id: 1, make: 'Jacuzzi', model: 'J-300', specs: { shape: 'Square/rectangle with Rounded Corners', dimensions: { A: '84', B: '84', C: '10' }, skirt: '4', fold: 'Horizontal' }, qty: 20, completed: 5, price: 340.00 },
            { id: 2, make: 'Sundance', model: 'Optima', specs: { shape: 'Square/rectangle with Rounded Corners', dimensions: { A: '89', B: '89', C: '11' }, skirt: '4.5', fold: 'Horizontal' }, qty: 50, completed: 45, price: 360.00 },
        ]
    },
    {
        id: 'FTL-2024-002',
        customer: 'Global Spas',
        poNumber: 'FTL-PO-GS-01',
        totalCovers: 100,
        status: 'In Production',
        orderDate: '2024-11-10',
        lineItems: [
            { id: 3, make: 'Cal Spas', model: 'Pacifica', specs: { shape: 'Round', dimensions: { A: '82' }, skirt: '5', fold: 'Horizontal' }, qty: 100, completed: 10, price: 325.00 },
        ]
    }
];

const BulkOrdersDashboard: React.FC = () => {
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [bulkOrders, setBulkOrders] = useState(initialBulkOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

    const customers = useMemo(() => [...new Set(ordersData.map(o => o.customer || o.billingAddress?.company))], []);

    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
        setView('detail');
    };

    const handleBackToList = () => {
        setSelectedOrder(null);
        setView('list');
    };
    
    const handleAddOrder = (newOrder) => {
        setBulkOrders(prev => [newOrder, ...prev]);
        setIsCreationModalOpen(false);
    };

    const getStatusClass = (status) => {
        if (status.includes('Completed')) return 'bg-green-100 text-green-800';
        if (status.includes('Production')) return 'bg-yellow-100 text-yellow-800';
        return 'bg-blue-100 text-blue-800';
    };

    if (view === 'detail' && selectedOrder) {
        return <BulkOrderDetail order={selectedOrder} onBack={handleBackToList} />;
    }

    return (
        <>
            <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                            <CubeTransparentIcon className="h-8 w-8 text-gray-500" />
                            <span>Bulk Orders (FTL)</span>
                        </h1>
                        <p className="mt-1 text-gray-500">Manage high-volume production runs.</p>
                    </div>
                    <button 
                        onClick={() => setIsCreationModalOpen(true)}
                        className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300">
                        <PlusIcon className="h-5 w-5"/>
                        <span>Add Bulk Order</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Bulk PO #</th>
                                <th scope="col" className="px-6 py-3">Customer</th>
                                <th scope="col" className="px-6 py-3">Order Date</th>
                                <th scope="col" className="px-6 py-3 text-center">Total Covers</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bulkOrders.map(order => (
                                <tr key={order.id} onClick={() => handleSelectOrder(order)} className="bg-white border-b hover:bg-slate-50 cursor-pointer">
                                    <td className="px-6 py-4 font-medium text-indigo-600">{order.poNumber}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.customer}</td>
                                    <td className="px-6 py-4">{order.orderDate}</td>
                                    <td className="px-6 py-4 text-center">{order.totalCovers}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>{order.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isCreationModalOpen && (
                <BulkOrderCreationModal 
                    customers={customers}
                    models={initialModels}
                    onClose={() => setIsCreationModalOpen(false)}
                    onAddOrder={handleAddOrder}
                />
            )}
        </>
    );
};

export default BulkOrdersDashboard;