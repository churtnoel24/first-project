import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/api/register.php", {
        username,
        email,
        password
      },
        {
          headers: { "Content-Type": "application/json" }
        });
      if (response.data.success) {
        alert(response.data.message || "Registration successful!");
        navigate('/login');
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      if (error.response) {
        alert("Error: " + (error.response.data.message || error.response.statusText));
      } else if (error.request) {
        alert("Error: No response from server");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="d-flex align-items-center vh-100">
      <div className="form-control w-25 mx-auto">
        <form onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="form-control" />
          <label className="form-label">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="form-control" />
          <label className="form-label">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="form-control" />
          <button type="submit" className="btn  btn-secondary mt-2">Register</button>
        </form>
        <p> Have an account already? <Link to="/login">click here.</Link> </p>
      </div>
    </div>
  );
}

export default Register;