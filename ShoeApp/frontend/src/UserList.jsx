import { useEffect, useState } from "react";
import { API_BASE } from "./config";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/getUsers.php`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.first_name} {user.last_name} ({user.age}) — EU Size {user.shoesize_id}
          </li>
        ))}
      </ul>
    </div>
  );
}