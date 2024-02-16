import React from "react";
import { LIKELIHOOD_VALUES } from "../../constants/constants";
import { showNotification } from "../../helpers/helpers";

const LikelihoodScore = ({ selectedRisk, setSelectedRisk, currentRisk }) => {
  const addScoreToRisk = (key, value) => {
    if (!currentRisk) {
      showNotification("Select a risk to assign likelihood score", "error");
    }
    const newData = selectedRisk.map((item) => {
      if (item.riskId === currentRisk) {
        return {
          ...item,
          likelihoodScoreText: key,
          likelihoodScoreValue: value,
        };
      }
      return item;
    });
    setSelectedRisk(newData);
  };

  return (
    <div className="overflow-x-scroll min-h-44 pb-20 md:pb-auto">
      <h3 className="py-3 px-2 text-gray-500 font-sm">
        Select the likelihood score
      </h3>

      <ul className="px-2 text-sm font-medium text-center rounded-lg shadow flex flex-row">
        {LIKELIHOOD_VALUES.map((item, index) => {
          const data = selectedRisk?.some(
            (risk) =>
              risk.riskId === currentRisk &&
              risk.likelihoodScoreValue === item.value
          );
          return (
            <li key={index} className="w-full">
              <button
                className={`inline-block w-full px-4 py-2 min-w-32 text-gray-500 bg-gray-100 border border-gray-300 rounded-sm focus:outline-none ${
                  data ? "bg-orange-600 text-white" : "bg-gray-100"
                }`}
                onClick={() => addScoreToRisk(item.title, item.value)}
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

export default LikelihoodScore;
