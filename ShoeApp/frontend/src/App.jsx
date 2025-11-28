import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddUserPage from "./pages/AddUserPage.jsx";
import UserListPage from "./pages/UserListPage.jsx";
import ChartPage from "./pages/ChartPage.jsx";

function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>ShoeApp</h1>

      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/add">Add user</Link>
        <Link to="/users">User list</Link>
        <Link to="/chart">Shoe size chart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddUserPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </div>
  );
}

export default App;