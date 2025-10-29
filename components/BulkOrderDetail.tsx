import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

const BulkOrderDetail = ({ order, onBack }) => {

    const formatDimensions = (dimensions) => {
        return Object.entries(dimensions).map(([key, value]) => `${key}: ${value}"`).join(', ');
    };

    return (
        <div className="space-y-6">
            <div>
                <button onClick={onBack} className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-2">
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Back to Bulk Orders</span>
                </button>
                <h1 className="text-3xl font-bold text-gray-800">{order.poNumber}</h1>
                <p className="mt-1 text-gray-500">For {order.customer} &middot; Ordered on {order.orderDate}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm">
                 <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-semibold text-gray-800">Line Items</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Product</th>
                                <th className="px-6 py-3 font-semibold">Specifications</th>
                                <th className="px-6 py-3 font-semibold text-center">Quantity</th>
                                <th className="px-6 py-3 font-semibold">Progress</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {order.lineItems.map(item => {
                                const progressPercent = (item.completed / item.qty) * 100;
                                return (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-800">{item.make}</p>
                                            <p className="text-gray-600">{item.model}</p>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            <p><strong>Shape:</strong> {item.specs.shape}</p>
                                            <p><strong>Dims:</strong> {formatDimensions(item.specs.dimensions)}</p>
                                            <p><strong>Skirt:</strong> {item.specs.skirt}" &middot; <strong>Fold:</strong> {item.specs.fold}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-lg text-gray-800">{item.qty}</td>
                                        <td className="px-6 py-4">
                                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                                            </div>
                                            <p className="text-xs text-right text-gray-500 mt-1">{item.completed} / {item.qty} Completed</p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BulkOrderDetail;