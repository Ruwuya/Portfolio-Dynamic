import { useEffect, useState } from "react";
import { API_BASE } from "../config";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [shoeSizes, setShoeSizes] = useState([]);

  // Load users
  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch(`${API_BASE}/getUsers.php`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    }
    loadUsers();
  }, []);

  // Load shoe sizes
  useEffect(() => {
    async function loadSizes() {
      try {
        const res = await fetch(`${API_BASE}/getShoeSizes.php`);
        const data = await res.json();   // <- expects an array
        setShoeSizes(data);
      } catch (err) {
        console.error("Failed to load shoe sizes", err);
      }
    }
    loadSizes();
  }, []);

  // --- ADD USER FORM STATE ---
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    shoesize_id: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/addUsers.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("addUsers response:", data);

      if (data.status === "success" || data.success) {
        // reload users
        const resUsers = await fetch(`${API_BASE}/getUsers.php`);
        const usersData = await resUsers.json();
        setUsers(usersData);

        // clear form
        setForm({
          first_name: "",
          last_name: "",
          age: "",
          email: "",
          shoesize_id: "",
        });
      }
    } catch (err) {
      console.error("Failed to add user", err);
    }
  }

  function handleCancel() {
    setForm({
      first_name: "",
      last_name: "",
      age: "",
      email: "",
      shoesize_id: "",
    });
  }

  return (
    <div className="page users-page">
      <div className="grid-two">
        {/* LEFT SIDE: USERS LIST */}
        <section className="card users-panel">
          <div className="users-panel-header">
            <h2>Users</h2>
          </div>

          <div className="users-panel-content">
            <div className="users-list">
              {users.length === 0 ? (
                <p>No users yet.</p>
              ) : (
                users.map((u) => (
                  <div key={u.Email} className="users-list-item">
                    <strong>{u.Name}</strong>
                    <div className="users-list-meta">
                      <span>Age: {u.Age}</span>
                      <span> Email: {u.Email}</span>
                      <span> Size: {u.ShoeSize}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* RIGHT SIDE: ADD USER FORM */}
        <section className="card adduser-panel">
          <h2 className="adduser-title">Add User</h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="first_name">First Name:</label>
              <input
                id="first_name"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="last_name">Last Name:</label>
              <input
                id="last_name"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="age">Age:</label>
              <input
                id="age"
                name="age"
                type="number"
                min="0"
                value={form.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="shoesize_id">Shoe Size:</label>
              <select
                id="shoesize_id"
                name="shoesize_id"
                value={form.shoesize_id}
                onChange={handleChange}
                required
              >
                <option value="">Select size…</option>
                {shoeSizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.shoe_size}
                  </option>
                ))}
              </select>
            </div>

            <div className="button-row">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add User
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}