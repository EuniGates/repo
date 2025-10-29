
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import XIcon from './icons/XIcon';
import SaveIcon from './icons/SaveIcon';

// This would typically come from a shared state/API
const positionsData = [
    { id: 1, title: 'Sales Agent' },
    { id: 2, title: 'Technician' },
    { id: 3, title: 'Admin' },
    { id: 4, title: 'Warehouse Staff' },
];

const initialEmployees = [
    { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', position: 'Sales Agent' },
    { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', position: 'Sales Agent' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', position: 'Technician' },
    { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', position: 'Admin' },
];

const HRDashboard: React.FC = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <>
            <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">HR Dashboard</h1>
                        <p className="mt-1 text-gray-500">Manage all company employees.</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300">
                        <PlusIcon className="h-5 w-5"/>
                        <span>Add Employee</span>
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Employee Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Position</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id} className="bg-white border-b hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{employee.name}</td>
                                    <td className="px-6 py-4">{employee.email}</td>
                                    <td className="px-6 py-4">{employee.position}</td>
                                    <td className="px-6 py-4 text-right">
                                        <a href="#" className="font-medium text-indigo-600 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <AddEmployeeModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

const AddEmployeeModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                 <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-gray-800">Add New Employee</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input type="text" className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                     </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input type="email" className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                     </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                        <select className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                           <option value="">Select a position</option>
                           {positionsData.map(pos => (
                                <option key={pos.id} value={pos.title}>{pos.title}</option>
                           ))}
                        </select>
                     </div>
                </div>
                <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
                    <button onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100">
                        Cancel
                    </button>
                    <button onClick={onClose} className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                        <SaveIcon className="h-5 w-5" />
                        <span>Save Employee</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HRDashboard;
