import Sidebar from "./components/Sidebar.jsx";
import ComingSoon from "./components/ComingSoon.jsx";
import Dashboard from "./components/Dashboard.jsx";
import InventoryList from "./components/InventoryList.jsx";
import ProductReg from "./components/ProductReg.jsx";
import Login from "./components/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import BusinessReg from "./components/BusinessReg.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/businessregister" element={<BusinessReg />} />
        <Route element={<Sidebar />}>
          <Route path="/" element={<ComingSoon page="Dashboard" />} />
          <Route path="/scan" element={<ComingSoon page="Scan" />} />
          <Route path="/reports" element={<ComingSoon page="Reports" />} />
          <Route path="/settings" element={<ComingSoon page="Settings" />} />
          <Route path="/new" element={<ProductReg />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/edit/:id" element={<ProductReg />} />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
