import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const data = await dispatch(signUp(
        firstName,
        lastName,
        email,
        username,
        streetAddress,
        city,
        state,
        zip,
        password
      ));
      
      if (data) {
        setErrors(data)
      }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const homeClick = (e) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="img">
          <img className="logo" onClick={homeClick} alt="" src="https://res.cloudinary.com/djclmc80y/image/upload/v1684814624/amazon_logo_weywcm.png" />
        </div>
        <div className="form-content-signup">
          <p className="header">Create Account</p>
          <div className="input-fields">
            <label className="input-section">
              <h3>First Name</h3>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="signup-input"
              />
            </label>
            <label className="input-section">
              <h3>Last Name</h3>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="signup-input"
              />
            </label>
            <label className="input-section">
              <h3>Email</h3>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="signup-input"
              />
            </label>
            <label className="input-section">
              <h3>Username</h3>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="signup-input"
              />
            </label>
              <label className="input-section">
              <h3>Street Address</h3>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                required
                className="signup-input"
              />
            </label>
              <label className="input-section">
              <h3>City</h3>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="signup-input"
              />
            </label>
              <label className="input-section">
              <h3>State</h3>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="signup-input"
              />
            </label>
              <label className="input-section">
              <h3>Zip</h3>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
                className="signup-input"
              />
            </label>
            <label className="input-section">
              <h3>Password</h3>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="signup-input"
              />
            </label>
            <label className="input-section">
              <h3>Re-enter Password</h3>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="signup-input"
              />
            </label>
          </div>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <button type="submit" className="continue-botton">Continue</button>
          <div className="after-signup-area">
            <p>By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
            <p>Already have an account? <Link exact to="/login">Sign in</Link></p>
        </div>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
