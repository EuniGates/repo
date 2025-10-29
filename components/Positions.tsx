
import React, { useState } from 'react';
import BriefcaseIcon from './icons/BriefcaseIcon';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import XIcon from './icons/XIcon';
import SaveIcon from './icons/SaveIcon';

const initialPositions = [
    { id: 1, title: 'Sales Agent', payRate: '20.00/hr + commission', description: 'Responsible for managing client accounts and driving new sales.' },
    { id: 2, title: 'Technician', payRate: '25.00/hr', description: 'Handles installation and maintenance of pool covers.' },
    { id: 3, title: 'Admin', payRate: '18.00/hr', description: 'Manages office tasks, scheduling, and customer support.' },
    { id: 4, title: 'Warehouse Staff', payRate: '16.50/hr', description: 'Manages inventory, prepares shipments, and maintains warehouse cleanliness.' },
];

const Positions: React.FC = () => {
    const [positions, setPositions] = useState(initialPositions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentPosition, setCurrentPosition] = useState(null);

    const handleOpenModal = (mode: 'add' | 'edit', position = null) => {
        setModalMode(mode);
        setCurrentPosition(position || { title: '', payRate: '', description: '' });
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPosition(null);
    };
    
    const handleSave = () => {
        // Add save logic here
        handleCloseModal();
    }

    return (
        <>
            <div className="bg-white p-8 rounded-xl shadow-sm">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                            <BriefcaseIcon className="h-8 w-8 text-gray-500" />
                            <span>Job Positions</span>
                        </h1>
                        <p className="mt-1 text-gray-500">Define roles, responsibilities, and pay rates for your team.</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal('add')}
                        className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300">
                        <PlusIcon className="h-5 w-5"/>
                        <span>Add New Position</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {positions.map(pos => (
                        <div key={pos.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-indigo-700">{pos.title}</h3>
                                    <p className="text-sm font-semibold text-gray-600 mt-1">Pay: {pos.payRate}</p>
                                    <p className="text-sm text-gray-500 mt-2 max-w-prose">{pos.description}</p>
                                </div>
                                <div className="flex space-x-2 flex-shrink-0 ml-4">
                                    <button onClick={() => handleOpenModal('edit', pos)} className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-slate-200 rounded-md"><PencilIcon className="h-5 w-5"/></button>
                                    <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-slate-200 rounded-md"><TrashIcon className="h-5 w-5"/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && <PositionModal mode={modalMode} position={currentPosition} onClose={handleCloseModal} onSave={handleSave} />}
        </>
    );
};


const PositionModal = ({ mode, position, onClose, onSave }) => {
    const [formData, setFormData] = useState(position);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                 <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-gray-800">{mode === 'add' ? 'Add New Position' : 'Edit Position'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Position Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                     </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pay Rate</label>
                        <input type="text" name="payRate" value={formData.payRate} onChange={handleChange} className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                     </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
                        <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                     </div>
                </div>
                <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
                    <button onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100">
                        Cancel
                    </button>
                    <button onClick={onSave} className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                        <SaveIcon className="h-5 w-5" />
                        <span>Save Position</span>
                    </button>
                </div>
            </div>
        </div>
    );
}


export default Positions;
