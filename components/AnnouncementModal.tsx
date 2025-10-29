import React, { useState } from 'react';
import XIcon from './icons/XIcon';
import SaveIcon from './icons/SaveIcon';

const AnnouncementModal = ({ mode, announcement, onClose, onSave }) => {
    const [formData, setFormData] = useState(announcement);

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
                    <h2 className="text-xl font-bold text-gray-800">{mode === 'add' ? 'Add New Announcement' : 'Edit Announcement'}</h2>
                    <button type="button" onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="title">Title</label>
                        <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                     </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="content">Content</label>
                        <textarea id="content" name="content" rows={6} value={formData.content} onChange={handleChange} required className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                     </div>
                </div>
                <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
                    <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100">
                        Cancel
                    </button>
                    <button type="submit" className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                        <SaveIcon className="h-5 w-5" />
                        <span>Save Announcement</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AnnouncementModal;
