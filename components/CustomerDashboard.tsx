import React, { useState, useMemo, useEffect } from 'react';
import PlusIcon from './icons/PlusIcon';
import SearchIcon from './icons/SearchIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import SaveIcon from './icons/SaveIcon';
import UsersGroupIcon from './icons/UsersGroupIcon';
import { ordersData } from './OrdersDashboard';
import AdminPasscodeModal from './AdminPasscodeModal';
import DocumentTextIcon from './icons/DocumentTextIcon';
import { getTaxRate } from './taxData';
import CakeIcon from './icons/CakeIcon';
import BanknotesIcon from './icons/BanknotesIcon';
import WrenchIcon from './icons/WrenchIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import Toast from './Toast';
import TruckIcon from './icons/TruckIcon';
import OrderDetail from './OrderDetail';

// Mock Data
const customersData = [
    {
        id: 1,
        company: 'Aqua Pools Inc.',
        contact: 'Paul Mintha',
        email: 'paul.mintha@durhamcovers.com',
        phone: '905-259-4514',
        billingAddress: {
            street: '45 Pochon Avenue',
            city: 'Port Hope',
            province: 'ON',
            postalCode: 'L1A 2X8',
            country: 'Canada'
        },
        shippingAddresses: [
            { id: 1, name: 'Main Warehouse', street: '45 Pochon Avenue', city: 'Port Hope', province: 'ON', postalCode: 'L1A 2X8', country: 'Canada', ftlPrice: 500.00 },
            { id: 2, name: 'Toronto Drop Point', street: '123 Distribution Rd', city: 'Toronto', province: 'ON', postalCode: 'M5V 2T6', country: 'Canada', ftlPrice: 650.00 },
        ],
        notes: 'Long-time customer, high volume dealer. Prefers email communication.',
        taxExempt: true,
        users: [
            { id: 1, name: 'Paul Mintha', email: 'paul.mintha@durhamcovers.com', position: 'Owner', verified: true },
            { id: 2, name: 'Reception', email: 'reception@aquapools.com', position: 'Admin', verified: false },
        ]
    },
    {
        id: 2,
        company: 'Global Spas',
        contact: 'Jessica Ray',
        email: 'jray@globalspas.com',
        phone: '416-555-1234',
        billingAddress: {
            street: '1 Global Way',
            city: 'Toronto',
            province: 'ON',
            postalCode: 'M5V 2T6',
            country: 'Canada'
        },
        shippingAddresses: [
             { id: 3, name: 'Primary Location', street: '1 Global Way', city: 'Toronto', province: 'ON', postalCode: 'M5V 2T6', country: 'Canada', ftlPrice: 650.00 },
        ],
        notes: 'Newer customer, growing quickly.',
        taxExempt: false,
        users: [
             { id: 3, name: 'Jessica Ray', email: 'jray@globalspas.com', position: 'Manager', verified: true },
        ]
    },
    {
        id: 3,
        company: 'Waterfront Dealers',
        contact: 'Ben Carter',
        email: 'ben.c@waterfront.ca',
        phone: '705-555-5678',
        billingAddress: {
            street: '456 Lakeview',
            city: 'Barrie',
            province: 'ON',
            postalCode: 'L4N 0C5',
            country: 'Canada'
        },
        shippingAddresses: [
            { id: 4, name: 'Barrie Storefront', street: '456 Lakeview', city: 'Barrie', province: 'ON', postalCode: 'L4N 0C5', country: 'Canada', ftlPrice: 700.00 },
        ],
        notes: '',
        taxExempt: false,
        users: []
    }
];


const CustomerDashboard: React.FC<{ setActivePage: (page: string) => void; }> = ({ setActivePage }) => {
    const [customers, setCustomers] = useState(customersData);
    const [view, setView] = useState<'list' | 'profile' | 'orderDetail'>('list');
    const [selectedCustomer, setSelectedCustomer] = useState<(typeof customersData)[0] | null>(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectCustomer = (customer: (typeof customersData)[0]) => {
        setSelectedCustomer(customer);
        setView('profile');
    };

    const handleBackToList = () => {
        setSelectedCustomer(null);
        setView('list');
    };
    
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setView('orderDetail');
    };

    const handleBackToProfile = () => {
        setSelectedOrder(null);
        setView('profile');
    };
    
    const handleDeleteCustomer = (customerId: number) => {
        if(window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
            setCustomers(prev => prev.filter(c => c.id !== customerId));
            setView('list');
        }
    };

    const filteredCustomers = customers.filter(c =>
        c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (view === 'orderDetail' && selectedOrder) {
        return <OrderDetail order={selectedOrder} onBack={handleBackToProfile} onDelete={() => { /* no-op from this view */ }} />;
    }

    if (view === 'profile' && selectedCustomer) {
        return <CustomerProfile customer={selectedCustomer} onBack={handleBackToList} onViewOrder={handleViewOrder} onDelete={() => handleDeleteCustomer(selectedCustomer.id)} />;
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                        <UsersGroupIcon className="h-8 w-8 text-gray-500" />
                        <span>Customers</span>
                    </h1>
                    <p className="mt-1 text-gray-500">Manage customer profiles and view their order history.</p>
                </div>
                <button className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300">
                    <PlusIcon className="h-5 w-5" />
                    <span>Add New Customer</span>
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
                        {filteredCustomers.map(customer => (
                            <tr key={customer.id} onClick={() => handleSelectCustomer(customer)} className="bg-white border-b hover:bg-slate-50 cursor-pointer">
                                <td className="px-6 py-4 font-medium text-gray-900">{customer.company}</td>
                                <td className="px-6 py-4">{customer.contact}</td>
                                <td className="px-6 py-4">{customer.email}</td>
                                <td className="px-6 py-4">{customer.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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

const CustomerProfile = ({ customer, onBack, onViewOrder, onDelete }: { customer: (typeof customersData)[0], onBack: () => void, onViewOrder: (order: any) => void, onDelete: () => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState(customer);
    const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
    const [isTaxExemptEditable, setIsTaxExemptEditable] = useState(false);
    const [users, setUsers] = useState(customer.users || []);
    const [newUserEmail, setNewUserEmail] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        setEditedCustomer(customer);
        setUsers(customer.users || []);
        setIsEditing(false);
        setIsTaxExemptEditable(false);
    }, [customer]);

    const triggerToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const customerStats = useMemo(() => {
        const customerOrders = ordersData.filter(order => (order.customer || order.billingAddress?.company) === customer.company);
        const currentYear = new Date().getFullYear();
        const ordersThisYear = customerOrders.filter(order => new Date(order.placedDate).getFullYear() === currentYear);

        let customerSince = 'N/A';
        if (customerOrders.length > 0) {
            const firstOrderDate = customerOrders.reduce((earliest, order) => {
                const orderDate = new Date(order.placedDate);
                return orderDate < earliest ? orderDate : earliest;
            }, new Date());
            
            const now = new Date();
            let years = now.getFullYear() - firstOrderDate.getFullYear();
            let months = now.getMonth() - firstOrderDate.getMonth();
            if (months < 0 || (months === 0 && now.getDate() < firstOrderDate.getDate())) {
                years--;
                months = (months + 12) % 12;
            }
            customerSince = `${years > 0 ? `${years}y` : ''} ${months > 0 ? `${months}m` : ''}`.trim();
            if (!customerSince) customerSince = 'New';
        }

        const totalPurchasedYTD = ordersThisYear.reduce((total, order) => {
            const subtotal = (order.summary?.products || 0) + (order.summary?.upgradesTotal || 0);
            const taxRate = getTaxRate(order.shippingAddress?.province || order.billingAddress?.province) / 100;
            const orderTotal = subtotal * (1 + taxRate);
            return total + orderTotal;
        }, 0);
        
        const outstandingOrders = customerOrders.filter(order => 
            (order.status === 'Invoiced' || order.status === 'Shipped/Picked-up' || order.status === 'Delivered') && order.paid === false
        );

        const outstandingAmount = outstandingOrders.reduce((total, order) => {
             const subtotal = (order.summary?.products || 0) + (order.summary?.upgradesTotal || 0);
            const taxRate = getTaxRate(order.shippingAddress?.province || order.billingAddress?.province) / 100;
            const orderTotal = subtotal * (1 + taxRate);
            return total + orderTotal;
        }, 0);

        const currency = customer.billingAddress.country === 'Canada' ? 'CAD' : 'USD';

        const totalClaims = customerOrders.reduce((total, order) => total + (order.claims?.length || 0), 0);

        return {
            customerSince,
            totalPurchasedYTD: new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(totalPurchasedYTD),
            outstandingAmount: new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(outstandingAmount),
            currency,
            totalClaims
        };
    }, [customer.company, customer.billingAddress.country]);
    
    const ordersThisYear = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return ordersData
            .filter(order => (order.customer || order.billingAddress?.company) === customer.company)
            .filter(order => new Date(order.placedDate).getFullYear() === currentYear);
    }, [customer.company]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Awaiting Approval': return 'bg-gray-300 text-gray-800';
            case 'In Cutting': return 'bg-blue-500 text-white';
            case 'Shipped/Picked-up': return 'bg-cyan-500 text-white';
            case 'In Design': return 'bg-blue-500 text-white';
            case 'In Production': return 'bg-purple-200 text-purple-800';
            case 'Invoiced': return 'bg-green-200 text-green-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedCustomer(customer);
        setIsTaxExemptEditable(false);
    };

    const handleSave = () => {
        setIsEditing(false);
        setIsTaxExemptEditable(false);
        // Here you would typically make an API call to save the data
        triggerToast('Customer details saved successfully!');
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        if (name === 'taxExempt') {
            if (!isTaxExemptEditable) {
                setIsPasscodeModalOpen(true);
                return;
            }
            setEditedCustomer(prev => ({ ...prev, [name]: checked }));
        } else {
             setEditedCustomer(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, objectKey: 'billingAddress' | 'shippingAddresses', index?: number) => {
        const { name, value } = e.target;

        if (objectKey === 'shippingAddresses' && index !== undefined) {
            const updatedAddresses = [...editedCustomer.shippingAddresses];
            updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
            setEditedCustomer(prev => ({...prev, shippingAddresses: updatedAddresses}));
        } else {
            setEditedCustomer(prev => ({
                ...prev,
                [objectKey]: { ...prev[objectKey], [name]: value }
            }));
        }
    };

    const handleAddShippingAddress = () => {
        const newAddress = { id: Date.now(), name: 'New Location', street: '', city: '', province: '', postalCode: '', country: 'Canada', ftlPrice: 0.00 };
        setEditedCustomer(prev => ({ ...prev, shippingAddresses: [...prev.shippingAddresses, newAddress] }));
    };

    const handleRemoveShippingAddress = (id: number) => {
        if (editedCustomer.shippingAddresses.length <= 1) {
            triggerToast('Cannot remove the only shipping address.');
            return;
        }
        setEditedCustomer(prev => ({ ...prev, shippingAddresses: prev.shippingAddresses.filter(addr => addr.id !== id) }));
    };
    
    const onPasscodeSuccess = () => {
        setIsPasscodeModalOpen(false);
        setIsTaxExemptEditable(true);
        // Toggle the checkbox after successful auth
        setEditedCustomer(prev => ({ ...prev, taxExempt: !prev.taxExempt }));
    };
    
    const handleSendInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (newUserEmail && !users.some(u => u.email === newUserEmail)) {
            const newUser = {
                id: Date.now(),
                name: 'N/A',
                email: newUserEmail,
                position: 'N/A',
                verified: false
            };
            setUsers(prev => [...prev, newUser]);
            setNewUserEmail('');
            triggerToast(`Invitation sent to ${newUserEmail}`);
        } else if (users.some(u => u.email === newUserEmail)) {
            triggerToast('This email address is already a user.');
        }
    };

    const handleResendInvite = (userId) => {
        const user = users.find(u => u.id === userId);
        triggerToast(`Invitation resent to ${user?.email}`);
    };
    
    return (
        <div className="space-y-8">
            <Toast message={toastMessage} show={showToast} />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <button onClick={onBack} className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-2">
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span>Back to Customers</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">{customer.company}</h1>
                    <p className="mt-1 text-gray-500">Contact: {customer.contact}</p>
                </div>
                 <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    {isEditing ? (
                         <>
                            <button onClick={handleCancel} className="px-4 py-2 bg-white border border-slate-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-slate-100">Cancel</button>
                            <button onClick={handleSave} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700">
                                <SaveIcon className="h-4 w-4" />
                                <span>Save Changes</span>
                            </button>
                        </>
                    ) : (
                         <>
                            <button onClick={() => setIsEditing(true)} className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-slate-100">
                                <PencilIcon className="h-4 w-4" />
                                <span>Edit</span>
                            </button>
                            <button onClick={onDelete} className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700">
                                <TrashIcon className="h-4 w-4" />
                                <span>Delete</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-4 rounded-xl">
                <KpiCard icon={CakeIcon} title="Customer Since" value={customerStats.customerSince} bgColor="bg-blue-100" iconColor="text-blue-600" />
                <KpiCard icon={BanknotesIcon} title={`Total Purchased (YTD)`} value={customerStats.totalPurchasedYTD} bgColor="bg-green-100" iconColor="text-green-600" />
                <KpiCard icon={BanknotesIcon} title={`Outstanding Amount`} value={customerStats.outstandingAmount} bgColor="bg-red-100" iconColor="text-red-600" />
                <KpiCard icon={WrenchIcon} title="Warranties Claimed" value={customerStats.totalClaims} bgColor="bg-yellow-100" iconColor="text-yellow-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                     <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <EditableField label="Company Name" name="company" value={editedCustomer.company} onChange={handleChange} isEditing={isEditing} />
                            <EditableField label="Contact Person" name="contact" value={editedCustomer.contact} onChange={handleChange} isEditing={isEditing} />
                            <EditableField label="Email Address" name="email" value={editedCustomer.email} onChange={(e) => handleChange(e)} isEditing={isEditing} type="email" />
                            <EditableField label="Phone Number" name="phone" value={editedCustomer.phone} onChange={handleChange} isEditing={isEditing} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing Address</h3>
                        <div className="space-y-4">
                            <EditableField label="Street Address" name="street" value={editedCustomer.billingAddress.street} onChange={(e) => handleAddressChange(e, 'billingAddress')} isEditing={isEditing} />
                            <EditableField label="City" name="city" value={editedCustomer.billingAddress.city} onChange={(e) => handleAddressChange(e, 'billingAddress')} isEditing={isEditing} />
                            <EditableField label="Province/State" name="province" value={editedCustomer.billingAddress.province} onChange={(e) => handleAddressChange(e, 'billingAddress')} isEditing={isEditing} />
                            <EditableField label="Postal Code" name="postalCode" value={editedCustomer.billingAddress.postalCode} onChange={(e) => handleAddressChange(e, 'billingAddress')} isEditing={isEditing} />
                        </div>
                    </div>
                </div>
                 <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800">Account Details</h3>
                        <div className="mt-4 flex items-center p-3 bg-slate-50 rounded-md border border-slate-200">
                            <input
                                id="taxExempt"
                                name="taxExempt"
                                type="checkbox"
                                checked={editedCustomer.taxExempt}
                                onChange={handleChange}
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="taxExempt" className="ml-3 block text-sm">
                                <span className="font-semibold text-gray-800">Tax Exempt</span>
                                <p className="text-gray-500">Enable if customer has a valid tax exemption certificate.</p>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                             <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                                <TruckIcon className="h-5 w-5 text-gray-500" />
                                <span>Shipping Addresses & FTL Pricing</span>
                            </h3>
                            {isEditing && (
                                <button onClick={handleAddShippingAddress} className="text-sm font-semibold text-indigo-600 hover:underline flex items-center space-x-1">
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Add Address</span>
                                </button>
                            )}
                        </div>
                        <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                            {editedCustomer.shippingAddresses.map((addr, index) => (
                                <div key={addr.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50 relative">
                                    {isEditing && (
                                        <button onClick={() => handleRemoveShippingAddress(addr.id)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-100">
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                        <EditableField label="Location Name" name="name" value={addr.name} onChange={(e) => handleAddressChange(e, 'shippingAddresses', index)} isEditing={isEditing} />
                                        <div className="sm:col-span-2">
                                            <EditableField label="Street Address" name="street" value={addr.street} onChange={(e) => handleAddressChange(e, 'shippingAddresses', index)} isEditing={isEditing} />
                                        </div>
                                        <EditableField label="City" name="city" value={addr.city} onChange={(e) => handleAddressChange(e, 'shippingAddresses', index)} isEditing={isEditing} />
                                        <EditableField label="Province/State" name="province" value={addr.province} onChange={(e) => handleAddressChange(e, 'shippingAddresses', index)} isEditing={isEditing} />
                                        <EditableField label="Postal Code" name="postalCode" value={addr.postalCode} onChange={(e) => handleAddressChange(e, 'shippingAddresses', index)} isEditing={isEditing} />
                                         <div className="relative">
                                            {isEditing ? (
                                                <>
                                                    <label className="block text-sm font-semibold text-gray-600 mb-1">FTL Price</label>
                                                    <div className="relative">
                                                         <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                                        <input type="number" name="ftlPrice" value={addr.ftlPrice} onChange={(e) => handleAddressChange(e, 'shippingAddresses', index)} className="w-full pl-7 p-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-sm font-semibold text-gray-500">FTL Price</p>
                                                    <p className="text-gray-800">${addr.ftlPrice.toFixed(2)}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">User Accounts</h3>
                        <form onSubmit={handleSendInvite} className="flex items-center space-x-2 mb-4">
                            <input 
                                type="email"
                                value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                placeholder="Enter new user's email"
                                className="flex-grow p-2 bg-slate-100 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                            <button type="submit" className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 shrink-0">
                                <PaperAirplaneIcon className="h-4 w-4" />
                                <span>Send Invite</span>
                            </button>
                        </form>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Position</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? users.map(user => (
                                        <tr key={user.id} className="border-b">
                                            <td className="px-4 py-2 font-medium">{user.name}</td>
                                            <td className="px-4 py-2 text-gray-600">{user.email}</td>
                                            <td className="px-4 py-2 text-gray-600">{user.position}</td>
                                            <td className="px-4 py-2">
                                                {user.verified ? (
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Verified</span>
                                                ) : (
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                {!user.verified && (
                                                    <button onClick={() => handleResendInvite(user.id)} className="text-xs font-semibold text-indigo-600 hover:underline">Resend</button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="text-center text-gray-500 py-4">No users for this customer.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders This Year ({ordersThisYear.length})</h3>
                        {ordersThisYear.length > 0 ? (
                            <div className="overflow-x-auto max-h-72">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-700 uppercase bg-slate-50 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-2">Order ID</th>
                                            <th className="px-4 py-2">PO #</th>
                                            <th className="px-4 py-2">Status</th>
                                            <th className="px-4 py-2">Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {ordersThisYear.map(order => (
                                            <tr key={order.id} onClick={() => onViewOrder(order)} className="hover:bg-slate-50 cursor-pointer">
                                                <td className="px-4 py-3 font-medium text-indigo-600">{order.id}</td>
                                                <td className="px-4 py-3 text-gray-600">{order.po}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 font-medium">{new Date(order.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-4">No orders placed this year.</p>
                        )}
                    </div>
                </div>
            </div>
            {isPasscodeModalOpen && <AdminPasscodeModal onClose={() => setIsPasscodeModalOpen(false)} onSuccess={onPasscodeSuccess} />}
        </div>
    );
};


const EditableField = ({ label, value, name, onChange, isEditing, type = 'text' }: { label: string; value: string; name: string; onChange: (e: any) => void; isEditing: boolean; type?: string; }) => {
    return isEditing ? (
        <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    ) : (
        <div>
            <p className="text-sm font-semibold text-gray-500">{label}</p>
            <p className="text-gray-800">{value}</p>
        </div>
    );
};


export default CustomerDashboard;