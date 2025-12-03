import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import UserListPage from "./pages/UserListPage.jsx";
import ChartPage from "./pages/ChartPage.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <nav className="nav-tabs">
          {/* Navigation bar */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "nav-tab" + (isActive ? " nav-tab--active" : "")
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              "nav-tab" + (isActive ? " nav-tab--active" : "")
            }
          >
            Users
          </NavLink>

          <NavLink
            to="/chart"
            className={({ isActive }) =>
              "nav-tab" + (isActive ? " nav-tab--active" : "")
            }
          >
            Chart
          </NavLink>
        </nav>
      </header>

      {/* Handles routing */}
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <span>Rene Hinrichsen</span>
        <span>2025</span>
        <span>Shoe Application Project</span>
      </footer>
    </div>
  );
}

export default App;
