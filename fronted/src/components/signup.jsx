import { Link, useNavigate } from 'react-router-dom';
import '../style/AddTask.css';
import { useState, useEffect } from 'react';

function Signup() {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('login')) {
      navigate('/');
    }
  }, []);

  // Regex patterns
  const patterns = {
    name: /^[a-zA-Z ]{3,30}$/, // letters & spaces, 3-30 chars
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email format
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/ // letters + numbers, 6-20 chars
  };

  const validate = () => {
    const newErrors = {};

    if (!patterns.name.test(userData.name)) newErrors.name = "Name must be 3-30 letters only";
    if (!patterns.email.test(userData.email)) newErrors.email = "Invalid email format";
    if (!patterns.password.test(userData.password)) newErrors.password = "Password must be 6-20 chars with letters & numbers";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return; // stop if validation fails

    try {
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
        alert("Sign Up failed: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Sign Up failed, check console");
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>

      <label>User Name</label>
      <input
        type="text"
        placeholder="Enter User Name"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      <br />

      <label>Email</label>
      <input
        type="text"
        placeholder="Enter Email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      <br />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      <br />

      <button onClick={handleSignUp} className="link" type="submit">Sign Up</button>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;