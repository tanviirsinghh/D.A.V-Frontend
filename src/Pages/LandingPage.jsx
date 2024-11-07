import React from 'react';
import { Link } from 'react-router-dom';
import 'primeicons/primeicons.css';


// Simple icon components to replace lucide-react
const IconPackage = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconFileText = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const IconCheckCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconHistory = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>;

const Button = ({ children, variant = 'primary', className = '' }) => {
  const baseClasses = 'flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100'
  };
  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
    {children}
  </div>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm px-4 py-2 flex items-center">
        <IconPackage />
        <h1 className="ml-2 text-lg font-semibold text-gray-800">D.A.V College Ayurvedic Pharmacy Management</h1>
      </header>

      <main className="flex-1 p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <h2 className="text-xl font-bold mb-4">Management Dashboard</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            <Button >
              <i className='pi pi-plus px-1'></i>
              <Link>
                Add New Product
              </Link>
            </Button>
            <Button className="w-full">
              <IconUsers className="mr-2 h-4 w-4" />
              <Link to={"/registration"}>
                Create Account
              </Link>
            </Button>
            <Link to={"/userlisting"}>
              <Button variant="outline" className="w-full">
                <IconUsers className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </Link>
            <Link to={"/userapprovallist"}>
              <Button variant="outline" className="w-full">
                <IconCheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </Link>
            <Link to={"/trackorder"}>
              <Button variant="outline" className="w-full">
                <IconPackage className="mr-2 h-4 w-4" />
                Track Order
              </Button>
            </Link>

            <Button variant="outline" className="w-full">
              <IconHistory className="mr-2 h-4 w-4" />
              History
            </Button>
            <Button variant="outline" className="w-full">
              <IconFileText className="mr-2 h-4 w-4" />
              Invoice
            </Button>


          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-2 gap-2">
            <Link to={"/product"}>
              <Button variant="secondary" className="w-full">Pills</Button>
            </Link>
            <Link to={"/product"}>
              <Button variant="secondary" className="w-full">Liquid</Button>
            </Link>
            <Link to={"/product"}>
              <Button variant="secondary" className="w-full">Powder</Button>
            </Link>
            <Link to={"/product"}>
              <Button variant="secondary" className="w-full">Home Made</Button>
            </Link>
          </div>
          <div>
            <Link to={"/product"}>
              <Button variant="secondary" className="w-full mt-2">Raw Material</Button>
            </Link>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold">250</p>
              <p className="text-sm text-gray-600">Total Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-gray-600">Pending Approvals</p>
            </div>
            <div>
              <p className="text-2xl font-bold">50</p>
              <p className="text-sm text-gray-600">Orders Today</p>
            </div>
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-gray-600">Low Stock Items</p>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="grid grid-cols-2 gap-4">
          </div>
        </Card>
      </main>
    </div>
  );
}