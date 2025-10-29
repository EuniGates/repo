import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import XIcon from './icons/XIcon';
import SaveIcon from './icons/SaveIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';

const initialWarranties = [
    { id: 1, name: 'Standard 3-Year', duration: '3 Years', text: 'This Limited Warranty covers defects in materials and workmanship for a period of Three (3) years from the date of original purchase...' },
    { id: 2, name: 'Premium 5-Year', duration: '5 Years', text: 'This Premium Warranty extends coverage to five (5) years and includes additional protection against seam separation...' },
    { id: 3, name: 'Commercial 1-Year', duration: '1 Year', text: 'For commercial applications, this warranty covers defects for one (1) year, acknowledging the heavier usage patterns...' },
];

const WarrantyManagement: React.FC = () => {
    const [warranties, setWarranties] = useState(initialWarranties);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentWarranty, setCurrentWarranty] = useState(null);

    const handleOpenModal = (mode: 'add' | 'edit', warranty = null) => {
        setModalMode(mode);
        setCurrentWarranty(warranty || { id: null, name: '', duration: '', text: '' });
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentWarranty(null);
    };
    
    const handleSave = (warrantyToSave) => {
        if (modalMode === 'add') {
            setWarranties(prev => [...prev, { ...warrantyToSave, id: Date.now() }]);
        } else {
            setWarranties(prev => prev.map(w => w.id === warrantyToSave.id ? warrantyToSave : w));
        }
        handleCloseModal();
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this warranty policy?')) {
            setWarranties(prev => prev.filter(w => w.id !== id));
        }
    };

    return (
        <>
            <div className="bg-white p-8 rounded-xl shadow-sm">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                            <DocumentTextIcon className="h-8 w-8 text-gray-500" />
                            <span>Warranty Management</span>
                        </h1>
                        <p className="mt-1 text-gray-500">Create and manage warranty policies for your products.</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal('add')}
                        className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300">
                        <PlusIcon className="h-5 w-5"/>
                        <span>Add New Warranty</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {warranties.map(w => (
                        <div key={w.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-indigo-700">{w.name}</h3>
                                    <p className="text-sm font-semibold text-gray-600 mt-1">Duration: {w.duration}</p>
                                    <p className="text-sm text-gray-500 mt-2 max-w-prose truncate">{w.text}</p>
                                </div>
                                <div className="flex space-x-2 flex-shrink-0 ml-4">
                                    <button onClick={() => handleOpenModal('edit', w)} className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-slate-200 rounded-md"><PencilIcon className="h-5 w-5"/></button>
                                    <button onClick={() => handleDelete(w.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-slate-200 rounded-md"><TrashIcon className="h-5 w-5"/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && <WarrantyModal mode={modalMode} warranty={currentWarranty} onClose={handleCloseModal} onSave={handleSave} />}
        </>
    );
};


const WarrantyModal = ({ mode, warranty, onClose, onSave }) => {
    const [formData, setFormData] = useState(warranty);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                 <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-gray-800">{mode === 'add' ? 'Add New Warranty' : 'Edit Warranty'}</h2>
                    <button type="button" onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Warranty Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                     </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                        <input type="text" name="duration" value={formData.duration} onChange={handleChange} required placeholder="e.g., 3 Years" className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                     </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Policy Text</label>
                        <textarea name="text" rows={10} value={formData.text} onChange={handleChange} required className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                     </div>
                </div>
                <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
                    <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100">
                        Cancel
                    </button>
                    <button type="submit" className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                        <SaveIcon className="h-5 w-5" />
                        <span>Save Warranty</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default WarrantyManagement;
