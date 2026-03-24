import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api")
      .then(({ data }) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}

export default App;
