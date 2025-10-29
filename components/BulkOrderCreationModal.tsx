import React, { useState, useMemo } from 'react';
import XIcon from './icons/XIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

const BulkOrderCreationModal = ({ customers, models, onClose, onAddOrder }) => {
    const [step, setStep] = useState(1);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [poNumber, setPoNumber] = useState('');
    const [lineItems, setLineItems] = useState([{ modelId: '', qty: 1 }]);

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleItemChange = (index, field, value) => {
        const newItems = [...lineItems];
        newItems[index][field] = value;
        setLineItems(newItems);
    };

    const handleAddItem = () => {
        setLineItems([...lineItems, { modelId: '', qty: 1 }]);
    };
    
    const handleRemoveItem = (index) => {
        setLineItems(lineItems.filter((_, i) => i !== index));
    };
    
    // FIX: Refactored handleSubmit to be more robust and prevent runtime errors.
    const handleSubmit = () => {
        const finalLineItems = lineItems.map((item, i) => {
            if (!item.modelId) return null;
            const modelDetails = models.find(m => m.id === parseInt(String(item.modelId), 10));
            if (!modelDetails) return null;

            return {
                id: Date.now() + i,
                make: modelDetails.make,
                model: modelDetails.model,
                specs: {
                    shape: modelDetails.shape,
                    dimensions: modelDetails.dimensions,
                    skirt: modelDetails.skirt,
                    fold: modelDetails.fold,
                },
                qty: parseInt(String(item.qty), 10) || 0,
                completed: 0,
                price: 300.00 // Placeholder price
            };
        }).filter(Boolean);

        if (finalLineItems.length === 0) {
            alert("Please add at least one valid line item.");
            return;
        }

        const totalCovers = finalLineItems.reduce((acc, item) => acc + item.qty, 0);

        const newOrder = {
            id: `FTL-${Date.now()}`,
            customer: selectedCustomer,
            poNumber: poNumber,
            totalCovers: totalCovers,
            status: 'Pending',
            orderDate: new Date().toISOString().split('T')[0],
            lineItems: finalLineItems,
        };
        onAddOrder(newOrder);
    };

    const modelOptions = useMemo(() => models.map(m => ({ id: m.id, name: `${m.make} - ${m.model}` })), [models]);

    const renderStep1 = () => (
        <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Order Details</h3>
            <div className="space-y-4">
                <SelectField label="Customer" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} options={customers} placeholder="Select Customer" required/>
                <InputField label="PO Number" value={poNumber} onChange={(e) => setPoNumber(e.target.value)} required/>
            </div>
        </>
    );

    const renderStep2 = () => (
        <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Add Line Items</h3>
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                {lineItems.map((item, index) => (
                    <div key={index} className="flex items-end space-x-2 bg-slate-50 p-3 rounded-lg border">
                        <div className="flex-1">
                            <label className="text-xs font-semibold">Product</label>
                            <select value={item.modelId} onChange={e => handleItemChange(index, 'modelId', e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                                <option value="">Select Model</option>
                                {modelOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                            </select>
                        </div>
                        <div className="w-24">
                            <label className="text-xs font-semibold">Quantity</label>
                            <input type="number" value={item.qty} onChange={e => handleItemChange(index, 'qty', e.target.value)} className="w-full p-2 border border-slate-300 rounded-md"/>
                        </div>
                        <button onClick={() => handleRemoveItem(index)} className="p-2 text-gray-500 hover:text-red-600 rounded-md hover:bg-red-100 mb-1"><TrashIcon className="h-5 w-5"/></button>
                    </div>
                ))}
            </div>
            <button onClick={handleAddItem} className="mt-2 flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"><PlusIcon className="h-4 w-4" /><span>Add Line Item</span></button>
        </>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
                <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-gray-800">Add New Bulk Order</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100"><XIcon className="h-6 w-6" /></button>
                </div>
                <div className="p-6">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                </div>
                <div className="flex justify-between items-center p-6 bg-slate-50 rounded-b-2xl">
                    <button onClick={handleBack} disabled={step === 1} className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100 disabled:opacity-50">
                        <ChevronLeftIcon className="h-5 w-5"/><span>Back</span>
                    </button>
                    {step < 2 ? (
                        <button onClick={handleNext} disabled={!selectedCustomer || !poNumber} className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400">Next &rarr;</button>
                    ) : (
                        <button onClick={handleSubmit} className="px-8 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Create Bulk Order</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {props.required && <span className="text-red-500">*</span>}</label>
        <input {...props} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg"/>
    </div>
);

const SelectField = ({ label, options, placeholder, ...props }) => (
     <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {props.required && <span className="text-red-500">*</span>}</label>
        <select {...props} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg">
            <option value="">{placeholder}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

export default BulkOrderCreationModal;
