import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Users, Briefcase, DollarSign, HelpCircle, LogOut } from 'lucide-react';
import logo from '../assets/newfavicon.png'

const DashboardPlaceholder = ({ title }: { title: string }) => (
  <div className="p-4 md:p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Clients</h3>
        <p className="text-2xl md:text-3xl font-bold text-blue-600">256</p>
        <div className="mt-2 text-sm text-green-600">+12% from last month</div>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Projects</h3>
        <p className="text-2xl md:text-3xl font-bold text-blue-600">48</p>
        <div className="mt-2 text-sm text-green-600">+5% from last month</div>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue</h3>
        <p className="text-2xl md:text-3xl font-bold text-blue-600">₹2.5Cr</p>
        <div className="mt-2 text-sm text-green-600">+8% from last month</div>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Tasks Completed</h3>
        <p className="text-2xl md:text-3xl font-bold text-blue-600">189</p>
        <div className="mt-2 text-sm text-green-600">+15% from last month</div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center p-3 bg-gray-50 rounded-md">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">New client file uploaded</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Upcoming Tasks</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center p-3 bg-gray-50 rounded-md">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Tax filing deadline</p>
                <p className="text-xs text-gray-500">Tomorrow at 5:00 PM</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to service dashboard if at root dashboard path
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
      navigate('/dashboard/service');
    }

    // Handle responsive sidebar
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname, navigate]);

  const getCurrentTitle = () => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'service':
        return 'Service Dashboard';
      case 'employee':
        return 'Employee Dashboard';
      case 'client':
        return 'Client Dashboard';
      case 'financial':
        return 'Financial Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      submenu: [
        { title: 'Service Dashboard', path: '/dashboard/service' },
        { title: 'Employee Dashboard', path: '/dashboard/employee' },
        { title: 'Client Dashboard', path: '/dashboard/client' },
        { title: 'Financial Dashboard', path: '/dashboard/financial' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-800 text-white transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-4">
          <div className="flex items-center justify-center mb-8 gap-4">
            <img src={logo} alt="" className='w-8 h-8'/>
            <span className="text-xl font-semibold">Hiranandani</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-blue-700 md:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav>
            {menuItems.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center px-4 py-2 text-gray-300">
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.title}</span>
                </div>
                <div className="ml-4">
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 rounded-md"
                      onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-200 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-100 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800 ml-2 md:ml-0">{getCurrentTitle()}</h1>
            </div>
            <div className="flex items-center space-x-4">
            
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <LogOut className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/service" replace />} />
          <Route path="service" element={<DashboardPlaceholder title="Service Dashboard" />} />
          <Route path="employee" element={<DashboardPlaceholder title="Employee Dashboard" />} />
          <Route path="client" element={<DashboardPlaceholder title="Client Dashboard" />} />
          <Route path="financial" element={<DashboardPlaceholder title="Financial Dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;