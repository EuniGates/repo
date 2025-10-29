import React, { useState } from 'react';
import SaveIcon from './icons/SaveIcon';

const initialRectangleData = [
    { code: 'PSP-SFCN1224', poolSize: "12' X 24'", coverSize: "14' X 26'", price: 1269, stepCode: 'PSP-SFCS1224', stepPrice: 1594 },
    { code: 'PSP-SFCN1428', poolSize: "14' X 28'", coverSize: "16' X 30'", price: 1594, stepCode: 'PSP-SFCS1428', stepPrice: 1810 },
    { code: 'PSP-SFCN1632', poolSize: "16' X 32'", coverSize: "18' X 34'", price: 1774, stepCode: 'PSP-SFCS1632', stepPrice: 2099 },
    { code: 'PSP-SFCN1634', poolSize: "16' X 34'", coverSize: "18' X 36'", price: 1920, stepCode: 'PSP-SFCS1634', stepPrice: 2245 },
    { code: 'PSP-SFCN1636', poolSize: "16' X 36'", coverSize: "18' X 38'", price: 2064, stepCode: 'PSP-SFCS1636', stepPrice: 2315 },
    { code: 'PSP-SFCN1640', poolSize: "16' X 40'", coverSize: "18' X 42'", price: 2208, stepCode: 'PSP-SFCS1640', stepPrice: 2461 },
    { code: 'PSP-SFCN1836', poolSize: "18' X 36'", coverSize: "20' x 38'", price: 2208, stepCode: 'PSP-SFCS1836', stepPrice: 2461 },
    { code: 'PSP-SFCN1840', poolSize: "18' X 40'", coverSize: "20' x 42'", price: 2388, stepCode: 'PSP-SFCS1840', stepPrice: 2643 },
    { code: 'PSP-SFCN2040', poolSize: "20' X 40'", coverSize: "22' X 42'", price: 2498, stepCode: 'PSP-SFCS2040', stepPrice: 2752 },
];

const initialCustomRectangleData = [
    { sqft: '0-199', price5x5: 6.18, price3x3: 7.02 }, { sqft: '200-299', price5x5: 5.35, price3x3: 6.31 },
    { sqft: '300-349', price5x5: 5.00, price3x3: 5.96 }, { sqft: '350-399', price5x5: 4.76, price3x3: 5.69 },
    { sqft: '400-449', price5x5: 4.51, price3x3: 5.44 }, { sqft: '450-499', price5x5: 4.33, price3x3: 5.28 },
    { sqft: '500-599', price5x5: 3.93, price3x3: 4.86 }, { sqft: '600-649', price5x5: 3.80, price3x3: 4.76 },
    { sqft: '650-699', price5x5: 3.60, price3x3: 4.56 }, { sqft: '700-799', price5x5: 3.54, price3x3: 4.51 },
    { sqft: '800-899', price5x5: 3.46, price3x3: 4.40 }, { sqft: '900-999', price5x5: 3.27, price3x3: 4.23 },
    { sqft: '1000-1049', price5x5: 3.17, price3x3: 4.12 }, { sqft: '1050-1099', price5x5: 3.10, price3x3: 4.05 },
    { sqft: '1100-1149', price5x5: 3.01, price3x3: 3.97 }, { sqft: '1150-1199', price5x5: 2.91, price3x3: 3.84 },
    { sqft: '1200-1299', price5x5: 2.86, price3x3: 3.80 }, { sqft: '1300-1399', price5x5: 2.80, price3x3: 3.75 },
    { sqft: '1400-1499', price5x5: 2.78, price3x3: 3.73 }, { sqft: '1500-1599', price5x5: 2.76, price3x3: 3.70 },
    { sqft: '1600-1699', price5x5: 2.73, price3x3: 3.69 }, { sqft: '1700-1799', price5x5: 2.66, price3x3: 3.60 },
    { sqft: '1800-1899', price5x5: 2.64, price3x3: 3.59 }, { sqft: '1900+', price5x5: 2.59, price3x3: 3.55 },
];

const initialFreeformData = [
    { sqft: '01-199', price: 9.59 }, { sqft: '200-299', price: 8.04 }, { sqft: '300-349', price: 6.79 },
    { sqft: '350-399', price: 6.34 }, { sqft: '400-449', price: 6.00 }, { sqft: '450-499', price: 5.69 },
    { sqft: '500-599', price: 5.39 }, { sqft: '600-649', price: 5.25 }, { sqft: '650-699', price: 5.05 },
    { sqft: '700-799', price: 4.98 }, { sqft: '800-899', price: 4.86 }, { sqft: '900-999', price: 4.76 },
    { sqft: '1000-1049', price: 4.70 }, { sqft: '1050-1099', price: 4.66 }, { sqft: '1100-1149', price: 4.65 },
    { sqft: '1150-1199', price: 4.58 }, { sqft: '1200-1299', price: 4.56 }, { sqft: '1300-1399', price: 4.53 },
    { sqft: '1400-1499', price: 4.51 }, { sqft: '1500-1599', price: 4.47 }, { sqft: '1600-1699', price: 4.44 },
    { sqft: '1700-1799', price: 4.33 }, { sqft: '1800-1899', price: 4.26 }, { sqft: '1900-2099', price: 4.24 },
];

const initialAdditionalChargesData = [
    { charge: "Step up to & including 8 ft.", unit: 'ea', price: 236.43 },
    { charge: "Step larger than 8 ft.", unit: 'ea', price: 354.65 },
    { charge: "Wood Deck Anchors 5'x5'", unit: 'pool linear ft.', price: 4.57 },
    { charge: "Wood Deck Anchors 3'x3'", unit: 'pool linear ft.', price: 7.39 },
    { charge: "Interlocking Stakes 5'x5'", unit: 'pool linear ft.', price: 3.27 },
    { charge: "Interlocking Stakes 3'x3'", unit: 'pool linear ft.', price: 5.33 },
    { charge: "Garden Stakes 5'x5'", unit: 'pool linear ft.', price: 5.97 },
    { charge: "Garden Stakes 3'x3'", unit: 'pool linear ft.', price: 9.15 },
    { charge: "Raised Walls, Rocks, Waterfalls", unit: 'pool linear ft.', price: 51.72 },
    { charge: "Perimeter Padding", unit: 'pool linear ft.', price: 8.09 },
    { charge: "Extra Padding", unit: 'ea', price: 51.72 },
    { charge: "Cut Corners", unit: 'ea', price: 66.49 },
    { charge: "Cut Out (Grab Rails, Diving Board Ladders)", unit: 'ea', price: 91.83 },
    { charge: "Roman Ends 5'x5'", unit: 'ea', price: 140.39 },
    { charge: "Roman Ends 3'x3'", unit: 'ea', price: 0.00 },
    { charge: "RDM (Reduced Deck Mount)", unit: 'pool Linear ft', price: 23.81 },
];

const initialHardwareData = [
    { code: 'PSP-ANCCONB', hardware: 'Brass Anchors Concrete', unit: 'ea', price: 11.26 },
    { code: 'PSP-ANCWODB', hardware: 'Brass Anchors Wood', unit: 'ea', price: 17.95 },
    { code: 'PSP-ANCCOLB', hardware: 'Brass Anchors Collars', unit: 'ea', price: 4.57 },
    { code: 'PSP-SPRSRTS', hardware: 'SS Springs Short', unit: 'ea', price: 11.97 },
    { code: 'PSP-SPRHVDS', hardware: 'SS Heavy Duty Springs', unit: 'ea', price: 20.76 },
    { code: 'PSP-INSTROD', hardware: 'Installation Rod', unit: 'ea', price: 41.52 },
    { code: 'PSP-STAKINT', hardware: 'Interlocking Stakes', unit: 'ea', price: 20.76 },
    { code: 'PSP-STAKGDN', hardware: 'Garden Stakes', unit: 'ea', price: 28.15 },
    { code: 'PSP-ANCKEYS', hardware: 'Anchor Key', unit: 'ea', price: 14.78 },
    { code: 'PSP-ANCWALL', hardware: 'SS Wall Anchors', unit: 'ea', price: 20.76 },
    { code: 'PSP-TAMPTOL', hardware: 'Tamp Tool', unit: 'ea', price: 7.39 },
    { code: 'PSP-BUCKLES', hardware: 'Buckles', unit: 'ea', price: 4.57 },
    { code: 'PSP-STRGBAG', hardware: 'Storage Bag', unit: 'ea', price: 50.32 },
];

interface PricingData {
    rectangleData: typeof initialRectangleData;
    customRectangleData: typeof initialCustomRectangleData;
    freeformData: typeof initialFreeformData;
    additionalCharges: typeof initialAdditionalChargesData;
    hardware: typeof initialHardwareData;
}

const initial2024Data: PricingData = {
    rectangleData: initialRectangleData,
    customRectangleData: initialCustomRectangleData,
    freeformData: initialFreeformData,
    additionalCharges: initialAdditionalChargesData,
    hardware: initialHardwareData,
};

const EditablePriceInput = ({ value, onChange }: { value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
        <input
            type="number"
            value={value.toFixed(2)}
            onChange={onChange}
            className="w-32 pl-7 pr-2 py-1.5 bg-slate-100 border border-transparent rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
        />
    </div>
);

const SafetyCoverPricing: React.FC = () => {
    const [pricingVersions, setPricingVersions] = useState<{ [year: number]: PricingData }>({ 2024: initial2024Data });
    const [activeYear, setActiveYear] = useState(2024);

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
    
    const handlePriceChange = (dataType: keyof PricingData, index: number, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPricingVersions(prev => {
            const newVersions = { ...prev };
            const newYearData = { ...newVersions[activeYear] };
            const newDataArray = [...(newYearData[dataType] as any[])];
            newDataArray[index] = { ...newDataArray[index], [field]: parseFloat(value) || 0 };
            (newYearData[dataType] as any) = newDataArray;
            newVersions[activeYear] = newYearData;
            return newVersions;
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Safety Cover Pricing</h1>
                    <p className="mt-1 text-gray-500">Pricing Effective May 1st, {activeYear}</p>
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

            {/* Standard Rectangle Covers */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-gray-800">Standard Rectangle Covers - 5'x5' Grid</h3>
                    <p className="text-sm text-gray-500 mt-1">Pricing for predefined sizes with and without steps.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Pool Size</th>
                                <th className="px-4 py-3 font-semibold">Without Step Code</th>
                                <th className="px-4 py-3 font-semibold">Without Step Price</th>
                                <th className="px-4 py-3 font-semibold">With Step Code</th>
                                <th className="px-4 py-3 font-semibold">With Step Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {activeData.rectangleData.map((row, index) => (
                                <tr key={row.code} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{row.poolSize}</td>
                                    <td className="px-4 py-3 text-gray-500">{row.code}</td>
                                    <td className="px-4 py-3"><EditablePriceInput value={row.price} onChange={handlePriceChange('rectangleData', index, 'price')} /></td>
                                    <td className="px-4 py-3 text-gray-500">{row.stepCode}</td>
                                    <td className="px-4 py-3"><EditablePriceInput value={row.stepPrice} onChange={handlePriceChange('rectangleData', index, 'stepPrice')} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Covers Pricing */}
             <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-gray-800">Custom Covers - Price Per Sq. Ft.</h3>
                    <p className="text-sm text-gray-500 mt-1">Tiered pricing based on total square footage.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 p-6">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Custom Rectangle Covers</h4>
                        <div className="overflow-x-auto border rounded-lg">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Total Sq. Ft.</th>
                                        <th className="px-4 py-3 font-semibold">5'x5' Grid</th>
                                        <th className="px-4 py-3 font-semibold">3'x3' Grid</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {activeData.customRectangleData.map((row, index) => (
                                        <tr key={row.sqft} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{row.sqft}</td>
                                            <td className="px-4 py-3"><EditablePriceInput value={row.price5x5} onChange={handlePriceChange('customRectangleData', index, 'price5x5')} /></td>
                                            <td className="px-4 py-3"><EditablePriceInput value={row.price3x3} onChange={handlePriceChange('customRectangleData', index, 'price3x3')} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                         <h4 className="font-semibold text-gray-700 mb-2">Custom Freeform Covers (3'x3' Grid)</h4>
                         <div className="overflow-x-auto border rounded-lg">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Total Sq. Ft.</th>
                                        <th className="px-4 py-3 font-semibold">Price/Sq. Ft.</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {activeData.freeformData.map((row, index) => (
                                        <tr key={row.sqft} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{row.sqft}</td>
                                            <td className="px-4 py-3"><EditablePriceInput value={row.price} onChange={handlePriceChange('freeformData', index, 'price')} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Charges & Hardware */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Additional Charges */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-slate-200">
                        <h3 className="text-lg font-semibold text-gray-800">Additional Charges & Upgrades</h3>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Charge</th>
                                    <th className="px-4 py-3 font-semibold">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {activeData.additionalCharges.map((row, index) => (
                                    <tr key={row.charge} className="hover:bg-slate-50">
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-gray-900">{row.charge}</p>
                                            <p className="text-xs text-gray-500">{row.unit}</p>
                                        </td>
                                        <td className="px-4 py-3"><EditablePriceInput value={row.price} onChange={handlePriceChange('additionalCharges', index, 'price')} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Hardware */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-slate-200">
                        <h3 className="text-lg font-semibold text-gray-800">Extra Hardware</h3>
                    </div>
                     <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Hardware</th>
                                    <th className="px-4 py-3 font-semibold">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {activeData.hardware.map((row, index) => (
                                    <tr key={row.code} className="hover:bg-slate-50">
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-gray-900">{row.hardware}</p>
                                            <p className="text-xs text-gray-500">{row.code} &middot; {row.unit}</p>
                                        </td>
                                        <td className="px-4 py-3"><EditablePriceInput value={row.price} onChange={handlePriceChange('hardware', index, 'price')} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafetyCoverPricing;