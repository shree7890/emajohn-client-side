import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import "./Register.css";
const Register = () => {
  const { signup, googleSignIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.state?.from || "/";
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password do not match!");
    }
    try {
      setLoading(true);
      setError("");
      await signup(email, password, username);
      navigate(url);
    } catch (err) {
      setLoading(false);
      setError("Failed to create an account!");
      console.log(err.message);
    }
  };
  const googleSignin = () => {
    googleSignIn()
      .then(() => {
        setLoading(true);
        setError("");
        navigate(url);
      })
      .catch(() => {
        setLoading(false);
        setError("google account not sign in");
      });
  };
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            className="input-field"
            type="text"
            id="name"
            placeholder="enter your name"
            onBlur={(e) => setUserName(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            className="input-field"
            type="email"
            id="email"
            placeholder="enter your email"
            onBlur={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            className="input-field"
            type="password"
            id="password"
            placeholder="enter your password"
            onBlur={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="passworde">Confirm Password:</label>
          <input
            className="input-field"
            type="password"
            id="passworde"
            placeholder="enter your confirm password"
            onBlur={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          {error && <p className="error">{error}</p>}
          {loading && <p>loading...</p>}
          <input className="submit" type="submit" value="Register" />
        </form>
      </div>
      <button className="googlebutton" onClick={googleSignin}>
        google sign in
      </button>
      <div className="register">
        <div>
          <div>-----------------------------------------------------</div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
