import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";

function InventoryList() {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get("http://localhost:3000/api");
      setCatalog(data);
    };
    getItems();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/${id}`)
      .then((res) => setCatalog(res.data));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="flex flex-col p-space-6">
          <h1 className="text-md font-body text-on-surface">
            Inventory Management
          </h1>
          <h1 className="font-display text-on-surface mt-space-12 mb-space-2 text-4xl font-bold">
            Catalog
          </h1>
        </div>
        <div>
          <div className="flex justify-between text-xs font-body font-medium text-gray-500 m-space-12">
            <li className="list-none">ITEM DETAILS</li>
            <li className="list-none">SKU</li>
            <li className="list-none">CATEGORY</li>
            <li className="list-none">STOCK LEVEL</li>
            <li className="list-none">STATUS</li>
            <li className="list-none">ACTIONS</li>
          </div>
          <div className="bg-surface-container-lowest p-space-6 m-space-6 rounded-md ">
            <div>
              {catalog.map((items, index) => (
                <div className="flex justify-between" key={index}>
                  <p> {items.name} </p>
                  <p> {items.quantity}</p>
                  <p> {items.sku} </p>
                  <p> {items.category}</p>
                  <p> {items.unit_price}</p>
                  <p> {items.unit}</p>
                  <p> {items.reorder_point}</p>
                  <p> {items.description}</p>
                  <button onClick={() => handleDelete(items.id)}>
                    delete
                  </button>{" "}
                  {/* <button onClick={() => handleEdit(items.id)}>edit</button> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryList;
