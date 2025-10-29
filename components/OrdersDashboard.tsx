import React, { useState, useMemo } from 'react';
import OrderDetail from './OrderDetail';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ClockIcon from './icons/ClockIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import WaveIcon from './icons/WaveIcon';
import OrderCreationModal from './OrderCreationModal';
import PlusCircleIcon from './icons/PlusCircleIcon';

// Mock data based on the screenshot, expanded for detail view
export const ordersData = [
  {
    id: 'Order 2034',
    status: 'In Production',
    placedDate: '2024-03-18',
    po: '4046 frank pacheco mono',
    dueDate: '2024-05-02',
    customer: 'Aqua Pools Inc.',
    pickupDate: 'July 2nd, 2025',
    warrantyName: 'Standard 3-Year',
    paid: true,
    warrantyRegistration: {
      status: 'Registered',
      registrationDate: '2024-04-01',
      customer: {
        name: 'Paul Mintha',
        email: 'paul.mintha@durhamcovers.com',
        address: '45 Pochon Avenue, Port Hope, Ontario, L1A 2X8, Canada.',
      },
      receiptUrl: 'https://i.imgur.com/8a1nH4x.jpeg',
    },
    claims: [
        {
            date: '2024-08-15',
            reason: 'Water Logged',
            replacement: '2 Foam Inserts'
        }
    ],
    product: {
      name: 'Custom Spa Cover Charcoal',
      tag: '4046 frank pacheco mono',
      sku: 'arctic coyote, drifter',
      dimensions: '79" x 92" x 1" Rectangle/square with round corners',
      fold: 'Bi-Fold | Fold B in Half',
      color: 'Charcoal',
      taper: '5" - 4" taper',
      skirt: '4" (Standard) tie downs',
      notes: 'Notes: please use your template since the shape is a large oval, we made this cover in 2015 Nov 19, p.o. 5450, customer pickup',
      shape: 'Square/rectangle with Rounded Corners',
      shapeDimensions: { A: '79"', B: '92"', C: '1"' },
      upgrades: [
        { name: 'Full Hinge Insulation', price: 25.00 },
        { name: '6 Mil Vapour Barrier', price: 15.00 },
      ],
      uniqueId: null,
    },
    notes: [
        { user: 'Frank Pacheco', text: 'Customer called to confirm dimensions. All good.', timestamp: '2024-03-19 02:15 PM' }
    ],
    billingAddress: {
      company: 'Aqua Pools Inc.',
      street: '45 Pochon Avenue',
      city: 'Port Hope',
      province: 'ON',
      postalCode: 'L1A 2X8',
      country: 'Canada',
      contactName: 'Paul Mintha',
      phone: '905-259-4514',
      email: 'paul.mintha@durhamcovers.com',
    },
    shippingAddress: {
      company: 'Aqua Pools Inc.',
      street: '123 Shipping Lane',
      city: 'Port Hope',
      province: 'ON',
      postalCode: 'L1A 2X9',
      country: 'Canada',
      contactName: 'Paul Mintha',
      phone: '905-259-4514',
    },
    shippingDetails: {
      method: 'Customer Pickup',
      carrierContact: 'Paul'
    },
    summary: {
      quantity: 1,
      unitPrice: 295.00,
      products: 295.00,
      upgradesTotal: 40.00,
    },
    activity: [
        { user: 'Frank Pacheco', action: 'created the order', timestamp: '2024-03-18 10:05 AM' },
        { user: 'Admin User', action: 'sent order confirmation to Durham Covers', timestamp: '2024-03-18 10:06 AM' },
        { user: 'Admin User', action: 'approved the order', timestamp: '2024-03-18 11:00 AM' },
        { user: 'Designer AI', action: 'generated the design file', timestamp: '2024-03-19 09:00 AM' },
        { user: 'Cutting Dept', action: 'marked as cut', timestamp: '2024-03-20 02:30 PM' },
        { user: 'Prep Dept', action: 'marked as prepped', timestamp: '2024-03-21 09:00 AM' },
        { user: 'Sewing Dept', action: 'marked as sewn', timestamp: '2024-03-22 11:00 AM' },
    ],
    rush: true,
  },
   {
    id: 'SC-4001',
    status: 'In Production',
    placedDate: '2025-09-07',
    po: 'CHRI-101',
    dueDate: '2025-09-11',
    paid: false,
    warrantyName: 'Pro-Rated 20-Year',
    warrantyRegistration: {
      status: 'Registered',
      registrationDate: '2025-09-10',
       customer: {
        name: 'Chris Evans',
        email: 'chris.e@example.com',
        address: '123 Evans Rd, Muskoka, ON, P1L 1A1, Canada',
      },
      receiptUrl: 'https://i.imgur.com/TAn2wY1.jpeg',
    },
    claims: [],
    product: {
      name: 'Custom Safety Cover',
      tag: 'Chris Evans Property',
      sku: '5x5 Grid - Green',
      shape: 'Rectangle',
      poolSize: "16' x 32'",
      coverSize: "18' x 34'",
      deckType: 'Wood Deck',
      meshType: 'Standard Green Mesh',
      gridType: "5'x5' Grid",
      steps: 'None',
      hardware: [
        { name: 'SS Heavy Duty Springs', qty: 32 },
        { name: 'Brass Anchors Wood', qty: 32 },
        { name: 'Installation Rod', qty: 1 },
        { name: 'Anchor Key', qty: 1 },
        { name: 'Storage Bag', qty: 1 },
      ],
      fold: 'N/A',
      color: 'Green',
      taper: 'N/A',
      skirt: 'N/A',
      notes: 'Custom cutout required for diving board. Wood deck anchors needed.',
      shapeDimensions: { A: "16'", B: "32'"},
      upgrades: [{ name: 'Wood Deck Anchors', price: 150.00 }],
      uniqueId: null,
    },
    notes: [],
    billingAddress: {
      company: 'Chris Evans',
      street: '123 Evans Rd',
      city: 'Muskoka',
      province: 'ON',
      postalCode: 'P1L 1A1',
      country: 'Canada',
      contactName: 'Chris Evans',
      phone: '555-222-3333',
      email: 'chris.e@example.com',
    },
    shippingAddress: {
      company: 'Chris Evans',
      street: '123 Evans Rd',
      city: 'Muskoka',
      province: 'ON',
      postalCode: 'P1L 1A1',
      country: 'Canada',
      contactName: 'Chris Evans',
      phone: '555-222-3333',
    },
    shippingDetails: {
      method: 'Standard Freight',
      carrierContact: 'UPS'
    },
    summary: {
      quantity: 1,
      unitPrice: 1774.00,
      products: 1774.00,
      upgradesTotal: 150.00,
    },
    activity: [
        { user: 'Alice Johnson', action: 'created the order', timestamp: '2025-09-07 02:15 PM' },
        { user: 'Admin User', action: 'approved the order', timestamp: '2025-09-07 03:00 PM' },
        { user: 'Designer AI', action: 'generated the design file', timestamp: '2025-09-08 09:00 AM' },
        { user: 'Cutting Dept', action: 'marked as cut', timestamp: '2025-09-08 01:20 PM' },
        { user: 'Marking Dept', action: 'completed marking', timestamp: '2025-09-09 10:00 AM' },
    ],
    rush: false,
  },
  {
    id: 'HT-4000',
    status: 'Awaiting Approval',
    placedDate: '2024-12-20',
    po: 'GLOB-100',
    dueDate: '2025-01-13',
    customer: 'Global Spas',
    type: 'Hot Tub Cover',
    rush: false,
    paid: false,
     billingAddress: { street: '1 Global Way', city: 'Toronto', province: 'ON', company: 'Global Spas' },
    shippingAddress: { street: '1 Global Way', city: 'Toronto', province: 'ON' },
  },
  {
    id: 'SC-4002',
    status: 'Invoiced',
    placedDate: '2025-01-31',
    po: 'WATE-102',
    dueDate: '2025-02-03',
    customer: 'Waterfront Dealers',
    type: 'Safety Cover',
    rush: true,
    paid: false,
    summary: { products: 1800.00, upgradesTotal: 100.00 },
    billingAddress: { street: '456 Lakeview', city: 'Barrie', province: 'ON', company: 'Waterfront Dealers' },
    shippingAddress: { street: '456 Lakeview', city: 'Barrie', province: 'ON' },
  },
  {
    id: 'HT-4004',
    status: 'In Design',
    placedDate: '2025-02-12',
    po: 'TORO-104',
    dueDate: '2025-02-21',
    customer: 'Toronto Landscaping',
    type: 'Hot Tub Cover',
    rush: true,
    paid: false,
    billingAddress: { street: '789 Garden Ave', city: 'Toronto', province: 'ON', company: 'Toronto Landscaping' },
    shippingAddress: { street: '789 Garden Ave', city: 'Toronto', province: 'ON' },
  },
   {
    id: 'HT-4005',
    status: 'In Design',
    placedDate: '2024-10-11',
    po: '',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0], // Due in 3 days
    customer: 'Barrie Pools Inc.',
    type: 'Hot Tub Cover',
    rush: false,
    paid: false,
    billingAddress: { street: '101 Poolside Dr', city: 'Barrie', province: 'ON', company: 'Barrie Pools Inc.' },
    shippingAddress: { street: '101 Poolside Dr', city: 'Barrie', province: 'ON' },
  },
   {
    id: 'ORD-002',
    status: 'Delivered',
    placedDate: '2022-09-22',
    po: 'AQUA-RE',
    customer: 'Aqua Pools Inc.',
    summary: { products: 450.00, upgradesTotal: 50.00 },
    claims: [],
    paid: true,
    billingAddress: { company: 'Aqua Pools Inc.', province: 'ON' },
    shippingAddress: { company: 'Aqua Pools Inc.', province: 'ON' },
  },
];

const calculateLeadTime = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const checkOrderMatchesOption = (order, key, option) => {
    switch (key) {
        case 'status':
            if (option === 'Upcoming') {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const dueDate = new Date(order.dueDate);
                return dueDate >= today && order.status !== 'Invoiced';
            }
            return order.status === option;
        case 'productType':
            const type = order.type || '';
            const productName = order.product?.name || '';
            if (option === 'Safety Cover') {
                return type.toLowerCase().includes('safety') || productName.toLowerCase().includes('safety');
            }
            if (option === 'Spa Cover') {
                return type.toLowerCase().includes('hot tub') || productName.toLowerCase().includes('spa');
            }
            return false;
        case 'rushType':
            const isRush = option === 'Rush';
            return order.rush === isRush;
        case 'taper':
            return order.product?.taper?.includes(option) || false;
        case 'gridType':
            return order.product?.gridType === option;
        case 'customer':
            const orderCustomer = order.customer || order.billingAddress?.company;
            return orderCustomer === option;
        default:
            return true;
    }
}

const filterOrders = (orders, activeFilters) => {
    return orders.filter(order => {
        return Object.entries(activeFilters).every(([key, option]) => {
            if (option === 'All') return true;
            return checkOrderMatchesOption(order, key, option);
        });
    });
};

const getOptionCounts = (orders, allOptions, activeFilters, filterKeyToCount) => {
    const counts = {};

    const baseFilters = { ...activeFilters };
    delete baseFilters[filterKeyToCount];

    const preFilteredOrders = filterOrders(orders, baseFilters);

    counts['All'] = preFilteredOrders.length;
    allOptions.forEach(option => {
        if (option === 'All') return;
        const count = preFilteredOrders.filter(order => checkOrderMatchesOption(order, filterKeyToCount, option)).length;
        counts[option] = count;
    });

    return counts;
};


const OrdersDashboard: React.FC = () => {
    const [currentOrders, setCurrentOrders] = useState(ordersData);
    const [isOrderCreationOpen, setIsOrderCreationOpen] = useState(false);
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedOrder, setSelectedOrder] = useState<typeof ordersData[0] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [statusFilter, setStatusFilter] = useState('All');
    const [customerFilter, setCustomerFilter] = useState('All');
    const [productTypeFilter, setProductTypeFilter] = useState('All');
    const [rushTypeFilter, setRushTypeFilter] = useState('All');
    const [taperFilter, setTaperFilter] = useState('All');
    const [gridTypeFilter, setGridTypeFilter] = useState('All');

    const dashboardStats = useMemo(() => {
        const spaOrders = currentOrders.filter(o =>
            (o.type && o.type.toLowerCase().includes('hot tub')) ||
            (o.product && o.product.name.toLowerCase().includes('spa'))
        );
        const safetyOrders = currentOrders.filter(o =>
            (o.type && o.type.toLowerCase().includes('safety')) ||
            (o.product && o.product.name.toLowerCase().includes('safety'))
        );
    
        const totalSpaLeadTime = spaOrders.reduce((acc, order) => acc + calculateLeadTime(order.placedDate, order.dueDate), 0);
        const totalSafetyLeadTime = safetyOrders.reduce((acc, order) => acc + calculateLeadTime(order.placedDate, order.dueDate), 0);
    
        const avgSpaLeadTime = spaOrders.length > 0 ? Math.round(totalSpaLeadTime / spaOrders.length) : 0;
        const avgSafetyLeadTime = safetyOrders.length > 0 ? Math.round(totalSafetyLeadTime / safetyOrders.length) : 0;
    
        return {
          avgSpaLeadTime: `${avgSpaLeadTime} days`,
          avgSafetyLeadTime: `${avgSafetyLeadTime} days`,
          totalSpaCovers: spaOrders.length,
          totalSafetyCovers: safetyOrders.length
        };
      }, [currentOrders]);

    const sortedOrders = useMemo(() => {
        return [...currentOrders].sort((a, b) => {
            const aIsRush = a.rush === true;
            const bIsRush = b.rush === true;
    
            if (aIsRush && !bIsRush) return -1;
            if (!aIsRush && bIsRush) return 1;
    
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            
            if (isNaN(dateA.getTime())) return 1;
            if (isNaN(dateB.getTime())) return -1;

            return dateA.getTime() - dateB.getTime();
        });
    }, [currentOrders]);

    const statusOptions = useMemo(() => ['All', 'Upcoming', ...Array.from(new Set(currentOrders.map(o => o.status)))], [currentOrders]);
    
    const customersWithDetails = useMemo(() => {
        const customerMap = new Map();
        currentOrders.forEach(order => {
          const name = order.customer || order.billingAddress?.company;
          // Use shipping province for tax, as is convention
          const province = order.shippingAddress?.province;
          if (name && province && !customerMap.has(name)) {
            customerMap.set(name, { name, province });
          }
        });
        return Array.from(customerMap.values());
    }, [currentOrders]);

    const customerOptions = useMemo(() => ['All', ...customersWithDetails.map(c => c.name)], [customersWithDetails]);
    
    const productTypeOptions = ['All', 'Safety Cover', 'Spa Cover'];
    const rushTypeOptions = ['All', 'Rush', 'Standard'];
    const taperOptions = ['All', '4"-3"', '5"-3"', '5"-4"', '6"-4"'];
    const gridTypeOptions = ['All', `5'x5' Grid`, `3'x3' Grid`];

    const filters = [
        { key: 'status', label: 'Status', value: statusFilter, setter: setStatusFilter, options: statusOptions },
        { key: 'customer', label: 'Customer', value: customerFilter, setter: setCustomerFilter, options: customerOptions },
        { key: 'productType', label: 'Product Type', value: productTypeFilter, setter: setProductTypeFilter, options: productTypeOptions },
        { key: 'rushType', label: 'Rush Type', value: rushTypeFilter, setter: setRushTypeFilter, options: rushTypeOptions },
        { key: 'taper', label: 'Taper (Hot Tub)', value: taperFilter, setter: setTaperFilter, options: taperOptions },
        { key: 'gridType', label: 'Grid Type (Safety)', value: gridTypeFilter, setter: setGridTypeFilter, options: gridTypeOptions },
    ];

    const optionCounts = useMemo(() => {
        const activeFilters = {
            status: statusFilter,
            productType: productTypeFilter,
            rushType: rushTypeFilter,
            taper: taperFilter,
            gridType: gridTypeFilter,
            customer: customerFilter,
        };

        const allCounts = {};
        filters.forEach(filter => {
            allCounts[filter.key] = getOptionCounts(sortedOrders, filter.options, activeFilters, filter.key);
        });
        return allCounts;
    }, [sortedOrders, statusFilter, productTypeFilter, rushTypeFilter, taperFilter, gridTypeFilter, customerFilter]);

    const filteredOrders = useMemo(() => {
        const activeFilters = {
            status: statusFilter,
            productType: productTypeFilter,
            rushType: rushTypeFilter,
            taper: taperFilter,
            gridType: gridTypeFilter,
            customer: customerFilter,
        };
        
        let orders = filterOrders(sortedOrders, activeFilters);

        if (searchTerm) {
            const lowercasedSearch = searchTerm.toLowerCase();
            orders = orders.filter(order => {
                const customerName = order.customer || order.billingAddress?.company || '';
                const po = order.po || '';
                const id = order.id || '';
                const billingAddr = `${order.billingAddress?.street || ''} ${order.billingAddress?.city || ''} ${order.billingAddress?.province || ''}`;
                const shippingAddr = `${order.shippingAddress?.street || ''} ${order.shippingAddress?.city || ''} ${order.shippingAddress?.province || ''}`;
                
                return (
                    id.toLowerCase().includes(lowercasedSearch) ||
                    po.toLowerCase().includes(lowercasedSearch) ||
                    customerName.toLowerCase().includes(lowercasedSearch) ||
                    billingAddr.toLowerCase().includes(lowercasedSearch) ||
                    shippingAddr.toLowerCase().includes(lowercasedSearch)
                );
            });
        }
        
        return orders;
    }, [sortedOrders, searchTerm, statusFilter, productTypeFilter, rushTypeFilter, taperFilter, gridTypeFilter, customerFilter]);


    const handleSelectOrder = (order: typeof ordersData[0]) => {
        if (order.product) {
            setSelectedOrder(order);
            setView('detail');
        } else {
            alert('This order does not have detailed information available in this demo.');
        }
    };

    const handleBackToList = () => {
        setSelectedOrder(null);
        setView('list');
    };
    
    const handleAddOrder = (newOrder) => {
      setCurrentOrders(prevOrders => [newOrder, ...prevOrders]);
    };
    
    const handleDeleteOrder = (orderId: string) => {
        if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
            setCurrentOrders(prev => prev.filter(o => o.id !== orderId));
            setView('list');
        }
    };
    
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
    
    const isDueSoon = (dueDate: string) => {
        const due = new Date(dueDate + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const oneWeekFromNow = new Date(today);
        oneWeekFromNow.setDate(today.getDate() + 7);
        return due >= today && due <= oneWeekFromNow;
    };

    const getRowClass = (order: typeof ordersData[0]) => {
        if (order.rush) return 'bg-red-50 hover:bg-red-100 cursor-pointer';
        if (isDueSoon(order.dueDate)) return 'bg-yellow-50 hover:bg-yellow-100 cursor-pointer';
        return 'bg-white hover:bg-slate-50 cursor-pointer';
    };

    const kpiCards = [
        { title: 'Avg. Spa Cover Lead Time', value: dashboardStats.avgSpaLeadTime, icon: ClockIcon, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
        { title: 'Avg. Safety Lead Time', value: dashboardStats.avgSafetyLeadTime, icon: ClockIcon, color: 'text-teal-600', bgColor: 'bg-teal-100' },
        { title: 'Total Spa Cover Orders', value: dashboardStats.totalSpaCovers, icon: WaveIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Total Safety Orders', value: dashboardStats.totalSafetyCovers, icon: ShieldCheckIcon, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
    ];
    
    if (view === 'detail' && selectedOrder) {
        return <OrderDetail order={selectedOrder} onBack={handleBackToList} onDelete={() => handleDeleteOrder(selectedOrder.id)} />;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Orders Dashboard</h1>
                <p className="mt-2 text-lg text-gray-600">Manage Hot Tub and Safety Cover production pipeline.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiCards.map((card) => (
                    <div key={card.title} className="bg-white p-6 rounded-xl shadow-sm flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${card.bgColor} flex-shrink-0`}>
                            <card.icon className={`h-7 w-7 ${card.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{card.title}</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Filters</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {filters.map(filter => (
                        <div key={filter.label}>
                            <label htmlFor={`${filter.label}-filter`} className="block text-sm font-medium text-gray-700 mb-1">{filter.label}</label>
                            <div className="relative">
                                <select 
                                    id={`${filter.label}-filter`} 
                                    value={filter.value}
                                    onChange={(e) => filter.setter(e.target.value)}
                                    className="appearance-none w-full py-3 pl-4 pr-10 bg-slate-100 border border-slate-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors duration-200"
                                >
                                    {filter.options.map(opt => {
                                        const count = optionCounts[filter.key]?.[opt];
                                        const showCount = typeof count === 'number';
                                        const isDisabled = count === 0 && opt !== 'All' && filter.value !== opt;
                                        const countDisplay = showCount ? `(${count})` : '';

                                        return (
                                            <option key={opt} value={opt} disabled={isDisabled} className={isDisabled ? 'text-gray-400' : ''}>
                                                {`${opt} ${countDisplay}`}
                                            </option>
                                        );
                                    })}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <ChevronDownIcon className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-slate-200">
                     <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">Order Roster</h2>
                     <div className="w-full flex-1">
                        <input
                            type="text"
                            placeholder="Search by ID, PO #, Customer, Address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-100 border border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                        />
                    </div>
                    <button
                        onClick={() => setIsOrderCreationOpen(true)}
                        className="flex items-center space-x-2 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                    >
                        <PlusCircleIcon className="h-5 w-5" />
                        <span>Add Order</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-gray-500 uppercase bg-slate-100/75">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold tracking-wider">ID / PO #</th>
                                <th className="px-6 py-4 text-left font-semibold tracking-wider">Customer / Type</th>
                                <th className="px-6 py-4 text-left font-semibold tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left font-semibold tracking-wider">Order Date</th>
                                <th className="px-6 py-4 text-left font-semibold tracking-wider">Due Date</th>
                                <th className="px-6 py-4 text-left font-semibold tracking-wider">Rush</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} onClick={() => handleSelectOrder(order)} className={`border-b border-slate-200 transition-colors duration-200 ${getRowClass(order)}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-bold text-gray-900">{order.id}</div>
                                        <div className="text-gray-500">{order.po}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-semibold text-gray-900">{order.customer || order.billingAddress?.company}</div>
                                        <div className="text-gray-500">{order.type || order.product?.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{new Date(order.placedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{new Date(order.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={order.rush ? 'font-bold text-red-600' : 'text-gray-600'}>
                                            {order.rush ? 'Rush' : 'Standard'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             {isOrderCreationOpen && (
                <OrderCreationModal
                    customers={customersWithDetails}
                    onClose={() => setIsOrderCreationOpen(false)}
                    onAddOrder={handleAddOrder}
                />
            )}
        </div>
    );
};

export default OrdersDashboard;