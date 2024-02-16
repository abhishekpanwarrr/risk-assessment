import React, { useState } from "react";
import { generateShortUUID, showNotification } from "../../helpers/helpers";
import { API_BASE_URL } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import { postFetch } from "../../helpers/facade";

const RiskForm = ({ setOpen }) => {
  const [scenario, setScenario] = useState("");
  const [description, setDescription] = useState("");
  const [riskOne, setRiskOne] = useState("");
  const [riskTwo, setRiskTwo] = useState("");
  const [tagKey, setTagKey] = useState("");
  const [tagValue, setTagValue] = useState("");
  const navigate = useNavigate();

  const handlePublish = async (status) => {
    const payload = {
      riskId: generateShortUUID(9),
      scenario,
      description,
      riskOne,
      tagKey,
      riskTwo,
      tagValue,
      toggleValue: status === "publish" ? "enabled" : "disabled",
      status: status === "publish" ? "published" : "draft",
    };
    try {
      const result = await postFetch("risks/addRisks", payload);
      if (result.statusCode === 200) {
        setOpen(false);
        window.location.reload();
        return showNotification("Added successfully", "success");
      }
    } catch (err) {
      return showNotification("Something went wrong. Try again later", "error");
    }
  };

  return (
    <div className="relative p-4 w-full max-w-3xl max-h-full overflow-y-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Risk Scenario
          </h3>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Risk Scenario
              </label>
              <input
                type="text"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter risk scenario"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Risk Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter risk description"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Risk Field 1
              </label>
              <input
                type="text"
                value={riskOne}
                onChange={(e) => setRiskOne(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Enter risk field 1"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Risk Field 2
              </label>
              <input
                type="text"
                value={riskTwo}
                onChange={(e) => setRiskTwo(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter risk field 2"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Key
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                onChange={(e) => setTagKey(e.target.value)}
              >
                <option>Select key</option>
                <option value="industry">Industry</option>
                <option value="domain">Domain</option>
                <option value="client">Client</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Value
              </label>
              <input
                type="text"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter value"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between border-t py-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-red-500 order-2 md:order-1 focus:outline-none rounded-lg px-8 py-2.5 text-center border border-red-500 "
            >
              Cancel
            </button>
            <div className="flex flex-col md:flex-row gap-2 order-1 md:order-2 ">
              <button
                type="button"
                onClick={() => handlePublish("draft")}
                className="text-blue-400 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center border border-blue-400 "
              >
                Save as draft
              </button>
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none rounded-lg px-5 py-2 text-center"
                onClick={() => handlePublish("publish")}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskForm;
