
import { Routes, Route,Link } from "react-router-dom";

import CustomerRegister from "./pages/CustomerRegister"
import AdminRegister from "./pages/AdminRegister";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
 
  return (
    <>
    <div className="container mt-5">
    <h2 className="mb-4">Registration Portal</h2>
    <Link to="/register/customer" className="btn btn-primary me-2">Customer Register</Link>
        <Link to="/register/admin" className="btn btn-secondary">Admin Register</Link>
    </div>
    <Routes>
    
        
        <Route path="/register/customer" element={ <CustomerRegister/> } />
        <Route path="/register/admin" element={ <AdminRegister /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/adminDashboard" element={ <AdminDashboard /> } />
       
      
      </Routes>

    </>
  )
}

export default App
