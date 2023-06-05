import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';

import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state?.session?.user);
	const cartItems = useSelector(state=>state?.cartItems)
	const history = useHistory();
	const [cartQuantity, setCartQuantity] = useState(0);

	useEffect(() => {

	})

	const signIn = (e) => {
		e.preventDefault();
		history.push('/login');
	};

	const handleClick = (e) => {
		e.preventDefault();
		history.push('/cart');
	};

	return (
		<div>
			<div className='nav-bar'>
				<div className='section section1'>
					<NavLink exact to="/"><img className='nav-logo' alt='' src='https://res.cloudinary.com/djclmc80y/image/upload/v1684893514/amazon_logo_dark_blue_w4vfje.jpg' /></NavLink>
				</div>
				{sessionUser ? (
					<div className='section section2'>
						<div>
							<img className='geo-loc-icon' alt='' src='https://res.cloudinary.com/djclmc80y/image/upload/v1684983616/geo-location-icon_qj4cuw.png'/>
						</div>
						<div>
							<div className='line-1'>Deliver to {sessionUser.first_name} </div>
							<div className='line-2'>{sessionUser.city}, {sessionUser.zip}</div>
						</div>
					</div>
				): (
					<span className='section section2' onClick={signIn}>
						<span>
							<div className='line-1'>Hello</div>
							<div className='line-2'>Sign in to get started</div>
						</span>
					</span>
				)}
				<div className='section secion3'>
					<span>
						<input className='search' type='search' placeholder='Search Amazon'></input>
					</span>
					<img className='search-icon' alt='' scr='https://caitlyn.s3.us-west-2.amazonaws.com/seach_icon.png'></img>
				</div>
				<div className='section section4'>
					<div>Hello, {sessionUser?.first_name}</div>
					<span>Manage Account</span>
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
				<div className='section section6' onClick={handleClick}>
					<img className='cart-icon' alt='' src='https://caitlyn.s3.us-west-2.amazonaws.com/cart-icon.jpg'></img>
					<span>Cart</span>
				</div>
			</div>
			<div className='category-bar'>
			</div>
		</div>
	);
}

export default Navigation;
