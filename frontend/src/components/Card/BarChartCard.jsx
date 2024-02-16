import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../components/Loader/Loader";

const BarChartCard = ({ data, loading, cardTitle }) => {
  const chartData = data?.map((risk) => ({
    name: risk?.scenario,
    netRiskScore: risk?.netRiskScore,
  }));

  return (
    <div className="overflow-hidden rounded-t-md bg-white shadow-1 duration-300 hover:shadow-3 mb-2">
      <p className="text-sm font-medium text-left px-2 text-gray-500 bg-blue-100 py-3">
        {cardTitle}
      </p>
      <div className=" px-1 py-2 min-h-[250px]">
        {loading ? (
          <Loader />
        ) : data?.length <= 0 ? (
          <div className="flex justify-center items-center w-full h-full">
            <h3 className="text-md text-gray-500">No data found</h3>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="netRiskScore" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BarChartCard;
