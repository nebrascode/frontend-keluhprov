import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from '@mui/x-charts/BarChart';

const data = [
  { month: 'January', users: 30 },
  { month: 'February', users: 20 },
  { month: 'March', users: 27 },
  { month: 'April', users: 18 },
  { month: 'May', users: 23 },
  { month: 'June', users: 34 },
  { month: 'July', users: 44 },
  { month: 'August', users: 39 },
  { month: 'September', users: 29 },
  { month: 'October', users: 19 },
  { month: 'November', users: 34 },
  { month: 'December', users: 40 }
];

const ChartTotalUsers = () => {
  return (
    <div className="w-full h-96 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Total Users per Month</h2>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="users" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ChartTotalUsers;
