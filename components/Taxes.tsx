import React, { useState } from 'react';
import SaveIcon from './icons/SaveIcon';
import PencilIcon from './icons/PencilIcon';
import { initialCanadianTaxes, initialUsTaxes } from './taxData';

const Taxes: React.FC = () => {
    const [canadianTaxes, setCanadianTaxes] = useState(initialCanadianTaxes);
    const [usTaxes, setUsTaxes] = useState(initialUsTaxes);
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedCanadianTaxes, setEditedCanadianTaxes] = useState(initialCanadianTaxes);
    const [editedUsTaxes, setEditedUsTaxes] = useState(initialUsTaxes);


    const handleCanadaChange = (province: string, value: string) => {
        const intValue = parseInt(value, 10);
        setEditedCanadianTaxes(prev => ({ ...prev, [province]: isNaN(intValue) ? 0 : intValue }));
    };

    const handleUsChange = (state: string, value: string) => {
        const intValue = parseInt(value, 10);
        setEditedUsTaxes(prev => ({ ...prev, [state]: isNaN(intValue) ? 0 : intValue }));
    };

    const handleEdit = () => {
        setEditedCanadianTaxes(canadianTaxes);
        setEditedUsTaxes(usTaxes);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        setCanadianTaxes(editedCanadianTaxes);
        setUsTaxes(editedUsTaxes);
        setIsEditing(false);
        // In a real app, you would post these changes to a backend API.
        // For this demo, this just updates the local state of this component.
        // Other components will use the initially imported values.
    };

    return (
        <div className="space-y-8">
             <style>{`
                .number-input-no-spinners::-webkit-outer-spin-button,
                .number-input-no-spinners::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .number-input-no-spinners {
                    -moz-appearance: textfield;
                }
            `}</style>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Tax Rate Management</h1>
                    <p className="mt-1 text-gray-500">Set tax rates for provinces and states.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    {isEditing ? (
                        <>
                            <button onClick={handleCancel} className="px-4 py-2 bg-white border border-slate-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                                <SaveIcon className="h-4 w-4" />
                                <span>Save Changes</span>
                            </button>
                        </>
                    ) : (
                        <button onClick={handleEdit} className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                            <PencilIcon className="h-4 w-4" />
                            <span>Edit Rates</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Canadian Taxes */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-gray-800">Canadian Provinces & Territories</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Province / Territory</th>
                                <th className="px-6 py-3 font-semibold text-right">Tax Rate (%)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {Object.entries(isEditing ? editedCanadianTaxes : canadianTaxes).map(([province, rate]) => (
                                <tr key={province} className="hover:bg-slate-50">
                                    <td className="px-6 py-3 font-medium text-gray-900">{province}</td>
                                    <td className="px-6 py-3 text-right">
                                        {isEditing ? (
                                             <div className="relative inline-block">
                                                <input
                                                    type="number"
                                                    step="1"
                                                    value={editedCanadianTaxes[province]}
                                                    onChange={(e) => handleCanadaChange(province, e.target.value)}
                                                    className="w-28 pl-2 pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-right number-input-no-spinners"
                                                />
                                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-none">%</span>
                                            </div>
                                        ) : (
                                            <span className="font-medium text-gray-800 pr-2">{rate}%</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* US Taxes */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-gray-800">United States</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 font-semibold">State</th>
                                <th className="px-6 py-3 font-semibold text-right">Tax Rate (%)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {Object.entries(isEditing ? editedUsTaxes : usTaxes).map(([state, rate]) => (
                                <tr key={state} className="hover:bg-slate-50">
                                    <td className="px-6 py-3 font-medium text-gray-900">{state}</td>
                                    <td className="px-6 py-3 text-right">
                                        {isEditing ? (
                                             <div className="relative inline-block">
                                                <input
                                                    type="number"
                                                    step="1"
                                                    value={editedUsTaxes[state]}
                                                    onChange={(e) => handleUsChange(state, e.target.value)}
                                                    className="w-28 pl-2 pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-right number-input-no-spinners"
                                                />
                                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-none">%</span>
                                            </div>
                                        ) : (
                                            <span className="font-medium text-gray-800 pr-2">{rate}%</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Taxes;
