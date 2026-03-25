import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    quantity: "",
  });
  const [catalog, setCatalog] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api", formData).then((res) => {
      setCatalog(res.data);
    });
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
            <li> {product.productName}</li>
            <li> {product.price}</li>
            <li> {product.quantity}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
