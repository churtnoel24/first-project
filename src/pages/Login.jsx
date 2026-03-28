import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/api/login.php",
        {
          email,
          password
        },
        { header: { "Cotent-Type": "application/json" } }
      );

      if (response.data.success) {
        localStorage.setItem("auth", "true"); //store login state //in real world scenario this is not secure.
        navigate("/") //navigate to homepage
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        alert("error: " + (error.response.data.message));
      } else if (error.request) {
        alert("error: no response from the server");
      } else {
        alert("Sira")
      }
    }

  };

  return (
    <div className="d-flex align-items-center vh-100">
      <div className="form-control w-25 mx-auto">
        <form onSubmit={handleSubmit}>
          <label className="form-label">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="form-control" />
          <label className="form-label">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="form-control" />
          <button type="submit" className="btn btn-primary mt-2">Login</button>
        </form>

        <p> Don't have an account yet? <Link to="/register">Register</Link> </p>
      </div>
    </div>
  );
}

export default Login;
