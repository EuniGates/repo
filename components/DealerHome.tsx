import React, { useMemo } from 'react';
import MegaphoneIcon from './icons/MegaphoneIcon';
import ClockIcon from './icons/ClockIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import WaveIcon from './icons/WaveIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import { announcementsData } from './announcementData';

const leadTimes = [
    { title: 'Spa Covers', time: 'Approx. 3 Weeks', icon: WaveIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Safety Covers', time: 'Approx. 6 Weeks', icon: ShieldCheckIcon, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
];

const DealerHome = ({ dealerName, allOrders, setActivePage, onPlaceOrder, onViewOrder }) => {
    const recentOrders = useMemo(() => {
        return allOrders
            .filter(order => (order.customer || order.billingAddress?.company) === dealerName)
            .sort((a, b) => new Date(b.placedDate).getTime() - new Date(a.placedDate).getTime())
            .slice(0, 5);
    }, [allOrders, dealerName]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Awaiting Approval': return 'bg-gray-200 text-gray-800';
            case 'In Production': return 'bg-purple-200 text-purple-800';
            case 'Shipped/Picked-up': return 'bg-blue-200 text-blue-800';
            case 'Invoiced': return 'bg-green-200 text-green-800';
            default: return 'bg-yellow-200 text-yellow-800';
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome back, {dealerName}!</h1>
                    <p className="mt-2 text-gray-600 max-w-lg">Ready to start a new project? Place your next order with just a few clicks.</p>
                </div>
                <button 
                    onClick={onPlaceOrder}
                    className="flex-shrink-0 flex items-center justify-center space-x-2 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-200 w-full sm:w-auto"
                >
                    <PlusCircleIcon className="h-6 w-6"/>
                    <span className="text-lg">Place New Order</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <MegaphoneIcon className="h-6 w-6 text-gray-500" />
                        <span>Announcements</span>
                    </h2>
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                        {announcementsData.filter(ann => !ann.isArchived).map(ann => (
                            <div key={ann.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <p className="text-xs font-medium text-gray-500">{ann.date}</p>
                                <h3 className="font-bold text-indigo-700">{ann.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{ann.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <ClockIcon className="h-6 w-6 text-gray-500" />
                        <span>Current Lead Times</span>
                    </h2>
                    <div className="space-y-4">
                        {leadTimes.map(item => (
                            <div key={item.title} className={`p-4 rounded-lg flex items-center space-x-4 ${item.bgColor}`}>
                                <item.icon className={`h-8 w-8 ${item.color}`} />
                                <div>
                                    <p className={`font-semibold ${item.color}`}>{item.title}</p>
                                    <p className="text-lg font-bold text-gray-800">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 flex justify-between items-center border-b border-slate-200">
                    <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
                    <button onClick={() => setActivePage('My Orders')} className="flex items-center space-x-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                        <span>View All Orders</span>
                        <ArrowRightIcon className="h-4 w-4" />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-gray-500 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold">Order ID</th>
                                <th className="px-6 py-3 text-left font-semibold">Your PO #</th>
                                <th className="px-6 py-3 text-left font-semibold">Status</th>
                                <th className="px-6 py-3 text-left font-semibold">Due Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 divide-y divide-slate-200">
                            {recentOrders.length > 0 ? recentOrders.map((order) => (
                                <tr key={order.id} onClick={() => onViewOrder(order)} className="hover:bg-slate-50 cursor-pointer">
                                    <td className="px-6 py-3 font-bold text-gray-800">{order.id}</td>
                                    <td className="px-6 py-3 text-gray-600">{order.po}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 font-medium">{new Date(order.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-gray-500">You haven't placed any orders yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DealerHome;