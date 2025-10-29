import React, { useState, useMemo, useEffect, useRef } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import SaveIcon from './icons/SaveIcon';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import PoolVisualizer from './PoolVisualizer';

const DECK_TYPES = ['Concrete', 'Wood', 'Interlock', 'Garden'];

const ABMeasurementEditor = ({ job, onBack, onSave, customers }) => {
    const [jobData, setJobData] = useState(job);
    const [lastCompletedPointIndex, setLastCompletedPointIndex] = useState(null);
    const pointsContainerRef = useRef(null);
    const prevPointsLength = useRef(jobData.points.length);

    useEffect(() => {
        if (pointsContainerRef.current && jobData.points.length > prevPointsLength.current) {
            const lastPointRow = pointsContainerRef.current.lastElementChild;
            if (lastPointRow) {
                const firstInput = lastPointRow.querySelector('input[name="a_ft"]');
                if (firstInput) {
                    firstInput.focus();
                }
            }
        }
        prevPointsLength.current = jobData.points.length;
    }, [jobData.points.length]);

    const handleChange = (e) => setJobData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handlePointChange = (index, field, value) => {
        const newPoints = [...jobData.points];
        newPoints[index] = { ...newPoints[index], [field]: value };
        setJobData(prev => ({ ...prev, points: newPoints }));
    };
    const handleAddPoint = () => setJobData(prev => ({ ...prev, points: [...prev.points, { a_ft: '', a_in: '', b_ft: '', b_in: '', side: '+' }] }));
    const handleRemovePoint = (index) => setJobData(prev => ({ ...prev, points: prev.points.filter((_, i) => i !== index) }));
    const handleKeyDown = (e, index) => {
        if (e.key === 'Tab' && !e.shiftKey && index === jobData.points.length - 1) {
            e.preventDefault();
            handleAddPoint();
        }
    };
    const togglePointSide = (index) => {
        const newPoints = [...jobData.points];
        newPoints[index] = { ...newPoints[index], side: newPoints[index].side === '+' ? '-' : '+' };
        setJobData(prev => ({ ...prev, points: newPoints }));
    };
    
    // Handlers for Steps
    const handleAddStep = () => setJobData(prev => ({ ...prev, steps: [...(prev.steps || []), { from: 1, to: 1 }] }));
    const handleRemoveStep = (index) => setJobData(prev => ({ ...prev, steps: prev.steps.filter((_, i) => i !== index) }));
    const handleStepChange = (index, field, value) => {
        const newSteps = [...jobData.steps];
        newSteps[index] = { ...newSteps[index], [field]: parseInt(value, 10) || 1 };
        setJobData(prev => ({ ...prev, steps: newSteps }));
    };

    // Handlers for Decking
    const handleAddDeck = () => setJobData(prev => ({ ...prev, decking: [...(prev.decking || []), { from: 1, to: 1, type: 'Concrete' }] }));
    const handleRemoveDeck = (index) => setJobData(prev => ({ ...prev, decking: prev.decking.filter((_, i) => i !== index) }));
    const handleDeckChange = (index, field, value) => {
        const newDecks = [...jobData.decking];
        const val = field === 'type' ? value : (parseInt(value, 10) || 1);
        newDecks[index] = { ...newDecks[index], [field]: val };
        setJobData(prev => ({ ...prev, decking: newDecks }));
    };


    const handleSave = () => {
        if (!jobData.customer || !jobData.name || !jobData.baseline) {
            alert('Please fill in Customer, Job Name, and Baseline Length.');
            return;
        }
        onSave({...jobData, status: 'Completed'});
    };

    const visualizerPoints = useMemo(() => {
        return jobData.points.map(p => ({
            a: (parseInt(p.a_ft, 10) || 0) * 12 + (parseFloat(p.a_in) || 0),
            b: (parseInt(p.b_ft, 10) || 0) * 12 + (parseFloat(p.b_in) || 0),
            side: p.side,
        }));
    }, [jobData.points]);
    
    const pointOptions = Array.from({ length: jobData.points.length }, (_, i) => i + 1);

    return (
        <div className="space-y-6">
            <div>
                <button onClick={onBack} className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-2">
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Back to Measurement List</span>
                </button>
                <h1 className="text-3xl font-bold text-gray-800">Measurement Editor</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField label="Customer" name="customer" value={jobData.customer} onChange={handleChange} options={customers} placeholder="Select Customer" />
                        <InputField label="Job Name" name="name" value={jobData.name} onChange={handleChange} placeholder="e.g., Smith Residence" />
                    </div>
                    <InputField label="A-B Baseline Length (inches)" name="baseline" type="number" value={jobData.baseline} onChange={handleChange} />
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Measurement Points</h3>
                        <div ref={pointsContainerRef} className="space-y-2 max-h-72 overflow-y-auto pr-2">
                            {jobData.points.map((point, index) => (
                                <div key={index} className="flex items-center space-x-2 bg-slate-50 p-2 rounded-md">
                                    <span className="font-bold text-gray-600 w-8 text-center">{index + 1}.</span>
                                    <input type="number" name="a_ft" placeholder="ft" value={point.a_ft} onChange={e => handlePointChange(index, 'a_ft', e.target.value)} onBlur={() => setLastCompletedPointIndex(index)} className="w-full p-2 border border-slate-300 rounded text-center"/>
                                    <input type="number" step="0.1" name="a_in" placeholder="in" value={point.a_in} onChange={e => handlePointChange(index, 'a_in', e.target.value)} onBlur={() => setLastCompletedPointIndex(index)} className="w-full p-2 border border-slate-300 rounded text-center"/>
                                    <span className="text-gray-300">|</span>
                                    <input type="number" name="b_ft" placeholder="ft" value={point.b_ft} onChange={e => handlePointChange(index, 'b_ft', e.target.value)} onBlur={() => setLastCompletedPointIndex(index)} className="w-full p-2 border border-slate-300 rounded text-center"/>
                                    <input type="number" step="0.1" name="b_in" placeholder="in" onKeyDown={e => handleKeyDown(e, index)} onChange={e => handlePointChange(index, 'b_in', e.target.value)} onBlur={() => setLastCompletedPointIndex(index)} className="w-full p-2 border border-slate-300 rounded text-center"/>
                                    <button onClick={() => togglePointSide(index)} className={`w-10 h-10 text-lg font-bold rounded ${point.side === '+' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>{point.side}</button>
                                    <button onClick={() => handleRemovePoint(index)} className="p-2 text-gray-500 hover:text-red-600"><TrashIcon className="h-5 w-5"/></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleAddPoint} className="mt-2 flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"><PlusIcon className="h-4 w-4" /><span>Add Point</span></button>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Steps</h3>
                        <div className="space-y-2">
                             {(jobData.steps || []).map((step, index) => (
                                <div key={index} className="flex items-center space-x-2 bg-slate-50 p-2 rounded-md">
                                    {/* FIX: Add placeholder prop to satisfy TypeScript. */}
                                    <SelectField label="From" value={step.from} onChange={e => handleStepChange(index, 'from', e.target.value)} options={pointOptions} placeholder="From Point" />
                                    {/* FIX: Add placeholder prop to satisfy TypeScript. */}
                                    <SelectField label="To" value={step.to} onChange={e => handleStepChange(index, 'to', e.target.value)} options={pointOptions} placeholder="To Point" />
                                    <button onClick={() => handleRemoveStep(index)} className="p-2 text-gray-500 hover:text-red-600 self-end mb-1"><TrashIcon className="h-5 w-5"/></button>
                                </div>
                            ))}
                        </div>
                         <button onClick={handleAddStep} className="mt-2 flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"><PlusIcon className="h-4 w-4" /><span>Add Step</span></button>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Decking</h3>
                        <div className="space-y-2">
                             {(jobData.decking || []).map((deck, index) => (
                                <div key={index} className="flex items-center space-x-2 bg-slate-50 p-2 rounded-md">
                                    {/* FIX: Add placeholder prop to satisfy TypeScript. */}
                                    <SelectField label="From" value={deck.from} onChange={e => handleDeckChange(index, 'from', e.target.value)} options={pointOptions} placeholder="From Point" />
                                    {/* FIX: Add placeholder prop to satisfy TypeScript. */}
                                    <SelectField label="To" value={deck.to} onChange={e => handleDeckChange(index, 'to', e.target.value)} options={pointOptions} placeholder="To Point" />
                                    {/* FIX: Add placeholder prop to satisfy TypeScript. */}
                                    <SelectField label="Type" value={deck.type} onChange={e => handleDeckChange(index, 'type', e.target.value)} options={DECK_TYPES} placeholder="Select Type" />
                                    <button onClick={() => handleRemoveDeck(index)} className="p-2 text-gray-500 hover:text-red-600 self-end mb-1"><TrashIcon className="h-5 w-5"/></button>
                                </div>
                            ))}
                        </div>
                         <button onClick={handleAddDeck} className="mt-2 flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"><PlusIcon className="h-4 w-4" /><span>Add Deck Section</span></button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Pool Shape Visualizer</h3>
                    <div className="w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-2">
                        <PoolVisualizer 
                            baselineLength={jobData.baseline} 
                            points={visualizerPoints}
                            steps={jobData.steps}
                            decking={jobData.decking}
                            lastCompletedPointIndex={lastCompletedPointIndex}
                        />
                    </div>
                </div>
            </div>
            
            <div className="flex justify-end items-center space-x-4">
                 <button onClick={onBack} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100">Cancel</button>
                <button onClick={handleSave} className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"><SaveIcon className="h-5 w-5" /><span>Save & Mark Completed</span></button>
            </div>
        </div>
    );
};

const InputField = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
        <input {...props} className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg"/>
    </div>
);

const SelectField = ({ label, options, placeholder, ...props }) => (
     <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
        <select {...props} className="w-full p-2 bg-white border border-slate-300 rounded-lg">
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);


export default ABMeasurementEditor;
