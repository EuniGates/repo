import React, { useState, useMemo, useEffect } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import EnvelopeIcon from './icons/EnvelopeIcon';
import ArrowDownTrayIcon from './icons/ArrowDownTrayIcon';
import PrinterIcon from './icons/PrinterIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import Logo from './Logo';
import SaveIcon from './icons/SaveIcon';
import PlusIcon from './icons/PlusIcon';
import Toast from './Toast';

// Mock Data
export const purchaseOrdersData = [
    {
        id: 'PO-2024-071',
        vendor: 'Cover Materials Co.',
        orderDate: '2024-11-10',
        expectedDate: '2024-11-25',
        status: 'Processing',
        shippingAddress: {
            company: 'Manufacturing ERP Inc.',
            street: '1 Manufacturing Way',
            city: 'Industrial Park',
            province: 'ON',
            postalCode: 'M1M 1M1'
        },
        vendorAddress: {
            company: 'Cover Materials Co.',
            street: '789 Industrial Park',
            city: 'Supplier City',
            province: 'ON',
            postalCode: 'L4B 2V9',
        },
        items: [
            { description: 'Heavy Duty Vinyl Roll - Black', qty: 5, rate: 250.00 },
            { description: 'Stainless Steel Springs (Box of 100)', qty: 10, rate: 120.00 },
            { description: 'Brass Anchors (Box of 100)', qty: 10, rate: 110.00 },
        ],
        taxRate: 0.13
    },
    {
        id: 'PO-2024-068',
        vendor: 'Foam & Core Inc.',
        orderDate: '2024-11-08',
        expectedDate: '2024-11-22',
        status: 'Shipped',
        shippingAddress: {
            company: 'Manufacturing ERP Inc.',
            street: '1 Manufacturing Way',
            city: 'Industrial Park',
            province: 'ON',
            postalCode: 'M1M 1M1'
        },
        vendorAddress: {
            company: 'Foam & Core Inc.',
            street: '321 Foam Factory Rd',
            city: 'Coreville',
            province: 'QC',
            postalCode: 'J7W 5E1',
        },
        items: [
            { description: '1.5 LB Density Foam Insert (4x8 sheet)', qty: 50, rate: 85.00 },
            { description: 'Vapour Barrier Roll (6 Mil)', qty: 5, rate: 75.00 },
        ],
        taxRate: 0.13
    },
    {
        id: 'PO-2024-075',
        vendor: 'Foam & Core Inc.',
        orderDate: '2024-11-15',
        expectedDate: '2024-11-30',
        status: 'Awaiting Confirmation',
        shippingAddress: {
            company: 'Manufacturing ERP Inc.',
            street: '1 Manufacturing Way',
            city: 'Industrial Park',
            province: 'ON',
            postalCode: 'M1M 1M1'
        },
        vendorAddress: {
            company: 'Foam & Core Inc.',
            street: '321 Foam Factory Rd',
            city: 'Coreville',
            province: 'QC',
            postalCode: 'J7W 5E1',
        },
        items: [
            { description: '2.0 LB Density Foam Insert (4x8 sheet)', qty: 20, rate: 115.00 },
        ],
        taxRate: 0.13
    }
];

const PurchasingDashboard: React.FC = () => {
    const [POs, setPOs] = useState(purchaseOrdersData);
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedPO, setSelectedPO] = useState<(typeof purchaseOrdersData)[0] | null>(null);

    const handleSelectPO = (po: (typeof purchaseOrdersData)[0]) => {
        setSelectedPO(po);
        setView('detail');
    };

    const handleBackToList = () => {
        setSelectedPO(null);
        setView('list');
    };

    const handleSavePO = (updatedPO: typeof purchaseOrdersData[0]) => {
        setPOs(prevPOs => prevPOs.map(p => (p.id === updatedPO.id ? updatedPO : p)));
        setSelectedPO(updatedPO);
    };

    const sortedPOs = useMemo(() => 
        [...POs].sort((a, b) => new Date(a.expectedDate).getTime() - new Date(b.expectedDate).getTime()),
    [POs]);

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Order Received': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'In transit': return 'bg-purple-100 text-purple-800';
            case 'Order placed':
            case 'Awaiting Confirmation': return 'bg-slate-200 text-slate-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (view === 'detail' && selectedPO) {
        return <PurchaseOrderDetail po={selectedPO} onBack={handleBackToList} onSave={handleSavePO} getStatusClass={getStatusClass} />;
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                        <CreditCardIcon className="h-8 w-8 text-gray-500" />
                        <span>Purchasing Dashboard</span>
                    </h1>
                    <p className="mt-1 text-gray-500">View and manage all active purchase orders.</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">PO #</th>
                            <th scope="col" className="px-6 py-3">Vendor</th>
                            <th scope="col" className="px-6 py-3">Expected Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPOs.map(po => (
                            <tr key={po.id} onClick={() => handleSelectPO(po)} className="bg-white border-b hover:bg-slate-50 cursor-pointer">
                                <td className="px-6 py-4 font-medium text-indigo-600 hover:underline">{po.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{po.vendor}</td>
                                <td className="px-6 py-4">{po.expectedDate}</td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(po.status)}`}>{po.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PurchaseOrderDetail = ({ po, onBack, onSave, getStatusClass }) => {
    const [isEditingItems, setIsEditingItems] = useState(false);
    const [editedPO, setEditedPO] = useState(po);
    const [showToast, setShowToast] = useState(false);
    
    useEffect(() => {
        setEditedPO(po);
    }, [po]);

    const triggerToast = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const handleCancelItemEdit = () => {
        setIsEditingItems(false);
        setEditedPO(po); // Revert item changes
    };

    const handleSaveItems = () => {
        onSave(editedPO);
        setIsEditingItems(false);
        triggerToast();
    };

    const handleFieldChangeAndSave = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedPO = { ...editedPO, [name]: value };
        setEditedPO(updatedPO);
        onSave(updatedPO); // Save immediately
        triggerToast();
    };
    
    const handleItemChange = (index, field, value) => {
        const newItems = [...editedPO.items];
        const numericValue = (field === 'qty' || field === 'rate') ? parseFloat(value) || 0 : value;
        newItems[index] = { ...newItems[index], [field]: numericValue };
        setEditedPO(prev => ({ ...prev, items: newItems }));
    };

    const handleAddItem = () => {
        const newItems = [...editedPO.items, { description: 'New Item', qty: 1, rate: 0.00 }];
        setEditedPO(prev => ({ ...prev, items: newItems }));
    };
    
    const handleRemoveItem = (indexToRemove) => {
        const newItems = editedPO.items.filter((_, index) => index !== indexToRemove);
        setEditedPO(prev => ({ ...prev, items: newItems }));
    };


    const subtotal = useMemo(() => editedPO.items.reduce((acc, item) => acc + item.qty * item.rate, 0), [editedPO.items]);
    const tax = subtotal * editedPO.taxRate;
    const total = subtotal + tax;

    const allStatuses = ["Order placed", "In transit", "Order Received", "Processing", "Shipped", "Awaiting Confirmation"];

    return (
        <div className="space-y-6">
            <Toast message="Your changes have been saved." show={showToast} />
            <div>
                 <button onClick={onBack} className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-4">
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Back to Purchase Orders</span>
                </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-6 border-b">
                    <div>
                        <Logo className="h-12 w-auto mb-4"/>
                        <h2 className="text-3xl font-bold text-gray-900">Purchase Order</h2>
                        <p className="text-gray-500">{editedPO.id}</p>
                    </div>
                     <div className="flex items-center space-x-2">
                        {isEditingItems ? (
                            <>
                                <button onClick={handleCancelItemEdit} className="px-4 py-2 bg-white border border-slate-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleSaveItems} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                                    <SaveIcon className="h-4 w-4" />
                                    <span>Save Items</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <ActionButton icon={PencilIcon} label="Edit Items" onClick={() => setIsEditingItems(true)} />
                                <ActionButton icon={EnvelopeIcon} label="Email" />
                                <ActionButton icon={ArrowDownTrayIcon} label="Download" />
                                <ActionButton icon={PrinterIcon} label="Print" />
                                <ActionButton icon={TrashIcon} label="Delete" variant="danger" />
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Vendor</h4>
                        <p className="font-bold text-gray-800">{editedPO.vendorAddress.company}</p>
                        <p className="text-gray-600">{editedPO.vendorAddress.street}</p>
                        <p className="text-gray-600">{`${editedPO.vendorAddress.city}, ${editedPO.vendorAddress.province} ${editedPO.vendorAddress.postalCode}`}</p>
                    </div>
                     <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Ship To</h4>
                        <p className="font-bold text-gray-800">{editedPO.shippingAddress.company}</p>
                        <p className="text-gray-600">{editedPO.shippingAddress.street}</p>
                        <p className="text-gray-600">{`${editedPO.shippingAddress.city}, ${editedPO.shippingAddress.province} ${editedPO.shippingAddress.postalCode}`}</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-4 bg-slate-50 rounded-lg">
                    <div>
                        <p className="text-sm font-semibold text-gray-500">PO Number</p>
                        <p className="font-medium text-gray-800">{editedPO.id}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Order Date</p>
                        <p className="font-medium text-gray-800">{editedPO.orderDate}</p>
                    </div>
                     <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">ETA</p>
                        <input
                            type="date"
                            name="expectedDate"
                            value={editedPO.expectedDate}
                            onChange={handleFieldChangeAndSave}
                            className="w-full p-2 bg-white border border-slate-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">Status</p>
                         <select
                            name="status"
                            value={editedPO.status}
                            onChange={handleFieldChangeAndSave}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                         >
                            {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                    </div>
                </div>

                <div className="mt-8 overflow-x-auto">
                     <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-100 rounded-t-lg">
                            <tr>
                                <th className="px-4 py-3 font-semibold w-full">Description</th>
                                <th className="px-4 py-3 font-semibold text-right">Qty</th>
                                <th className="px-4 py-3 font-semibold text-right">Rate</th>
                                <th className="px-4 py-3 font-semibold text-right">Amount</th>
                                {isEditingItems && <th className="px-4 py-3 font-semibold text-center"></th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {editedPO.items.map((item, index) => (
                                <tr key={index}>
                                    {isEditingItems ? (
                                        <>
                                            <td className="px-4 py-2"><input type="text" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="w-full p-2 bg-white border border-slate-300 rounded-md" /></td>
                                            <td className="px-4 py-2"><input type="number" value={item.qty} onChange={e => handleItemChange(index, 'qty', e.target.value)} className="w-20 p-2 bg-white border border-slate-300 rounded-md text-right" /></td>
                                            <td className="px-4 py-2"><input type="number" step="0.01" value={item.rate.toFixed(2)} onChange={e => handleItemChange(index, 'rate', e.target.value)} className="w-24 p-2 bg-white border border-slate-300 rounded-md text-right" /></td>
                                            <td className="px-4 py-2 text-right font-medium text-gray-800">${(item.qty * item.rate).toFixed(2)}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button onClick={() => handleRemoveItem(index)} className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-100 transition-colors">
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-4 py-3 font-medium text-gray-800">{item.description}</td>
                                            <td className="px-4 py-3 text-right text-gray-600">{item.qty}</td>
                                            <td className="px-4 py-3 text-right text-gray-600">${item.rate.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-800">${(item.qty * item.rate).toFixed(2)}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                        {isEditingItems && (
                            <tfoot>
                                <tr>
                                    <td colSpan={5} className="px-4 pt-3">
                                        <button onClick={handleAddItem} className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                                            <PlusIcon className="h-4 w-4" />
                                            <span>Add Item</span>
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>

                <div className="flex justify-end mt-8">
                    <div className="w-full max-w-xs space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-gray-600">Tax ({editedPO.taxRate * 100}%)</span>
                            <span className="font-medium text-gray-800">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2">
                            <span className="font-bold text-gray-900 text-lg">Total</span>
                            <span className="font-bold text-gray-900 text-lg">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ActionButton = ({ icon: Icon, label, variant = 'default', onClick = () => {} }) => {
    const baseClasses = "p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantClasses = {
        default: "text-gray-500 hover:bg-slate-100 hover:text-gray-800 focus:ring-indigo-500",
        danger: "text-red-500 hover:bg-red-100 hover:text-red-700 focus:ring-red-500",
    };
    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className={`${baseClasses} ${variantClasses[variant]}`}
                aria-label={label}
            >
                <Icon className="h-5 w-5" />
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {label}
            </div>
        </div>
    );
}

export default PurchasingDashboard;