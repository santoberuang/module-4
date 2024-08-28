import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoriesPages from "./pages/Categories";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <Router>
      <main className="p-5">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />} />
          <Route path="/categories" element={<CategoriesPages />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
