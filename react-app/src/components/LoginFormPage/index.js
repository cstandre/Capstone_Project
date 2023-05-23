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

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="img">
          <img className="logo" src="https://res.cloudinary.com/djclmc80y/image/upload/v1684814624/amazon_logo_weywcm.png" />
        </div>
      <div className="form-content">
        <p className="header">Sign in</p>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label>
            Password
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <button type="submit" className="continue-botton">Continue</button>
          <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
        </div>
      </form>
      <div className="create-account">
          <p>New to Amazon?</p>
          <button onClick={handleClick}>Create your Amazon account</button>
      </div>
    </div>
  );
}

export default LoginFormPage;
