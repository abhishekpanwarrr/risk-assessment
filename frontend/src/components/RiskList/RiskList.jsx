import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { format } from "date-fns";

const RiskList = ({ filteredRisks }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <tbody className="mb-5 shadow">
          {filteredRisks.length > 0 ? (
            filteredRisks?.map((risk) => {
              const updateDate = new Date(risk?.updatedAt);
              return (
                <div className="mb-2 overflow-scroll" key={risk._id}>
                  <tr className="bg-blue-50 flex border-t border-l border-r rounded-t-md overflow-auto">
                    <td className="px-6 py-4 flex min-w-[70%] items-center">
                      <span className="text-sm sm:text-md">{risk?.riskId}</span>
                      <div className="text-xs text-gray-500 font-semibold me-2 px-2.5 py-0.5 rounded  border inline-flex bg-white ml-2">
                        <span className="text-gray-300 capitalize">
                          {risk?.tagKey}:
                        </span>{" "}
                        <span className="pl-1 capitalize">
                          {" "}
                          {risk?.tagValue}
                        </span>
                      </div>{" "}
                    </td>
                    <td className="px-3 py-4 flex  min-w-[30%] items-center justify-between gap-10">
                      <span className="text-xs sm:text-sm min-w-[230px]">
                        Last updated: {format(updateDate, "dd MMM, yyyy")}
                      </span>
                      {risk?.status === "draft" ? (
                        <span className="text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 border border-blue-500 ">
                          <FaCheck className="w-2.5 h-2.5 me-1.5" />
                          Draft
                        </span>
                      ) : (
                        <div className="flex flex-col  gap-4 items-start justify-between">
                          <label className="relative flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              checked={risk?.toggleValue === "enabled"}
                              className="sr-only peer"
                            />
                            <div className="absolute w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          </label>
                          <span className="text-xs sm:text-sm font-medium">
                            {risk?.toggleValue === "enabled"
                              ? "Enabled"
                              : "Disabled"}
                          </span>
                        </div>
                      )}
                      <button className="text-center pr-3">
                        <BsThreeDotsVertical className="text-lg" />
                      </button>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-l border-r rounded-b-md min-w-full">
                    <td className="w-full">
                      <div className="px-6 py-2">{risk?.description ?? ""}</div>
                    </td>
                    <td className="w-full"></td>
                  </tr>
                </div>
              );
            })
          ) : (
            <h3 className="text-center text-lg my-5">No risks found</h3>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RiskList;
