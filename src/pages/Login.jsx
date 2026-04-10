import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.includes("@")) newErrors.email = "Enter a valid email.";
    if (form.password.length < 6) newErrors.password = "Password too short.";
    return newErrors;
  };


  const handleSubmit = async (e) => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/api/login.php",
        {
          email: form.email,
          password: form.password
        },
        { header: { "Cotent-Type": "application/json" } }
      );

      if (response.data.success) {
        localStorage.setItem("username", response.data.username); //store login state //in real world scenario this is not secure.
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
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Login</h2>
      <FormInput label="Email" type="email" name="email"
        value={form.email} onChange={(handleChange)} error={errors.email} required />
      <FormInput label="Password" type="password" name="password"
        value={form.password} onChange={handleChange} error={errors.password} required />
      <Button label="Login" variant="primary" onClick={handleSubmit} />
    </div>

  );
}

export default Login;
