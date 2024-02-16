import { Cell, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";
import { PIECHART_COLORS, RADIAN_VALUE } from "../../constants/constants";
import Loader from "../Loader/Loader";

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN_VALUE);
  const y = cy + radius * Math.sin(-midAngle * RADIAN_VALUE);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={"middle"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartCard = ({ data, loading, cardTitle }) => {
  const likelihoodCounts = data?.reduce((acc, risk) => {
    const likelihood = risk.likelihoodScoreText;
    acc[likelihood] = (acc[likelihood] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(likelihoodCounts).map((likelihood, index) => ({
    name: likelihood,
    value: likelihoodCounts[likelihood],
    fill: PIECHART_COLORS[index % PIECHART_COLORS.length],
  }));

  return (
    <div className="mb-2 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3">
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
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PieChartCard;
