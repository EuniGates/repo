import React, { useState, useMemo } from 'react';
import DealerOrderDetail from './DealerOrderDetail';
import SearchIcon from './icons/SearchIcon';

const DealerOrdersList = ({ allOrders, dealerName }) => {
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedOrder, setSelectedOrder] = useState<typeof allOrders[0] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const dealerOrders = useMemo(() => {
        return allOrders.filter(order => 
            (order.customer || order.billingAddress?.company) === dealerName
        );
    }, [allOrders, dealerName]);

    const filteredOrders = useMemo(() => {
        if (!searchTerm) return dealerOrders;
        const lowercasedSearch = searchTerm.toLowerCase();
        return dealerOrders.filter(order => 
            order.id.toLowerCase().includes(lowercasedSearch) ||
            order.po.toLowerCase().includes(lowercasedSearch)
        );
    }, [dealerOrders, searchTerm]);

    const handleSelectOrder = (order) => {
        if (order.product) {
            setSelectedOrder(order);
            setView('detail');
        } else {
            alert('This order does not have detailed information available.');
        }
    };

    const handleBackToList = () => {
        setSelectedOrder(null);
        setView('list');
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Awaiting Approval': return 'bg-gray-300 text-gray-800';
            case 'In Production': return 'bg-purple-200 text-purple-800';
            case 'Shipped/Picked-up': return 'bg-blue-200 text-blue-800';
            case 'Invoiced': return 'bg-green-200 text-green-800';
            default: return 'bg-yellow-200 text-yellow-800';
        }
    };

    if (view === 'detail' && selectedOrder) {
        return <DealerOrderDetail order={selectedOrder} onBack={handleBackToList} />;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
                    <p className="mt-1 text-gray-500">View the history and status of all your orders.</p>
                </div>
                <div className="relative mt-4 sm:mt-0 w-full sm:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Order ID or PO #"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-xs text-gray-500 uppercase bg-slate-100/75">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-left font-semibold tracking-wider">Your PO #</th>
                            <th className="px-6 py-4 text-left font-semibold tracking-wider">Product</th>
                            <th className="px-6 py-4 text-left font-semibold tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left font-semibold tracking-wider">Order Date</th>
                            <th className="px-6 py-4 text-left font-semibold tracking-wider">Due Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredOrders.map((order) => (
                            <tr key={order.id} onClick={() => handleSelectOrder(order)} className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer">
                                <td className="px-6 py-4 font-bold text-indigo-600">{order.id}</td>
                                <td className="px-6 py-4 text-gray-600">{order.po}</td>
                                <td className="px-6 py-4 font-semibold text-gray-800">{order.product?.name || order.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(order.placedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                <td className="px-6 py-4 font-bold">{new Date(order.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DealerOrdersList;