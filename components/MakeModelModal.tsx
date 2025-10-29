import React, { useState, useMemo } from 'react';
import XIcon from './icons/XIcon';
import SaveIcon from './icons/SaveIcon';
import ShapeDiagram from './ShapeDiagram';

const shapeDimensionMap = {
    'Square/rectangle with Rounded Corners': ['A', 'B', 'C'],
    'Round': ['A'],
    'Square/rectangle with Cut Corners': ['A', 'B', 'C'],
    'Square/rectangle': ['A', 'B'],
    'Octagon': ['A', 'B', 'C'],
    'One Cut Left Corner': ['A', 'B', 'C', 'D', 'E', 'F'],
    'One Cut Right Corner': ['A', 'B', 'C', 'D', 'E', 'F'],
    'Two Cut Corners': ['A', 'B', 'C', 'D', 'E', 'F'],
};

const MakeModelModal = ({ mode, model, onClose, onSave }) => {
    const [formData, setFormData] = useState(model);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDimensionChange = (dim, value) => {
        setFormData(prev => ({
            ...prev,
            dimensions: {
                ...prev.dimensions,
                [dim]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const dimensionFields = useMemo(() => {
        return shapeDimensionMap[formData.shape] || [];
    }, [formData.shape]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
                <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-gray-800">{mode === 'add' ? 'Add New Make/Model' : 'Edit Make/Model'}</h2>
                    <button type="button" onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Make</label>
                                    <input type="text" name="make" value={formData.make} onChange={handleChange} required className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
                                    <input type="text" name="model" value={formData.model} onChange={handleChange} required className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Shape</label>
                                <select name="shape" value={formData.shape} onChange={handleChange} className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    {Object.keys(shapeDimensionMap).map(shape => (
                                        <option key={shape} value={shape}>{shape}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Dimensions (in inches)</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {dimensionFields.map(dim => (
                                        <div key={dim}>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Dim {dim}</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={formData.dimensions[dim] || ''}
                                                onChange={(e) => handleDimensionChange(dim, e.target.value)}
                                                required
                                                className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skirt Length (in inches)</label>
                                    <input type="number" step="0.1" name="skirt" value={formData.skirt} onChange={handleChange} required className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fold Direction</label>
                                    <select name="fold" value={formData.fold} onChange={handleChange} className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="Horizontal">Horizontal</option>
                                        <option value="Vertical">Vertical</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-lg border border-slate-200 h-full min-h-[250px]">
                            <ShapeDiagram
                                shape={formData.shape}
                                dimensions={formData.dimensions}
                                fold={formData.fold}
                                className="w-full h-auto max-w-xs text-indigo-600"
                            />
                            <p className="text-sm text-gray-500 mt-2">Shape Preview</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
                    <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100">
                        Cancel
                    </button>
                    <button type="submit" className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                        <SaveIcon className="h-5 w-5" />
                        <span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MakeModelModal;