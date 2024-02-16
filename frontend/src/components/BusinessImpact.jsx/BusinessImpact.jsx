import React from "react";
import { BUSINESS_VALUES } from "../../constants/constants";

const BusinessImpact = ({ selectedRisk, setSelectedRisk, currentRisk }) => {

  const addScoreToRisk = (key, value) => {
    const newData = selectedRisk.map((item) => {
      if (item.riskId === currentRisk) {
        return {
          ...item,
          businessImpactScoreText: key,
          businessImpactScoreValue: value,
        };
      }
      return item;
    });
    setSelectedRisk(newData);
  };
  
  return (
    <div className="overflow-x-scroll min-h-44 pb-20 md:pb-auto">
      <h3 className="py-3 px-2 text-gray-500 font-sm">
        Select the Business impact score
      </h3>

      <ul className="px-2 text-sm font-medium text-center text-gray-500 rounded-lg shadow flex flex-row">
        {BUSINESS_VALUES.map((item, index) => {
          const data = selectedRisk?.some(
            (risk) =>
              risk.riskId === currentRisk &&
              risk.businessImpactScoreValue === item.value
          );
          return (
            <li
              key={index}
              className={`w-full`}
              onClick={() => addScoreToRisk(item.title, item.value)}
            >
              <button
                className={`inline-block min-w-32 w-full px-4 py-2 text-gray-900 ${
                  data ? "bg-orange-600 text-white" : "bg-gray-100"
                }  border border-gray-300 rounded-sm focus:outline-none`}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BusinessImpact;
