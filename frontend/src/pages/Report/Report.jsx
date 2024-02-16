import React, { useEffect, useState } from "react";
import BarChartCard from "../../components/Card/BarChartCard";
import PieChartCard from "../../components/Card/PieChartCard";
import RadialChartCard from "../../components/Card/RadialChartBar";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { showNotification } from "../../helpers/helpers";
import { getFetch } from "../../helpers/facade";

const Report = () => {
  const [risks, setRisks] = useState([]);
  const [barChartSummary, setBarChartSummary] = useState("");
  const [radialChartSummary, setRadialChartSummary] = useState("");
  const [pieChartSummary, setPieChartSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const notEmptySummary =
    barChartSummary !== "" ||
    radialChartSummary !== "" ||
    pieChartSummary !== "";

  const handleReportSubmit = () => {
    setBarChartSummary("");
    setPieChartSummary("");
    setRadialChartSummary("");
    showNotification("Report submitted successfully", "success");
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await getFetch("assessment/getRiskAssessment");
        if (result.statusCode === 200) {
          setRisks(
            result?.data?.sort((a, b) => b.netRiskScore - a.netRiskScore)
          );
          return setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        return showNotification("Something went wrong", "error");
      }
    })();
  }, []);

  return (
    <div className="px-5 lg:pl-48 py-24">
      <>
        <div className="my-5 flex justify-between items-center py-1">
          <button
            onClick={() => navigate(-1)}
            className="font-medium text-md md:text-2xl lg:text-2xl flex items-center gap-2"
          >
            <GoArrowLeft /> <span>Report</span>
          </button>
        </div>
        <div className="bg-gray-2 pb-10 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="">
              <BarChartCard
                data={risks}
                loading={loading}
                cardTitle="Top 10 Risk Scenarios"
                cardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              />
              <div className="bg-white">
                <p className="text-sm  rounded-t-md font-medium text-left px-2 text-gray-500 bg-blue-100 py-3">
                  Summary
                </p>
                <textarea
                  value={barChartSummary}
                  onChange={(e) => setBarChartSummary(e.target.value)}
                  className="w-full h-[200px] pl-2 pt-2 text-sm outline-none  rounded-b-md"
                  placeholder="Enter summary"
                ></textarea>
              </div>
            </div>
            <div>
              <PieChartCard
                data={risks}
                loading={loading}
                cardTitle="Risk Scenarios by Likelihood"
                cardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              />
              <div className="bg-white">
                <p className="text-sm  rounded-t-md font-medium text-left px-2 text-gray-500 bg-blue-100 py-3">
                  Summary
                </p>
                <textarea
                  value={pieChartSummary}
                  onChange={(e) => setPieChartSummary(e.target.value)}
                  className="w-full h-[200px] pl-2 pt-2 text-sm  outline-none  rounded-b-md"
                  placeholder="Enter summary"
                ></textarea>
              </div>
            </div>
            <div>
              <RadialChartCard cardTitle="Custom Widget" />
              <div className="bg-white">
                <p className="text-sm rounded-t-md font-medium text-left px-2 text-gray-500 bg-blue-100 py-3">
                  Summary
                </p>
                <textarea
                  value={radialChartSummary}
                  onChange={(e) => setRadialChartSummary(e.target.value)}
                  className="w-full h-[200px] pl-2 pt-2 text-sm  outline-none  rounded-b-md "
                  placeholder="Enter summary"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        {notEmptySummary && (
          <div className="flex w-full gap-8 justify-end fixed bottom-0 right-0 p-4 pr-5 bg-white z-10">
            <button className="text-red-600" onClick={handleReportSubmit}>
              Cancel
            </button>
            <button
              className="text-white bg-blue-600 px-8 py-2 rounded-md"
              onClick={handleReportSubmit}
            >
              Save & continue
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default Report;
