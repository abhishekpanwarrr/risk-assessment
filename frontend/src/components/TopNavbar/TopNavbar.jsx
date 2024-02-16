import { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { navItems } from "../SideNavbar/SideNavbar";
import { Link, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import Cookies from "js-cookie";
import EventEmitter from "eventemitter3";

const TopNavbar = () => {
  const eventEmitter = new EventEmitter();
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const username = Cookies.get("fullName");
  const email = Cookies.get("email");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("fullName");
    Cookies.remove("accessToken");
    return navigate("/login");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#fafafa] border-b border-gray-200 ">
      <Sheet>
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <SheetTrigger className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </SheetTrigger>
            </div>
            <div className="flex items-center">
              <div className="relative flex items-center ms-3 gap-4">
                <button type="button" className="flex text-sm rounded-full">
                  <IoMdNotificationsOutline className="w-8 h-8 text-gray-400 rounded-full" />
                </button>
                <button
                  type="button"
                  onClick={() => setShow((show) => !show)}
                  className="flex text-sm rounded-full"
                >
                  <RxAvatar className="w-8 h-8 text-gray-400 rounded-full" />
                </button>
                <div
                  ref={dropdownRef}
                  className={`z-50 ${
                    show ? "" : "hidden"
                  } absolute top-full right-0 my-4 text-base list-none bg-white divide-y divide-gray-200 rounded shadow `}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-xs text-gray-800 font-light" role="none">
                      {username || ""}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate"
                      role="none"
                    >
                      {email || ""}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <button
                        className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SheetContent className="bg-blue-900 text-white">
          <SheetHeader></SheetHeader>
          <SheetDescription>
            <ul className="space-y-2 mt-5 font-medium">
              {navItems.map((item) => (
                <li key={item.link}>
                  <Link
                    to={item.link}
                    className="flex flex-col items-center justify-center p-4 text-white rounded-lg hover:bg-blue-300 group"
                  >
                    {item.icon}
                    <span className="ms-3">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default TopNavbar;
