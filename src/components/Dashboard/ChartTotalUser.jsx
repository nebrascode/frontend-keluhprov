import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Daftarkan skala yang diperlukan
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartTotalUser = ({ data, years, selectedYear, setSelectedYear }) => {
  const calculateTotalUser = (year) => {
    if (!data[year]) return 0;
    return data[year].reduce((total, monthData) => total + monthData.count, 0);
  };
  
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Ags",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: `Total User ${selectedYear} = ${calculateTotalUser(
          selectedYear
        )}`,
        data: data[selectedYear]?.map((monthData) => monthData.count) || [],
        backgroundColor: "rgba(250, 204, 21, 1)",
        borderColor: "rgba(250, 204, 21, 1)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

   const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(0, 0, 0, 0.7)",
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          lineWidth: 2,
        },
        ticks: {
          color: "rgba(0, 0, 0, 0.7)",
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
  };

  // Handle year change event
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className="bg-main-lighter mt-4 p-4 rounded-lg shadow-md w-full overflow-x-auto">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Total User</h2>
        <div>
          <label htmlFor="year-select" className="mr-2">
            Tahun:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            className="bg-main-lighter border border-gray-300 rounded px-2 py-1"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="min-w-[600px] h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartTotalUser;
