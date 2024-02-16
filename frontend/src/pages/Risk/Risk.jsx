import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { showNotification } from "../../helpers/helpers";

import { CgNotes } from "react-icons/cg";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";
import { getFetch } from "../../helpers/facade";
import { LoaderIcon } from "react-hot-toast";

const NAV_LINKS = [
  {
    title: "Risk Scenarios",
    icon: <CgNotes className="text-blue-800" />,
    description:
      "Anticipate and address potential cybersecurity risks to business.",
    link: "/scenarios",
  },
  {
    title: "Assessment",
    icon: <MdOutlineScreenshotMonitor className="text-blue-800" />,
    description: "Assess risk scenarios to identify net risk scores.",
    link: "/assessment",
  },
  {
    title: "Reports",
    icon: <IoDiamondOutline className="text-blue-800" />,
    description: "Generate reports for the business and security leaders",
    link: "/reports",
  },
];

const Risk = () => {
  const [totalCounts, setTotalCounts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getFetch("risks/totalCounts");
        if (res.statusCode === 200) {
          setTotalCounts(res.data);
          setLoading(false);
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

  return (
    <div className="px-5 md:px-5 lg:pl-48 py-24 h-screen">
      <div className="my-5 flex justify-between items-center py-1">
        <button
          type="button"
          className="font-medium text-md md:text-2xl lg:text-2xl flex items-center gap-2"
        >
          <span>Library</span>
        </button>
      </div>
      <div className="flex gap-7 flex-wrap">
        {NAV_LINKS.map((item) => (
          <Link
            to={item.link}
            key={item.title}
            className="w-[90%] md:w-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 overflow-x-scroll"
          >
            <div className="flex items-center gap-5 mb-4">
              {item.icon}
              <h5 className="text-xl text-blue-800 font-bold leading-none">
                {item.title}
              </h5>
            </div>
            <div className="flow-root">
              <p className="text-sm text-gray-500 truncate dark:text-gray-400 pb-8 border-b-2">
                {item.description}
              </p>
            </div>

            {item.title === "Risk Scenarios" && (
              <div className="mt-4 flex">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400  flex gap-2 items-center">
                  <span className="text-gray-500">All Scenarios:</span>{" "}
                  <span className="font-semibold">
                    {loading ? <LoaderIcon /> : totalCounts?.total ?? null}
                  </span>
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 flex gap-2 items-center">
                  <span className="text-gray-500">Enabled:</span>{" "}
                  <span className="font-semibold">
                    {loading ? <LoaderIcon /> : totalCounts?.enabled ?? "-"}
                  </span>
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 flex gap-2 items-center">
                  <span className="text-gray-500">Disabled:</span>{" "}
                  <span className="font-semibold">
                    {loading ? <LoaderIcon /> : totalCounts?.disabled ?? "-"}
                  </span>
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 flex gap-2 items-center">
                  <span className="text-gray-500">Draft:</span>{" "}
                  <span className="font-semibold">
                    {loading ? <LoaderIcon /> : totalCounts?.draft ?? null}
                  </span>
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Risk;
