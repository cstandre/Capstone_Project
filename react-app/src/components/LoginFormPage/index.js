import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push('/signup')
  }

  const homeClick = (e) => {
    e.preventDefault()
    history.push('/')
  }

  const demoUser = async (e) => {
    e.preventDefault();
    setEmail('demo@aa.io');
    setPassword('password');
    await dispatch(login(email, password));
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="img">
          <img className="logo" onClick={homeClick} src="https://res.cloudinary.com/djclmc80y/image/upload/v1684814624/amazon_logo_weywcm.png" />
        </div>
      <div className="form-content">
        <p className="header">Sign in</p>
        <div className="input-fields">
          <label>
            <h3>Email</h3>
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>
          </label>
          <label>
            <h3>Password</h3>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
            </div>
          </label>
        </div>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <button type="submit" className="continue-botton">Continue</button>
          <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
          <div>
            <p className="demoUser" onClick={demoUser}>Demo User?</p>
          </div>
        </div>
      </form>
      <div className="after-form-area">
        <div className="after-form-header">
          <p>New to Amazon?</p>
        </div>
        <div className="button-div">
          <button className="signup-button" onClick={handleClick}>Create your Amazon account</button>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
