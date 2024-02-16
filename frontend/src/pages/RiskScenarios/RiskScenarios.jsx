import React, { useEffect, useState } from "react";
import RiskForm from "../../components/RiskForm/RiskForm";
import { showNotification } from "../../helpers/helpers";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import RiskList from "../../components/RiskList/RiskList";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { getFetch } from "../../helpers/facade";

const RiskScenarios = () => {
  const [open, setOpen] = useState(false);
  const [risks, setRisks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [action, setAction] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const risksPerPage = 6;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await getFetch("risks");
        if (result.statusCode === 200) {
          setRisks(result.data);
          setLoading(false);
        }
        setLoading(false)
      } catch (error) {
        setLoading(false);
        return showNotification(
          "Something went wrong. Try again later",
          "error"
        );
      }
    })();
  }, []);

  const indexOfLastRisk = currentPage * risksPerPage;
  const indexOfFirstRisk = indexOfLastRisk - risksPerPage;
  const currentRisks = risks.slice(indexOfFirstRisk, indexOfLastRisk);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredRisks = currentRisks.filter((risk) =>
    risk?.tagValue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(risks.length / risksPerPage); i++) {
    pageNumbers.push(i);
  }

  const sortRisks = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedRisks = filteredRisks.sort((a, b) => {
    const valueA = sortBy === "riskId" ? a[sortBy] : a.status;
    const valueB = sortBy === "riskId" ? b[sortBy] : b.status;
    if (sortOrder === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  return (
    <div className="relative min-h-screen w-screen">
      <div className="px-2 md:px-5 lg:pl-48 py-24 relative">
        <div className="relative sm:rounded-lg">
          <div className="my-5 flex justify-between items-center py-1">
            <button
              onClick={() => navigate(-1)}
              className="font-medium text-sm md:text-2xl lg:text-2xl flex items-center gap-2"
            >
              <GoArrowLeft />{" "}
              <span>
                Library/ <span className="text-blue-600">Risk Scenarios</span>
              </span>
            </button>

            <button
              className="bg-blue-900 px-4 py-2 text-white text-xs md:text-md rounded-sm"
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              onClick={() => setOpen(true)}
            >
              Add Risk Scenario
            </button>
          </div>
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 mb-5 sm:mb-auto">
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-72 sm:w-80 bg-gray-50 focus:border-blue-500"
                placeholder="Search by keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
                onClick={() => setAction(!action)}
              >
                <span className="sr-only">Action button</span>
                Sort: Risk ID(Ascending)
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownAction"
                className={`z-10 ${
                  !action && "hidden"
                } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
              >
                <button
                  className="w-full text-start px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    sortRisks("status");
                    setAction(false);
                  }}
                >
                  Sort by Status
                </button>
                <button
                  className="w-full text-start px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    sortRisks("riskId");
                    setAction(false);
                  }}
                >
                  Sort by Risk id
                </button>
              </div>
            </div>
          </div>
          {loading ? <Loader /> : <RiskList filteredRisks={filteredRisks} />}
        </div>
        {/* Pagination */}
        {loading ? (
          ""
        ) : filteredRisks.length <= 0 ? null : (
          <Pagination
            indexOfFirstRisk={indexOfFirstRisk}
            indexOfLastRisk={indexOfLastRisk}
            risks={risks}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            risksPerPage={risksPerPage}
            paginate={paginate}
            pageNumbers={pageNumbers}
          />
        )}
      </div>
      {/* Add risk form element */}
      <div
        className={`fixed inset-0 z-50 ${
          open ? "flex" : "hidden"
        } items-center justify-center bg-gray-900 bg-opacity-50`}
      >
        <RiskForm setOpen={setOpen} />
      </div>
    </div>
  );
};

export default RiskScenarios;
