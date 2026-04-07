import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import placeholder from "../assets/placeholder.png";
import {
  TrashIcon,
  PenIcon,
  DownloadIcon,
  PlusCircleIcon,
  WarningIcon,
  ListPlusIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router";

function InventoryList() {
  const [catalog, setCatalog] = useState([]);
  const lowStock = catalog.filter(
    (item) => item.quantity <= item.reorder_point,
  ).length;

  let navigate = useNavigate();

  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get("http://localhost:3000/api");
      setCatalog(data);
    };
    getItems();
  }, []);

  const findItem = (id) => {
    const item = catalog.find((item) => item.id === id);
    navigate("/inventory/edit", { state: { product: item } });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/${id}`)
      .then((res) => setCatalog(res.data));
  };

  const handleNewItem = () => {
    navigate("/new");
  };

  const getStatus = (quantity, reorder_point) => {
    if (quantity <= 2) return "Critical";
    if (quantity <= reorder_point) return "Warning";
    return "Healthy";
  };

  const statusStyles = {
    Critical: "bg-error-container text-error",
    Warning: "bg-tertiary-container text-on-tertiary-container",
    Healthy: "bg-primary-container text-primary-dim",
  };

  const getStockLevel = (quantity, reorder_point) => {
    const stockLevel = Math.min((quantity / reorder_point) * 100, 100);

    return stockLevel;
  };

  const barColors = {
    Critical: " hsl(2 44.5% 43.1%)",
    Warning: "oklch(43.2% 0.232 292.759)",
    Healthy: "hsl(224, 82%, 45%)",
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="mt-space-12 flex flex-row justify-between">
          <div className="gap-space-4 p-space-6 flex flex-col">
            <h1 className="font-body text-primary text-xs">INVENTORY LIST</h1>
            <h1 className="font-display text-on-surface mb-space-2 text-4xl font-bold">
              Catalog
            </h1>
          </div>
          <div>
            <div className="gap-space-4 mb-space-8 flex justify-center">
              <div className="py-space-3 px-space-4 bg-surface-container-low gap-space-3 flex items-center rounded-md">
                <div className="bg-primary-container text-primary-dim p-space-2 rounded-full">
                  <ListPlusIcon size={25} weight="fill" />
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs">Total Items</p>
                  <h1>{catalog.length}</h1>
                </div>
              </div>
              <div className="p-space-2 bg-surface-container-low gap-space-3 flex items-center rounded-md">
                <div className="bg-error-container text-error p-space-2 rounded-full">
                  <WarningIcon size={25} weight="fill" />
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs">Low Stock</p>
                  <h1>{lowStock}</h1>
                </div>
              </div>
            </div>
            <div className="gap-space-3 px-space-6 flex">
              <button className="gap-space-3 text-on-surface p-space-3 bg-surface-container-lowest border-surface-container-high text-body hover:bg-primary-container flex items-center justify-center self-start rounded-md border-2 transition-colors duration-200">
                <DownloadIcon size={20} weight="fill" />{" "}
                <span> Export CSV</span>
              </button>
              <button
                onClick={handleNewItem}
                className="gap-space-3 hover:bg-primary-dim bg-primary p-space-3 text-surface-container-lowest text-body flex items-center justify-center self-start rounded-md transition-colors duration-200"
              >
                <PlusCircleIcon size={20} weight="fill" />
                <span> Add New Item</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-space-6">
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-left">
                <th className="font-body text-on-surface-variant px-4 text-left text-xs font-normal">
                  ITEM DETAILS
                </th>
                <th className="font-body text-on-surface-variant px-4 text-left text-xs font-normal">
                  SKU
                </th>
                <th className="font-body text-on-surface-variant px-4 text-left text-xs font-normal">
                  CATEGORY
                </th>
                <th className="font-body text-on-surface-variant px-4 text-left text-xs font-normal">
                  STOCK LEVEL
                </th>
                <th className="font-body text-on-surface-variant px-4 py-3 text-left text-xs font-normal">
                  STATUS
                </th>
                <th className="font-body text-on-surface-variant px-4 text-left text-xs font-normal">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((items) => (
                <tr
                  className="bg-surface-container-lowest transition-colors duration-200 hover:bg-blue-50"
                  key={items.id}
                >
                  <td className="rounded-l-lg px-4 py-6">
                    <div className="flex items-center gap-3">
                      <img
                        className="bg-surface-container-low h-10 w-10 rounded-md object-cover"
                        src={placeholder}
                        alt="product"
                      />

                      <div>
                        <p className="text-md text-on-surface font-display font-semibold">
                          {items.name}
                        </p>
                        <p className="text-on-surface-variant text-xs font-light">
                          {items.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-on-surface px-4 py-6 text-sm">
                    {items.sku}
                  </td>
                  <td className="px-4 py-6">
                    <span className="rounded-full bg-slate-300 px-3 py-1 text-xs font-medium text-slate-600">
                      {items.category}
                    </span>
                  </td>
                  <td className="px-4 py-6">
                    <div className="bg-surface-container-low h-2 w-full rounded-full">
                      <div
                        style={{
                          width: `${getStockLevel(items.quantity, items.reorder_point)}%`,
                          backgroundColor:
                            barColors[
                              getStatus(items.quantity, items.reorder_point)
                            ],
                        }}
                        className="h-2 rounded-full transition-all duration-300"
                      />
                      <p
                        className="py-space-1 text-[0.6rem]"
                        style={{
                          color:
                            barColors[
                              getStatus(items.quantity, items.reorder_point)
                            ],
                        }}
                      >
                        {items.quantity} units remaining
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <span
                      className={`rounded-full px-3 py-1 text-[0.7rem] font-medium ${statusStyles[getStatus(items.quantity, items.reorder_point)]}`}
                    >
                      {getStatus(items.quantity, items.reorder_point)}
                    </span>
                  </td>
                  <td className="text-on-surface rounded-r-lg px-4 py-6">
                    <button
                      className="mr-space-4"
                      onClick={() => findItem(items.id)}
                    >
                      <PenIcon size={20} weight="fill" />{" "}
                    </button>
                    <button
                      className="mx-space-4"
                      onClick={() => handleDelete(items.id)}
                    >
                      <TrashIcon size={20} weight="fill" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InventoryList;
