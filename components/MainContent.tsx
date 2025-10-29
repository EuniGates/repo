import React from 'react';
import UserProfile from './UserProfile';
import AdminDashboard from './AdminDashboard';
import SafetyCoverPricing from './SafetyCoverPricing';
import SpaCoverPricing from './SpaCoverPricing';
import CustomerDashboard from './CustomerDashboard';
import HRDashboard from './HRDashboard';
import Positions from './Positions';
import OrdersDashboard from './OrdersDashboard';
import VendorsDashboard from './VendorsDashboard';
import PurchasingDashboard from './PurchasingDashboard';
import WarrantyPage from './WarrantyPage';
import WarrantyManagement from './WarrantyManagement';
import Taxes from './Taxes';
import MakeModelDashboard from './MakeModelDashboard';
import ABMeasurementsDashboard from './ABMeasurementsDashboard';
import AnnouncementsDashboard from './AnnouncementsDashboard';

interface MainContentProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ activePage, setActivePage }) => {
  return (
    <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
      {activePage === 'My Profile' ? (
        <UserProfile />
      ) : activePage === 'Admin Dashboard' ? (
        <AdminDashboard />
      ) : activePage === 'Announcements' ? (
        <AnnouncementsDashboard />
      ) : activePage === 'Orders Dashboard' ? (
        <OrdersDashboard />
      ) : activePage === 'Safety Cover' ? (
        <SafetyCoverPricing />
      ) : activePage === 'Spa Cover' ? (
        <SpaCoverPricing />
      ) : activePage === 'A-B Measurements' ? (
        <ABMeasurementsDashboard />
      ) : activePage === 'Taxes' ? (
        <Taxes />
      ) : activePage === 'Make/Model Dashboard' ? (
        <MakeModelDashboard />
      ) : activePage === 'Customer Dashboard' ? (
        <CustomerDashboard setActivePage={setActivePage} />
      ) : activePage === 'Vendor Dashboard' ? (
        <VendorsDashboard />
      ) : activePage === 'Purchases Dashboard' ? (
        <PurchasingDashboard />
      ) : activePage === 'HR Dashboard' ? (
        <HRDashboard />
      ) : activePage === 'Positions' ? (
        <Positions />
      ) : activePage === 'Warranty Registrations' ? (
        <WarrantyPage />
      ) : activePage === 'Warranty Management' ? (
        <WarrantyManagement />
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to {activePage}</h1>
            <p className="mt-4 text-gray-600">This is a placeholder for the {activePage} content. You can start building your page components here.</p>
        </div>
      )}
    </main>
  );
};

export default MainContent;