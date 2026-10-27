import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserSearch from "./UserSearch";

export default function Dashboard() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {user.username}!</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <UserSearch />
    </div>
  );
}
