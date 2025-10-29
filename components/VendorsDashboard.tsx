import React, { useState, useEffect, useMemo } from 'react';
import PlusIcon from './icons/PlusIcon';
import SearchIcon from './icons/SearchIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import SaveIcon from './icons/SaveIcon';
import BuildingOfficeIcon from './icons/BuildingOfficeIcon';
import InboxStackIcon from './icons/InboxStackIcon';
import { purchaseOrdersData } from './PurchasingDashboard';
import CakeIcon from './icons/CakeIcon';
import BanknotesIcon from './icons/BanknotesIcon';
import WrenchIcon from './icons/WrenchIcon';


// Mock Data
const vendorsData = [
    {
        id: 1,
        company: 'Cover Materials Co.',
        contact: 'Sarah Miller',
        email: 'sarah@covermaterials.com',
        phone: '555-9876',
        address: {
            street: '789 Industrial Park',
            city: 'Supplier City',
            province: 'ON',
            postalCode: 'L4B 2V9',
            country: 'Canada'
        },
        notes: 'Primary supplier for vinyl. Reliable and fast shipping. Net 30 terms.',
        claims: [
            { id: 1, date: '2024-06-15', reason: 'Defective vinyl roll', status: 'Resolved' }
        ],
        purchaseOrders: [
            { poNumber: 'PO-2024-051', orderDate: '2024-10-20', expectedDate: '2024-11-05', status: 'Shipped' },
            { poNumber: 'PO-2024-063', orderDate: '2024-11-01', expectedDate: '2024-11-15', status: 'Processing' }
        ]
    },
    {
        id: 2,
        company: 'Foam & Core Inc.',
        contact: 'Mike Peterson',
        email: 'mike.p@foamcore.net',
        phone: '555-4567',
        address: {
            street: '321 Foam Factory Rd',
            city: 'Coreville',
            province: 'QC',
            postalCode: 'J7W 5E1',
            country: 'Canada'
        },
        notes: 'Specializes in high-density foam inserts. Place orders 2 weeks in advance.',
        claims: [],
        purchaseOrders: [
            { poNumber: 'PO-2024-058', orderDate: '2024-10-25', expectedDate: '2024-11-10', status: 'Processing' }
        ]
    }
];

const VendorsDashboard: React.FC = () => {
    const [view, setView] = useState<'list' | 'profile'>('list');
    const [selectedVendor, setSelectedVendor] = useState<(typeof vendorsData)[0] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectVendor = (vendor: (typeof vendorsData)[0]) => {
        setSelectedVendor(vendor);
        setView('profile');
    };

    const handleBackToList = () => {
        setSelectedVendor(null);
        setView('list');
    };

    const filteredVendors = vendorsData.filter(v =>
        v.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (view === 'profile' && selectedVendor) {
        return <VendorProfile vendor={selectedVendor} onBack={handleBackToList} />;
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                        <BuildingOfficeIcon className="h-8 w-8 text-gray-500" />
                        <span>Vendors</span>
                    </h1>
                    <p className="mt-1 text-gray-500">Manage your supplier profiles and purchase orders.</p>
                </div>
                <button className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300">
                    <PlusIcon className="h-5 w-5" />
                    <span>Add New Vendor</span>
                </button>
            </div>
            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by company or contact..."
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
                            <th scope="col" className="px-6 py-3">Company</th>
                            <th scope="col" className="px-6 py-3">Contact</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVendors.map(vendor => (
                            <tr key={vendor.id} onClick={() => handleSelectVendor(vendor)} className="bg-white border-b hover:bg-slate-50 cursor-pointer">
                                <td className="px-6 py-4 font-medium text-gray-900">{vendor.company}</td>
                                <td className="px-6 py-4">{vendor.contact}</td>
                                <td className="px-6 py-4">{vendor.email}</td>
                                <td className="px-6 py-4">{vendor.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const EditableField = ({ label, value, name, onChange, isEditing, className = '', type = 'text' }) => {
    return isEditing ? (
        <div className={className}>
            <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 bg-slate-100 border border-slate-200 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
        </div>
    ) : (
        <div className={className}>
            <p className="text-sm font-semibold text-gray-500">{label}</p>
            <p className="text-gray-800">{value}</p>
        </div>
    );
};

const KpiCard = ({ icon: Icon, title, value, bgColor, iconColor }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4">
        <div className={`p-3 rounded-full ${bgColor}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const VendorProfile = ({ vendor, onBack }: { vendor: (typeof vendorsData)[0], onBack: () => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedVendor, setEditedVendor] = useState(vendor);

    useEffect(() => {
        setEditedVendor(vendor);
        setIsEditing(false);
    }, [vendor]);

    const vendorStats = useMemo(() => {
        const vendorPOs = purchaseOrdersData.filter(po => po.vendor === vendor.company);

        // Vendor Since
        let vendorSince = 'N/A';
        if (vendorPOs.length > 0) {
            const firstOrderDate = vendorPOs.reduce((earliest, po) => {
                const orderDate = new Date(po.orderDate);
                return orderDate < earliest ? orderDate : earliest;
            }, new Date());
            
            const now = new Date();
            let years = now.getFullYear() - firstOrderDate.getFullYear();
            let months = now.getMonth() - firstOrderDate.getMonth();
            if (months < 0 || (months === 0 && now.getDate() < firstOrderDate.getDate())) {
                years--;
                months = (months + 12) % 12;
            }
            vendorSince = `${years > 0 ? `${years}y` : ''} ${months > 0 ? `${months}m` : (years === 0 ? 'New' : '')}`.trim();
        }

        // Total Spent
        const totalSpent = vendorPOs.reduce((total, po) => {
            const subtotal = po.items.reduce((acc, item) => acc + item.qty * item.rate, 0);
            const poTotal = subtotal * (1 + po.taxRate);
            return total + poTotal;
        }, 0);

        // Currency
        const currency = vendor.address.country === 'Canada' ? 'CAD' : 'USD';

        // Claims Made
        const totalClaims = vendor.claims?.length || 0;

        return {
            vendorSince,
            totalSpent: new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(totalSpent),
            currency,
            totalClaims
        };
    }, [vendor]);

    const handleCancel = () => {
        setIsEditing(false);
        setEditedVendor(vendor);
    };

    const handleSave = () => {
        console.log("Saving data:", editedVendor);
        setIsEditing(false);
        // Here you would typically make an API call to save the data
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedVendor(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedVendor(prev => ({
            ...prev,
            address: { ...prev.address, [name]: value }
        }));
    };
    
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Received': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <button onClick={onBack} className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-2">
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span>Back to Vendors</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">{vendor.company}</h1>
                    <p className="mt-1 text-gray-500">Contact: {vendor.contact}</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    {isEditing ? (
                         <>
                            <button onClick={handleCancel} className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                                <span>Cancel</span>
                            </button>
                            <button onClick={handleSave} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                                <SaveIcon className="h-4 w-4" />
                                <span>Save Changes</span>
                            </button>
                        </>
                    ) : (
                         <>
                            <button onClick={() => setIsEditing(true)} className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                                <PencilIcon className="h-4 w-4" />
                                <span>Edit</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
                                <TrashIcon className="h-4 w-4" />
                                <span>Delete</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-4 rounded-xl">
                <KpiCard icon={CakeIcon} title="Vendor Since" value={vendorStats.vendorSince} bgColor="bg-blue-100" iconColor="text-blue-600" />
                <KpiCard icon={BanknotesIcon} title={`Total Spent (${vendorStats.currency})`} value={vendorStats.totalSpent} bgColor="bg-green-100" iconColor="text-green-600" />
                <KpiCard icon={WrenchIcon} title="Claims Made" value={vendorStats.totalClaims} bgColor="bg-yellow-100" iconColor="text-yellow-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Vendor Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <EditableField label="Company Name" name="company" value={editedVendor.company} onChange={handleChange} isEditing={isEditing} />
                            <EditableField label="Contact Person" name="contact" value={editedVendor.contact} onChange={handleChange} isEditing={isEditing} />
                             <EditableField label="Email Address" name="email" value={editedVendor.email} onChange={handleChange} isEditing={isEditing} type="email" />
                            <EditableField label="Phone Number" name="phone" value={editedVendor.phone} onChange={handleChange} isEditing={isEditing} />
                            <EditableField label="Street Address" name="street" value={editedVendor.address.street} onChange={handleAddressChange} isEditing={isEditing} className="sm:col-span-2" />
                            <EditableField label="City" name="city" value={editedVendor.address.city} onChange={handleAddressChange} isEditing={isEditing} />
                            <EditableField label="Province/State" name="province" value={editedVendor.address.province} onChange={handleAddressChange} isEditing={isEditing} />
                            <EditableField label="Postal Code" name="postalCode" value={editedVendor.address.postalCode} onChange={handleAddressChange} isEditing={isEditing} />
                            <EditableField label="Country" name="country" value={editedVendor.address.country} onChange={handleAddressChange} isEditing={isEditing} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
                        {isEditing ? (
                            <textarea name="notes" rows={6} value={editedVendor.notes} onChange={handleChange} className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"></textarea>
                        ) : (
                            <p className="text-gray-700 whitespace-pre-wrap">{vendor.notes || 'No notes added.'}</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-slate-200 flex items-center space-x-3">
                        <InboxStackIcon className="h-6 w-6 text-gray-500" />
                        <h3 className="text-lg font-semibold text-gray-800">Open Purchase Orders</h3>
                    </div>
                    <ul className="divide-y divide-slate-200 max-h-[40rem] overflow-y-auto">
                        {vendor.purchaseOrders.length > 0 ? vendor.purchaseOrders.map(po => (
                            <li key={po.poNumber} className="p-4 hover:bg-slate-50 cursor-pointer">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-indigo-600">{po.poNumber}</p>
                                        <p className="text-xs text-gray-500">Ordered: {po.orderDate}</p>
                                    </div>
                                    <p className="text-xs text-gray-500">Due: {po.expectedDate}</p>
                                </div>
                                <div className="mt-2">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(po.status)}`}>{po.status}</span>
                                </div>
                            </li>
                        )) : <li className="p-4 text-sm text-gray-500 text-center">No open POs found.</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VendorsDashboard;