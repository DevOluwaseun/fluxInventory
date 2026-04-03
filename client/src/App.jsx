import Dashboard from "./components/Dashboard.jsx";
import InventoryList from "./components/InventoryList.jsx";
import ProductReg from "./components/ProductReg.jsx";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<ProductReg />} />
        <Route path="/inventory" element={<InventoryList />} />
        {/* <Route path="*" element={<NoMatch />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
