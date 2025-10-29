import React, { useState, useMemo } from 'react';
import PlusIcon from './icons/PlusIcon';
import SearchIcon from './icons/SearchIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import TagIcon from './icons/TagIcon';
import MakeModelModal from './MakeModelModal';

export const initialModels = [
    { id: 1, make: 'Jacuzzi', model: 'J-300', shape: 'Square/rectangle with Rounded Corners', dimensions: { A: '84', B: '84', C: '10' }, skirt: '4', fold: 'Horizontal' },
    { id: 2, make: 'Sundance', model: 'Optima', shape: 'Square/rectangle with Rounded Corners', dimensions: { A: '89', B: '89', C: '11' }, skirt: '4.5', fold: 'Horizontal' },
    { id: 3, make: 'Cal Spas', model: 'Pacifica', shape: 'Round', dimensions: { A: '82' }, skirt: '5', fold: 'Horizontal' },
    { id: 4, make: 'Arctic Spas', model: 'Tundra', shape: 'Square/rectangle', dimensions: { A: '92', B: '92' }, skirt: '3.5', fold: 'Horizontal' },
];

const MakeModelDashboard: React.FC = () => {
    const [models, setModels] = useState(initialModels);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentModel, setCurrentModel] = useState(null);

    const handleOpenModal = (mode: 'add' | 'edit', model = null) => {
        setModalMode(mode);
        setCurrentModel(model || { make: '', model: '', shape: 'Square/rectangle with Rounded Corners', dimensions: {}, skirt: '', fold: 'Horizontal' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentModel(null);
    };

    const handleSaveModel = (modelToSave) => {
        if (modalMode === 'add') {
            setModels(prev => [...prev, { ...modelToSave, id: Date.now() }]);
        } else {
            setModels(prev => prev.map(m => m.id === modelToSave.id ? modelToSave : m));
        }
        handleCloseModal();
    };

    const handleDeleteModel = (id) => {
        if (window.confirm('Are you sure you want to delete this make/model?')) {
            setModels(prev => prev.filter(m => m.id !== id));
        }
    };

    const filteredModels = useMemo(() => {
        return models.filter(m =>
            m.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.model.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [models, searchTerm]);

    const formatDimensions = (dimensions) => {
        return Object.entries(dimensions).map(([key, value]) => `${key}: ${value}"`).join(', ');
    };

    return (
        <>
            <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                            <TagIcon className="h-8 w-8 text-gray-500" />
                            <span>Make/Model Database</span>
                        </h1>
                        <p className="mt-1 text-gray-500">Manage specifications for hot tub makes and models.</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal('add')}
                        className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300">
                        <PlusIcon className="h-5 w-5"/>
                        <span>Add New Make/Model</span>
                    </button>
                </div>
                <div className="mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by make or model..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Make</th>
                                <th scope="col" className="px-6 py-3">Model</th>
                                <th scope="col" className="px-6 py-3">Shape</th>
                                <th scope="col" className="px-6 py-3">Dimensions</th>
                                <th scope="col" className="px-6 py-3">Skirt</th>
                                <th scope="col" className="px-6 py-3">Fold</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredModels.map(model => (
                                <tr key={model.id} onClick={() => handleOpenModal('edit', model)} className="bg-white border-b hover:bg-slate-50 cursor-pointer">
                                    <td className="px-6 py-4 font-medium text-gray-900">{model.make}</td>
                                    <td className="px-6 py-4 font-medium text-indigo-600">{model.model}</td>
                                    <td className="px-6 py-4">{model.shape}</td>
                                    <td className="px-6 py-4 text-xs">{formatDimensions(model.dimensions)}</td>
                                    <td className="px-6 py-4">{model.skirt}"</td>
                                    <td className="px-6 py-4">{model.fold}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteModel(model.id); }} className="p-2 text-gray-500 hover:text-red-600 rounded-md hover:bg-slate-100">
                                            <TrashIcon className="h-4 w-4"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <MakeModelModal mode={modalMode} model={currentModel} onClose={handleCloseModal} onSave={handleSaveModel} />}
        </>
    );
};

export default MakeModelDashboard;