import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import axios from "axios";
import { Info } from "lucide-react";

function ProductReg() {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    sku: "",
    category: "",
    unit_price: "",
    unit: "",
    reorder_point: "",
    description: "",
  });

  const [catalog, setCatalog] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get("http://localhost:3000/api");
      setCatalog(data);
    };
    getItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId === null) {
      const { data } = await axios.post("http://localhost:3000/api", formData);
      setCatalog(data);
      setFormData({
        name: "",
        quantity: "",
        sku: "",
        category: "",
        unit_price: "",
        unit: "",
        reorder_point: "",
        description: "",
      });
    } else {
      const { data } = await axios.patch(
        `http://localhost:3000/api/${editId}`,
        formData,
      );

      setCatalog(data);
      setEditId(null);
      setFormData({
        name: "",
        quantity: "",
        sku: "",
        category: "",
        unit_price: "",
        unit: "",
        reorder_point: "",
        description: "",
      });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/${id}`)
      .then((res) => setCatalog(res.data));
  };

  const handleEdit = (id) => {
    const index = catalog.findIndex((item) => item.id === id);
    setFormData({
      name: catalog[index].name,
      quantity: catalog[index].quantity,
      sku: catalog[index].sku,
      category: catalog[index].category,
      unit_price: catalog[index].unit_price,
      unit: catalog[index].unit,
      reorder_point: catalog[index].reorder_point,
      description: catalog[index].description,
    });
    setEditId(id);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-space-6 flex flex-col gap-space-1">
        <h1 className="text-md font-body text-on-surface">
          Inventory Management
        </h1>

        <div className="flex">
          <div>
            <form
              className="flex flex-wrap  gap-space-6"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-space-6">
                <div>
                  <div>
                    <h1 className="font-display text-on-surface mt-space-12 mb-space-2 text-3xl font-bold">
                      Product Registry
                    </h1>
                    <p className="text-body  text-on-surface-variant">
                      Define your asset parameters with precision. All fields
                      marked with an asterisk are required for ledger integrity.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest text-body font-body flex flex-col flex-1 mt-space-8  p-space-8 rounded-lg  shadow-float">
                    <h1 className="flex gap-space-2 mb-space-6 text-primary">
                      <Info size={20} />
                      <span className="text-md font-display font-bold text-on-surface">
                        General Information
                      </span>
                    </h1>

                    <div className="flex gap-space-6 text-on-surface-variant flex-col">
                      <div className="flex flex-col gap-space-1">
                        <label
                          htmlFor="name"
                          className="text-xs text-on-surface-variant"
                        >
                          ITEM NAME *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="peer w-full bg-surface-container-low rounded-xs py-space-2 px-space-4   border border-transparent focus:outline-none  focus:border-primary focus:bg-surface-container-lowesttransition-all duration-200 "
                          placeholder="e.g Ergonomic Executive Chair"
                        />
                      </div>

                      <div className="flex w-full flex-col md:flex-row gap-space-6">
                        <div className="flex flex-col flex-1  gap-space-1">
                          <label
                            htmlFor="sku"
                            className="text-xs text-on-surface-variant"
                          >
                            SKU / IDENTIFIER *
                          </label>

                          <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            className="peer w-full bg-surface-container-low rounded-xs py-space-2 px-space-4 border border-transparent focus:outline-none  focus:border-primary focus:bg-surface-container-lowesttransition-all duration-200 "
                            placeholder="sku"
                          />
                        </div>
                        <div className="flex w-full flex-1 flex-col gap-space-1">
                          <label
                            htmlFor="category"
                            className="text-xs text-on-surface-variant "
                          >
                            CATEGORY
                          </label>

                          <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="peer w-full bg-surface-container-low rounded-xs py-space-2 px-space-4 border border-transparent focus:outline-none  focus:border-primary focus:bg-surface-container-lowesttransition-all duration-200 "
                            placeholder="category"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-space-1">
                        <label
                          htmlFor="description"
                          className="text-xs text-on-surface-variant"
                        >
                          DESCRIPTION
                        </label>

                        <textarea
                          type="text"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="peer w-full field-sizing-fixed h-40 bg-surface-container-low rounded-xs py-space-2 px-space-4 border border-transparent focus:outline-none  focus:border-primary focus:bg-surface-container-lowesttransition-all duration-200 "
                          placeholder="Provide detailed specifications, materials, or usage instructions..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest w-full flex flex-col mt-6 gap-space-6 p-space-8 rounded-lg  shadow-float">
                    <h1 className="flex gap-space-2  text-primary">
                      <Info size={20} />
                      <span className="text-md font-display font-bold text-on-surface">
                        Financials & Inventory
                      </span>
                    </h1>

                    <div className="flex gap-space-6 md:flex-row flex-col ">
                      <div className="flex flex-col gap-space-1">
                        <label
                          htmlFor="unit_price"
                          className="text-xs text-on-surface-variant"
                        >
                          UNIT PRICE (£)
                        </label>

                        <input
                          type="text"
                          name="unit_price"
                          value={formData.unit_price}
                          onChange={handleChange}
                          className="peer w-full bg-surface-container-low rounded-xs py-space-2 px-space-4   border border-transparent focus:outline-none  focus:border-primary focus:bg-surface-container-lowesttransition-all duration-200 "
                          placeholder="£ 0.00"
                        />
                      </div>

                      <div className="flex flex-col gap-space-1">
                        <label
                          htmlFor="quantity"
                          className="text-xs text-on-surface-variant"
                        >
                          QUANTITY
                        </label>

                        <input
                          type="text"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="peer w-full bg-surface-container-low rounded-xs py-space-2 px-space-4   border border-transparent focus:outline-none  focus:border-primary focus:bg-surface-container-lowesttransition-all duration-200 "
                          placeholder="0"
                        />
                      </div>

                      <div className="flex flex-col gap-space-1">
                        <label
                          htmlFor="quantity"
                          className="text-xs text-on-surface-variant"
                        >
                          UNIT (e.g kg, pieces, packs)
                        </label>
                        <input
                          type="text"
                          name="unit"
                          value={formData.unit}
                          onChange={handleChange}
                          className="peer w-full bg-surface-container-low rounded-xs py-space-2 px-space-4   border border-transparent focus:outline-none  focus:border-primary focus:bg-surface-container-lowesttransition-all duration-200 "
                          placeholder="0"
                        />
                      </div>

                      <div className="flex flex-col gap-space-1">
                        <label
                          htmlFor="quantity"
                          className="text-xs text-on-surface-variant"
                        >
                          REORDEER POINT
                        </label>
                        <input
                          type="text"
                          name="reorder_point"
                          value={formData.reorder_point}
                          onChange={handleChange}
                          className="peer w-full bg-surface-container-low rounded-xs py-space-2 px-space-4   border border-transparent focus:outline-none  focus:border-primary focus:bg-surface-container-lowesttransition-all duration-200 "
                          placeholder="5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[9rem] ">
                  <div className="bg-surface-container-lowest p-space-8 rounded-lg  shadow-float">
                    <h1 className="text-md font-display font-bold text-on-surface">
                      Product Image
                    </h1>
                    <div className="size-50 flex justify-center items-center flex-col text-center font-body text-xs text-gray-500 bg-surface-container-low my-space-4 p-space-4  rounded-lg border-dashed border-2 border-gray-300">
                      <p className="font-semibold">Upload High-Res Media</p>
                      <p className="text-[0.6rem]">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button>Submit</button>
                    <button>Discard Changes</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ul>
          {catalog.map((items, index) => (
            <div key={index}>
              <li>
                {items.name} {items.quantity} {items.sku} {items.category}{" "}
                {items.unit_price} {items.unit} {items.reorder_point}{" "}
                {items.description}
              </li>
              <button onClick={() => handleDelete(items.id)}>delete</button>{" "}
              <button onClick={() => handleEdit(items.id)}>edit</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductReg;
