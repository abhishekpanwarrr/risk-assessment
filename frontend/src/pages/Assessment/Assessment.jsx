import { FaCheckCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import LikelihoodScore from "../../components/LikelihoodScore/LikelihoodScore";
import BusinessImpact from "../../components/BusinessImpact.jsx/BusinessImpact";
import { useEffect, useState } from "react";
import { showNotification } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { getFetch, postFetch } from "../../helpers/facade";
import Loader from "../../components/Loader/Loader";

const Assessment = () => {
  const [risks, setRisks] = useState([]);
  const [selectedRisk, setSelectedRisk] = useState([]);
  const [scenario, setScenario] = useState("");
  const [tab, setTab] = useState("likelihood");
  const [currentRisk, setCurrentRisk] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await getFetch("risks/getRiskAssessment");
        if (result.statusCode === 200) {
          setRisks(result.data);
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return showNotification("Something went wrong", "error");
      }
    })();
  }, []);

  const allObjectsHaveScores = selectedRisk?.every(
    (item) =>
      "likelihoodScoreValue" in item &&
      "businessImpactScoreValue" in item &&
      item.likelihoodScoreValue !== undefined &&
      item.businessImpactScoreValue !== undefined
  );

  const handleSave = async () => {
    if (!allObjectsHaveScores) {
      return showNotification(
        "Select all risk scenarios before save and continue"
      );
    }
    const payload = selectedRisk.map((risk) => {
      const netRiskScore =
        (risk.likelihoodScoreValue * risk.businessImpactScoreValue) / 5;
      return { ...risk, netRiskScore };
    });
    try {
      const result = await postFetch("assessment/addAssessment", payload);
      if (result.statusCode === 200) {
        setSelectedRisk([]);
        setCurrentRisk("");
        setScenario("");
        return showNotification("Assesment saved successfully", "success");
      }
    } catch (error) {
      return showNotification("Something went wrong. Try again later", "error");
    }
  };

  const handleSelectRisk = (riskId, scenario) => {
    setScenario(scenario);
    setCurrentRisk(riskId);
    const newObject = {
      riskId,
      scenario,
    };
    const isObjectExist = selectedRisk.some((item) => item.riskId === riskId);

    if (!isObjectExist) {
      setSelectedRisk((prevArray) => [...prevArray, newObject]);
    }
  };

  return (
    <div className="px-5 lg:pl-48 py-24 h-screen">
      <div className="my-5 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="font-medium text-md md:text-2xl lg:text-2xl flex items-center gap-2"
        >
          <GoArrowLeft /> <span>Assessment</span>
        </button>
      </div>
      <div className="flex rounded-lg flex-col gap-5 md:gap-0 lg:flex-row mr-8 w-full p-2 border border-gray-200 shadow">
        <div className="bg-white lg:w-1/2 overflow-x-scroll border-r">
          <h3 className="text-xl font-bold border-b-2 p-3">
            Risk Scenarios (1/7)
          </h3>
          <table className="w-full text-sm text-left text-gray-500 ">
            <tbody className="">
              <tr className="flex justify-between items-center gap-5 border-b bg-gray-200 p-2">
                <th className="w-[60%] md:w-[70%]">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                      <IoSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full ps-10 p-2.5 outline-none"
                      placeholder="Search risk scenarios"
                      required
                    />
                  </div>
                </th>
                <div className="flex w-[40%] md:w-[30%] justify-between gap-1 text-gray-800 text-center">
                  <th className="text-xs">Likelihood Score</th>
                  <th className="text-xs">Business Impact</th>
                </div>
              </tr>

              {loading ? (
                <Loader />
              ) : risks?.length > 0 ? (
                risks?.map((risk) => {
                  return (
                    <tr
                      key={risk.riskId}
                      className={`${
                        currentRisk === risk.riskId ? "bg-blue-100" : "bg-white"
                      } flex justify-between gap-5 border-b px-2`}
                      role="button"
                      onClick={() =>
                        handleSelectRisk(risk.riskId, risk.scenario)
                      }
                    >
                      <td className="py-4 flex-3 w-[70%]">{risk.scenario}</td>
                      <div className="flex gap-3 justify-between  w-[30%]">
                        <td className="py-4 w-full items-center flex justify-center">
                          <FaCheckCircle
                            className={
                              selectedRisk.some(
                                (item) =>
                                  item.riskId === risk.riskId &&
                                  item.likelihoodScoreValue
                              )
                                ? "text-green-500"
                                : ""
                            }
                          />
                        </td>
                        <td className=" w-full items-center flex justify-center py-4">
                          <FaCheckCircle
                            className={
                              selectedRisk.some(
                                (item) =>
                                  item.riskId === risk.riskId &&
                                  item.businessImpactScoreValue
                              )
                                ? "text-green-500"
                                : ""
                            }
                          />
                        </td>
                      </div>
                    </tr>
                  );
                })
              ) : (
                <h3 className="text-center text-lg my-5">No risks found</h3>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white lg:w-1/2 mt-10 lg:mt-0">
          <div className="text-sm font-medium text-center border-b border-gray-200">
            <div className="text-start pl-5 flex items-center gap-3">
              <p className="font-semibold text-sm py-4">Risk Scenario</p>
              <span className="text-xs font-light">
                {scenario && `- ${scenario}`}
              </span>
            </div>
            <ul className="flex md:flex-wrap w-full">
              <li className="w-1/2">
                <button
                  className={`w-full p-5 border-b-2 border-t-2 ${
                    tab === "likelihood" && "text-blue-600 border-blue-600"
                  }`}
                  onClick={() => setTab("likelihood")}
                >
                  Likelihood Score
                </button>
              </li>
              <li className="w-1/2">
                <button
                  className={`w-full p-5 border-b-2 border-t-2 ${
                    tab === "business" && "text-blue-600 border-blue-600"
                  }`}
                  onClick={() => setTab("business")}
                >
                  Business Impact
                </button>
              </li>
            </ul>
          </div>
          {tab === "likelihood" ? (
            <LikelihoodScore
              selectedRisk={selectedRisk}
              setSelectedRisk={setSelectedRisk}
              currentRisk={currentRisk}
            />
          ) : (
            <BusinessImpact
              selectedRisk={selectedRisk}
              setSelectedRisk={setSelectedRisk}
              currentRisk={currentRisk}
            />
          )}
        </div>
      </div>
      {selectedRisk.length > 0 && (
        <div className="flex w-full gap-8 justify-end fixed bottom-0 right-0 bg-white p-4 pr-5">
          <button className="text-red-600" onClick={() => setSelectedRisk([])}>
            Cancel
          </button>
          <button
            className="text-white bg-blue-600 px-8 py-2 rounded-md"
            onClick={handleSave}
          >
            Save & continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Assessment;
