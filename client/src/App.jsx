import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    item: "",
    price: "",
    quantity: "",
  });
  const [catalog, setCatalog] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId === null) {
      axios.post("http://localhost:3000/api", formData).then((res) => {
        setCatalog(res.data);
        setFormData({
          item: "",
          price: "",
          quantity: "",
        });
      });
    } else {
      axios
        .patch(`http://localhost:3000/api/${editId}`, formData)
        .then((res) => {
          setCatalog(res.data);
        });
      setEditId(null);
      setFormData({
        item: "",
        price: "",
        quantity: "",
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
      item: catalog[index].item,
      price: catalog[index].price,
      quantity: catalog[index].quantity,
    });
    setEditId(id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="item"
          value={formData.item}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="quantity"
        />
        <button>Submit</button>
      </form>

      <ul>
        {catalog.map((product, index) => (
          <div key={index}>
            <li>
              {product.item} {product.price} {product.quantity}
            </li>
            <button onClick={() => handleDelete(product.id)}>delete</button>{" "}
            <button onClick={() => handleEdit(product.id)}>edit</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
