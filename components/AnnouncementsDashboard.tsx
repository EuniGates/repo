import React, { useState, useEffect, useMemo } from 'react';
import { announcementsData } from './announcementData';
import MegaphoneIcon from './icons/MegaphoneIcon';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import AnnouncementModal from './AnnouncementModal';
import ArchiveBoxIcon from './icons/ArchiveBoxIcon';
import ArrowUpTrayIcon from './icons/ArrowUpTrayIcon';

const AnnouncementsDashboard: React.FC = () => {
    const [announcements, setAnnouncements] = useState(announcementsData);
    const [view, setView] = useState<'active' | 'archived'>('active');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

    useEffect(() => {
        setAnnouncements([...announcementsData]);
    }, []);

    const handleOpenModal = (mode: 'add' | 'edit', announcement = null) => {
        setModalMode(mode);
        setCurrentAnnouncement(announcement || { id: null, title: '', content: '', isArchived: false });
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentAnnouncement(null);
    };
    
    const handleSave = (announcementToSave) => {
        if (modalMode === 'add') {
            const newAnnouncement = { 
                ...announcementToSave, 
                id: Date.now(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };
            announcementsData.unshift(newAnnouncement);
        } else {
            const index = announcementsData.findIndex(a => a.id === announcementToSave.id);
            if (index !== -1) {
                announcementsData[index] = announcementToSave;
            }
        }
        setAnnouncements([...announcementsData]);
        handleCloseModal();
    }

    const handleArchive = (id) => {
        const index = announcementsData.findIndex(a => a.id === id);
        if (index !== -1) {
            announcementsData[index].isArchived = true;
            setAnnouncements([...announcementsData]);
        }
    };
    
    const handleUnarchive = (id) => {
        const index = announcementsData.findIndex(a => a.id === id);
        if (index !== -1) {
            announcementsData[index].isArchived = false;
            setAnnouncements([...announcementsData]);
        }
    };

    const handleDeletePermanently = (id) => {
        if (window.confirm('This will permanently delete the announcement. Are you sure?')) {
            const index = announcementsData.findIndex(a => a.id === id);
            if (index !== -1) {
                announcementsData.splice(index, 1);
                setAnnouncements([...announcementsData]);
            }
        }
    };

    const activeAnnouncements = useMemo(() => announcements.filter(a => !a.isArchived), [announcements]);
    const archivedAnnouncements = useMemo(() => announcements.filter(a => a.isArchived), [announcements]);

    return (
        <>
            <div className="bg-white p-8 rounded-xl shadow-sm">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                            <MegaphoneIcon className="h-8 w-8 text-gray-500" />
                            <span>Announcement Management</span>
                        </h1>
                        <p className="mt-1 text-gray-500">Create and manage announcements for the dealer dashboard.</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal('add')}
                        className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300">
                        <PlusIcon className="h-5 w-5"/>
                        <span>Add New Announcement</span>
                    </button>
                </div>

                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button
                            onClick={() => setView('active')}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm transition-colors ${view === 'active' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setView('archived')}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm transition-colors ${view === 'archived' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            Archived
                        </button>
                    </nav>
                </div>

                <div className="space-y-4">
                    {view === 'active' && (activeAnnouncements.length > 0 ? activeAnnouncements.map(ann => (
                        <div key={ann.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">{ann.date}</p>
                                    <h3 className="text-lg font-bold text-indigo-700 mt-1">{ann.title}</h3>
                                    <p className="text-sm text-gray-600 mt-2 max-w-prose">{ann.content}</p>
                                </div>
                                <div className="flex space-x-2 flex-shrink-0 ml-4">
                                    <button onClick={() => handleOpenModal('edit', ann)} className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-slate-200 rounded-md" title="Edit"><PencilIcon className="h-5 w-5"/></button>
                                    <button onClick={() => handleArchive(ann.id)} className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-slate-200 rounded-md" title="Archive"><ArchiveBoxIcon className="h-5 w-5"/></button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-12 border-2 border-dashed rounded-lg">
                            <p className="text-gray-500">No active announcements.</p>
                        </div>
                    ))}

                    {view === 'archived' && (archivedAnnouncements.length > 0 ? archivedAnnouncements.map(ann => (
                        <div key={ann.id} className="bg-slate-100 p-4 rounded-lg border border-slate-200 opacity-70">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">{ann.date}</p>
                                    <h3 className="text-lg font-semibold text-gray-600 mt-1">{ann.title}</h3>
                                    <p className="text-sm text-gray-500 mt-2 max-w-prose">{ann.content}</p>
                                </div>
                                <div className="flex space-x-2 flex-shrink-0 ml-4">
                                    <button onClick={() => handleUnarchive(ann.id)} className="p-2 text-gray-500 hover:text-green-600 hover:bg-slate-200 rounded-md" title="Unarchive"><ArrowUpTrayIcon className="h-5 w-5"/></button>
                                    <button onClick={() => handleDeletePermanently(ann.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-slate-200 rounded-md" title="Delete Permanently"><TrashIcon className="h-5 w-5"/></button>
                                </div>
                            </div>
                        </div>
                    )) : (
                         <div className="text-center py-12 border-2 border-dashed rounded-lg">
                            <p className="text-gray-500">No archived announcements.</p>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && <AnnouncementModal mode={modalMode} announcement={currentAnnouncement} onClose={handleCloseModal} onSave={handleSave} />}
        </>
    );
};

export default AnnouncementsDashboard;