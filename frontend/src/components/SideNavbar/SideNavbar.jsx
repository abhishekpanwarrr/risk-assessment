import { Link } from "react-router-dom";
import { IoMdBook } from "react-icons/io";
import { LuPenSquare } from "react-icons/lu";
import { TfiFiles } from "react-icons/tfi";

export const navItems = [
  {
    title: "Library",
    icon: <IoMdBook className="w-5 h-5 text-white transition duration-75 " />,
    link: "/risk",
  },
  {
    title: "Assessments",
    icon: (
      <LuPenSquare className="w-5 h-5 text-white transition duration-75 " />
    ),
    link: "/assessment",
  },
  {
    title: "Reports",
    icon: <TfiFiles className="w-5 h-5 text-white transition duration-75 " />,
    link: "reports",
  },
];
const SideNavbar = () => {
  return (
    <aside
      className={`fixed left-0 top-0 w-26 z-50 h-screen pt-20 transition-transform -translate-x-full  lg:translate-x-0 bg-blue-900`}
      aria-label="Sidebar"
    >
      <div className="h-full px-1 pb-4 overflow-y-auto bg-blue-900">
        <ul className="space-y-2 font-medium">
          {navItems.map((item) => (
            <li key={item.title}>
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
      </div>
    </aside>
  );
};

export default SideNavbar;
