import React, { useState, useMemo } from 'react';
import PlusIcon from './icons/PlusIcon';
import RulerIcon from './icons/RulerIcon';
import ABMeasurementEditor from './ABMeasurementEditor';
import { ordersData } from './OrdersDashboard';
import OrderCreationModal from './OrderCreationModal';

const initialJobs = [
    { 
        id: 1, 
        name: 'Smith Residence', 
        customer: 'Aqua Pools Inc.', 
        status: 'Completed', 
        date: '2024-11-10', 
        baseline: 384, 
        points: [
            { a_ft: '0', a_in: '10', b_ft: '31', b_in: '3', side: '+'}, 
            { a_ft: '5', a_in: '0', b_ft: '28', b_in: '0', side: '+'},
            { a_ft: '10', a_in: '0', b_ft: '25', b_in: '0', side: '+'},
            { a_ft: '20', a_in: '0', b_ft: '15', b_in: '0', side: '+'},
            { a_ft: '31', a_in: '3', b_ft: '0', b_in: '10', side: '+'},
            { a_ft: '31', a_in: '3', b_ft: '0', b_in: '10', side: '-'},
            { a_ft: '20', a_in: '0', b_ft: '15', b_in: '0', side: '-'},
            { a_ft: '10', a_in: '0', b_ft: '25', b_in: '0', side: '-'},
            { a_ft: '5', a_in: '0', b_ft: '28', b_in: '0', side: '-'},
            { a_ft: '0', a_in: '10', b_ft: '31', b_in: '3', side: '-'}
        ],
        steps: [{ from: 2, to: 4 }],
        decking: [{ from: 1, to: 10, type: 'Concrete' }] 
    },
    { id: 2, name: 'Jones Pool', customer: 'Global Spas', status: 'In Progress', date: '2024-11-12', baseline: 420, points: [{a_ft: '1', a_in: '3', b_ft: '34', b_in: '2', side: '+'}], steps: [], decking: [] },
    { id: 3, name: 'Carter Project', customer: 'Waterfront Dealers', status: 'Order Placed', date: '2024-10-28', baseline: 240, points: [], steps: [], decking: [] },
];

const ABMeasurementsDashboard: React.FC = () => {
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [jobs, setJobs] = useState(initialJobs);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [orderInitialData, setOrderInitialData] = useState(null);
    
    const customersWithDetails = useMemo(() => {
        const customerMap = new Map();
        ordersData.forEach(order => {
            const name = order.customer || order.billingAddress?.company;
            const province = order.shippingAddress?.province;
            if (name && province && !customerMap.has(name)) {
                customerMap.set(name, { name, province });
            }
        });
        return Array.from(customerMap.values());
    }, []);

    const handleStartNew = () => {
        setSelectedJob({
            id: null,
            name: '',
            customer: '',
            status: 'In Progress',
            date: new Date().toISOString().split('T')[0],
            baseline: 0,
            points: [{ a_ft: '', a_in: '', b_ft: '', b_in: '', side: '+' }],
            steps: [],
            decking: [],
        });
        setView('editor');
    };

    const handleEditJob = (job) => {
        setSelectedJob(job);
        setView('editor');
    };

    const handleBackToList = () => {
        setSelectedJob(null);
        setView('list');
    };

    const handleSaveJob = (savedJob) => {
        if (savedJob.id) {
            setJobs(prev => prev.map(j => j.id === savedJob.id ? savedJob : j));
        } else {
            setJobs(prev => [...prev, { ...savedJob, id: Date.now() }]);
        }
        setView('list');
    };
    
    const handleCreateOrder = (job) => {
        setOrderInitialData({
            customer: job.customer,
            productType: 'Safety Cover',
        });
        setIsOrderModalOpen(true);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Order Placed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (view === 'editor') {
        return <ABMeasurementEditor job={selectedJob} onBack={handleBackToList} onSave={handleSaveJob} customers={customersWithDetails.map(c => c.name)} />;
    }

    return (
        <>
            <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                            <RulerIcon className="h-8 w-8 text-gray-500" />
                            <span>A-B Measurements</span>
                        </h1>
                        <p className="mt-1 text-gray-500">Create and manage measurement jobs for safety covers.</p>
                    </div>
                    <button 
                        onClick={handleStartNew}
                        className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300">
                        <PlusIcon className="h-5 w-5"/>
                        <span>Start New Measurement</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Job Name</th>
                                <th scope="col" className="px-6 py-3">Customer</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job.id} className="bg-white border-b hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{job.name}</td>
                                    <td className="px-6 py-4">{job.customer}</td>
                                    <td className="px-6 py-4">{job.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(job.status)}`}>{job.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => handleEditJob(job)} className="font-medium text-indigo-600 hover:underline">Edit</button>
                                        {job.status === 'Completed' && (
                                            <button onClick={() => handleCreateOrder(job)} className="font-medium text-green-600 hover:underline">Create Order</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isOrderModalOpen && (
                <OrderCreationModal 
                    customers={customersWithDetails}
                    onClose={() => setIsOrderModalOpen(false)}
                    onAddOrder={() => {}} // This should be wired to the main orders list
                    initialData={orderInitialData}
                />
            )}
        </>
    );
};

export default ABMeasurementsDashboard;