import React, { useState } from 'react';
import SaveIcon from './icons/SaveIcon';

const initialBasePrices = [
    { taper: '4"-3"', density: '1.5 LB', price: '312.00' },
    { taper: '5"-3"', density: '1.5 LB', price: '320.00' },
    { taper: '5"-4"', density: '1.5 LB', price: '341.00' },
    { taper: '6"-4"', density: '1.5 LB', price: '372.75' },
];

const initialOptions = [
    { item: 'Skirt up to 4"', price: 'FREE' },
    { item: 'Skirt 4.5" to 10"', price: '15.00' },
    { item: '6 Mil Vapour Barrier', price: '15.00' },
    { item: 'Full Hinge Insulation', price: '25.00' },
    { item: '4 Ties', price: 'FREE' },
    { item: 'Extra Ties (Each)', price: '5.00' },
    { item: '2 Handles', price: 'FREE' },
    { item: '2 Extra Handles', price: '15.00' },
    { item: '4 Extra Handles', price: '30.00' },
    { item: 'Speaker Hoods (Each)', price: 'Call for quote' },
    { item: 'Tri-Fold, Quad-Fold', price: 'Call for quote' },
];

const initialParts = [
    { item: 'Lifter Plates', price: '90.00' },
    { item: 'Skins up to 96"', price: '160.00' },
    { item: 'Replacement Warning Label', price: '5.00' },
];

const initialFoamInserts = [
    { item: '4-3 Taper', price: '110.00' },
    { item: '5-3 Taper', price: '125.00' },
    { item: '5-4 Taper', price: '130.00' },
    { item: '6-4 Taper', price: '138.00' },
];

interface SpaPricingData {
    basePrices: typeof initialBasePrices;
    options: typeof initialOptions;
    parts: typeof initialParts;
    foamInserts: typeof initialFoamInserts;
}

const initial2025Data: SpaPricingData = {
    basePrices: initialBasePrices,
    options: initialOptions,
    parts: initialParts,
    foamInserts: initialFoamInserts,
};

const EditableSpaPriceInput = ({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const isNumeric = !isNaN(parseFloat(value)) && isFinite(Number(value));
    return (
        <div className="relative">
            {isNumeric && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>}
            <input
                type="text"
                value={value}
                onChange={onChange}
                className={`w-36 pr-2 py-1.5 bg-slate-100 border border-transparent rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition ${isNumeric ? 'pl-7' : 'pl-3'}`}
            />
        </div>
    );
};


const SpaCoverPricing: React.FC = () => {
    const [pricingVersions, setPricingVersions] = useState<{ [year: number]: SpaPricingData }>({ 2025: initial2025Data });
    const [activeYear, setActiveYear] = useState(2025);

    const activeData = pricingVersions[activeYear];
    const sortedYears = Object.keys(pricingVersions).map(Number).sort((a, b) => b - a);
    
    const handleCreateNextYear = () => {
        const latestYear = Math.max(...Object.keys(pricingVersions).map(Number));
        const nextYear = latestYear + 1;
        setPricingVersions(prev => ({
            ...prev,
            [nextYear]: JSON.parse(JSON.stringify(prev[latestYear]))
        }));
        setActiveYear(nextYear);
    };

    const handlePriceChange = (dataType: keyof SpaPricingData, index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPricingVersions(prev => {
            const newVersions = { ...prev };
            const newYearData = { ...newVersions[activeYear] };
            const newDataArray = [...(newYearData[dataType] as any[])];
            newDataArray[index] = { ...newDataArray[index], price: value };
            (newYearData[dataType] as any) = newDataArray;
            newVersions[activeYear] = newYearData;
            return newVersions;
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Spa Cover Pricing</h1>
                    <p className="mt-1 text-gray-500">{activeYear} Price List (Dealer)</p>
                </div>
                 <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    <button 
                        onClick={handleCreateNextYear}
                        className="px-4 py-2 bg-white border border-slate-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                        Create Next Year's Price
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                        <SaveIcon className="h-4 w-4" />
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                     {sortedYears.map((year) => (
                        <button
                            key={year}
                            onClick={() => setActiveYear(year)}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm transition-colors ${
                                activeYear === year
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                        {year} Pricing
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-gray-800">Base Prices by Taper</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Taper</th>
                                <th className="px-4 py-3 font-semibold">Density</th>
                                <th className="px-4 py-3 font-semibold">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {activeData.basePrices.map((row, index) => (
                                <tr key={row.taper} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{row.taper}</td>
                                    <td className="px-4 py-3 text-gray-500">{row.density}</td>
                                    <td className="px-4 py-3">
                                        <EditableSpaPriceInput value={row.price} onChange={handlePriceChange('basePrices', index)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-sm lg:col-span-1 xl:col-span-1">
                    <div className="p-6 border-b border-slate-200">
                        <h3 className="text-lg font-semibold text-gray-800">Options</h3>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left">
                            <tbody className="divide-y divide-slate-200">
                                {activeData.options.map((row, index) => (
                                    <tr key={index} className="hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium text-gray-800">{row.item}</td>
                                        <td className="px-4 py-3">
                                            <EditableSpaPriceInput value={row.price} onChange={handlePriceChange('options', index)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-8 lg:col-span-1 xl:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-semibold text-gray-800">Parts & Accessories</h3>
                        </div>
                         <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <tbody className="divide-y divide-slate-200">
                                    {activeData.parts.map((row, index) => (
                                        <tr key={index} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-gray-800">{row.item}</td>
                                            <td className="px-4 py-3">
                                                <EditableSpaPriceInput value={row.price} onChange={handlePriceChange('parts', index)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-semibold text-gray-800">Replacement Foam Inserts</h3>
                        </div>
                         <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <tbody className="divide-y divide-slate-200">
                                    {activeData.foamInserts.map((row, index) => (
                                        <tr key={index} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-gray-800">{row.item}</td>
                                            <td className="px-4 py-3">
                                                <EditableSpaPriceInput value={row.price} onChange={handlePriceChange('foamInserts', index)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                 <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2 xl:col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Cover Features</h3>
                    <ul className="space-y-3">
                        {["Manufactured in Canada", "ASTM Approved", "Marine grade vinyl treated with U.V. Inhibitors", "1.5 lb. foam insulation", "3-mil Heat sealed vapor barrier protection", "Reinforced C-channel for added strength", "Available in 4 different colors (Black, Charcoal, Chocolate, Light Grey)"].map(feature => (
                            <li key={feature} className="flex items-center">
                                <svg className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span className="text-gray-600 text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SpaCoverPricing;
