import { useEffect, useState } from "react";
import { API_BASE } from "../config";

export default function UserListPage() {
  const [users, setUsers] = useState([]);

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

  // Very simple add-user form; you can expand/validate later
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
      console.log(data);

      // reload user list on success
      if (data.status === "success" || data.success) {
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
                  <div className="users-list-item">
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
                {/* You can later load these from backend; for now just a few options */}
                <option value="13">38</option>
                <option value="14">39</option>
                <option value="15">40</option>
                <option value="16">41</option>
                <option value="17">42</option>
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