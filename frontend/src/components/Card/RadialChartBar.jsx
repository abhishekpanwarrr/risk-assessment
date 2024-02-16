import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";

import { RADIAL_COLORS } from "../../constants/constants";
import Loader from "../Loader/Loader";
import { getFetch } from "../../helpers/facade";

const RadialChartCard = ({ cardTitle }) => {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await getFetch("risks");
        if (result.statusCode === 200) {
          setLoading(false);
          return setRisks(result.data);
        }
      } catch (error) {
        setLoading(false);
        return showNotification(
          "Something went wrong. Try again later",
          "error"
        );
      }
    })();
  }, []);

  const tagCounts = risks?.reduce((acc, risk) => {
    const tag = risk.tagValue;
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(tagCounts).map((tag, index) => ({
    name: tag,
    uv: tagCounts[tag],
    fill: RADIAL_COLORS[index % RADIAL_COLORS.length],
  }));

  const style = {
    top: "20%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
    textTransform: "capitalize",
  };

  return (
    <div className="mb-2 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3">
      <p className="text-sm font-medium text-left px-2 text-gray-500 bg-blue-100 py-3">
        {cardTitle}
      </p>
      <div className=" px-1 py-2 min-h-[250px]">
        {loading ? (
          <Loader />
        ) : risks?.length <= 0 ? (
          <div className="flex justify-center items-center w-full h-full">
            <h3 className="text-md ">No data found</h3>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="10%"
              outerRadius="80%"
              barSize={20}
              data={chartData}
            >
              <RadialBar
                minAngle={15}
                label={{
                  position: "insideStart",
                  fill: "#fff",
                  fontSize: "18px",
                }}
                background
                clockWise
                dataKey="uv"
              />
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                wrapperStyle={style}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RadialChartCard;
