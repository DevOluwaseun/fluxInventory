import { useState, useEffect } from "react";
import axios from "axios";

function App() {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item name"
        />

        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="quantity"
        />

        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          placeholder="sku"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="category"
        />
        <input
          type="text"
          name="unit_price"
          value={formData.unit_price}
          onChange={handleChange}
          placeholder="unit_price"
        />

        <input
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="unit"
        />

        <input
          type="text"
          name="reorder_point"
          value={formData.reorder_point}
          onChange={handleChange}
          placeholder="Reorder Point"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <button>Submit</button>
      </form>

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
  );
}

export default App;
