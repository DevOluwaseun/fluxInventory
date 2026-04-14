import {
  QrCodeIcon,
  ArchiveIcon,
  ChartLineUpIcon,
  GearIcon,
} from "@phosphor-icons/react";
import { Outlet } from "react-router";
import { NavLink } from "react-router";

function Sidebar() {
  return (
    <div className="flex">
      <div className="p-space-6 bg-surface-container-low h-screen w-64">
        <div>
          <h3 className="text-primary font-display text-xl font-bold">
            flux Inventory
          </h3>
          <p className="text-on-surface-variant font-body text-xs">
            Precision Ledger
          </p>
        </div>

        <div className="mt-space-12 font-body text-on-surface text-sm">
          <ul className="gap-space-6 flex flex-col">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `gap-space-3 flex items-center ${isActive ? "text-primary border-primary border-l-3 pl-2" : "text-on-surface hover:text-primary-dim"}`
              }
            >
              <li className="hover:text-primary-dim gap-space-3 flex cursor-pointer items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
                </svg>

                <span>Dashboard</span>
              </li>
            </NavLink>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `gap-space-3 flex items-center ${isActive ? "text-primary border-primary border-l-3 pl-2" : "text-on-surface hover:text-primary-dim"}`
              }
            >
              <li className="hover:text-primary-dim gap-space-3 flex cursor-pointer items-center">
                <ArchiveIcon size={25} weight="fill" />
                <span>Inventory</span>
              </li>
            </NavLink>
            <NavLink
              to="/scan"
              className={({ isActive }) =>
                `gap-space-3 flex items-center ${isActive ? "text-primary border-primary border-l-3 pl-2" : "text-on-surface hover:text-primary-dim"}`
              }
            >
              <li className="hover:text-primary-dim gap-space-3 flex cursor-pointer items-center">
                <QrCodeIcon size={25} weight="fill" />
                <span> Scan</span>
              </li>{" "}
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `gap-space-3 flex items-center ${isActive ? "text-primary border-primary border-l-3 pl-2" : "text-on-surface hover:text-primary-dim"}`
              }
            >
              <li className="hover:text-primary-dim gap-space-3 flex cursor-pointer items-center">
                <ChartLineUpIcon size={25} weight="fill" />
                <span>Reports</span>
              </li>{" "}
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `gap-space-3 flex items-center ${isActive ? "text-primary border-primary border-l-3 pl-2" : "text-on-surface hover:text-primary-dim"}`
              }
            >
              <li className="hover:text-primary-dim gap-space-3 flex cursor-pointer items-center">
                <GearIcon size={25} weight="fill" />
                <span>Settings</span>
              </li>{" "}
            </NavLink>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
