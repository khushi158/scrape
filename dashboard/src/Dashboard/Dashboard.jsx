// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  BarChart, Bar, PieChart, Pie, ResponsiveContainer 
} from 'recharts';
import { Select, Spin, Slider, Card } from 'antd';
import { transformData, getTopSellers } from '../utils/dataTransformer';
import { FiSearch, FiTrendingUp, FiPieChart, FiDollarSign, FiUsers } from 'react-icons/fi';

const Dashboard = () => {
  // ... [Keep all the previous state and data fetching logic] ...

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FiTrendingUp className="text-blue-500" />
          Vehicle Sales Analytics
        </h1>
      </header>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
            Search Manufacturers
          </label>
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
            Select Manufacturers
          </label>
          <Select
            mode="multiple"
            placeholder="All Manufacturers"
            onChange={setSelectedManufacturers}
            className="w-full"
            dropdownClassName="rounded-lg shadow-lg dark:bg-gray-800"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {manufacturers.map(mfg => (
              <Select.Option key={mfg} value={mfg}>
                <div className="flex items-center gap-2">
                  <FiUsers className="text-gray-400" />
                  {mfg}
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
            Sales Range
          </label>
          <Slider
            range
            min={0}
            max={10000}
            value={salesRange}
            onChange={setSalesRange}
            tooltip={{ formatter: value => `$${value}` }}
            className="custom-slider"
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>${salesRange[0]}</span>
            <span>${salesRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Sales</p>
              <p className="text-3xl font-bold mt-2">{totalSales}</p>
            </div>
            <FiDollarSign className="w-12 h-12 opacity-75" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-400 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Average Sales</p>
              <p className="text-3xl font-bold mt-2">{averageSales}</p>
            </div>
            <FiPieChart className="w-12 h-12 opacity-75" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-400 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Manufacturers</p>
              <p className="text-3xl font-bold mt-2">{filteredData.length}</p>
            </div>
            <FiUsers className="w-12 h-12 opacity-75" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Sales Trend Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis 
                  dataKey="manufacturer" 
                  tick={{ fill: '#6B7280' }}
                  stroke="#D1D5DB"
                />
                <YAxis 
                  tick={{ fill: '#6B7280' }}
                  stroke="#D1D5DB"
                />
                <Tooltip 
                  contentStyle={{
                    background: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                {selectedMonths.map(month => (
                  <Line
                    key={month}
                    type="monotone"
                    dataKey={month}
                    stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                    strokeWidth={2}
                    dot={{ fill: '#fff', strokeWidth: 2 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Sales Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredData}
                  dataKey="TOTAL"
                  nameKey="manufacturer"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {filteredData.map((entry, index) => (
                    <Cell 
                      key={index}
                      fill={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performers List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Top Performers</h3>
          <div className="space-y-4">
            {topSellers.map((seller, index) => (
              <div 
                key={seller.manufacturer}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-white px-3 py-1 rounded-full ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                  }`}>
                    #{index + 1}
                  </span>
                  <span className="font-medium dark:text-white">{seller.manufacturer}</span>
                </div>
                <span className="text-blue-500 font-semibold">{seller.TOTAL} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;