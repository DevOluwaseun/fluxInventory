import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    productName: "",
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
      });
    } else {
      axios
        .patch(`http://localhost:3000/api/${editId}`, formData)
        .then((res) => {
          setCatalog(res.data);
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/${id}`)
      .then((res) => setCatalog(res.data));
  };

  const handleEdit = (id) => {
    const index = catalog.findIndex((product) => product.id === id);
    setFormData({
      productName: catalog[index].productName,
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
          name="productName"
          value={formData.productName}
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
              {product.productName} {product.price} {product.quantity}
            </li>
            <button onClick={() => handleDelete(product.id)}>delete</button>{" "}
            <buttonon onClick={() => handleEdit(product.id)}>edit</buttonon>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
