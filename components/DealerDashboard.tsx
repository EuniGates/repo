import React, { useState, useMemo } from 'react';
import DealerHeader from './DealerHeader';
import DealerHome from './DealerHome';
import DealerOrdersList from './DealerOrdersList';
import { ordersData } from './OrdersDashboard';
import OrderCreationModal from './OrderCreationModal';
import DealerOrderDetail from './DealerOrderDetail';

interface DealerDashboardProps {
  onLogout: () => void;
}

// In a real app, this would come from the authenticated user session
const LOGGED_IN_DEALER = 'Aqua Pools Inc.';

const DealerDashboard: React.FC<DealerDashboardProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isOrderCreationOpen, setIsOrderCreationOpen] = useState(false);
  const [allOrders, setAllOrders] = useState(ordersData);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const customersWithDetails = useMemo(() => {
    const customerMap = new Map();
    ordersData.forEach(order => {
        const name = order.customer || order.billingAddress?.company;
        const province = order.shippingAddress?.province;
        if (name && province && !customerMap.has(name)) {
        customerMap.set(name, { name, province });
        }
    });
    return Array.from(customerMap.values());
  }, [allOrders]);

  const handleAddOrder = (newOrder) => {
    setAllOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToDashboard = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <DealerHeader 
          dealerName={LOGGED_IN_DEALER}
          onLogout={onLogout}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {selectedOrder ? (
            <DealerOrderDetail order={selectedOrder} onBack={handleBackToDashboard} />
          ) : (
            <>
              {activePage === 'Dashboard' && (
                <DealerHome 
                    dealerName={LOGGED_IN_DEALER}
                    allOrders={allOrders}
                    setActivePage={setActivePage}
                    onPlaceOrder={() => setIsOrderCreationOpen(true)}
                    onViewOrder={handleViewOrder}
                />
              )}
              {activePage === 'My Orders' && <DealerOrdersList allOrders={allOrders} dealerName={LOGGED_IN_DEALER} />}
            </>
          )}
        </main>
      </div>
      {isOrderCreationOpen && (
        <OrderCreationModal
            customers={customersWithDetails}
            onClose={() => setIsOrderCreationOpen(false)}
            onAddOrder={handleAddOrder}
            dealerName={LOGGED_IN_DEALER}
        />
      )}
    </div>
  );
};

export default DealerDashboard;