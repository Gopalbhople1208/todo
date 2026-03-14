// frontend/src/components/Signup.jsx
import { Link, useNavigate } from 'react-router-dom';
import '../style/AddTask.css';
import { useState, useEffect } from "react";
import Google from './Google'; // Import Google login button

function Signup() {

  const [userData, setTaskData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('login')) {
      navigate('/');
    }
  }, []);

  const patterns = {
    name: /^[a-zA-Z ]{3,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/
  };

  const validate = () => {
    const newErrors = {};
    if (!patterns.name.test(userData.name)) newErrors.name = "Name must be 3-30 letters only";
    if (!patterns.email.test(userData.email)) newErrors.email = "Invalid email format";
    if (!patterns.password.test(userData.password)) newErrors.password = "Password must be 6-20 chars with letters & numbers";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handSignUp = async () => {
    if (!validate()) return;

    let response = await fetch('http://localhost:3232/signup', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    let result = await response.json();

    if (result.success) {
      document.cookie = "token=" + result.token + "; path=/";
      localStorage.setItem('login', userData.email);
      window.dispatchEvent(new Event('localStorage-change'));
      alert("Sign Up successful");
      navigate("/");
    } else {
      alert(result.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>

      <label>User Name</label>
      <input
        onChange={(event) => setTaskData({ ...userData, name: event.target.value })}
        type="text"
        placeholder="Enter User Name"
      />
      {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      <br />

      <label>Email</label>
      <input
        onChange={(event) => setTaskData({ ...userData, email: event.target.value })}
        type="text"
        placeholder="Enter Email"
      />
      {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      <br />

      <label>Password</label>
      <input
        onChange={(event) => setTaskData({ ...userData, password: event.target.value })}
        type="password"
        placeholder="Enter Password"
      />
      {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      <br />

      <button onClick={handSignUp} className="link" type="submit">Sign Up</button>
      <br />

      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <strong>Or sign up with Google</strong>
        <br /><br />
        <Google /> {/* <-- Google login button */}
      </div>

      <Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;