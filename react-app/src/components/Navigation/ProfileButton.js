import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push('');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    history.push('/signup');
    closeMenu();
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    history.push('/login');
    closeMenu();
  };

  const handleStore = (e) => {
    e.preventDefault();
    history.push('/products/user-store');
    closeMenu()
  }


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <i className="fa-solid fa-caret-down" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <h1 className="drop-down-header">Your Account</h1>
            <button className='store-button' onClick={handleStore}>Your Store</button>
            <button className='logout-button' onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button onClick={handleLogIn}>Log In</button>
            <button onClick={handleSignUp}>Sign Up</button>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
