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
          <li className=" hover:text-primary-dim gap-space-3 flex cursor-pointer">
            <LayoutDashboard size={20} fill="black" />
            <span>Dashboard</span>
          </li>
          <li className=" hover:text-primary-dim gap-space-3  flex cursor-pointer">
            <ArchiveIcon size={20} weight="fill" />
            <span>Inventory</span>
          </li>
          <li className=" hover:text-primary-dim gap-space-3 flex cursor-pointer">
            <QrCodeIcon size={20} weight="fill" />
            <span> Scan</span>
          </li>
          <li className=" hover:text-primary-dim gap-space-3 flex cursor-pointer">
            <ChartLineUpIcon size={20} weight="fill" />
            <span>Reports</span>
          </li>
          <li className=" hover:text-primary-dim gap-space-3 flex cursor-pointer">
            <GearIcon size={20} weight="fill" />
            <span>Settings</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
