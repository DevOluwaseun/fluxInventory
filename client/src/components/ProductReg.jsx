import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import axios from "axios";
import { InfoIcon, CameraPlusIcon } from "@phosphor-icons/react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { validate } from "../utils/inventoryHelpers.js";

const BASE_URL = import.meta.env.VITE_API_URL;

function ProductReg() {
  const emptyForm = {
    name: "",
    quantity: "",
    sku: "",
    category: "",
    unit_price: "",
    unit: "",
    reorder_point: "",
    description: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!editId) {
      try {
        await axios.post(BASE_URL, formData);
        toast.success("Item added successfully");
        setFormData(emptyForm);
        navigate("/inventory");
      } catch (error) {
        toast.error("Error adding item");
      }
    } else {
      try {
        await axios.patch(`${BASE_URL}/${editId}`, formData);
        toast.success("Item updated successfully");
        setEditId(null);
        setFormData(emptyForm);
        navigate("/inventory");
      } catch (error) {
        toast.error("Error updating item");
      }
    }
  };

  const handleDiscard = () => {
    navigate("/inventory");
  };

  useEffect(() => {
    if (id) setEditId(id);
  }, [id]);

  useEffect(() => {
    if (!editId) return;
    const editData = async () => {
      const { data } = await axios.get(`${BASE_URL}/${editId}`);
      setFormData({
        name: data.name ?? "",
        quantity: data.quantity ?? "",
        sku: data.sku ?? "",
        category: data.category ?? "",
        unit_price: data.unit_price ?? "",
        unit: data.unit ?? "",
        reorder_point: data.reorder_point ?? "",
        description: data.description ?? "",
      });
    };
    editData();
  }, [editId]);

  return (
    <div className="flex">
      <div className="p-space-6 gap-space-1 flex flex-col">
        <h1 className="text-md font-body text-on-surface">
          Inventory Management
        </h1>

        <div className="flex">
          <div>
            <form
              className="gap-space-6 flex flex-wrap"
              onSubmit={handleSubmit}
            >
              <div className="gap-space-6 flex">
                <div>
                  <div>
                    <h1 className="font-display text-on-surface mt-space-12 mb-space-2 text-4xl font-bold">
                      Product Details
                    </h1>
                    <p className="text-body text-on-surface-variant">
                      Define your asset parameters with precision. All fields
                      marked with an asterisk are required for ledger integrity.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest text-body font-body mt-space-8 p-space-8 shadow-float flex flex-1 flex-col rounded-lg">
                    <h1 className="gap-space-2 mb-space-6 text-primary flex items-center">
                      <InfoIcon size={25} weight="fill" />
                      <span className="text-md font-display text-on-surface font-bold">
                        General Information
                      </span>
                    </h1>

                    <div className="gap-space-6 font-body text-on-surface flex flex-col">
                      <div className="gap-space-1 flex flex-col">
                        <label
                          htmlFor="name"
                          className="text-on-surface-variant text-xs"
                        >
                          ITEM NAME *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="peer bg-surface-container-low py-space-2 px-space-4 focus:border-primary w-full rounded-xs border border-transparent transition-all duration-200 focus:bg-blue-50 focus:outline-none"
                          placeholder="e.g Ergonomic Executive Chair"
                        />
                        {errors.name && (
                          <p className="text-error mt-1 text-xs">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="gap-space-6 flex w-full flex-col md:flex-row">
                        <div className="gap-space-1 flex flex-1 flex-col">
                          <label
                            htmlFor="sku"
                            className="text-on-surface-variant text-xs"
                          >
                            SKU / IDENTIFIER *
                          </label>

                          <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            className="peer bg-surface-container-low py-space-2 px-space-4 focus:border-primary w-full rounded-xs border border-transparent transition-all duration-200 focus:bg-blue-50 focus:outline-none"
                            placeholder="sku"
                          />
                          {errors.sku && (
                            <p className="text-error mt-1 text-xs">
                              {errors.sku}
                            </p>
                          )}
                        </div>
                        <div className="gap-space-1 flex w-full flex-1 flex-col">
                          <label
                            htmlFor="category"
                            className="text-on-surface-variant text-xs"
                          >
                            CATEGORY
                          </label>

                          <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="peer bg-surface-container-low py-space-2 px-space-4 focus:border-primary w-full rounded-xs border border-transparent transition-all duration-200 focus:bg-blue-50 focus:outline-none"
                            placeholder="category"
                          />
                        </div>
                      </div>
                      <div className="gap-space-1 flex flex-col">
                        <label
                          htmlFor="description"
                          className="text-on-surface-variant text-xs"
                        >
                          DESCRIPTION
                        </label>

                        <textarea
                          type="text"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="peer bg-surface-container-low py-space-2 px-space-4 focus:border-primary field-sizing-fixed h-40 w-full rounded-xs border border-transparent transition-all duration-200 focus:bg-blue-50 focus:outline-none"
                          placeholder="Provide detailed specifications, materials, or usage instructions..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest gap-space-6 p-space-8 shadow-float mt-6 flex w-full flex-col rounded-lg">
                    <h1 className="gap-space-2 text-primary flex items-center">
                      <InfoIcon size={25} weight="fill" />
                      <span className="text-md font-display text-on-surface font-bold">
                        Financials & Inventory
                      </span>
                    </h1>

                    <div className="gap-space-6 font-body flex flex-col items-end md:flex-row">
                      <div className="gap-space-1 flex flex-col">
                        <label
                          htmlFor="unit_price"
                          className="text-on-surface-variant text-xs"
                        >
                          UNIT PRICE (£)
                        </label>

                        <input
                          type="text"
                          name="unit_price"
                          value={formData.unit_price}
                          onChange={handleChange}
                          className="peer bg-surface-container-low py-space-2 px-space-4 focus:border-primary w-full rounded-xs border border-transparent transition-all duration-200 focus:bg-blue-50 focus:outline-none"
                          placeholder="£ 0.00"
                        />
                        {errors.unit_price && (
                          <p className="text-error mt-1 text-xs">
                            {errors.unit_price}
                          </p>
                        )}
                      </div>

                      <div className="gap-space-1 flex flex-col">
                        <label
                          htmlFor="quantity"
                          className="text-on-surface-variant text-xs"
                        >
                          QUANTITY
                        </label>

                        <input
                          type="text"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="peer bg-surface-container-low py-space-2 px-space-4 focus:border-primary w-full rounded-xs border border-transparent transition-all duration-200 focus:bg-blue-50 focus:outline-none"
                          placeholder="0"
                        />
                        {errors.quantity && (
                          <p className="text-error mt-1 text-xs">
                            {errors.quantity}
                          </p>
                        )}
                      </div>

                      <div className="gap-space-1 flex flex-col">
                        <label
                          htmlFor="quantity"
                          className="text-on-surface-variant text-xs"
                        >
                          UNIT (e.g kg, pieces, packs)
                        </label>
                        <input
                          type="text"
                          name="unit"
                          value={formData.unit}
                          onChange={handleChange}
                          className="peer bg-surface-container-low py-space-2 px-space-4 focus:border-primary w-full rounded-xs border border-transparent transition-all duration-200 focus:bg-blue-50 focus:outline-none"
                          placeholder="0"
                        />
                        {errors.unit && (
                          <p className="text-error mt-1 text-xs">
                            {errors.unit}
                          </p>
                        )}
                      </div>

                      <div className="gap-space-1 flex flex-col">
                        <label
                          htmlFor="quantity"
                          className="text-on-surface-variant text-xs"
                        >
                          REORDER POINT
                        </label>
                        <input
                          type="text"
                          name="reorder_point"
                          value={formData.reorder_point}
                          onChange={handleChange}
                          className="peer bg-surface-container-low py-space-2 px-space-4 focus:border-primary w-full rounded-xs border border-transparent transition-all duration-200 focus:bg-blue-50 focus:outline-none"
                          placeholder="5"
                        />
                        {errors.reorder_point && (
                          <p className="text-error mt-1 text-xs">
                            {errors.reorder_point}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-space-6 mt-[9rem] flex flex-col">
                  <div className="bg-surface-container-lowest p-space-8 shadow-float rounded-lg">
                    <h1 className="text-md font-display text-on-surface font-bold">
                      Product Image
                    </h1>
                    <div className="font-body bg-surface-container-low my-space-4 p-space-4 flex size-50 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center text-xs text-gray-500">
                      <CameraPlusIcon
                        size={32}
                        weight="fill"
                        className="m-space-3"
                      />
                      <p className="font-semibold">Upload High-Res Media</p>
                      <p className="text-[0.6rem]">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  <div className="gap-space-3 flex flex-col">
                    <button
                      type="submit"
                      className="bg-primary p-space-3 text-surface-container-lowest text-body flex w-full items-center justify-center rounded-md"
                    >
                      Commit to Ledger
                    </button>
                    <button
                      type="button"
                      onClick={handleDiscard}
                      className="text-on-surface-variant p-space-3 bg-surface-container-low border-surface-container-high text-body flex w-full items-center justify-center rounded-md border-2"
                    >
                      Discard Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductReg;
