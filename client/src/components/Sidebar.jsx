import {
  LayoutDashboard,
  Archive,
  ChartArea,
  Settings,
  ScanQrCode,
} from "lucide-react";

import {
  QrCodeIcon,
  ArchiveIcon,
  ChartLineUpIcon,
  GearIcon,
} from "@phosphor-icons/react";

function Sidebar() {
  return (
    <div className="p-space-6 w-64 bg-surface-container-low h-screen ">
      <div>
        <h3 className="text-primary text-xl font-bold font-display">
          flux Inventory
        </h3>
        <p className="text-on-surface-variant text-xs font-body">
          Precision Ledger
        </p>
      </div>

      <div className="mt-space-12 font-body text-on-surface  text-sm">
        <ul className="flex gap-space-6 flex-col">
          <li className="items-center  hover:text-primary-dim gap-space-3 flex cursor-pointer">
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
          <li className=" hover:text-primary-dim gap-space-3 items-center  flex cursor-pointer">
            <ArchiveIcon size={25} weight="fill" />
            <span>Inventory</span>
          </li>
          <li className=" hover:text-primary-dim items-center  gap-space-3 flex cursor-pointer">
            <QrCodeIcon size={25} weight="fill" />
            <span> Scan</span>
          </li>
          <li className=" hover:text-primary-dim items-center  gap-space-3 flex cursor-pointer">
            <ChartLineUpIcon size={25} weight="fill" />
            <span>Reports</span>
          </li>
          <li className=" hover:text-primary-dim items-center  gap-space-3 flex cursor-pointer">
            <GearIcon size={25} weight="fill" />
            <span>Settings</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
