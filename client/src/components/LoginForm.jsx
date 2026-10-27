import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const usernameRef = useRef(null);
  const { login } = useContext(UserContext);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        if (!isRegistering) {
          login(data.user.username);
        }
        setUsername("");
        setPassword("");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Could not connect to server");
    }
  };

  return (
    <div className="form-container">
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          ref={usernameRef}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <p className="toggle-text">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <span className="toggle-link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Login" : "Register"}
        </span>
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
