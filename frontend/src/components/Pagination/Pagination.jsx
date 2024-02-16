import React from "react";

const Pagination = ({
  indexOfFirstRisk,
  indexOfLastRisk,
  risks,
  currentPage,
  setCurrentPage,
  risksPerPage,
  paginate,
  pageNumbers,
}) => {
  return (
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 max-w-[95%]">
      <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {indexOfFirstRisk + 1}
        </span>{" "}
        -{" "}
        <span className="font-semibold text-gray-900">
          {Math.min(indexOfLastRisk, risks.length)}
        </span>{" "}
        of <span className="font-semibold text-gray-900">{risks.length}</span>
      </span>
      <ul className="inline-flex -space-x-px text-sm h-8">
        <li>
          <button
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              currentPage === 1
                ? "text-gray-500 bg-white border border-gray-300"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            } rounded-l-lg`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              href="#"
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                number === currentPage
                  ? "text-blue-600 bg-blue-50 border border-gray-300"
                  : "text-gray-500 bg-white border border-gray-300"
              } hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800`}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <button
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              currentPage === Math.ceil(risks.length / risksPerPage)
                ? "text-gray-500 bg-white border border-gray-300"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            } rounded-r-lg`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(risks.length / risksPerPage)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
