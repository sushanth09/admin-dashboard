import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Eye, MousePointerClick, Users } from 'lucide-react';
import StatCard from '../components/StatCard';
import LineChartComponent from '../components/LineChart';
import BarChartComponent from '../components/BarChart';
import PieChartComponent from '../components/PieChart';
import Filters from '../components/Filters';
import { analyticsData, updateSalesData, filterSalesData } from '../utils/data';

export default function Analytics() {
  const [filters, setFilters] = useState({
    dateRange: '',
    category: 'all',
    status: 'all',
  });
  const [pageViews, setPageViews] = useState(analyticsData.pageViews);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setPageViews(prev => updateSalesData(prev.map(item => ({ ...item, views: item.views }))));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Filter page views by date range
  const filteredPageViews = useMemo(() => {
    if (!filters.dateRange) return pageViews;
    
    // For demo purposes, filter by day of week based on date range
    // In a real app, you'd filter by actual dates
    const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let daysToShow = [];
    
    switch (filters.dateRange) {
      case 'last7days':
        daysToShow = allDays; // Show all 7 days
        break;
      case 'last30days':
        daysToShow = allDays; // Show all days for 30 days
        break;
      case 'last3months':
        daysToShow = allDays.slice(0, 5); // Show weekdays
        break;
      case 'last6months':
        daysToShow = allDays.slice(0, 5); // Show weekdays
        break;
      case 'lastyear':
        return pageViews; // Show all
      default:
        return pageViews;
    }
    
    return pageViews.filter(item => daysToShow.includes(item.date));
  }, [pageViews, filters.dateRange]);

  // Filter conversion rates by date range
  const filteredConversionRates = useMemo(() => {
    return filterSalesData(analyticsData.conversionRates, filters.dateRange);
  }, [filters.dateRange]);

  // Filter traffic sources by category
  const filteredTrafficSources = useMemo(() => {
    let filtered = [...analyticsData.trafficSources];
    
    if (filters.category !== 'all') {
      // Filter by value ranges based on category
      switch (filters.category) {
        case 'electronics':
          filtered = filtered.filter(item => item.value >= 30);
          break;
        case 'clothing':
          filtered = filtered.filter(item => item.value >= 20 && item.value < 30);
          break;
        case 'food':
          filtered = filtered.filter(item => item.value >= 10 && item.value < 20);
          break;
        case 'books':
          filtered = filtered.filter(item => item.value < 10);
          break;
        default:
          break;
      }
    }
    
    return filtered;
  }, [filters.category]);

  // Calculate stats based on all filters
  const totalViews = useMemo(() => {
    let views = filteredPageViews.reduce((sum, item) => sum + item.views, 0);
    
    // Adjust based on category filter (simulate different traffic patterns)
    if (filters.category !== 'all') {
      const multiplier = {
        electronics: 1.2,
        clothing: 0.9,
        food: 0.8,
        books: 0.7,
      }[filters.category] || 1;
      views = Math.round(views * multiplier);
    }
    
    // Adjust based on status filter (simulate different engagement levels)
    if (filters.status !== 'all') {
      const multiplier = {
        completed: 1.1,
        pending: 0.9,
        processing: 1.0,
        cancelled: 0.5,
      }[filters.status] || 1;
      views = Math.round(views * multiplier);
    }
    
    return views;
  }, [filteredPageViews, filters.category, filters.status]);

  const avgViews = useMemo(() => {
    if (filteredPageViews.length === 0) return 0;
    return Math.round(totalViews / filteredPageViews.length);
  }, [totalViews, filteredPageViews.length]);

  const peakViews = useMemo(() => {
    const max = Math.max(...filteredPageViews.map(item => item.views));
    
    // Adjust peak views based on filters
    if (filters.category !== 'all') {
      const multiplier = {
        electronics: 1.3,
        clothing: 0.95,
        food: 0.85,
        books: 0.75,
      }[filters.category] || 1;
      return Math.round(max * multiplier);
    }
    
    return max;
  }, [filteredPageViews, filters.category]);

  const uniqueVisitors = useMemo(() => {
    // Base unique visitors calculation
    let visitors = 8450;
    
    // Adjust based on category filter
    if (filters.category !== 'all') {
      const multiplier = {
        electronics: 1.15,
        clothing: 0.92,
        food: 0.88,
        books: 0.78,
      }[filters.category] || 1;
      visitors = Math.round(visitors * multiplier);
    }
    
    // Adjust based on status filter
    if (filters.status !== 'all') {
      const multiplier = {
        completed: 1.08,
        pending: 0.94,
        processing: 1.0,
        cancelled: 0.6,
      }[filters.status] || 1;
      visitors = Math.round(visitors * multiplier);
    }
    
    return visitors;
  }, [filters.category, filters.status]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Track your website performance and user behavior</p>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isLive
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isLive ? 'Stop Live Updates' : 'Start Live Updates'}
        </button>
      </div>

      <Filters onFilterChange={setFilters} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Page Views"
          value={totalViews.toLocaleString()}
          change={isLive ? 'Live' : '+15.3%'}
          icon={Eye}
          trend="up"
        />
        <StatCard
          title="Average Views"
          value={avgViews.toLocaleString()}
          change="+8.2%"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Peak Views"
          value={peakViews.toLocaleString()}
          change="+12.5%"
          icon={MousePointerClick}
          trend="up"
        />
        <StatCard
          title="Unique Visitors"
          value={uniqueVisitors.toLocaleString()}
          change="+10.1%"
          icon={Users}
          trend="up"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChartComponent
          data={filteredPageViews}
          dataKey="views"
          name="Page Views Over Time"
        />
        <BarChartComponent
          data={filteredConversionRates}
          dataKeys={['rate']}
          colors={['#0ea5e9']}
          name="Conversion Rate Trend"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartComponent
          data={filteredTrafficSources}
          name="Traffic Sources"
        />
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
          <div className="space-y-4">
            {[
              { page: '/dashboard', views: 12500, change: '+12%' },
              { page: '/products', views: 9800, change: '+8%' },
              { page: '/about', views: 7200, change: '+15%' },
              { page: '/contact', views: 5400, change: '+5%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.page}</p>
                  <p className="text-sm text-gray-600">{item.views.toLocaleString()} views</p>
                </div>
                <span className="text-sm text-green-600 font-medium">{item.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
