import React from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function BarChartDashboard({ budgetList }) {
  console.log('Raw budgetList passed to BarChartDashboard:', budgetList);

  const validData = Array.isArray(budgetList)
    ? budgetList.map((item, index) => {
        const name = typeof item.name === 'object'
          ? item.name?.firstName || `Unknown ${index}`
          : item.name || `Unknown ${index}`;

        const amount = parseFloat(item.amount) || 0;
        const totalSpend = parseFloat(item.totalSpend) || 0;

        return { id: item.id, name, amount, totalSpend };
      })
    : [];

  console.log('Transformed validData:', validData);

  return (
    <div className="mt-1">
      <h2 className="font-bold text-lg mb-3">Activity</h2>
      <div className="border rounded-lg p-5 bg-white shadow-sm">
        {validData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={validData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
              <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No valid data available to display.</p>
        )}
      </div>
    </div>
  );
}

export default BarChartDashboard;
