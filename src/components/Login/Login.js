import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.state?.from || "/";
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate(url);
    } catch (err) {
      setLoading(false);
      setError("Failed to login!");
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
        <form onSubmit={handleSubmitForm}>
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
          {error && <p className="error">{error}</p>}
          {loading && <p>loading...</p>}
          <input className="submit" type="submit" value="Login" />
        </form>
      </div>
      <button className="googlebutton" onClick={googleSignin}>
        google sign in
      </button>
      <div className="register">
        <div>
          <div>-----------------------------------------------------</div>
          <p>
            New account for create <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
