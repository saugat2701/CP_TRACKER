import { useState, useEffect, useMemo } from "react";

export default function UserSearch() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/auth/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div className="search-container">
      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Search by username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u, i) => <li key={i}>{u.username}</li>)
        ) : (
          <li className="no-results">No users found</li>
        )}
      </ul>
    </div>
  );
}
