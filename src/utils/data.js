// Sample data for the dashboard

export const salesData = [
  { month: 'Jan', sales: 4000, revenue: 2400, orders: 120 },
  { month: 'Feb', sales: 3000, revenue: 1398, orders: 98 },
  { month: 'Mar', sales: 2000, revenue: 9800, orders: 87 },
  { month: 'Apr', sales: 2780, revenue: 3908, orders: 145 },
  { month: 'May', sales: 1890, revenue: 4800, orders: 112 },
  { month: 'Jun', sales: 2390, revenue: 3800, orders: 134 },
  { month: 'Jul', sales: 3490, revenue: 4300, orders: 156 },
  { month: 'Aug', sales: 4200, revenue: 5100, orders: 178 },
  { month: 'Sep', sales: 3800, revenue: 4700, orders: 165 },
  { month: 'Oct', sales: 4100, revenue: 4900, orders: 189 },
  { month: 'Nov', sales: 4500, revenue: 5200, orders: 201 },
  { month: 'Dec', sales: 5000, revenue: 5800, orders: 223 },
];

export const categoryData = [
  { name: 'Electronics', value: 35, color: '#0088FE' },
  { name: 'Clothing', value: 25, color: '#00C49F' },
  { name: 'Food', value: 20, color: '#FFBB28' },
  { name: 'Books', value: 12, color: '#FF8042' },
  { name: 'Other', value: 8, color: '#8884d8' },
];

export const userData = [
  { name: 'Active Users', value: 1250, change: '+12%' },
  { name: 'New Users', value: 340, change: '+8%' },
  { name: 'Returning Users', value: 910, change: '+15%' },
];

export const recentOrders = [
  { id: 1, customer: 'John Doe', product: 'Laptop', amount: 1299, status: 'Completed', date: '2024-01-15', category: 'Electronics' },
  { id: 2, customer: 'Jane Smith', product: 'Phone', amount: 899, status: 'Pending', date: '2024-01-14', category: 'Electronics' },
  { id: 3, customer: 'Bob Johnson', product: 'Tablet', amount: 599, status: 'Completed', date: '2024-01-13', category: 'Electronics' },
  { id: 4, customer: 'Alice Brown', product: 'Headphones', amount: 199, status: 'Processing', date: '2024-01-12', category: 'Electronics' },
  { id: 5, customer: 'Charlie Wilson', product: 'Watch', amount: 299, status: 'Completed', date: '2024-01-11', category: 'Electronics' },
  { id: 6, customer: 'Diana Prince', product: 'T-Shirt', amount: 29, status: 'Completed', date: '2024-01-10', category: 'Clothing' },
  { id: 7, customer: 'Eve Adams', product: 'Jeans', amount: 79, status: 'Pending', date: '2024-01-09', category: 'Clothing' },
  { id: 8, customer: 'Frank Miller', product: 'Pizza', amount: 15, status: 'Completed', date: '2024-01-08', category: 'Food' },
];

export const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15', lastActive: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2023-02-20', lastActive: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Active', joinDate: '2023-03-10', lastActive: '2024-01-13' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active', joinDate: '2023-04-05', lastActive: '2024-01-12' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Inactive', joinDate: '2023-05-12', lastActive: '2023-12-20' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Active', joinDate: '2023-06-18', lastActive: '2024-01-11' },
  { id: 7, name: 'Eve Adams', email: 'eve@example.com', role: 'User', status: 'Active', joinDate: '2023-07-22', lastActive: '2024-01-10' },
  { id: 8, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'Suspended', joinDate: '2023-08-30', lastActive: '2023-11-15' },
];

export const analyticsData = {
  pageViews: [
    { date: 'Mon', views: 4000 },
    { date: 'Tue', views: 3000 },
    { date: 'Wed', views: 2000 },
    { date: 'Thu', views: 2780 },
    { date: 'Fri', views: 1890 },
    { date: 'Sat', views: 2390 },
    { date: 'Sun', views: 3490 },
  ],
  trafficSources: [
    { name: 'Organic Search', value: 45, color: '#0088FE' },
    { name: 'Direct', value: 25, color: '#00C49F' },
    { name: 'Social Media', value: 20, color: '#FFBB28' },
    { name: 'Referral', value: 10, color: '#FF8042' },
  ],
  conversionRates: [
    { month: 'Jan', rate: 2.5 },
    { month: 'Feb', rate: 2.8 },
    { month: 'Mar', rate: 3.2 },
    { month: 'Apr', rate: 3.5 },
    { month: 'May', rate: 3.8 },
    { month: 'Jun', rate: 4.2 },
  ],
};

// Function to generate random data updates
export const generateRandomUpdate = (baseValue, variance = 0.1) => {
  const change = (Math.random() - 0.5) * 2 * variance;
  return Math.max(0, baseValue * (1 + change));
};

// Function to update sales data dynamically
export const updateSalesData = (data) => {
  return data.map(item => ({
    ...item,
    sales: Math.round(generateRandomUpdate(item.sales, 0.05)),
    revenue: Math.round(generateRandomUpdate(item.revenue, 0.05)),
    orders: Math.round(generateRandomUpdate(item.orders, 0.05)),
  }));
};

// Filter sales data by date range
export const filterSalesData = (data, dateRange) => {
  if (!dateRange) return data;
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  let monthsToShow = [];
  
  switch (dateRange) {
    case 'last7days':
      // Show last 2-3 months for demo
      monthsToShow = monthNames.slice(-3);
      break;
    case 'last30days':
      monthsToShow = monthNames.slice(-2);
      break;
    case 'last3months':
      monthsToShow = monthNames.slice(-3);
      break;
    case 'last6months':
      monthsToShow = monthNames.slice(-6);
      break;
    case 'lastyear':
      return data; // Show all
    default:
      return data;
  }
  
  return data.filter(item => monthsToShow.includes(item.month));
};

export const getFilteredData = (data, filters) => {
  let filtered = [...data];
  
  if (filters.dateRange) {
    const now = new Date();
    let startDate = new Date();
    
    switch (filters.dateRange) {
      case 'last7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'last30days':
        startDate.setDate(now.getDate() - 30);
        break;
      case 'last3months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'last6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case 'lastyear':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        break;
    }
    
    if (filters.dateRange !== '') {
      filtered = filtered.filter(item => {
        if (item.date) {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= now;
        }
        return true;
      });
    }
  }
  
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(item => {
      const itemCategory = item.category ? item.category.toLowerCase() : '';
      return itemCategory === filters.category.toLowerCase();
    });
  }
  
  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(item => {
      const itemStatus = item.status ? item.status.toLowerCase() : '';
      return itemStatus === filters.status.toLowerCase();
    });
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchLower)
      )
    );
  }
  
  return filtered;
};
