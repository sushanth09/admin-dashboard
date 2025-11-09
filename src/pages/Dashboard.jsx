import { useState, useMemo, useEffect } from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp, RefreshCw } from 'lucide-react';
import StatCard from '../components/StatCard';
import LineChartComponent from '../components/LineChart';
import BarChartComponent from '../components/BarChart';
import PieChartComponent from '../components/PieChart';
import Filters from '../components/Filters';
import { salesData, categoryData, userData, recentOrders, updateSalesData, filterSalesData, getFilteredData } from '../utils/data';

export default function Dashboard() {
  const [filters, setFilters] = useState({
    dateRange: '',
    category: 'all',
    status: 'all',
  });
  const [isLive, setIsLive] = useState(false);
  const [currentSalesData, setCurrentSalesData] = useState(salesData);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setCurrentSalesData(prev => updateSalesData(prev));
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  // Filter sales data based on date range
  const filteredSalesData = useMemo(() => {
    return filterSalesData(currentSalesData, filters.dateRange);
  }, [currentSalesData, filters.dateRange]);

  // Filter recent orders based on all filters
  const filteredOrders = useMemo(() => {
    return getFilteredData(recentOrders, filters);
  }, [filters]);

  // Calculate stats from filtered orders when category/status filters are active
  // Otherwise use sales data for date range filtering
  const totalRevenue = useMemo(() => {
    // If category or status filter is active, calculate from orders
    if (filters.category !== 'all' || filters.status !== 'all') {
      return filteredOrders
        .filter(order => order.status === 'Completed')
        .reduce((sum, order) => sum + order.amount, 0);
    }
    // Otherwise use sales data filtered by date range
    return filteredSalesData.reduce((sum, item) => sum + item.revenue, 0);
  }, [filteredSalesData, filteredOrders, filters.category, filters.status]);

  const totalOrders = useMemo(() => {
    // If category or status filter is active, use filtered orders count
    if (filters.category !== 'all' || filters.status !== 'all') {
      return filteredOrders.length;
    }
    // Otherwise use sales data filtered by date range
    return filteredSalesData.reduce((sum, item) => sum + item.orders, 0);
  }, [filteredSalesData, filteredOrders, filters.category, filters.status]);

  const totalSales = useMemo(() => {
    // If category or status filter is active, calculate from orders
    if (filters.category !== 'all' || filters.status !== 'all') {
      return filteredOrders.reduce((sum, order) => sum + order.amount, 0);
    }
    // Otherwise use sales data filtered by date range
    return filteredSalesData.reduce((sum, item) => sum + item.sales, 0);
  }, [filteredSalesData, filteredOrders, filters.category, filters.status]);

  // Filter category data based on category filter
  const filteredCategoryData = useMemo(() => {
    if (filters.category === 'all') {
      return categoryData;
    }
    // Show only the selected category
    return categoryData.filter(item => 
      item.name.toLowerCase() === filters.category.toLowerCase()
    );
  }, [filters.category]);

  const handleRefresh = () => {
    setCurrentSalesData(updateSalesData(currentSalesData));
    setLastUpdate(new Date());
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening with your business.
            {isLive && (
              <span className="ml-2 inline-flex items-center gap-1 text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live Updates
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isLive
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isLive ? 'Stop Live' : 'Start Live'}
          </button>
        </div>
      </div>

      {lastUpdate && (
        <div className="mb-4 text-sm text-gray-500">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      )}

      <Filters onFilterChange={setFilters} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000).toFixed(1)}k`}
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Total Sales"
          value={`$${(totalSales / 1000).toFixed(1)}k`}
          change="+8.2%"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          change="+15.3%"
          icon={ShoppingCart}
          trend="up"
        />
        <StatCard
          title="Active Users"
          value={userData[0].value}
          change={userData[0].change}
          icon={Users}
          trend="up"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChartComponent
          data={filteredSalesData}
          dataKey="sales"
          name="Sales Over Time"
        />
        <BarChartComponent
          data={filteredSalesData}
          dataKeys={['sales', 'revenue']}
          colors={['#0ea5e9', '#10b981']}
          name="Sales vs Revenue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PieChartComponent
          data={filteredCategoryData}
          name="Sales by Category"
        />
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-900">#{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{order.product}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">${order.amount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No orders found matching the filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <a href="/orders" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View all orders →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
